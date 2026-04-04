import { useRef, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import shopConfig from "@/config/shopConfig";

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

const images = shopConfig.gallery;
const N = images.length;

const isVideo = (src: string) =>
  src.includes(".mp4") || src.includes(".webm") || src.includes(".mov");

// ─────────────────────────────────────────────────────────────────────────────
// 3D Ring Carousel — config
// ─────────────────────────────────────────────────────────────────────────────

const RADIUS       = 370;   // px  — ring radius (distance from centre to card face)
const CARD_W       = 230;   // px  — card width
const CARD_H       = 320;   // px  — card height
const AUTO_ROTATE  = true;
const ROTATE_SPEED = -60;   // seconds for a full revolution; negative → spinRevert

// ─────────────────────────────────────────────────────────────────────────────
// Mobile swipe carousel — config
// ─────────────────────────────────────────────────────────────────────────────

const MOBILE_CARD_VW = 72; // vw — active card width
const LERP           = 0.10;
const SETTLE_E       = 0.001;
const MOBILE_MAX_THROW = 2;

// ═════════════════════════════════════════════════════════════════════════════
// DESKTOP — True 3D ring carousel
// ═════════════════════════════════════════════════════════════════════════════

const DesktopGallery = () => {
  const stageRef  = useRef<HTMLDivElement>(null);
  const dragRef   = useRef<HTMLDivElement>(null);
  const spinRef   = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);

  // Physics state — kept in a ref so closures never go stale
  const ph = useRef({
    tX: 0, tY: 0,          // current drag-container angles
    desX: 0, desY: 0,      // inertia deltas
    radius: RADIUS,
    timer: null as ReturnType<typeof setInterval> | null,
    hasAnimated: false,    // track if intro animation has played
  });

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Position every img/video in a ring at the current radius */
  const initRing = useCallback((r: number, delayTime?: number) => {
    const spin = spinRef.current;
    if (!spin) return;
    const items = [
      ...Array.from(spin.getElementsByTagName("img")),
      ...Array.from(spin.getElementsByTagName("video")),
    ] as HTMLElement[];
    items.forEach((el, i) => {
      el.style.transform =
        `rotateY(${i * (360 / items.length)}deg) translateZ(${r}px)`;
      el.style.transition = "transform 1s";
      el.style.transitionDelay =
        delayTime != null
          ? `${delayTime}s`
          : `${(items.length - i) / 4}s`;
    });
  }, []);

  /** Write the drag-container's rotateX / rotateY */
  const applyDragTransform = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    const { tX, tY } = ph.current;
    const clampedTY = Math.max(0, Math.min(180, tY));
    drag.style.transform = `rotateX(${-clampedTY}deg) rotateY(${tX}deg)`;
  }, []);

  /** Toggle CSS animation play state on the spin container */
  const playSpin = useCallback((running: boolean) => {
    if (spinRef.current)
      spinRef.current.style.animationPlayState = running ? "running" : "paused";
  }, []);

  // ── Pointer drag ──────────────────────────────────────────────────────────

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const p = ph.current;

    const onPointerDown = (e: PointerEvent) => {
      if (p.timer) clearInterval(p.timer);
      playSpin(false);
      let sX = e.clientX, sY = e.clientY;

      const onPointerMove = (ev: PointerEvent) => {
        const nX = ev.clientX, nY = ev.clientY;
        p.desX = nX - sX;
        p.desY = nY - sY;
        p.tX  += p.desX * 0.1;
        p.tY  += p.desY * 0.1;
        applyDragTransform();
        sX = nX; sY = nY;
      };

      const onPointerUp = () => {
        // Inertia decay — gradually bring desX/desY to zero
        p.timer = setInterval(() => {
          p.desX *= 0.95;
          p.desY *= 0.95;
          p.tX  += p.desX * 0.1;
          p.tY  += p.desY * 0.1;
          applyDragTransform();
          if (Math.abs(p.desX) < 0.5 && Math.abs(p.desY) < 0.5) {
            if (p.timer) clearInterval(p.timer);
            playSpin(true);
          }
        }, 17);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup",   onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup",   onPointerUp);
    };

    stage.addEventListener("pointerdown", onPointerDown);
    return () => stage.removeEventListener("pointerdown", onPointerDown);
  }, [applyDragTransform, playSpin]);



  // ── Mount: size containers, set animation, prepare for intro ─────────────

  useEffect(() => {
    const spin = spinRef.current;
    if (!spin) return;

    // Spin container intrinsic size (items are `position: absolute` inside)
    spin.style.width  = `${CARD_W}px`;
    spin.style.height = `${CARD_H}px`;

    // CSS auto-rotate animation
    if (AUTO_ROTATE) {
      const animName =
        ROTATE_SPEED > 0 ? "g3d-spin" : "g3d-spinRevert";
      spin.style.animation =
        `${animName} ${Math.abs(ROTATE_SPEED)}s infinite linear`;
    }

    // Ground disc
    if (groundRef.current) {
      groundRef.current.style.width  = `${RADIUS * 3}px`;
      groundRef.current.style.height = `${RADIUS * 3}px`;
    }

    // Position items at origin initially (they'll fly out when visible)
    initRing(0, 0);
  }, [initRing]);

  // ── Intersection Observer: trigger fly-in animation when section is visible

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const p = ph.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !p.hasAnimated) {
            p.hasAnimated = true;
            // Staggered intro — items fly into place
            setTimeout(() => initRing(RADIUS), 300);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [initRing]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section id="gallery" className="border-t-2 border-accent/20 py-20 cyber-razor-top cyber-razor-bottom relative">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: "linear-gradient(hsl(127 14% 36% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(127 14% 36% / 0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      {/* Keyframes injected once — avoids needing an external .css file */}
      <style>{`
        @keyframes g3d-spin {
          from { transform: rotateY(0deg);   }
          to   { transform: rotateY(360deg); }
        }
        @keyframes g3d-spinRevert {
          from { transform: rotateY(360deg); }
          to   { transform: rotateY(0deg);   }
        }
        .g3d-item {
          transform-style: preserve-3d;
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 0;
          box-shadow: 0 0 20px rgba(0,255,210,0.3), 0 0 40px rgba(0,255,210,0.1);
          border: 2px solid rgba(0,255,210,0.2);
          -webkit-box-reflect: below 12px
            linear-gradient(transparent 60%, rgba(0,0,0,0.45));
          cursor: pointer;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .g3d-item:hover {
          box-shadow: 0 0 30px rgba(0,255,210,0.6), 0 0 60px rgba(0,255,210,0.3),
                      0 0  8px rgba(255,255,255,0.4);
        }
      `}</style>

      {/* ── Section header ── */}
      <div className="container mx-auto px-6 mb-10">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                {shopConfig.sections.gallery.label}
              </span>
              <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none cyber-glitch-2" style={{ '--og-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } as React.CSSProperties}>
                {shopConfig.sections.gallery.heading}
                <span className="text-primary cyber-glitch-4">.</span>
              </h2>
            </div>
            <span className="font-body text-xs text-muted-foreground tracking-widest uppercase hidden md:flex flex-col items-end gap-1">
              <span>Drag  ←→  to rotate</span>
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* ── 3-D Stage ── */}
      <div
        ref={stageRef}
        style={{
          width:           "100%",
          height:          `${CARD_H + 200}px`,
          display:         "flex",
          justifyContent:  "center",
          alignItems:      "center",
          perspective:     "1000px",
          // NOTE: perspectiveOrigin is on the outer wrapper; inner preserve-3d
          // elements inherit the perspective automatically.
          overflow:        "hidden",
          cursor:          "grab",
          userSelect:      "none",
          touchAction:     "pan-y",
          position:        "relative",
        }}
      >
        {/* Edge vignettes — keep focus on the active card */}
        <div style={{
          position: "absolute", inset: 0,
          background:
            "linear-gradient(90deg," +
            "var(--background) 0%," +
            "transparent 18%," +
            "transparent 82%," +
            "var(--background) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }} />

        {/*
          drag-container
          ─ receives the manual rotateX / rotateY from pointer drag
          ─ starts with a slight downward tilt (rotateX(-10deg)) so the
            ground reflection is visible from the outset
        */}
        <div
          ref={dragRef}
          style={{
            position:      "relative",
            display:       "flex",
            justifyContent:"center",
            alignItems:    "center",
            transformStyle:"preserve-3d",
            transform:     "rotateX(0deg)",
            width:         "100%",
            height:        "100%",
          }}
        >
          {/*
            spin-container
            ─ CSS animation makes it spin continuously around Y axis
            ─ animationPlayState is toggled to 'paused' during drag inertia
          */}
          <div
            ref={spinRef}
            style={{
              position:      "relative",
              display:       "flex",
              justifyContent:"center",
              alignItems:    "center",
              transformStyle:"preserve-3d",
            }}
          >
            {images.map((img, i) =>
              isVideo(img.src) ? (
                <video
                  key={i}
                  className="g3d-item"
                  src={img.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable={false}
                />
              ) : (
                <img
                  key={i}
                  className="g3d-item"
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )
            )}

            {/* Optional label text — rotated flat on the ground plane */}
            <p
              style={{
                fontFamily:    "serif",
                position:      "absolute",
                top:           "100%",
                left:          "50%",
                transform:     "translate(-50%, -50%) rotateX(90deg)",
                color:         "color-mix(in srgb, var(--primary) 80%, white)",
                whiteSpace:    "nowrap",
                fontSize:      "13px",
                letterSpacing: "0.12em",
                pointerEvents: "none",
              }}
            >
              {shopConfig.sections.gallery.heading}
            </p>
          </div>

          {/*
            ground disc
            ─ lives at the bottom of the spin-container (top: 100%)
            ─ is rotated flat on the horizontal plane (rotateX(90deg))
            ─ gives the radial shadow / reflection pad effect
          */}
          <div
            ref={groundRef}
            style={{
              position:     "absolute",
              top:          "100%",
              left:         "50%",
              transform:    "translate(-50%, -50%) rotateX(90deg)",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center," +
                "color-mix(in srgb, var(--primary) 20%, transparent) 0%," +
                "transparent 70%)",
              pointerEvents:"none",
            }}
          />
        </div>
      </div>
    </section>
  );
};


// ═════════════════════════════════════════════════════════════════════════════
// MOBILE — lerp swipe carousel (unchanged physics logic, cleaner layout)
// ═════════════════════════════════════════════════════════════════════════════

// Module-level dot element refs so paint() can update them without state
const mDotEls: (HTMLButtonElement | null)[] = Array(N).fill(null);
const mCardEls: (HTMLDivElement | null)[]   = Array(N).fill(null);

// Per-instance physics — reset on mount
const mPh = {
  pos: 0, target: 0,
  raf:   null as number | null,
  timer: null as ReturnType<typeof setInterval> | null,
  down: false, x0: 0, pos0: 0,
  lx: 0, lt: 0, iv: 0,
};

/** Write transforms + opacity directly to card DOM nodes */
function mPaint() {
  const pos = mPh.pos;
  const ai  = ((Math.round(pos) % N) + N) % N;
  const step = MOBILE_CARD_VW + 4; // vw per card slot

  for (let i = 0; i < N; i++) {
    const el = mCardEls[i];
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

    const sc = abs < 0.5 ? 1 : Math.max(0.85, 1 - abs * 0.08);
    const op = abs < 0.5 ? 1 : Math.max(0.30, 1 - abs * 0.48);

    el.style.transform = `translateX(${d * step}vw) scale(${sc})`;
    el.style.opacity   = String(op);

    // Overlay (darkens inactive cards)
    const ov = el.querySelector<HTMLElement>(".mc-ov");
    const lb = el.querySelector<HTMLElement>(".mc-lb");
    if (ov) ov.style.opacity = i === ai ? "0" : "1";
    if (lb) lb.style.opacity = i === ai ? "1" : "0";
  }

  // Dot indicators
  for (let i = 0; i < N; i++) {
    const d = mDotEls[i];
    if (!d) continue;
    d.style.background = i === ai ? "var(--primary)" : "var(--border)";
    d.style.width      = i === ai ? "22px" : "6px";
  }
}

/** Lerp tick — smooth ease-out, no spring, no bounce */
function mTick() {
  mPh.pos += (mPh.target - mPh.pos) * LERP;
  mPaint();
  if (Math.abs(mPh.target - mPh.pos) < SETTLE_E) {
    mPh.pos = mPh.target; mPaint(); mPh.raf = null; return;
  }
  mPh.raf = requestAnimationFrame(mTick);
}

function mStartLoop() {
  if (mPh.raf) cancelAnimationFrame(mPh.raf);
  mPh.raf = requestAnimationFrame(mTick);
}

function mStopAuto() {
  if (mPh.timer) { clearInterval(mPh.timer); mPh.timer = null; }
}

function mStartAuto() {
  mStopAuto();
  mPh.timer = setInterval(() => {
    mPh.target = Math.round(mPh.pos) + 1;
    mStartLoop();
  }, 3800);
}

function mGoTo(idx: number) {
  const cur    = Math.round(mPh.pos);
  const curMod = ((cur % N) + N) % N;
  let   delta  = idx - curMod;
  if (delta >  N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  mPh.target = cur + delta;
  mStartLoop(); mStartAuto();
}

// ─────────────────────────────────────────────────────────────────────────────

const MobileGallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Touch / pointer input
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Reset physics on mount
    mPh.pos = 0; mPh.target = 0; mPh.down = false;

    let vwPx = window.innerWidth / 100;

    const onDown = (x: number) => {
      vwPx = window.innerWidth / 100;
      mStopAuto();
      if (mPh.raf) { cancelAnimationFrame(mPh.raf); mPh.raf = null; }
      mPh.down = true;
      mPh.x0 = x; mPh.pos0 = mPh.pos;
      mPh.lx = x; mPh.lt = performance.now(); mPh.iv = 0;
    };

    const onMove = (x: number) => {
      if (!mPh.down) return;
      const now  = performance.now();
      const dt   = now - mPh.lt;
      if (dt > 0) {
        const stepPx = (MOBILE_CARD_VW + 4) * vwPx;
        const raw    = (x - mPh.lx) / dt / stepPx;
        mPh.iv = mPh.iv * 0.70 + raw * 0.30;
      }
      mPh.lx = x; mPh.lt = now;
      const stepPx = (MOBILE_CARD_VW + 4) * vwPx;
      mPh.pos    = mPh.pos0 - (x - mPh.x0) / stepPx;
      mPh.target = mPh.pos;
      if (!mPh.raf)
        mPh.raf = requestAnimationFrame(() => { mPh.raf = null; mPaint(); });
    };

    const onUp = () => {
      if (!mPh.down) return;
      mPh.down = false;
      if (mPh.raf) { cancelAnimationFrame(mPh.raf); mPh.raf = null; }
      const base   = Math.round(mPh.pos);
      const thrown = Math.round(mPh.pos - mPh.iv * 100);
      const delta  = Math.max(-MOBILE_MAX_THROW, Math.min(MOBILE_MAX_THROW, thrown - base));
      mPh.target   = base + delta;
      mStartLoop(); mStartAuto();
    };

    // Touch
    const ts = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const tm = (e: TouchEvent) => {
      if (!mPh.down) return;
      if (Math.abs(e.touches[0].clientX - mPh.x0) > 8) e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const te = () => onUp();

    // Mouse (for desktop preview of mobile breakpoint)
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
  }, []);

  // Initial paint + autoplay
  useEffect(() => {
    mPaint();
    mStartAuto();
    return () => {
      mStopAuto();
      if (mPh.raf) cancelAnimationFrame(mPh.raf);
    };
  }, []);

  return (
    <section id="gallery" className="border-t-2 border-accent/20 py-16 px-6 cyber-razor-top cyber-razor-bottom relative">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: "linear-gradient(hsl(127 14% 36% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(127 14% 36% / 0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
           
      <ScrollReveal direction="up" duration={0.7}>
        <div className="mb-8 relative z-10">
          <span className="font-body text-xs tracking-[0.4em] text-accent uppercase neon-glow">
            {shopConfig.sections.gallery.label}
          </span>
          <h2 className="font-heading text-5xl text-foreground mt-2 leading-none">
            {shopConfig.sections.gallery.heading}
            <span className="text-primary neon-glow-red">.</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Carousel track */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Edge fades with vintage forest green tint */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: "10vw",
          background: "linear-gradient(90deg, hsl(30 4% 10%), transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: "10vw",
          background: "linear-gradient(-90deg, hsl(30 4% 10%), transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />

        <div
          ref={trackRef}
          style={{
            position:       "relative",
            height:         `calc(${MOBILE_CARD_VW}vw * 4 / 3)`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "grab",
            touchAction:    "pan-y",
            userSelect:     "none",
            overflow:       "visible",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => { mCardEls[i] = el; }}
              onClick={() => { if (!mPh.down) mGoTo(i); }}
              style={{
                position:     "absolute",
                width:        `${MOBILE_CARD_VW}vw`,
                height:       `calc(${MOBILE_CARD_VW}vw * 4 / 3)`,
                borderRadius: "16px",
                overflow:     "hidden",
                willChange:   "transform, opacity",
                cursor:       "pointer",
                flexShrink:   0,
              }}
            >
              {isVideo(img.src) ? (
                <video
                  src={img.src}
                  autoPlay loop muted playsInline
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

              {/* Dark overlay — transparent on active card */}
              <div
                className="mc-ov"
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.40)",
                  pointerEvents: "none",
                  transition: "opacity 0.4s ease",
                }}
              />

              {/* Caption — shown only on active card */}
              <div
                className="mc-lb"
                style={{
                  position:   "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding:    "48px 16px 16px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                  pointerEvents: "none",
                  opacity:    0,
                  transition: "opacity 0.4s ease",
                }}
              >
                <div style={{
                  fontSize:      "9px",
                  color:         "var(--primary)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom:  "4px",
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
      <div style={{
        display:        "flex",
        gap:            "6px",
        justifyContent: "center",
        marginTop:      "24px",
        alignItems:     "center",
      }}>
        {images.map((img, i) => (
          <button
            key={i}
            ref={(el) => { mDotEls[i] = el; }}
            onClick={() => mGoTo(i)}
            aria-label={`Go to slide ${i + 1}: ${img.label}`}
            style={{
              height:        "5px",
              width:         "6px",
              borderRadius:  "3px",
              background:    "var(--border)",
              border:        "none",
              cursor:        "pointer",
              padding:       0,
              transition:    "background 0.3s, width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        ))}
      </div>
    </section>
  );
};


// ═════════════════════════════════════════════════════════════════════════════
// Root export — routes to the correct layout based on viewport
// ═════════════════════════════════════════════════════════════════════════════

const GallerySection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGallery /> : <DesktopGallery />;
};

export default GallerySection;