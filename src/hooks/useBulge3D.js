import { useRef, useState } from "react";

/**
 * Hover zoom + lift — product scales up and rises toward the viewer.
 * transformOrigin follows the pointer for a product-focused read.
 */
export default function useBulge3D({
  lift = 14,
  popZ = 40,
  scale = 1.14,
} = {}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [pose, setPose] = useState({
    x: 50,
    y: 50,
    lift: 0,
    z: 0,
    s: 1,
  });

  const onMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

    setActive(true);
    setPose({
      x: px * 100,
      y: py * 100,
      lift,
      z: popZ,
      s: scale,
    });
  };

  const onLeave = () => {
    setActive(false);
    setPose({ x: 50, y: 50, lift: 0, z: 0, s: 1 });
  };

  const style = {
    transform: `translate3d(0, ${-pose.lift}px, ${pose.z}px) scale(${pose.s})`,
    transformOrigin: `${pose.x}% ${pose.y}%`,
  };

  return { ref, active, pose, style, onMove, onLeave };
}
