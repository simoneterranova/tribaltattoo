import { useRef, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import shopConfig from "@/config/shopConfig";

const testimonials = shopConfig.testimonials;
const N = testimonials.length;

// ── Constants — identical ratios to GallerySection ───────────
const CARD_W          = 380;  // px
const CARD_H          = 280;  // px
const SPACING         = 420;  // px center-to-center
const DRAG_SENSITIVITY = 260; // px drag = 1 card advance
const MAX_THROW       = 2;
const LERP            = 0.10;
const SETTLE_E        = 0.0005;
const AUTOPLAY_MS     = 3800;

// ── Module-level state ───────────────────────────────────────
const tp = {
  pos: 0, target: 0,
  raf:   null as number | null,
  timer: null as ReturnType<typeof setInterval> | null,
  down: false, x0: 0, pos0: 0,
  lx: 0, lt: 0, iv: 0,
};

type CardEl = HTMLDivElement & { _overlay?: HTMLElement | null };
const cardEls: (CardEl | null)[] = Array(N).fill(null);
const dotEls:  (HTMLButtonElement | null)[] = Array(N).fill(null);

// ── paint() — exact same formula as GallerySection ───────────
function paint() {
  const pos = tp.pos;
  const ai  = ((Math.round(pos) % N) + N) % N;

  for (let i = 0; i < N; i++) {
    const el = cardEls[i];
    if (!el) continue;

    let alias = i;
    const half = N / 2;
    while (alias - pos >  half) alias -= N;
    while (alias - pos < -half) alias += N;

    const d   = alias - pos;
    const abs = Math.abs(d);

    if (abs > 2.85) { el.style.visibility = "hidden"; continue; }
    el.style.visibility = "";

    // ── Exact same values as GallerySection ──
    const tx    = d * SPACING;
    const tz    = -abs * 55;
    const ry    = d * -10;
    const scale = Math.max(0.72, 1 - abs * 0.10);
    const op    = Math.max(0.18, 1 - abs * 0.30);
    const zi    = String((20 - abs * 5) | 0);

    el.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
    el.style.opacity   = String(op);
    el.style.zIndex    = zi;
    el.style.boxShadow = (i === ai)
      ? "0 32px 80px rgba(0,0,0,.65), 0 8px 24px rgba(0,0,0,.35)"
      : "0 12px 40px rgba(0,0,0,.4)";

    if (el._overlay) el._overlay.style.opacity = (i === ai) ? "0" : "1";
  }

  for (let i = 0; i < N; i++) {
    const d = dotEls[i];
    if (!d) continue;
    const on = i === ai;
    d.style.background = on ? "var(--primary)" : "var(--border)";
    d.style.width      = on ? "22px" : "6px";
  }
}

// ── Lerp tick ────────────────────────────────────────────────
function tick() {
  tp.pos += (tp.target - tp.pos) * LERP;
  paint();
  if (Math.abs(tp.target - tp.pos) < SETTLE_E) {
    tp.pos = tp.target; paint(); tp.raf = null; return;
  }
  tp.raf = requestAnimationFrame(tick);
}

function startLoop() {
  if (tp.raf) cancelAnimationFrame(tp.raf);
  tp.raf = requestAnimationFrame(tick);
}

// ── Autoplay ─────────────────────────────────────────────────
function stopAuto() {
  if (tp.timer) { clearInterval(tp.timer); tp.timer = null; }
}

function startAuto() {
  stopAuto();
  tp.timer = setInterval(() => {
    const next = Math.round(tp.pos) + 1;
    if (next >= N) { tp.pos = 0; tp.target = 0; paint(); return; }
    tp.target = next;
    startLoop();
  }, AUTOPLAY_MS);
}

// ── Navigate ─────────────────────────────────────────────────
function goTo(idx: number) {
  const cur    = Math.round(tp.pos);
  const curMod = ((cur % N) + N) % N;
  let   delta  = idx - curMod;
  if (delta >  N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  tp.target = cur + delta;
  startLoop(); startAuto();
}

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  // Reset on mount
  useEffect(() => {
    tp.pos = 0; tp.target = 0; tp.down = false;
  }, []);

  // Drag / touch
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onDown = (x: number) => {
      stopAuto();
      if (tp.raf) { cancelAnimationFrame(tp.raf); tp.raf = null; }
      tp.down = true;
      tp.x0 = x; tp.pos0 = tp.pos;
      tp.lx = x; tp.lt = performance.now(); tp.iv = 0;
    };

    const onMove = (x: number) => {
      if (!tp.down) return;
      const now = performance.now();
      const dt  = now - tp.lt;
      if (dt > 0) {
        const raw = (x - tp.lx) / dt / DRAG_SENSITIVITY;
        tp.iv = tp.iv * 0.70 + raw * 0.30;
      }
      tp.lx = x; tp.lt = now;
      tp.pos    = tp.pos0 - (x - tp.x0) / DRAG_SENSITIVITY;
      tp.target = tp.pos;
      if (!tp.raf) tp.raf = requestAnimationFrame(() => { tp.raf = null; paint(); });
    };

    const onUp = () => {
      if (!tp.down) return;
      tp.down = false;
      if (tp.raf) { cancelAnimationFrame(tp.raf); tp.raf = null; }
      const base    = Math.round(tp.pos);
      const thrown  = Math.round(tp.pos - tp.iv * 120);
      const clamped = Math.max(base - MAX_THROW, Math.min(base + MAX_THROW, thrown));
      tp.target = clamped;
      startLoop(); startAuto();
    };

    const md = (e: MouseEvent) => { if (e.button === 0) { e.preventDefault(); onDown(e.clientX); } };
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const mu = ()              => onUp();

    const tS = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const tM = (e: TouchEvent) => {
      if (!tp.down) return;
      if (Math.abs(e.touches[0].clientX - tp.x0) > 6) e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const tE = () => onUp();

    el.addEventListener("mousedown",     md, { passive: false });
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   mu);
    el.addEventListener("touchstart",    tS, { passive: true });
    el.addEventListener("touchmove",     tM, { passive: false });
    el.addEventListener("touchend",      tE, { passive: true });

    return () => {
      el.removeEventListener("mousedown",     md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   mu);
      el.removeEventListener("touchstart",    tS);
      el.removeEventListener("touchmove",     tM);
      el.removeEventListener("touchend",      tE);
    };
  }, []);

  // Initial paint + autoplay
  useEffect(() => {
    paint();
    startAuto();
    return () => {
      stopAuto();
      if (tp.raf) cancelAnimationFrame(tp.raf);
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-40 border-t border-border overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-10">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                {shopConfig.sections.testimonials.label}
              </span>
              <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
                {shopConfig.sections.testimonials.heading}
                <span className="text-primary">.</span>
              </h2>
            </div>
            <span className="font-body text-xs text-muted-foreground tracking-widest uppercase hidden md:block">
              Drag ←→
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 3D Stage — identical structure to GallerySection */}
      <div className="relative w-full">
        <div
          ref={stageRef}
          style={{
            perspective: "1600px",           // exact same as GallerySection
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
          {/* Left edge fade — exact same as GallerySection */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 0,
            width: "200px", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)",
          }} />

          {/* Right edge fade — exact same as GallerySection */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, right: 0,
            width: "200px", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(-90deg, var(--background) 0%, transparent 100%)",
          }} />

          {/* Cards */}
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                if (!el) return;
                cardEls[i] = el as CardEl;
                (cardEls[i] as CardEl)._overlay = el.querySelector<HTMLElement>(".t-ov");
              }}
              onClick={() => {
                if (!tp.down) {
                  const ai = ((Math.round(tp.pos) % N) + N) % N;
                  if (i !== ai) goTo(i);
                }
              }}
              style={{
                position: "absolute",
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                visibility: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Card content */}
              <div
                className="border border-border bg-background h-full flex flex-col justify-between p-8"
              >
                <div>
                  <Quote className="h-6 w-6 mb-6" style={{ color: "var(--primary)", opacity: 0.3 }} />
                  <p className="font-body text-base leading-relaxed text-secondary-foreground">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span className="font-heading text-lg text-foreground">{t.name}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Overlay — dims inactive cards, same as GallerySection */}
              <div
                className="t-ov"
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.32)",
                  pointerEvents: "none",
                  transition: "opacity 0.55s ease",
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress dots — exact same as GallerySection */}
        <div style={{
          display: "flex", gap: "6px",
          justifyContent: "center", marginTop: "32px", alignItems: "center",
        }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              ref={(el) => { dotEls[i] = el; }}
              onClick={() => goTo(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                height: "5px", width: "6px", borderRadius: "3px",
                background: "var(--border)", border: "none",
                cursor: "pointer", padding: 0,
                transition: "background 0.3s, width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;