export const easeLuxury = [0.22, 1, 0.36, 1];
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeSoft = [0.33, 1, 0.68, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay, ease: easeLuxury },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, delay, ease: easeLuxury },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

export const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease: easeOutExpo },
  },
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.25, delay, ease: easeLuxury },
  }),
};

export const imageScale = {
  hidden: { scale: 1.18 },
  visible: (delay = 0) => ({
    scale: 1,
    transition: { duration: 1.6, delay, ease: easeLuxury },
  }),
};

export const lineGrow = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1.1, delay, ease: easeLuxury },
  }),
};
