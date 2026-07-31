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

const WRIST = bangleStoryGeometry.portrait?.wrist ?? {
  x: (400 / 1024) * 100,
  y: (900 / 1536) * 100,
};
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

  const refs = useRef({
    section: createRef(),
    stage: createRef(),
    decor: createRef(),
    story: createRef(),
    copy: createRef(),
    portraitBox: createRef(),
    portraitCam: createRef(),
    portraitBreath: createRef(),
    portraitWorn: createRef(),
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
      : "absolute inset-0 z-[3] flex flex-col px-4 pt-20 pb-4 md:px-6 lg:px-8 lg:pt-16 lg:pb-5 xl:px-10",
    grid: reduce
      ? "mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5"
      : "mt-4 grid min-h-0 flex-1 grid-cols-4 grid-rows-5 gap-2 sm:gap-2.5 md:mt-5 md:grid-cols-5 md:grid-rows-4 md:gap-3 lg:mt-5 lg:gap-4 xl:gap-5",
    frame: reduce ? "aspect-[4/5] w-full" : "h-full w-full",
    story: reduce
      ? "section-shell relative mt-24 grid items-center gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-16"
      : "pointer-events-none absolute inset-0 z-[4]",
    portraitBox: reduce
      ? "relative order-1 mx-auto aspect-[1024/1536] w-full max-w-sm overflow-hidden ring-1 ring-champagne/25 lg:order-2 lg:max-w-md"
      : "absolute left-1/2 top-[5%] aspect-[1024/1536] h-[44%] -translate-x-1/2 overflow-hidden ring-1 ring-ink/[0.06] lg:left-auto lg:right-[4%] lg:top-[54%] lg:h-[84%] lg:translate-x-0 lg:-translate-y-1/2 lg:ring-champagne/20",
    copy: reduce
      ? "order-2 lg:order-1"
      : "absolute inset-x-0 bottom-0 z-[2] px-6 pb-10 text-center lg:inset-x-auto lg:bottom-auto lg:left-[5%] lg:top-1/2 lg:max-w-[26rem] lg:-translate-y-1/2 lg:px-0 lg:pb-0 lg:text-left xl:left-[7%] xl:max-w-md",
  };

  return (
    <section
      id="featured"
      ref={refs.section}
      className={`relative overflow-hidden bg-porcelain ${reduce ? "section-pad" : ""}`}
    >
      <div ref={refs.stage} className={cls.stage}>
        {/* Atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,#fbf9f6_0%,#f6f2ec_42%,#e8e0d4_100%)]"
        />
        <div
          ref={refs.decor}
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-champagne/14 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-champagne/10 blur-3xl" />
          <div className="absolute top-1/3 left-[8%] hidden h-px w-24 bg-gradient-to-r from-transparent via-champagne/40 to-transparent lg:block" />
        </div>
        <div className="grain !opacity-[0.04]" />

        {/* ── Collection wall ─────────────────────────────────────────────── */}
        <div className={cls.wall}>
          <div
            data-wall-chrome
            className="mx-auto flex w-full max-w-[100rem] shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-4">
                <p className="eyebrow">{wall.eyebrow}</p>
                <span className="h-px w-12 bg-gradient-to-r from-champagne/70 to-transparent" />
                <span className="font-display text-sm tabular-nums tracking-wide text-champagne-deep">
                  {String(featuredPieces.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-2.5 font-display text-3xl tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] xl:text-[3.1rem]">
                {wall.heading}
              </h2>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-ink-muted md:text-sm lg:max-w-[16rem] lg:text-right lg:leading-relaxed">
              {wall.description}
            </p>
          </div>

          <div className={`mx-auto w-full max-w-[100rem] ${cls.grid}`}>
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
                      className="animate-piece-glow pointer-events-none absolute -inset-5 -z-10 rounded-full bg-champagne/35 blur-2xl"
                    />
                  )}

                  <a
                    href={enquire(piece.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full overflow-hidden bg-stone transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(20,17,15,0.45)]"
                  >
                    <div
                      id={isStory ? STORY_ANCHOR : undefined}
                      data-story-frame={isStory || undefined}
                      className={`relative overflow-hidden ${cls.frame}`}
                    >
                      <div className="absolute inset-0 transition-transform duration-[1.25s] ease-out group-hover:scale-[1.05]">
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
                        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/10 transition-opacity duration-500 group-hover:via-ink/25"
                      />

                      {/* Thin champagne edge on hover */}
                      <div
                        data-card-chrome={isStory || undefined}
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-champagne/35 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div
                        data-card-chrome={isStory || undefined}
                        className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5 lg:p-3.5 xl:p-4"
                      >
                        <span className="font-display text-xs text-porcelain/70 lg:text-sm xl:text-base">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] tracking-[0.2em] text-champagne-light/80 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:text-[9px]">
                          {piece.collection}
                        </span>
                      </div>

                      <div
                        data-card-chrome={isStory || undefined}
                        className="absolute inset-x-0 bottom-0 p-2.5 transition-transform duration-500 group-hover:-translate-y-0.5 lg:p-3.5 xl:p-4"
                      >
                        {isStory && (
                          <span className="mb-1.5 inline-block text-[8px] tracking-[0.22em] text-champagne-light uppercase lg:text-[9px]">
                            Signature story
                          </span>
                        )}
                        <h3 className="font-display text-[0.95rem] leading-tight text-porcelain sm:text-base lg:text-lg xl:text-xl">
                          {piece.name}
                        </h3>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <p className="text-[10px] tabular-nums tracking-wide text-champagne-light/90 lg:text-xs xl:text-sm">
                            {formatPrice(piece.price)}
                          </p>
                          <span className="flex items-center gap-1 text-[9px] tracking-[0.16em] text-porcelain/55 uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                            Enquire
                            <ArrowUpRight
                              size={12}
                              strokeWidth={1.4}
                              className="translate-y-0.5"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>

          {!reduce && (
            <div
              data-wall-chrome
              className="mx-auto mt-3 flex w-full max-w-[100rem] shrink-0 flex-col items-center gap-2 lg:mt-4"
            >
              <span className="h-5 w-px bg-gradient-to-b from-champagne/50 to-transparent lg:h-6" />
              <p className="text-[10px] tracking-[0.3em] text-champagne-deep uppercase">
                Keep scrolling
              </p>
            </div>
          )}
        </div>

        {/* ── Story stage ─────────────────────────────────────────────────── */}
        <div ref={refs.story} className={cls.story}>
          <div ref={refs.portraitBox} className={cls.portraitBox}>
            <div
              ref={refs.portraitCam}
              className="story-layer relative h-full w-full"
            >
              <div
                ref={refs.portraitBreath}
                className="story-layer relative h-full w-full"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={bangleStoryAssets.portrait}
                    alt="Model with an empty wrist, ready for the bangles"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
                  />

                  <img
                    ref={refs.portraitWorn}
                    src={bangleStoryAssets.portraitWorn}
                    alt="Model wearing the Meenaxi temple bangles"
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover object-[center_28%] will-change-[opacity,transform] ${
                      reduce ? "" : "opacity-0"
                    }`}
                  />

                  {/* Soft vignette on portrait */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-ink/10"
                  />

                  <div
                    ref={refs.bloom}
                    aria-hidden
                    className="story-layer pointer-events-none absolute rounded-full bg-champagne-light/50 opacity-0 mix-blend-screen blur-2xl"
                    style={{
                      left: `${WRIST.x}%`,
                      top: `${WRIST.y}%`,
                      width: "26%",
                      height: "18%",
                    }}
                  />
                  <div
                    ref={refs.burst}
                    aria-hidden
                    className="story-layer pointer-events-none absolute rounded-full border border-champagne-light/45 opacity-0"
                    style={{
                      left: `${WRIST.x}%`,
                      top: `${WRIST.y}%`,
                      width: "14%",
                      height: "10%",
                    }}
                  />

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
                    <div
                      ref={refs.sheen}
                      className="story-layer absolute -inset-y-1/2 left-0 w-1/3 bg-gradient-to-r from-transparent via-champagne-light/80 to-transparent opacity-0 mix-blend-screen"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[52%] bg-gradient-to-t from-porcelain via-porcelain/90 to-transparent lg:hidden"
            />
          )}

          <div ref={refs.copy} className={cls.copy}>
            <div data-story-copy className="flex items-center justify-center gap-3 lg:justify-start">
              <p className="eyebrow">{story.eyebrow}</p>
              <span className="hidden h-px w-8 bg-champagne/50 lg:block" />
            </div>
            <h2
              data-story-copy
              className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-ink text-balance sm:text-4xl lg:text-[3.35rem]"
            >
              {story.heading}
            </h2>
            <div
              data-story-copy
              className="gold-hairline mx-auto mt-6 w-16 origin-center lg:mx-0 lg:origin-left"
            />
            <p
              data-story-copy
              className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted lg:mt-6 lg:text-[15px]"
            >
              {story.paragraph}
            </p>
            <div
              data-story-copy
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:mt-10 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => scrollToId(story.primaryCta.href)}
                className="btn-luxe-fill pointer-events-auto min-w-[11.5rem]"
              >
                {story.primaryCta.label}
              </button>
              <button
                type="button"
                onClick={() => scrollToId(story.secondaryCta.href)}
                className="btn-luxe-ghost pointer-events-auto min-w-[11.5rem]"
              >
                {story.secondaryCta.label}
              </button>
            </div>
            <p
              data-story-copy
              className="mt-7 hidden text-[10px] tracking-[0.28em] text-champagne-deep uppercase sm:block lg:mt-9"
            >
              {story.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Flying pair — measured & driven by GSAP */}
      {!reduce && (
        <div
          ref={refs.clone}
          aria-hidden
          className="story-layer pointer-events-none fixed top-0 left-0 z-[60] opacity-0"
        >
          <div
            ref={refs.cloneGlow}
            className="pointer-events-none absolute -inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(221,196,154,0.55),rgba(201,169,110,0.18)_45%,transparent_70%)] opacity-0 blur-xl"
          />
          <img
            src={bangleStoryAssets.cutout}
            alt=""
            decoding="async"
            className="relative h-full w-full object-contain drop-shadow-[0_28px_52px_rgba(120,92,42,0.5)]"
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
