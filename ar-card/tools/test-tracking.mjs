#!/usr/bin/env node
// End-to-end tracking test with a synthetic camera.
//   node tools/test-tracking.mjs
// Renders a fake camera clip (decoy -> card in perspective -> empty -> card),
// feeds it to headless Chromium as the webcam, runs the real site, and checks
// that the card is detected (and the decoy isn't), lost, and found again.
// Screenshots + a state timeline land in test-output/.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { serve, loadChromium } from "./static-server.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outDir = join(root, "test-output");
mkdirSync(outDir, { recursive: true });

const card = process.env.CARD_IMAGE || join(root, "assets/source/card-print.png");
// Any unrelated picture works as the decoy (DECOY_IMAGE=path); default is a
// generated image full of shapes. MIRROR_DECOY=1 mirrors it.
const decoy = process.env.DECOY_IMAGE || "synthetic";
const decoyFlags = process.env.MIRROR_DECOY ? ["--mirror-decoy"] : [];
const render = (out, extra = []) =>
  execFileSync("python3", [join(root, "tools/make-test-camera.py"), card, decoy, out, ...decoyFlags, ...extra], { stdio: "inherit" });
console.log("Rendering synthetic camera clips…");
const mainClip = join(outDir, "camera-card.y4m");
const decoyClip = join(outDir, "camera-decoy.y4m");
render(mainClip);
render(decoyClip, ["--decoy-only"]);

const chromium = await loadChromium();
const { server, url } = await serve(root);
// Phone-sized by default; e.g. VIEWPORT=800x600 to see the whole card on screen.
const [vw, vh] = (process.env.VIEWPORT || "390x844").split("x").map(Number);
const VIEWPORT = { width: vw, height: vh };
const failures = [];
const check = (ok, msg) => { console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`); if (!ok) failures.push(msg); };

async function run(name, clip, seconds, shoot) {
  console.log(`\n== ${name} ==`);
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      `--use-file-for-fake-video-capture=${clip}`,
      "--autoplay-policy=no-user-gesture-required",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--ignore-gpu-blocklist",
    ],
  });
  const timeline = [];
  try {
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, permissions: ["camera"] });
    const page = await context.newPage();
    page.on("console", (m) => { if (m.type() === "error") console.log("  [page]", m.text()); });
    page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
    await page.goto(url + "/");
    if (shoot) await page.screenshot({ path: join(outDir, "1-welcome.png") });
    await page.click("#btn-start");
    const t0 = Date.now();
    let searchingAt = null;
    const shots = { searching: false, playing: false, lost: false, ended: false };
    while (true) {
      const s = await page.evaluate(() => ({ state: window.__arcard.state, playback: window.__arcard.playback, tracked: window.__arcard.tracked, videoTime: window.__arcard.videoTime }));
      s.t = +((Date.now() - t0) / 1000).toFixed(1);
      if (s.state === "searching" && searchingAt === null) searchingAt = s.t;
      const prev = timeline[timeline.length - 1];
      if (!prev || prev.state !== s.state || prev.tracked !== s.tracked || prev.playback !== s.playback) {
        timeline.push(s);
        console.log(`  t=${s.t}s state=${s.state} tracked=${s.tracked} playback=${s.playback} video=${s.videoTime.toFixed(2)}s`);
      }
      if (shoot && shots[s.state] === false && (s.state !== "playing" || s.videoTime > 1.5)) {
        shots[s.state] = true;
        await page.screenshot({ path: join(outDir, `2-${s.state}.png`) });
      }
      if (s.state === "error" || s.t > 60) break;
      if (searchingAt !== null && s.t - searchingAt > seconds) break;
      await page.waitForTimeout(150);
    }
    if (shoot) await page.screenshot({ path: join(outDir, "3-final.png") });
    if (timeline.some((s) => s.state === "error")) {
      console.log("  error:", await page.textContent("#msg-title"), "—", await page.textContent("#msg-body"));
    }
  } finally {
    writeFileSync(join(outDir, `timeline-${name}.json`), JSON.stringify(timeline, null, 2));
    await browser.close();
  }
  return timeline;
}

try {
  // Negative test: an unrelated image must never trigger the overlay.
  const neg = await run("decoy", decoyClip, 12, false);
  check(neg.some((s) => s.state === "searching"), "decoy: camera + tracking started");
  check(!neg.some((s) => s.tracked), "decoy: unrelated image NOT detected");

  // Positive test: card found, video plays, lost when removed, found again.
  const tl = await run("card", mainClip, 40, true);
  const states = tl.map((s) => s.state);
  check(!states.includes("error"), "card: no error state");
  check(tl.some((s) => s.tracked), "card: target detected");
  check(tl.some((s) => s.state === "playing" && s.playback === "playing"), "card: video playing on detection");
  const lost = tl.findIndex((s) => s.state === "lost");
  check(lost >= 0, "card: loss detected when card leaves the frame");
  check(lost >= 0 && tl.slice(lost).some((s) => s.tracked), "card: re-detected after loss");
  check(tl.some((s) => s.playback === "ended"), "card: video reached its end (Play Again shown)");
} finally {
  server.close();
}
console.log(failures.length ? `\n${failures.length} check(s) failed.` : "\nAll checks passed.");
process.exit(failures.length ? 1 : 0);
