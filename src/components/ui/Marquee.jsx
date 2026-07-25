const items = [
  "Bridal",
  "·",
  "Festive",
  "·",
  "Everyday Luxury",
  "·",
  "Temple Craft",
  "·",
  "Hand Finished",
  "·",
  "Quiet Opulence",
  "·",
];

export default function Marquee() {
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-stone/30 py-5 md:py-6">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap px-4">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`text-[12px] tracking-[0.28em] uppercase ${
              item === "·" ? "text-champagne" : "text-ink-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
