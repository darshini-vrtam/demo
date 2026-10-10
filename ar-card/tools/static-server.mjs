// Minimal static file server used by the build/test tools (not for production).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".mind": "application/octet-stream",
};

export async function serve(root) {
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
      if (!path.startsWith(root)) throw new Error("outside root");
      if (path.endsWith("/")) path += "index.html";
      const body = await readFile(path);
      const type = TYPES[extname(path)] || "application/octet-stream";
      const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
      if (range) {
        // Media elements need byte-range support.
        const start = range[1] ? +range[1] : 0;
        const end = range[2] ? +range[2] : body.length - 1;
        res.writeHead(206, { "content-type": type, "content-range": `bytes ${start}-${end}/${body.length}`, "accept-ranges": "bytes", "content-length": end - start + 1 });
        return res.end(body.subarray(start, end + 1));
      }
      res.writeHead(200, { "content-type": type, "accept-ranges": "bytes", "content-length": body.length });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

export async function loadChromium() {
  for (const mod of ["playwright", "playwright-core"]) {
    try { return (await import(mod)).chromium; } catch {}
  }
  console.error("Playwright is required: npm install && npx playwright install chromium");
  process.exit(1);
}
