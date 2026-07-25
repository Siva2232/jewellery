import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { bangleStoryGeometry } from "../data/bangleStory";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const { cutout: CUT, product: PRODUCT, portrait: FRAME, landing: LANDING } =
  bangleStoryGeometry;

/**
 * Phase boundaries on a 0-100 timeline. Named so the scroll story reads the
 * same way it was designed rather than as a pile of magic numbers.
 */
const P = {
  hold: 0,
  dissolve: 6, // 2  the other nine fade away
  handoff: 20, // 3  shared element: clone takes over from the card
  reveal: 24, // 4  the pair lifts to centre stage
  girl: 32, // 5  the model enters from the right
  copy: 38, // 6  headline and CTAs rise, jewellery makes room
  travel: 52, // 7  curved flight toward the wrist
  anticipate: 68, // 8  the portrait breathes in anticipation
  settle: 78, // 9  rotation and scale lock to the wrist
  swap: 84, // 10 clone out, worn bangles in
  finish: 88, // 11 sheen, bloom, camera pull-back
  release: 97, // 12 hold, then hand scrolling back
  end: 100,
};

/**
 * Where the bangles land on screen when the card paints its product photo with
 * `object-cover`. Returns a viewport-space box for the transparent cutout so it
 * can be dropped exactly on top of the pixels the card is already showing.
 */
function cloneBoxOverCard(rect) {
  const a = PRODUCT.aspect; // source width / height
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

/**
 * A bowed cubic between two poses, always arcing upward so the jewellery reads
 * as weightless rather than thrown.
 *
 * Points are absolute x/y transform values, not deltas: MotionPathPlugin's
 * `relative` option accumulates each point against the previous one, which
 * compounds an offset-from-start path into a large overshoot.
 */
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
  const bow = Math.min(len * 0.3, maxBow);
  const at = (along, out) => ({
    x: from.x + dx * along + nx * bow * out,
    y: from.y + dy * along + ny * bow * out,
  });

  return [at(0, 0), at(0.2, 0.6), at(0.5, 1), at(0.78, 0.45), at(1, 0)];
}

/**
 * Drives the pinned collection-wall-to-worn-bangles story.
 *
 * The jewellery is never animated inside the card. Instead the card's rect is
 * measured, a fixed-position cutout is parked exactly over it, the card's own
 * image is hidden, and from then on only transform and opacity are touched.
 */
export default function useBangleStory({ refs, enabled }) {
  // Every offset in the timeline is measured in pixels, so a material viewport
  // change has to rebuild it rather than just refresh ScrollTrigger.
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let timer;

    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Mobile browser chrome collapsing changes height constantly; only a
        // real relayout should cost us a rebuild.
        if (Math.abs(window.innerWidth - w) > 40 || Math.abs(window.innerHeight - h) > 140) {
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
    if (!section || !stage || !clone || !portraitBox) return undefined;

    const ctx = gsap.context(() => {
      const cardFrame = stage.querySelector("[data-story-frame]");
      const cardImage = stage.querySelector("[data-story-image]");
      const otherCards = stage.querySelectorAll("[data-wall-card]:not([data-story-card])");
      const chrome = stage.querySelectorAll("[data-wall-chrome]");
      const cardChrome = stage.querySelectorAll("[data-card-chrome]");
      const copyItems = refs.copy.current?.querySelectorAll("[data-story-copy]");
      if (!cardFrame || !cardImage) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const desktop = vw >= 1024;

      // Everything is measured relative to the stage. While pinned the stage
      // sits flush with the viewport, so stage-local coordinates and the fixed
      // coordinates the clone lives in are the same thing.
      const stageRect = stage.getBoundingClientRect();
      const toStage = (rect) => ({
        left: rect.left - stageRect.left,
        top: rect.top - stageRect.top,
        width: rect.width,
        height: rect.height,
      });

      const base = cloneBoxOverCard(toStage(cardFrame.getBoundingClientRect()));
      const frame = toStage(portraitBox.getBoundingClientRect());

      // Park the clone. left/top/width/height are written once, up front, and
      // never tweened — the flight itself is pure transform.
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
        transformOrigin: "50% 50%",
      });

      const baseCenter = {
        x: base.left + base.width / 2,
        y: base.top + base.height / 2,
      };

      /** A pose expressed as the transform needed to centre the clone on a point. */
      const pose = (cx, cy, width) => ({
        x: cx - baseCenter.x,
        y: cy - baseCenter.y,
        scale: width / base.width,
      });

      // Centre stage, while the model is still off screen.
      const hero = pose(
        vw * 0.5,
        vh * (desktop ? 0.44 : 0.3),
        Math.min(vh * 0.3, vw * (desktop ? 0.19 : 0.42))
      );
      // Where it waits once she has arrived — clear of both her and the copy.
      const waiting = desktop
        ? pose(vw * 0.46, vh * 0.47, Math.min(vh * 0.24, vw * 0.15))
        : pose(vw * 0.22, vh * 0.155, Math.min(vh * 0.16, vw * 0.3));

      const landing = pose(
        frame.left + (frame.width * FRAME.wrist.x) / 100,
        frame.top + (frame.height * FRAME.wrist.y) / 100,
        (frame.width * LANDING.widthPct) / 100
      );

      const path = arcPath(waiting, landing, vh * 0.26);

      gsap.set([refs.bloom.current, refs.burst.current], {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      });
      gsap.set(refs.story.current, { autoAlpha: 0 });
      // She enters very slightly oversized so the finale's pull-back can settle
      // on the natural framing rather than shrinking below it.
      gsap.set(refs.portraitCam.current, {
        autoAlpha: 0,
        x: desktop ? 250 : 140,
        scale: 1.05,
      });
      gsap.set(copyItems, { autoAlpha: 0, y: 34 });
      gsap.set([refs.cloneGlow.current, refs.cloneDust.current], { autoAlpha: 0 });
      // GSAP owns the sheen's whole transform, so its tilt is set here rather
      // than in a class that a tween would overwrite.
      gsap.set(refs.sheen.current, { xPercent: -180, rotation: 16, autoAlpha: 0 });

      // Idle life on the tenth card. Scale and rotation only, both about the
      // centre, so the measured rect stays truthful.
      const pulse = gsap
        .timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
        .to(cardImage, { scale: 1.022, rotation: -0.5, duration: 3.2 });

      const breath = gsap
        .timeline({ repeat: -1, yoyo: true, paused: true })
        .to(refs.portraitBreath.current, {
          scale: 1.006,
          duration: 4.5,
          ease: "sine.inOut",
        });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${vh * (desktop ? 5.2 : 4.4)}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => breath.pause(),
          onEnterBack: () => breath.play(),
        },
      });

      // ── Phase 1 · hold ────────────────────────────────────────────────────
      tl.to({ v: 0 }, { v: 1, duration: P.dissolve });

      // ── Phase 2 · the other nine dissolve ─────────────────────────────────
      tl.to(
        otherCards,
        {
          autoAlpha: 0,
          y: -28,
          scale: 0.965,
          duration: 8,
          stagger: { each: 0.55, from: "random" },
        },
        P.dissolve
      );
      tl.to(chrome, { autoAlpha: 0, y: -26, duration: 8 }, P.dissolve);
      tl.to(refs.decor.current, { autoAlpha: 0, duration: 10 }, P.dissolve);
      // Strip the tenth card back to just its photograph, so the handoff has
      // nothing but jewellery to trade.
      tl.to(cardChrome, { autoAlpha: 0, duration: 6 }, 13);
      // Settle its idle motion to exactly rest, so the clone can be parked on
      // it without a jump.
      tl.to(pulse, { progress: 0, timeScale: 0, duration: 5, ease: "power2.out" }, 13);

      // ── Phase 3 · shared element handoff ──────────────────────────────────
      tl.set(clone, { autoAlpha: 1 }, P.handoff);
      tl.set(cardImage, { autoAlpha: 0 }, P.handoff);
      tl.to(cardFrame, { autoAlpha: 0, duration: 5 }, P.handoff + 1);

      // ── Phase 4 · product reveal, centre stage ────────────────────────────
      tl.to(clone, { rotation: -8, duration: 4, ease: "power2.out" }, P.reveal);
      tl.to(
        clone,
        { x: hero.x, y: hero.y, scale: hero.scale, duration: 13, ease: "power2.out" },
        P.reveal
      );
      tl.to(clone, { rotation: 8, duration: 10, ease: "sine.inOut" }, P.reveal + 4);
      tl.to(refs.cloneGlow.current, { autoAlpha: 1, duration: 7 }, P.reveal);
      tl.to(refs.cloneDust.current, { autoAlpha: 1, duration: 8 }, P.reveal + 3);

      // ── Phase 5 · the model enters ────────────────────────────────────────
      tl.to(refs.story.current, { autoAlpha: 1, duration: 6 }, P.girl);
      tl.to(
        refs.portraitCam.current,
        { autoAlpha: 1, x: 0, duration: 17, ease: "power3.out" },
        P.girl
      );
      tl.add(() => breath.play(), P.girl + 8);

      // ── Phase 6 · luxury content, and the pair makes room for her ─────────
      tl.to(
        copyItems,
        { autoAlpha: 1, y: 0, duration: 9, stagger: 2, ease: "power2.out" },
        P.copy
      );
      tl.to(
        clone,
        {
          x: waiting.x,
          y: waiting.y,
          scale: waiting.scale,
          rotation: 2,
          duration: 13,
          ease: "power2.inOut",
        },
        P.copy
      );

      // ── Phase 7 · curved travel to the wrist ──────────────────────────────
      tl.to(
        clone,
        { motionPath: { path, curviness: 1.4 }, duration: 28, ease: "power1.inOut" },
        P.travel
      );
      tl.to(clone, { scale: landing.scale, duration: 28, ease: "power2.inOut" }, P.travel);
      tl.to(
        clone,
        { rotation: LANDING.rotation, duration: 24, ease: "power2.inOut" },
        P.travel + 2
      );
      // Motion blur while it is moving fastest, gone before it lands.
      tl.to(clone, { filter: "blur(1.4px)", duration: 7 }, P.travel + 3);
      tl.to(clone, { filter: "blur(0px)", duration: 11 }, P.travel + 15);

      // ── Phase 8 · anticipation in the portrait ────────────────────────────
      tl.to(
        refs.portraitBreath.current,
        { y: -vh * 0.006, duration: 7, ease: "power2.out" },
        P.anticipate
      );
      tl.to(refs.bloom.current, { autoAlpha: 0.7, scale: 1.15, duration: 9 }, P.anticipate + 2);

      // ── Phase 9 · lock to the wrist ───────────────────────────────────────
      tl.to(refs.portraitBreath.current, { y: 0, duration: 8, ease: "power2.inOut" }, P.settle);
      tl.to(clone, { rotation: LANDING.rotation, scale: landing.scale, duration: 6 }, P.settle);

      // ── Phase 10 · the invisible swap ─────────────────────────────────────
      // The clone leaves exactly as the bare-wrist patch does, uncovering the
      // bangles that were already painted into the portrait.
      tl.to(clone, { autoAlpha: 0, duration: 4, ease: "power2.in" }, P.swap);
      tl.to(refs.patch.current, { autoAlpha: 0, duration: 4, ease: "power2.inOut" }, P.swap);
      tl.to([refs.cloneGlow.current, refs.cloneDust.current], { autoAlpha: 0, duration: 4 }, P.swap);

      // ── Phase 11 · luxury finish ──────────────────────────────────────────
      tl.to(refs.burst.current, { autoAlpha: 1, scale: 1.5, duration: 4 }, P.finish - 2);
      tl.to(refs.burst.current, { autoAlpha: 0, scale: 2.3, duration: 6 }, P.finish + 2);
      tl.to(refs.sheen.current, { autoAlpha: 1, duration: 2 }, P.finish);
      tl.to(refs.sheen.current, { xPercent: 380, duration: 9, ease: "power2.inOut" }, P.finish);
      tl.to(refs.sheen.current, { autoAlpha: 0, duration: 3 }, P.finish + 6);
      tl.to(refs.bloom.current, { autoAlpha: 0, scale: 1.7, duration: 11 }, P.finish + 1);
      tl.to(refs.portraitCam.current, { scale: 1, duration: 13, ease: "power2.out" }, P.finish);

      // ── Phase 12 · hold, then release ─────────────────────────────────────
      tl.to({ v: 0 }, { v: 1, duration: P.end - P.release }, P.release);
    }, section);

    return () => ctx.revert();
  }, [refs, enabled, nonce]);
}
