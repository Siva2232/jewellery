import banglesCard from "../assets/images/story/bangles-card.webp";
import banglesCut from "../assets/images/story/bangles-cut.webp";
import portrait from "../assets/images/story/portrait.webp";
import wristBare from "../assets/images/story/wrist-bare.webp";

/**
 * Anchor id shared between the collection wall card and the flying clone.
 * The story measures this node with getBoundingClientRect() and never animates it.
 */
export const STORY_ANCHOR = "bangle-story-anchor";

export const bangleStoryAssets = {
  card: banglesCard,
  cutout: banglesCut,
  portrait,
  wristBare,
};

/**
 * Geometry measured off the source renders by tools/prep_assets.py and
 * tools/measure_landing.py. Everything is stored as a fraction of its own
 * frame so the runtime maths stays resolution independent.
 */
export const bangleStoryGeometry = {
  /** Where the cutout sits inside the full product frame, as fractions of it. */
  cutout: {
    x: 254 / 1024,
    y: 325 / 1536,
    w: 516 / 1024,
    h: 799 / 1536,
    aspect: 516 / 799,
  },
  /** The product frame the card paints, so cover-fit maths can be replayed. */
  product: {
    aspect: 896 / 1344,
  },
  /** Portrait frame is out.png: 1024 x 1536. */
  portrait: {
    aspect: 1024 / 1536,
    /** Bare-wrist patch placement inside the portrait frame. */
    patch: {
      left: (287 / 1024) * 100,
      top: (798 / 1536) * 100,
      width: (330 / 1024) * 100,
      height: (340 / 1536) * 100,
    },
    /** Centre of the bangles as actually worn in the portrait. */
    wrist: {
      x: (452 / 1024) * 100,
      y: (968 / 1536) * 100,
    },
  },
  /**
   * Final pose of the flying clone. It only has to get close: the clone fades
   * out under a shine burst while the real worn bangles fade in beneath it.
   */
  landing: {
    /** Clone width as a percentage of the portrait frame width. */
    widthPct: 11.5,
    rotation: 38,
  },
};

export const bangleStoryCopy = {
  wall: {
    eyebrow: "The collection",
    heading: "Ten pieces, one language",
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
