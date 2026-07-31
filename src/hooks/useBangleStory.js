import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { bangleStoryGeometry } from "../data/bangleStory";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const { cutout: CUT, product: PRODUCT, portrait: FRAME, landing: LANDING } =
  bangleStoryGeometry;

/**
 * Phase boundaries on a 0–100 scrub timeline.
 * Empty wrist is held long enough to read, then the pair flies in and
 * dissolves into out.png.
 */
const P = {
  hold: 0,
  dissolve: 5,
  handoff: 16,
  reveal: 20,
  girl: 28,
  copy: 34,
  travel: 46,
  settle: 72,
  merge: 78, // clone → out.png crossfade
  finish: 88,
  release: 96,
  end: 100,
};

function cloneBoxOverCard(rect) {
  const a = PRODUCT.aspect;
  const scale = Math.max(rect.width, rect.height * a);
  const offsetX = (rect.width - scale) / 2;
  const offsetY = (rect.height - scale / a) / 2;

  return {
    left: rect.left + offsetX + CUT.x * scale,
    top: rect.top + offsetY + (CUT.y / a) * scale,
    width: CUT.w * scale,
    height: (CUT.h / a) * scale,
  };
}

/** Upward-bowed cubic so the jewellery reads as floating, not thrown. */
function arcPath(from, to, maxBow) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bow = Math.min(len * 0.34, maxBow);
  const at = (along, out) => ({
    x: from.x + dx * along + nx * bow * out,
    y: from.y + dy * along + ny * bow * out,
  });

  return [at(0, 0), at(0.18, 0.55), at(0.48, 1), at(0.78, 0.4), at(1, 0)];
}

/**
 * Pinned wall → flying pair → empty wrist → out.png finale.
 */
export default function useBangleStory({ refs, enabled }) {
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let timer;

    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (
          Math.abs(window.innerWidth - w) > 40 ||
          Math.abs(window.innerHeight - h) > 140
        ) {
          w = window.innerWidth;
          h = window.innerHeight;
          setNonce((n) => n + 1);
        }
      }, 220);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    const section = refs.section.current;
    const stage = refs.stage.current;
    const clone = refs.clone.current;
    const portraitBox = refs.portraitBox.current;
    const worn = refs.portraitWorn?.current;
    if (!section || !stage || !clone || !portraitBox) return undefined;

    const ctx = gsap.context(() => {
      const cardFrame = stage.querySelector("[data-story-frame]");
      const cardImage = stage.querySelector("[data-story-image]");
      const otherCards = stage.querySelectorAll(
        "[data-wall-card]:not([data-story-card])"
      );
      const chrome = stage.querySelectorAll("[data-wall-chrome]");
      const cardChrome = stage.querySelectorAll("[data-card-chrome]");
      const copyItems = refs.copy.current?.querySelectorAll("[data-story-copy]");
      if (!cardFrame || !cardImage) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const desktop = vw >= 1024;

      const stageRect = stage.getBoundingClientRect();
      const toStage = (rect) => ({
        left: rect.left - stageRect.left,
        top: rect.top - stageRect.top,
        width: rect.width,
        height: rect.height,
      });

      const base = cloneBoxOverCard(toStage(cardFrame.getBoundingClientRect()));
      const frame = toStage(portraitBox.getBoundingClientRect());

      gsap.set(clone, {
        left: base.left,
        top: base.top,
        width: base.width,
        height: base.height,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 0,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const baseCenter = {
        x: base.left + base.width / 2,
        y: base.top + base.height / 2,
      };

      const pose = (cx, cy, width) => ({
        x: cx - baseCenter.x,
        y: cy - baseCenter.y,
        scale: width / base.width,
      });

      const hero = pose(
        vw * 0.5,
        vh * (desktop ? 0.42 : 0.28),
        Math.min(vh * 0.32, vw * (desktop ? 0.2 : 0.44))
      );
      const waiting = desktop
        ? pose(vw * 0.45, vh * 0.46, Math.min(vh * 0.22, vw * 0.14))
        : pose(vw * 0.2, vh * 0.15, Math.min(vh * 0.15, vw * 0.28));

      const landing = pose(
        frame.left + (frame.width * FRAME.wrist.x) / 100,
        frame.top + (frame.height * FRAME.wrist.y) / 100,
        (frame.width * LANDING.widthPct) / 100
      );

      const path = arcPath(waiting, landing, vh * 0.3);

      gsap.set([refs.bloom.current, refs.burst.current], {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.85,
      });
      gsap.set(refs.story.current, { autoAlpha: 0 });
      gsap.set(refs.portraitCam.current, {
        autoAlpha: 0,
        x: desktop ? 220 : 120,
        scale: 1.06,
      });
      if (worn) {
        gsap.set(worn, { autoAlpha: 0, scale: 1.03 });
      }
      gsap.set(copyItems, { autoAlpha: 0, y: 40 });
      gsap.set([refs.cloneGlow.current, refs.cloneDust.current], { autoAlpha: 0 });
      gsap.set(refs.sheen.current, {
        xPercent: -180,
        rotation: 16,
        autoAlpha: 0,
      });

      const pulse = gsap
        .timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
        .to(cardImage, { scale: 1.02, rotation: -0.4, duration: 3.4 });

      const breath = gsap
        .timeline({ repeat: -1, yoyo: true, paused: true })
        .to(refs.portraitBreath.current, {
          scale: 1.008,
          duration: 5,
          ease: "sine.inOut",
        });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${vh * (desktop ? 6.2 : 5.2)}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => breath.pause(),
          onEnterBack: () => breath.play(),
        },
      });

      // ── 1 · hold the wall ─────────────────────────────────────────────────
      tl.to({ v: 0 }, { v: 1, duration: P.dissolve });

      // ── 2 · other pieces dissolve ─────────────────────────────────────────
      tl.to(
        otherCards,
        {
          autoAlpha: 0,
          y: -32,
          scale: 0.96,
          duration: 9,
          stagger: { each: 0.5, from: "random" },
          ease: "power2.out",
        },
        P.dissolve
      );
      tl.to(
        chrome,
        { autoAlpha: 0, y: -22, duration: 8, ease: "power2.out" },
        P.dissolve
      );
      tl.to(refs.decor.current, { autoAlpha: 0, duration: 10 }, P.dissolve);
      tl.to(cardChrome, { autoAlpha: 0, duration: 6, ease: "power2.out" }, 12);
      tl.to(
        pulse,
        { progress: 0, timeScale: 0, duration: 5, ease: "power2.out" },
        12
      );

      // ── 3 · shared-element handoff ────────────────────────────────────────
      tl.set(clone, { autoAlpha: 1 }, P.handoff);
      tl.set(cardImage, { autoAlpha: 0 }, P.handoff);
      tl.to(cardFrame, { autoAlpha: 0, duration: 5, ease: "power2.out" }, P.handoff + 1);

      // ── 4 · hero reveal ───────────────────────────────────────────────────
      tl.to(clone, { rotation: -10, duration: 5, ease: "power2.out" }, P.reveal);
      tl.to(
        clone,
        {
          x: hero.x,
          y: hero.y,
          scale: hero.scale,
          duration: 14,
          ease: "power3.out",
        },
        P.reveal
      );
      tl.to(clone, { rotation: 6, duration: 10, ease: "sine.inOut" }, P.reveal + 5);
      tl.to(
        refs.cloneGlow.current,
        { autoAlpha: 1, duration: 8, ease: "power2.out" },
        P.reveal
      );
      tl.to(
        refs.cloneDust.current,
        { autoAlpha: 1, duration: 9, ease: "power2.out" },
        P.reveal + 3
      );

      // ── 5 · empty-hand model enters ───────────────────────────────────────
      tl.to(
        refs.story.current,
        { autoAlpha: 1, duration: 7, ease: "power2.out" },
        P.girl
      );
      tl.to(
        refs.portraitCam.current,
        { autoAlpha: 1, x: 0, duration: 18, ease: "power3.out" },
        P.girl
      );
      tl.add(() => breath.play(), P.girl + 8);

      // ── 6 · copy rises, jewellery makes room ──────────────────────────────
      tl.to(
        copyItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 10,
          stagger: 1.8,
          ease: "power2.out",
        },
        P.copy
      );
      tl.to(
        clone,
        {
          x: waiting.x,
          y: waiting.y,
          scale: waiting.scale,
          rotation: 3,
          duration: 14,
          ease: "power2.inOut",
        },
        P.copy
      );

      // ── 7 · silk flight onto the empty wrist ──────────────────────────────
      tl.to(
        clone,
        {
          motionPath: { path, curviness: 1.5 },
          duration: 30,
          ease: "power1.inOut",
        },
        P.travel
      );
      tl.to(
        clone,
        { scale: landing.scale, duration: 30, ease: "power2.inOut" },
        P.travel
      );
      tl.to(
        clone,
        {
          rotation: LANDING.rotation,
          duration: 26,
          ease: "power2.inOut",
        },
        P.travel + 2
      );
      // Soft motion trail — never harsh.
      tl.to(clone, { filter: "blur(1px)", duration: 8, ease: "sine.out" }, P.travel + 4);
      tl.to(
        clone,
        { filter: "blur(0px)", duration: 12, ease: "power2.out" },
        P.travel + 16
      );

      // ── 8 · settle on wrist (hold so clone fully covers the handoff) ──────
      tl.to(
        refs.portraitBreath.current,
        { y: -vh * 0.004, duration: 5, ease: "power2.out" },
        P.settle
      );
      tl.to(
        refs.bloom.current,
        { autoAlpha: 0.55, scale: 1.12, duration: 7, ease: "power2.out" },
        P.settle
      );
      tl.to(
        refs.portraitBreath.current,
        { y: 0, duration: 6, ease: "power2.inOut" },
        P.settle + 2
      );
      tl.to(
        clone,
        {
          rotation: LANDING.rotation,
          scale: landing.scale,
          duration: 8,
          ease: "power2.out",
        },
        P.settle
      );
      // Brief hold on the wrist before revealing out.png underneath.
      tl.to({ v: 0 }, { v: 1, duration: 3 }, P.settle + 4);

      // ── 9 · reveal exact out.png under the clone, then dissolve clone ─────
      // Pose swap is hidden while the pair still covers the wrist — final
      // frame is the real out.png, synced to where the clone parked.
      if (worn) {
        tl.set(worn, { autoAlpha: 1, scale: 1 }, P.merge);
      }
      tl.to(
        clone,
        {
          autoAlpha: 0,
          scale: landing.scale * 0.97,
          duration: 8,
          ease: "power2.inOut",
        },
        P.merge + 1
      );
      tl.to(
        [refs.cloneGlow.current, refs.cloneDust.current],
        { autoAlpha: 0, duration: 6, ease: "power2.in" },
        P.merge + 1
      );
      tl.to(
        refs.burst.current,
        { autoAlpha: 0.7, scale: 1.2, duration: 3, ease: "power2.out" },
        P.merge
      );
      tl.to(
        refs.burst.current,
        { autoAlpha: 0, scale: 1.65, duration: 6, ease: "power2.out" },
        P.merge + 3
      );

      // ── 10 · luxury finish on out.png ─────────────────────────────────────
      tl.to(refs.sheen.current, { autoAlpha: 1, duration: 2 }, P.finish);
      tl.to(
        refs.sheen.current,
        { xPercent: 380, duration: 10, ease: "power2.inOut" },
        P.finish
      );
      tl.to(refs.sheen.current, { autoAlpha: 0, duration: 3 }, P.finish + 7);
      tl.to(
        refs.bloom.current,
        { autoAlpha: 0, scale: 1.55, duration: 10, ease: "power2.out" },
        P.finish + 1
      );
      tl.to(
        refs.portraitCam.current,
        { scale: 1, duration: 14, ease: "power2.out" },
        P.finish
      );

      // ── 11 · hold, then release ───────────────────────────────────────────
      tl.to({ v: 0 }, { v: 1, duration: P.end - P.release }, P.release);
    }, section);

    return () => ctx.revert();
  }, [refs, enabled, nonce]);
}
