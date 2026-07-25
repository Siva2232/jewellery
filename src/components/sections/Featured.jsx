import { createRef, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredPieces, brand } from "../../data/jewellery";
import {
  STORY_ANCHOR,
  bangleStoryAssets,
  bangleStoryCopy,
  bangleStoryGeometry,
} from "../../data/bangleStory";
import { formatPrice, scrollToId } from "../../utils/helpers";
import useBangleStory from "../../hooks/useBangleStory";

const { patch: PATCH, wrist: WRIST } = bangleStoryGeometry.portrait;
const { wall, story } = bangleStoryCopy;

/** Gold dust that travels with the flying pair. Purely decorative. */
const DUST = [
  { left: "6%", top: "22%", size: 3, delay: "0s", duration: "6s" },
  { left: "88%", top: "30%", size: 2, delay: "1.1s", duration: "7.5s" },
  { left: "18%", top: "72%", size: 2.5, delay: "0.5s", duration: "8s" },
  { left: "78%", top: "78%", size: 2, delay: "1.9s", duration: "6.5s" },
  { left: "48%", top: "8%", size: 2.5, delay: "0.8s", duration: "9s" },
  { left: "94%", top: "56%", size: 2, delay: "2.4s", duration: "7s" },
  { left: "2%", top: "50%", size: 2, delay: "1.4s", duration: "8.5s" },
  { left: "62%", top: "94%", size: 2.5, delay: "0.2s", duration: "7s" },
];

export default function Featured() {
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // One stable object so the story hook never re-runs on render.
  const refs = useRef({
    section: createRef(),
    stage: createRef(),
    decor: createRef(),
    story: createRef(),
    copy: createRef(),
    portraitBox: createRef(),
    portraitCam: createRef(),
    portraitBreath: createRef(),
    patch: createRef(),
    bloom: createRef(),
    burst: createRef(),
    sheen: createRef(),
    clone: createRef(),
    cloneGlow: createRef(),
    cloneDust: createRef(),
  }).current;

  useBangleStory({ refs, enabled: !reduce });

  const enquire = (name) =>
    `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      `Hi ${brand.name} — I'm interested in the ${name}.`
    )}`;

  const cls = {
    stage: reduce ? "relative" : "relative h-svh overflow-hidden",
    wall: reduce
      ? "relative flex flex-col"
      : "absolute inset-0 z-[3] flex flex-col px-5 pt-24 pb-6 md:px-8 lg:pt-28 lg:pb-10",
    grid: reduce
      ? "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      : "mt-6 grid min-h-0 flex-1 grid-cols-2 grid-rows-5 gap-2.5 lg:mt-10 lg:grid-cols-5 lg:grid-rows-2 lg:gap-4",
    frame: reduce ? "aspect-[4/5] w-full" : "h-full w-full",
    story: reduce
      ? "relative mt-24 grid items-center gap-12 lg:grid-cols-[0.95fr_1fr]"
      : "pointer-events-none absolute inset-0 z-[4]",
    portraitBox: reduce
      ? "relative order-1 mx-auto aspect-[1024/1536] w-full max-w-sm lg:order-2"
      : "absolute left-1/2 top-[5%] aspect-[1024/1536] h-[44%] -translate-x-1/2 lg:left-auto lg:right-[5%] lg:top-[54%] lg:h-[82%] lg:translate-x-0 lg:-translate-y-1/2",
    copy: reduce
      ? "order-2 lg:order-1"
      : "absolute inset-x-0 bottom-0 z-[2] px-6 pb-10 text-center lg:inset-x-auto lg:bottom-auto lg:left-[6%] lg:top-1/2 lg:max-w-md lg:-translate-y-1/2 lg:px-0 lg:pb-0 lg:text-left",
  };

  return (
    <section
      id="featured"
      ref={refs.section}
      className={`relative bg-porcelain ${reduce ? "section-pad" : ""}`}
    >
      <div ref={refs.stage} className={cls.stage}>
        {/* Backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#fbf9f6_0%,#f6f2ec_48%,#e6dfd4_100%)]"
        />
        <div ref={refs.decor} aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-champagne/12 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-champagne/10 blur-3xl" />
        </div>
        <div className="grain !opacity-[0.03]" />

        {/* ── The collection wall ─────────────────────────────────────────── */}
        <div className={cls.wall}>
          <div
            data-wall-chrome
            className="section-shell flex shrink-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="flex items-center gap-4">
                <p className="eyebrow">{wall.eyebrow}</p>
                <span className="h-px w-10 bg-champagne/60" />
                <span className="font-display text-sm tabular-nums text-champagne-deep">
                  {String(featuredPieces.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl lg:text-[3.1rem]">
                {wall.heading}
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-ink-muted md:text-sm lg:text-right">
              {wall.description}
            </p>
          </div>

          <div className={`section-shell ${cls.grid}`}>
            {featuredPieces.map((piece, i) => {
              const isStory = Boolean(piece.isStoryPiece);

              return (
                <article
                  key={piece.id}
                  data-wall-card
                  data-story-card={isStory || undefined}
                  className="group relative min-h-0"
                >
                  {isStory && (
                    <span
                      aria-hidden
                      className="animate-piece-glow pointer-events-none absolute -inset-4 -z-10 rounded-full bg-champagne/40 blur-2xl"
                    />
                  )}

                  <a
                    href={enquire(piece.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full overflow-hidden transition-[transform,box-shadow] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-26px_rgba(20,17,15,0.5)]"
                  >
                    <div
                      id={isStory ? STORY_ANCHOR : undefined}
                      data-story-frame={isStory || undefined}
                      className={`relative overflow-hidden bg-stone ${cls.frame}`}
                    >
                      {/* Hover zoom lives on a wrapper so the story's own
                          transforms on the image never fight with it. */}
                      <div className="absolute inset-0 transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]">
                        <img
                          data-story-image={isStory || undefined}
                          src={piece.image}
                          alt={piece.name}
                          loading={i < 5 ? "eager" : "lazy"}
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>

                      <div
                        data-card-chrome={isStory || undefined}
                        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20"
                      />

                      <div
                        data-card-chrome={isStory || undefined}
                        className="absolute inset-x-0 top-0 flex items-start justify-between p-3 lg:p-4"
                      >
                        <span className="font-display text-xs text-porcelain/75 lg:text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] tracking-[0.2em] text-porcelain/60 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:text-[9px]">
                          {piece.collection}
                        </span>
                      </div>

                      <div
                        data-card-chrome={isStory || undefined}
                        className="absolute inset-x-0 bottom-0 p-3 lg:p-4"
                      >
                        <h3 className="font-display text-sm leading-tight text-porcelain lg:text-lg">
                          {piece.name}
                        </h3>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="text-[10px] tabular-nums text-champagne-light lg:text-xs">
                            {formatPrice(piece.price)}
                          </p>
                          <ArrowUpRight
                            size={13}
                            strokeWidth={1.4}
                            className="translate-y-1 text-porcelain/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>

          {!reduce && (
            <p
              data-wall-chrome
              className="section-shell mt-4 shrink-0 text-center text-[10px] tracking-[0.28em] text-champagne-deep uppercase lg:mt-6"
            >
              Keep scrolling
            </p>
          )}
        </div>

        {/* ── The story ───────────────────────────────────────────────────── */}
        <div ref={refs.story} className={cls.story}>
          <div ref={refs.portraitBox} className={cls.portraitBox}>
            <div ref={refs.portraitCam} className="story-layer relative h-full w-full">
              <div ref={refs.portraitBreath} className="story-layer relative h-full w-full">
                <img
                  src={bangleStoryAssets.portrait}
                  alt="Model wearing the Meenaxi temple bangles"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Bare-wrist plate, pixel-aligned to the portrait. Fading this
                    out is what makes the bangles appear on her wrist. */}
                <img
                  ref={refs.patch}
                  src={bangleStoryAssets.wristBare}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className={`story-layer absolute ${reduce ? "opacity-0" : ""}`}
                  style={{
                    left: `${PATCH.left}%`,
                    top: `${PATCH.top}%`,
                    width: `${PATCH.width}%`,
                    height: `${PATCH.height}%`,
                  }}
                />

                <div
                  ref={refs.bloom}
                  aria-hidden
                  className="story-layer pointer-events-none absolute rounded-full bg-champagne-light/50 opacity-0 mix-blend-screen blur-2xl"
                  style={{ left: `${WRIST.x}%`, top: `${WRIST.y}%`, width: "26%", height: "18%" }}
                />
                <div
                  ref={refs.burst}
                  aria-hidden
                  className="story-layer pointer-events-none absolute rounded-full border border-champagne-light/45 opacity-0"
                  style={{ left: `${WRIST.x}%`, top: `${WRIST.y}%`, width: "14%", height: "10%" }}
                />

                {/* Reflection pass, clipped to the jewellery itself so it reads
                    as metal catching the light, not a flash across her arm. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute overflow-hidden rounded-full"
                  style={{
                    left: `${WRIST.x - 6.5}%`,
                    top: `${WRIST.y - 4.25}%`,
                    width: "13%",
                    height: "8.5%",
                  }}
                >
                  {/* Screen blend so it lifts the gold instead of painting the
                      skin white. */}
                  <div
                    ref={refs.sheen}
                    className="story-layer absolute -inset-y-1/2 left-0 w-1/3 bg-gradient-to-r from-transparent via-champagne-light/80 to-transparent opacity-0 mix-blend-screen"
                  />
                </div>
              </div>
            </div>
          </div>

          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[54%] bg-gradient-to-t from-porcelain via-porcelain/92 to-transparent lg:hidden"
            />
          )}

          <div ref={refs.copy} className={cls.copy}>
            <p data-story-copy className="eyebrow">
              {story.eyebrow}
            </p>
            <h2
              data-story-copy
              className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-ink text-balance sm:text-4xl lg:text-[3.4rem]"
            >
              {story.heading}
            </h2>
            <p
              data-story-copy
              className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted lg:mt-6 lg:text-base"
            >
              {story.paragraph}
            </p>
            <div
              data-story-copy
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:mt-10 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => scrollToId(story.primaryCta.href)}
                className="btn-luxe-fill pointer-events-auto min-w-[11rem]"
              >
                {story.primaryCta.label}
              </button>
              <button
                type="button"
                onClick={() => scrollToId(story.secondaryCta.href)}
                className="btn-luxe-ghost pointer-events-auto min-w-[11rem]"
              >
                {story.secondaryCta.label}
              </button>
            </div>
            <p
              data-story-copy
              className="mt-6 hidden text-[10px] tracking-[0.26em] text-champagne-deep uppercase sm:block lg:mt-8"
            >
              {story.caption}
            </p>
          </div>
        </div>
      </div>

      {/* ── The flying pair ─────────────────────────────────────────────────
          Lives outside the clipped stage. Position and size are written once
          from the card's measured rect; the flight is transform only. */}
      {!reduce && (
        <div
          ref={refs.clone}
          aria-hidden
          className="story-layer pointer-events-none fixed top-0 left-0 z-[60] opacity-0"
        >
          <div
            ref={refs.cloneGlow}
            className="pointer-events-none absolute -inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(221,196,154,0.5),rgba(201,169,110,0.16)_45%,transparent_70%)] opacity-0 blur-xl"
          />
          <img
            src={bangleStoryAssets.cutout}
            alt=""
            decoding="async"
            className="relative h-full w-full object-contain drop-shadow-[0_26px_48px_rgba(120,92,42,0.45)]"
          />
          <div
            ref={refs.cloneDust}
            className="pointer-events-none absolute -inset-[32%] opacity-0 motion-reduce:hidden"
          >
            {DUST.map((d, i) => (
              <span
                key={i}
                className="animate-gold-dust absolute rounded-full bg-champagne-light/80 shadow-[0_0_7px_rgba(221,196,154,0.8)]"
                style={{
                  left: d.left,
                  top: d.top,
                  width: d.size,
                  height: d.size,
                  animationDelay: d.delay,
                  animationDuration: d.duration,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
