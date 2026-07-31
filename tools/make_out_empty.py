#!/usr/bin/env python3
"""
Build scroll-story portrait pair from out.png (desired finale):

  out-empty.webp  — same pose as out.png, bangles softly covered with skin fill
  (worn finale is the original out.png — exact final frame the site should end on)

Also prints wrist geometry for bangleStory.js.

Usage:
  python3 tools/make_out_empty.py
"""

from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "src" / "assets" / "images"
STORY = IMAGES / "story"


def main() -> None:
    out_bgr = cv2.imread(str(IMAGES / "out.png"))
    if out_bgr is None:
        raise SystemExit("out.png not found")
    h, w = out_bgr.shape[:2]
    rgb = cv2.cvtColor(out_bgr, cv2.COLOR_BGR2RGB)

    # --- Detect bangle metal in wrist ROI ---
    hsv = cv2.cvtColor(out_bgr, cv2.COLOR_BGR2HSV)
    gold = cv2.inRange(hsv, (10, 65, 75), (38, 255, 255))
    red = cv2.inRange(hsv, (0, 70, 50), (12, 255, 220))
    metal = cv2.bitwise_or(gold, red)

    center = (438, 918)
    roi = np.zeros((h, w), np.uint8)
    cv2.ellipse(roi, center, (105, 95), -18, 0, 360, 255, -1)
    metal = cv2.bitwise_and(metal, roi)
    metal = cv2.morphologyEx(metal, cv2.MORPH_CLOSE, np.ones((4, 4), np.uint8), iterations=2)
    metal = cv2.dilate(metal, np.ones((5, 5), np.uint8), iterations=1)

    # Soft elliptical cover so residual gems are hidden
    cover = np.zeros((h, w), np.uint8)
    cv2.ellipse(cover, center, (90, 80), -18, 0, 360, 255, -1)
    cover = cv2.GaussianBlur(cover, (0, 0), 10)
    metal_soft = cv2.GaussianBlur(metal, (0, 0), 5)
    alpha = np.maximum(
        cover.astype(np.float32) / 255.0,
        metal_soft.astype(np.float32) / 255.0,
    )
    alpha = np.clip(alpha, 0, 1)

    # Skin samples along the forearm
    p1 = np.median(rgb[790:840, 490:560].reshape(-1, 3), axis=0)
    p3 = np.median(rgb[940:985, 395:460].reshape(-1, 3), axis=0)
    t = np.clip((np.arange(h).reshape(-1, 1, 1) - 800) / 200.0, 0, 1)
    grad = p1 * (1 - t) + p3 * t
    grad = np.broadcast_to(grad, (h, w, 3)).copy()
    rng = np.random.default_rng(7)
    fill = np.clip(grad + rng.normal(0, 2.8, (h, w, 3)), 0, 255)

    orig = rgb.astype(np.float32)
    a3 = alpha[..., None]
    empty = orig * (1 - a3) + fill * a3
    empty_u8 = empty.astype(np.uint8)
    blurred = cv2.GaussianBlur(empty_u8, (5, 5), 0)
    empty = (
        blurred.astype(np.float32) * (a3 * 0.55) + empty * (1 - a3 * 0.55)
    )
    empty = np.clip(empty, 0, 255).astype(np.uint8)

    out_empty = STORY / "out-empty.webp"
    Image.fromarray(empty).save(out_empty, "WEBP", quality=94, method=6)
    Image.fromarray(empty).save(STORY / "out-empty.png")

    ys, xs = np.where(metal > 0)
    meta = {
        "wrist_x_pct": float(xs.mean() / w * 100),
        "wrist_y_pct": float(ys.mean() / h * 100),
        "width_pct": float((xs.max() - xs.min()) / w * 100),
        "rotation": -18,
        "empty_asset": str(out_empty.relative_to(ROOT)),
        "worn_asset": "src/assets/images/out.png",
        "note": "Empty is same pose as out.png; worn finale is exact out.png",
    }
    (STORY / "out-empty.meta.json").write_text(json.dumps(meta, indent=2))
    print(json.dumps(meta, indent=2))
    print("Wrote", out_empty)


if __name__ == "__main__":
    main()
