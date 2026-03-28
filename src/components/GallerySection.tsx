import { useRef, useEffect, useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import shopConfig from "@/config/shopConfig";

const images = shopConfig.gallery;
const N = images.length;

// Helper to detect video files
const isVideo = (src: string) => {
  return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
};

// ── Physics carousel constants ──────────────────────────────
const CARD_W          = 460;  // px — card intrinsic width
const CARD_H          = 600;  // px — card intrinsic height
const SPACING         = 500;  // px center-to-center (visual gap between cards)
const DRAG_SENSITIVITY = 260; // px of drag to advance exactly one card (independent of SPACING)
const MAX_THROW       = 2;    // max slides per release flick — keeps it controlled

// Pure lerp — no velocity, no spring, no bounce possible
const LERP     = 0.10;   // fraction of remaining distance closed per frame
const SETTLE_E = 0.0005; // epsilon to stop the loop

// ── Module-level physics state (avoids stale closure risk) ──
const ph = {
  pos: 0, target: 0,
  raf:   null as number | null,
  timer: null as ReturnType<typeof setInterval> | null,
  down: false, x0: 0, pos0: 0,
  lx: 0, lt: 0, iv: 0,
};

type CardEl = HTMLDivElement & { _overlay?: HTMLElement | null; _label?: HTMLElement | null };
const cardEls: (CardEl | null)[] = Array(N).fill(null);
const dotEls:  (HTMLButtonElement | null)[] = Array(N).fill(null);

// ── Per-frame DOM writer (GPU-only: transform + opacity) ────
function paint() {
  const pos = ph.pos;
  const ai  = ((Math.round(pos) % N) + N) % N;

  for (let i = 0; i < N; i++) {
    const el = cardEls[i];
    if (!el) continue;

    // Shortest-path alias for circular layout
    let alias = i;
    const half = N / 2;
    while (alias - pos >  half) alias -= N;
    while (alias - pos < -half) alias += N;

    const d   = alias - pos;
    const abs = Math.abs(d);

    if (abs > 2.85) { el.style.visibility = "hidden"; continue; }
    el.style.visibility = "";

    const tx    = d * SPACING;
    const tz    = -abs * 55;          // less z-depth = side cards stay bigger
    const ry    = d * -10;            // subtle rotation, not dramatic lean
    const scale = Math.max(0.72, 1 - abs * 0.10); // side cards stay 72%+ of active size
    const op    = Math.max(0.18, 1 - abs * 0.30); // side cards remain clearly visible
    const zi    = String((20 - abs * 5) | 0);

    el.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
    el.style.opacity   = String(op);
    el.style.zIndex    = zi;
    el.style.boxShadow = (i === ai)
      ? "0 32px 80px rgba(0,0,0,.65), 0 8px 24px rgba(0,0,0,.35)"
      : "0 12px 40px rgba(0,0,0,.4)";

    if (el._overlay) el._overlay.style.opacity = (i === ai) ? "0" : "1";
    if (el._label)   el._label.style.opacity   = (i === ai) ? "1" : "0";
  }

  for (let i = 0; i < N; i++) {
    const d = dotEls[i];
    if (!d) continue;
    const on = i === ai;
    d.style.background = on ? "var(--primary)" : "var(--border)";
    d.style.width      = on ? "22px" : "6px";
  }
}

// ── Lerp tick — smooth ease-out, physically impossible to bounce ─
function tick() {
  ph.pos += (ph.target - ph.pos) * LERP;
  paint();
  if (Math.abs(ph.target - ph.pos) < SETTLE_E) {
    ph.pos = ph.target; paint(); ph.raf = null; return;
  }
  ph.raf = requestAnimationFrame(tick);
}

function startLoop() {
  if (ph.raf) cancelAnimationFrame(ph.raf);
  ph.raf = requestAnimationFrame(tick);
}

// ── Autoplay ─────────────────────────────────────────────────
function stopAuto() { if (ph.timer) { clearInterval(ph.timer); ph.timer = null; } }
function startAuto() {
  stopAuto();
  ph.timer = setInterval(() => { ph.target = Math.round(ph.pos) + 1; startLoop(); }, 3800);
}

// ── Navigate ─────────────────────────────────────────────────
function goTo(idx: number) {
  const cur    = Math.round(ph.pos);
  const curMod = ((cur % N) + N) % N;
  let   delta  = idx - curMod;
  if (delta >  N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  ph.target = cur + delta;
  startLoop(); startAuto();
}

function stepBy(d: number) {
  ph.target = Math.round(ph.pos) + d;
  startLoop(); startAuto();
}

// ────────────────────────────────────────────────────────────
// Mobile Gallery — self-contained rAF + lerp carousel
// Same lerp engine as desktop, no CSS scroll snap, no IntersectionObserver
// ────────────────────────────────────────────────────────────
const MOBILE_CARD_VISIBLE_W = 72; // vw — active card width as % of viewport
const MOBILE_PEEK           = 12; // vw — how much of adjacent cards peek in

const MobileGallery = () => {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Per-instance lerp state stored in a ref — no re-renders during animation
  const mState = useRef({
    pos: 0, target: 0,
    raf:   null as number | null,
    timer: null as ReturnType<typeof setInterval> | null,
    down: false, x0: 0, pos0: 0,
    lx: 0, lt: 0, iv: 0,
  });

  // Card element refs for direct DOM writes
  const mCardRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const mDotRefs  = useRef<(HTMLButtonElement | null)[]>(Array(N).fill(null));

  const mPaint = useCallback(() => {
    const s   = mState.current;
    const pos = s.pos;
    const ai  = ((Math.round(pos) % N) + N) % N;

    mCardRefs.current.forEach((el, i) => {
      if (!el) return;

      // Shortest-path alias — same circular logic as desktop paint()
      let alias = i;
      const half = N / 2;
      while (alias - pos >  half) alias -= N;
      while (alias - pos < -half) alias += N;

      const d   = alias - pos;
      const abs = Math.abs(d);

      if (abs > 2.85) { el.style.visibility = "hidden"; return; }
      el.style.visibility = "";

      const step = MOBILE_CARD_VISIBLE_W + 4;
      const sc   = abs < 0.5 ? 1 : Math.max(0.88, 1 - abs * 0.07);
      const op   = abs < 0.5 ? 1 : Math.max(0.35, 1 - abs * 0.45);
      el.style.transform = `translateX(${d * step}vw) scale(${sc})`;
      el.style.opacity   = String(op);

      const ov = el.querySelector<HTMLElement>(".mc-ov");
      const lb = el.querySelector<HTMLElement>(".mc-lb");
      if (ov) ov.style.opacity = (i === ai) ? "0" : "1";
      if (lb) lb.style.opacity = (i === ai) ? "1" : "0";
    });

    mDotRefs.current.forEach((d, i) => {
      if (!d) return;
      d.style.background = (i === ai) ? "var(--primary)" : "var(--border)";
      d.style.width      = (i === ai) ? "22px" : "6px";
    });
  }, []);

  const mTick = useCallback(() => {
    const s = mState.current;
    s.pos += (s.target - s.pos) * LERP;
    mPaint();
    if (Math.abs(s.target - s.pos) < 0.001) {
      s.pos = s.target;
      mPaint();
      s.raf = null;
      setActiveIdx(Math.round(s.pos));
      return;
    }
    s.raf = requestAnimationFrame(mTick);
  }, [mPaint]);

  const mStartLoop = useCallback(() => {
    const s = mState.current;
    if (s.raf) cancelAnimationFrame(s.raf);
    s.raf = requestAnimationFrame(mTick);
  }, [mTick]);

  const mGoTo = useCallback((idx: number) => {
    const s      = mState.current;
    const cur    = Math.round(s.pos);
    const curMod = ((cur % N) + N) % N;
    let   delta  = idx - curMod;
    if (delta >  N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    s.target = cur + delta;
    mStartLoop();
  }, [mStartLoop]);

  const mStopAuto = useCallback(() => {
    const s = mState.current;
    if (s.timer) { clearInterval(s.timer); s.timer = null; }
  }, []);

  const mStartAuto = useCallback(() => {
    const s = mState.current;
    if (s.timer) { clearInterval(s.timer); s.timer = null; }
    s.timer = setInterval(() => {
      s.target = Math.round(s.pos) + 1;
      mStartLoop();
    }, 3800);
  }, [mStartLoop]);

  // Touch handlers
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const s = mState.current;

    // 1 vw in px — computed once per gesture start
    let vwPx = window.innerWidth / 100;

    const onDown = (x: number) => {
      vwPx = window.innerWidth / 100;
      mStopAuto();
      if (s.raf) { cancelAnimationFrame(s.raf); s.raf = null; }
      s.down = true;
      s.x0 = x; s.pos0 = s.pos;
      s.lx = x; s.lt = performance.now(); s.iv = 0;
    };

    const onMove = (x: number) => {
      if (!s.down) return;
      const now = performance.now();
      const dt  = now - s.lt;
      if (dt > 0) {
        const step = (MOBILE_CARD_VISIBLE_W + 4) * vwPx; // step in px
        const raw  = (x - s.lx) / dt / step;
        s.iv = s.iv * 0.70 + raw * 0.30;
      }
      s.lx = x; s.lt = now;
      const step = (MOBILE_CARD_VISIBLE_W + 4) * vwPx;
      s.pos    = s.pos0 - (x - s.x0) / step;
      s.target = s.pos;
      if (!s.raf) s.raf = requestAnimationFrame(() => { s.raf = null; mPaint(); });
    };

    const onUp = () => {
      if (!s.down) return;
      s.down = false;
      if (s.raf) { cancelAnimationFrame(s.raf); s.raf = null; }
      const base    = Math.round(s.pos);
      const thrown  = Math.round(s.pos - s.iv * 100);
      const delta   = Math.max(-2, Math.min(2, thrown - base));
      s.target = base + delta;
      mStartLoop();
      mStartAuto();
    };

    const ts = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const tm = (e: TouchEvent) => {
      if (!s.down) return;
      if (Math.abs(e.touches[0].clientX - s.x0) > 8) e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const te = () => onUp();

    // Mouse support for desktop preview of mobile layout
    const md = (e: MouseEvent) => { if (e.button === 0) { e.preventDefault(); onDown(e.clientX); } };
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const mu = () => onUp();

    el.addEventListener("touchstart",    ts, { passive: true });
    el.addEventListener("touchmove",     tm, { passive: false });
    el.addEventListener("touchend",      te, { passive: true });
    el.addEventListener("mousedown",     md, { passive: false });
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   mu);

    return () => {
      el.removeEventListener("touchstart",    ts);
      el.removeEventListener("touchmove",     tm);
      el.removeEventListener("touchend",      te);
      el.removeEventListener("mousedown",     md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   mu);
    };
  }, [mPaint, mStartLoop, mStopAuto, mStartAuto]);

  // Initial paint + autoplay
  useEffect(() => {
    mPaint();
    mStartAuto();
    return () => {
      const s = mState.current;
      if (s.raf)   cancelAnimationFrame(s.raf);
      if (s.timer) clearInterval(s.timer);
    };
  }, [mPaint, mStartAuto]);

  return (
    <section id="gallery" className="border-t border-border py-16 px-6">
      <ScrollReveal direction="up" duration={0.7}>
        <div className="mb-8">
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            {shopConfig.sections.gallery.label}
          </span>
          <h2 className="font-heading text-5xl text-foreground mt-2 leading-none">
            {shopConfig.sections.gallery.heading}
            <span className="text-primary">.</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Carousel track */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Edge fades */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: "10vw",
          background: "linear-gradient(90deg, var(--background), transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: "10vw",
          background: "linear-gradient(-90deg, var(--background), transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />

        <div
          ref={trackRef}
          style={{
            position: "relative",
            height: `calc(${MOBILE_CARD_VISIBLE_W}vw * 4 / 3)`, // 3:4 aspect
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            touchAction: "pan-y",
            userSelect: "none",
            overflow: "visible",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => { mCardRefs.current[i] = el; }}
              onClick={() => { if (!mState.current.down) { mGoTo(i); mStartAuto(); } }}
              style={{
                position: "absolute",
                width: `${MOBILE_CARD_VISIBLE_W}vw`,
                height: `calc(${MOBILE_CARD_VISIBLE_W}vw * 4 / 3)`,
                borderRadius: "18px",
                overflow: "hidden",
                flexShrink: 0,
                willChange: "transform, opacity",
                cursor: "pointer",
              }}
            >
              {isVideo(img.src) ? (
                <video
                  src={img.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  draggable={false}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    pointerEvents: "none",
                  }}
                />
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Dark overlay — hidden on active */}
              <div
                className="mc-ov"
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.40)",
                  pointerEvents: "none",
                  transition: "opacity 0.4s ease",
                }}
              />

              {/* Label — shown on active */}
              <div
                className="mc-lb"
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "48px 16px 16px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                  pointerEvents: "none",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                <div style={{
                  fontSize: "9px", color: "var(--primary)",
                  letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "18px", color: "#fff", lineHeight: 1.15 }}>
                  {img.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "24px", alignItems: "center" }}>
        {images.map((_, i) => (
          <button
            key={i}
            ref={(el) => { mDotRefs.current[i] = el; }}
            onClick={() => mGoTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: "5px", width: "6px", borderRadius: "3px",
              background: "var(--border)", border: "none", cursor: "pointer", padding: 0,
              transition: "background 0.3s, width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────
// Desktop Gallery — physics-based 3D carousel
// ────────────────────────────────────────────────────────────
const DesktopGallery = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  // Reset physics on mount to avoid leftover state from HMR / prior sessions
  useEffect(() => {
    ph.pos = 0; ph.target = 0; ph.down = false;
  }, []);

  // Pointer / touch input listeners
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onDown = (x: number) => {
      stopAuto();
      if (ph.raf) { cancelAnimationFrame(ph.raf); ph.raf = null; }
      ph.down = true;
      ph.x0 = x; ph.pos0 = ph.pos;
      ph.lx = x; ph.lt = performance.now(); ph.iv = 0;
    };

    const onMove = (x: number) => {
      if (!ph.down) return;
      const now = performance.now();
      const dt  = now - ph.lt;
      if (dt > 0) {
        // Smooth EMA — 0.7 weight on history = silky, not jittery
        const raw = (x - ph.lx) / dt / DRAG_SENSITIVITY;
        ph.iv = ph.iv * 0.70 + raw * 0.30;
      }
      ph.lx = x; ph.lt = now;
      // Use DRAG_SENSITIVITY (not SPACING) for 1:1 drag-to-card ratio
      ph.pos    = ph.pos0 - (x - ph.x0) / DRAG_SENSITIVITY;
      ph.target = ph.pos;
      // Schedule via rAF — never paint synchronously during drag (prevents jank)
      if (!ph.raf) ph.raf = requestAnimationFrame(() => { ph.raf = null; paint(); });
    };

    const onUp = () => {
      if (!ph.down) return;
      ph.down = false;
      if (ph.raf) { cancelAnimationFrame(ph.raf); ph.raf = null; }
      // Use flick velocity to determine throw direction, clamped to ±MAX_THROW slides.
      // lerp handles the animation — no velocity state needed, bounce impossible.
      const base    = Math.round(ph.pos);
      const thrown  = Math.round(ph.pos - ph.iv * 120);
      const clamped = Math.max(base - MAX_THROW, Math.min(base + MAX_THROW, thrown));
      ph.target = clamped;
      startLoop(); startAuto();
    };

    const md = (e: MouseEvent) => { if (e.button === 0) { e.preventDefault(); onDown(e.clientX); } };
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const mu = ()              => onUp();

    const ts = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const tm = (e: TouchEvent) => {
      if (!ph.down) return;
      if (Math.abs(e.touches[0].clientX - ph.x0) > 6) e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const te = () => onUp();

    el.addEventListener("mousedown",     md, { passive: false });
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   mu);
    el.addEventListener("touchstart",    ts, { passive: true });
    el.addEventListener("touchmove",     tm, { passive: false });
    el.addEventListener("touchend",      te, { passive: true });

    return () => {
      el.removeEventListener("mousedown",     md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   mu);
      el.removeEventListener("touchstart",    ts);
      el.removeEventListener("touchmove",     tm);
      el.removeEventListener("touchend",      te);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  stepBy(-1);
      if (e.key === "ArrowRight") stepBy(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Initial paint + autoplay
  useEffect(() => {
    paint();
    startAuto();
    return () => {
      stopAuto();
      if (ph.raf) cancelAnimationFrame(ph.raf);
    };
  }, []);

  return (
    <section id="gallery" className="border-t border-border py-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-10">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                {shopConfig.sections.gallery.label}
              </span>
              <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
                {shopConfig.sections.gallery.heading}
                <span className="text-primary">.</span>
              </h2>
            </div>
            <span className="font-body text-xs text-muted-foreground tracking-widest uppercase hidden md:block">
              Drag ←→
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 3D Stage */}
      <div className="relative w-full">
        <div
          ref={stageRef}
          style={{
            perspective: "1600px",
            height: `${CARD_H + 160}px`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            touchAction: "pan-y",
            userSelect: "none",
            overflow: "hidden",
          }}
        >
          {/* Left edge fade */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, left: 0,
              width: "200px", zIndex: 10, pointerEvents: "none",
              background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)",
            }}
          />
          {/* Right edge fade */}
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, right: 0,
              width: "200px", zIndex: 10, pointerEvents: "none",
              background: "linear-gradient(-90deg, var(--background) 0%, transparent 100%)",
            }}
          />

          {/* Cards */}
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => {
                if (!el) return;
                cardEls[i] = el as CardEl;
                (cardEls[i] as CardEl)._overlay = el.querySelector<HTMLElement>(".c-ov");
                (cardEls[i] as CardEl)._label   = el.querySelector<HTMLElement>(".c-lb");
              }}
              onClick={() => {
                if (!ph.down) {
                  const ai = ((Math.round(ph.pos) % N) + N) % N;
                  if (i !== ai) goTo(i);
                }
              }}
              style={{
                position: "absolute",
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                borderRadius: "18px",
                overflow: "hidden",
                cursor: "pointer",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                visibility: "hidden",
              }}
            >
              {isVideo(img.src) ? (
                <video
                  src={img.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  draggable={false}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    pointerEvents: "none", userSelect: "none",
                  }}
                />
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    pointerEvents: "none", userSelect: "none",
                  }}
                />
              )}

              {/* Dark overlay — hidden on active card */}
              <div
                className="c-ov"
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.32)",
                  borderRadius: "18px",
                  pointerEvents: "none",
                  transition: "opacity 0.55s ease",
                }}
              />

              {/* Label gradient — shown on active card */}
              <div
                className="c-lb"
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "50px 18px 18px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  pointerEvents: "none",
                  transition: "opacity 0.55s ease",
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: "var(--primary)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "5px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "20px", color: "#fff", lineHeight: 1.1 }}>
                  {img.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "center",
            marginTop: "32px",
            alignItems: "center",
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              ref={(el) => { dotEls[i] = el; }}
              onClick={() => goTo(i)}
              aria-label={img.label}
              style={{
                height: "5px",
                width: "6px",
                borderRadius: "3px",
                background: "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.3s, width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────
// Root export
// ────────────────────────────────────────────────────────────
const GallerySection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGallery /> : <DesktopGallery />;
};

export default GallerySection;