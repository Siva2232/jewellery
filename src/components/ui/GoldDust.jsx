const PARTICLES = [
  { left: "8%", top: "18%", size: 2, delay: "0s", duration: "7s" },
  { left: "18%", top: "62%", size: 3, delay: "1.2s", duration: "9s" },
  { left: "28%", top: "32%", size: 2, delay: "0.4s", duration: "8s" },
  { left: "42%", top: "78%", size: 2.5, delay: "2s", duration: "10s" },
  { left: "55%", top: "22%", size: 2, delay: "0.8s", duration: "7.5s" },
  { left: "68%", top: "55%", size: 3, delay: "1.6s", duration: "9.5s" },
  { left: "78%", top: "14%", size: 2, delay: "2.4s", duration: "8.5s" },
  { left: "88%", top: "68%", size: 2.5, delay: "0.6s", duration: "11s" },
  { left: "12%", top: "88%", size: 2, delay: "1.8s", duration: "9s" },
  { left: "72%", top: "40%", size: 2, delay: "3s", duration: "7s" },
  { left: "35%", top: "48%", size: 2.5, delay: "0.2s", duration: "10s" },
  { left: "92%", top: "30%", size: 2, delay: "2.8s", duration: "8s" },
];

const MOBILE_COUNT = 6;

export default function GoldDust({ dense = false }) {
  const items = dense ? PARTICLES : PARTICLES.slice(0, MOBILE_COUNT);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-champagne/70 shadow-[0_0_6px_rgba(201,169,110,0.55)] animate-gold-dust"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
