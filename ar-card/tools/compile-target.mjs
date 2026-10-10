#!/usr/bin/env node
// Headless MindAR target compiler.
//   node tools/compile-target.mjs [image] [output]
// Defaults: assets/card-target.jpg -> assets/card-target.mind
// Starts a tiny static server, opens tools/compile-target.html in headless
// Chromium (Playwright) and runs MindAR's own browser compiler on the image.
import { writeFile } from "node:fs/promises";
import { join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { serve, loadChromium } from "./static-server.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const input = resolve(process.argv[2] || join(root, "assets/card-target.jpg"));
const output = resolve(process.argv[3] || join(root, "assets/card-target.mind"));

const rel = relative(root, input);
if (rel.startsWith("..")) {
  console.error("The image must live inside the ar-card folder.");
  process.exit(1);
}

const chromium = await loadChromium();
const { server, url: base } = await serve(root);

const launch = { args: ["--use-gl=angle", "--use-angle=swiftshader", "--ignore-gpu-blocklist"] };
if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(launch);
try {
  const page = await browser.newPage();
  page.on("console", (m) => console.log("  [page]", m.text()));
  await page.goto(`${base}/tools/compile-target.html`);
  await page.waitForFunction(() => window.compilerReady === true);
  console.log(`Compiling ${rel} ...`);
  const { base64, stats } = await page.evaluate((url) => window.compileTargets([url]), `/${rel.split("\\").join("/")}`);
  await writeFile(output, Buffer.from(base64, "base64"));
  console.log("Target stats:", JSON.stringify(stats));
  console.log(`Wrote ${relative(process.cwd(), output)}`);
} finally {
  await browser.close();
  server.close();
}
