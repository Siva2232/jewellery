import banglesCard from "../assets/images/story/bangles-card.webp";
import banglesCut from "../assets/images/story/bangles-cut.webp";
import portraitEmpty from "../assets/images/girlbangle.png";
/** Exact finale the story must end on (reference shot). */
import portraitWorn from "../assets/images/out.png";

/**
 * Anchor id shared between the collection wall card and the flying clone.
 * The story measures this node with getBoundingClientRect() and never animates it.
 */
export const STORY_ANCHOR = "bangle-story-anchor";

export const bangleStoryAssets = {
  card: banglesCard,
  cutout: banglesCut,
  /** Empty wrist while the model enters / pair flies. */
  portrait: portraitEmpty,
  /** Final frame — exact out.png. Swapped under the clone so the girl never jumps. */
  portraitWorn,
};

/**
 * Landing geometry measured off out.png bangle centre (tools/make_out_empty.py).
 * Clone parks here so when it dissolves, painted bangles in out.png sit underneath.
 */
export const bangleStoryGeometry = {
  cutout: {
    x: 254 / 1024,
    y: 325 / 1536,
    w: 516 / 1024,
    h: 799 / 1536,
    aspect: 516 / 799,
  },
  product: {
    aspect: 896 / 1344,
  },
  portrait: {
    aspect: 1024 / 1536,
    wrist: {
      x: 42.77,
      y: 59.9,
    },
  },
  landing: {
    /** Slightly oversized so the clone masks the empty→out pose swap. */
    widthPct: 17.5,
    rotation: -18,
  },
};

export const bangleStoryCopy = {
  wall: {
    eyebrow: "The collection",
    heading: "Twenty pieces, one language",
    description:
      "A curated wall of bridal, festive, and everyday forms — each finished by hand for the way light moves.",
  },
  story: {
    eyebrow: "Signature collection",
    heading: "Every Bracelet Begins With A Story",
    paragraph:
      "Handcrafted with timeless elegance, designed to become part of your every celebration.",
    primaryCta: { label: "Explore Collection", href: "#collections" },
    secondaryCta: { label: "View Craftsmanship", href: "#craft" },
    caption: "Kemp Temple Bangles · 22kt gold tone",
  },
};
