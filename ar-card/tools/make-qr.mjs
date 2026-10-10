#!/usr/bin/env node
// Generate a printable QR code that opens the deployed experience.
//   npm run qr -- https://your-site.example/ [out-basename]
// Writes <out>.png (1024 px) and <out>.svg (vector, best for print). Default out: qr-code
import QRCode from "qrcode";

const url = process.argv[2];
const out = process.argv[3] || "qr-code";
if (!url || !/^https:\/\//.test(url)) {
  console.error("Usage: npm run qr -- https://your-site.example/ [out-basename]\n(The URL must be https:// — phones only allow the camera on secure pages.)");
  process.exit(1);
}
// Error-correction "Q" survives scuffs on a printed card; margin 4 is the spec quiet zone.
const opts = { errorCorrectionLevel: "Q", margin: 4, color: { dark: "#000000", light: "#ffffff" } };
await QRCode.toFile(`${out}.png`, url, { ...opts, width: 1024 });
await QRCode.toFile(`${out}.svg`, url, { ...opts, type: "svg" });
console.log(`QR for ${url}\n  -> ${out}.png\n  -> ${out}.svg`);
