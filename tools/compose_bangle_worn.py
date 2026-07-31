#!/usr/bin/env python3
"""
Composite temple bangles onto girlbangle.png (empty wrist) to produce a
same-pose worn frame for the scroll story.

Usage:
  python3 tools/compose_bangle_worn.py

Edit CFG below to nudge placement, then re-run.
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "src" / "assets" / "images"
STORY = IMAGES / "story"

# ── Tunables (fractions of the 1024×1536 portrait) ──────────────────────────
CFG = {
    "cx": 0.362,
    "cy": 0.638,
    "width": 0.138,
    "rot": -38,
}


def feather_alpha(img: Image.Image, radius: float = 0.8) -> Image.Image:
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(radius))
    return Image.merge("RGBA", (r, g, b, a))


def main() -> None:
    empty = Image.open(IMAGES / "girlbangle.png").convert("RGBA")
    cut = Image.open(STORY / "bangles-cut.webp").convert("RGBA")
    cut = feather_alpha(cut, 0.8)

    W, H = empty.size
    tw = int(W * CFG["width"])
    th = int(tw * cut.size[1] / cut.size[0])

    piece = cut.resize((tw, th), Image.Resampling.LANCZOS)
    piece = piece.rotate(CFG["rot"], expand=True, resample=Image.Resampling.BICUBIC)
    piece = feather_alpha(piece, 0.6)
    piece = ImageEnhance.Color(piece).enhance(0.92)
    piece = ImageEnhance.Brightness(piece).enhance(0.96)
    piece = ImageEnhance.Contrast(piece).enhance(1.05)

    px = int(CFG["cx"] * W - piece.size[0] / 2)
    py = int(CFG["cy"] * H - piece.size[1] / 2)

    alpha = piece.split()[-1]
    shadow = Image.new("RGBA", piece.size, (40, 22, 10, 0))
    shadow.putalpha(alpha.point(lambda v: int(v * 0.5)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(7))

    worn = empty.copy()
    worn.alpha_composite(shadow, (px + 3, py + 5))
    worn.alpha_composite(piece, (px, py))

    out_webp = STORY / "girlbangle-worn.webp"
    out_png = STORY / "girlbangle-worn.png"
    worn.convert("RGB").save(out_webp, "WEBP", quality=90, method=6)
    worn.convert("RGB").save(out_png, optimize=True)

    meta = {
        **CFG,
        "wrist_x_pct": (px + piece.size[0] / 2) / W * 100,
        "wrist_y_pct": (py + piece.size[1] / 2) / H * 100,
        "width_pct": CFG["width"] * 100,
        "rotation": CFG["rot"],
        "asset": str(out_webp.relative_to(ROOT)),
    }
    (STORY / "girlbangle-worn.meta.json").write_text(json.dumps(meta, indent=2))
    print("Wrote", out_webp)
    print(json.dumps(meta, indent=2))
    print(
        "Update bangleStory.js wrist/landing to match meta if you changed CFG."
    )


if __name__ == "__main__":
    main()
