#!/usr/bin/env python3
"""Render a synthetic "phone camera" clip for automated tracking tests.

    python3 tools/make-test-camera.py <card-image> <decoy-image> <out.y4m> [--decoy-only] [--mirror-decoy]

Timeline (24 fps, 640x480 like a default webcam):
  0-3 s   decoy (an unrelated picture) on a table  -> must NOT trigger
  3-13 s  the card, in perspective, drifting/rotating slowly
  13-15 s empty table                              -> card lost
  15-18 s the card again                           -> found again
<decoy-image> may be "synthetic" for a generated unrelated picture.
--decoy-only renders 10 s of just the decoy (a negative test); --mirror-decoy
uses a mirrored copy of the decoy image. Raw frames are piped to ffmpeg to write a .y4m Chromium can use as a fake camera.
"""
import math
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H, FPS = 640, 480, 24


def coeffs(dst, src):
    """PIL perspective coefficients mapping output (dst) points to input (src)."""
    a = []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y])
    b = np.array(src).reshape(8)
    return np.linalg.solve(np.array(a, dtype=float), b).tolist()


def table():
    rng = np.random.default_rng(7)
    base = np.zeros((H, W, 3), dtype=np.float32)
    base[:] = (118, 92, 70)
    grain = rng.normal(0, 1, (H, W // 8)).repeat(8, axis=1)
    base += grain[..., None] * 9
    base += rng.normal(0, 4, (H, W, 1))
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    return img


def place(bg, card, cx, cy, width, rot_deg, tilt):
    """Paste `card` as a quad centred at (cx, cy) with rotation and a perspective tilt."""
    cw, ch = card.size
    hw, hh = width / 2, width * ch / cw / 2
    corners = [(-hw * (1 - tilt), -hh), (hw * (1 - tilt), -hh), (hw * (1 + tilt), hh), (-hw * (1 + tilt), hh)]
    r = math.radians(rot_deg)
    quad = [(cx + x * math.cos(r) - y * math.sin(r), cy + x * math.sin(r) + y * math.cos(r)) for x, y in corners]
    src = [(0, 0), (cw, 0), (cw, ch), (0, ch)]
    warped = card.transform((W, H), Image.PERSPECTIVE, coeffs(quad, src), Image.BICUBIC)
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).polygon(quad, fill=255)
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).polygon([(x + 6, y + 8) for x, y in quad], fill=110)
    out = Image.composite(Image.new("RGB", (W, H), (20, 14, 10)), bg, shadow.filter(ImageFilter.GaussianBlur(8)))
    return Image.composite(warped, out, mask)


def synthetic_decoy():
    """A busy, unrelated picture (random shapes) — plenty of features, none of them the card's."""
    rng = np.random.default_rng(11)
    img = Image.new("RGB", (1000, 562), (24, 30, 58))
    d = ImageDraw.Draw(img)
    for _ in range(140):
        x, y = rng.integers(0, 1000), rng.integers(0, 562)
        r = int(rng.integers(8, 70))
        col = tuple(int(c) for c in rng.integers(30, 255, 3))
        if rng.random() < 0.5:
            d.ellipse([x - r, y - r, x + r, y + r], fill=col)
        else:
            d.rectangle([x - r, y - r // 2, x + r, y + r // 2], fill=col)
    return img


def main():
    card = Image.open(sys.argv[1]).convert("RGB")
    decoy = synthetic_decoy() if sys.argv[2] == "synthetic" else Image.open(sys.argv[2]).convert("RGB")
    out = sys.argv[3]
    decoy_only = "--decoy-only" in sys.argv
    if "--mirror-decoy" in sys.argv:
        decoy = decoy.transpose(Image.FLIP_LEFT_RIGHT)
    bg = table()
    ff = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
         "-i", "-", "-pix_fmt", "yuv420p", out],
        stdin=subprocess.PIPE,
    )
    rng = np.random.default_rng(3)
    total = (10 if decoy_only else 18) * FPS
    for f in range(total):
        t = f / FPS
        if decoy_only:
            frame = place(bg, decoy, 320 + 20 * math.sin(t), 240, 420 + 20 * math.sin(t * 0.5), -4 + 3 * math.sin(t * 0.7), 0.06)
        elif t < 3:
            frame = place(bg, decoy, 320, 240, 420, -4, 0.06)
        elif t < 13 or t >= 15:
            k = t - 3
            frame = place(bg, card,
                          320 + 28 * math.sin(k * 0.7), 240 + 16 * math.sin(k * 0.9),
                          430 + 30 * math.sin(k * 0.4), 6 * math.sin(k * 0.5), 0.10 + 0.05 * math.sin(k * 0.6))
        else:
            frame = bg.copy()
        arr = np.asarray(frame, dtype=np.int16) + rng.integers(-3, 4, (H, W, 1))  # sensor noise
        ff.stdin.write(np.clip(arr, 0, 255).astype(np.uint8).tobytes())
    ff.stdin.close()
    sys.exit(ff.wait())


if __name__ == "__main__":
    main()
