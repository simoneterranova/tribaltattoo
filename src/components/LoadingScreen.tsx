/**
 * LoadingScreen — BRUNO VINI
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * THE EXPERIENCE
 * ──────────────
 * Pure background. An invisible sweep cuts across the screen,
 * burning the logo in — the cut line flares white-hot,
 * cooling backward through ivory → gold → amber like heated steel.
 *
 * After the sweep: the logo settles. Two hairline rules extend
 * outward flanking the tagline. Then a cinematic dissolve out.
 *
 * Uses shopConfig.logo (image) instead of text for a premium, brand-first UX.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shopConfig from "@/config/shopConfig";

// ─── shopConfig bindings ──────────────────────────────────────────────────────
const LOGO      = shopConfig.logo;
const CITY      = shopConfig.city;
const EST       = shopConfig.established;
const FONT_BODY = shopConfig.theme.fonts.body;

const hsl        = (t: string)            => `hsl(${t})`;
const hslA       = (t: string, a: number) => `hsl(${t} / ${a})`;
const C_BG       = hsl(shopConfig.theme.colors.background);
const C_PRIMARY  = hsl(shopConfig.theme.colors.primary);
const pA         = (a: number) => hslA(shopConfig.theme.colors.primary, a);

// ─── Timing (ms) ──────────────────────────────────────────────────────────────
const MS_PREDELAY = 160;
const MS_SLICE    = 1780;
const MS_SETTLE   = 700;
const MS_DETAILS  = 380;
const MS_HOLD     = 1150;
const MS_EXIT     = 920;

// ─── Easing ──────────────────────────────────────────────────────────────────
function easeRazorPull(t: number): number {
  if (t < 0.65) {
    const r = t / 0.65;
    return r * r * r * 0.86;
  }
  const r = (t - 0.65) / 0.35;
  return 0.86 + (1 - (1 - r) * (1 - r)) * 0.14;
}

// ─── HeatCanvas ──────────────────────────────────────────────────────────────
function drawHeatGlow(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  bladeXPx: number,
): void {
  ctx.clearRect(0, 0, W, H);
  if (bladeXPx <= 2) return;
  const start = Math.max(0, bladeXPx - 300);
  const hotG  = ctx.createLinearGradient(start, 0, bladeXPx + 6, 0);
  hotG.addColorStop(0,    "rgba(0,0,0,0)");
  hotG.addColorStop(0.42, "rgba(195,148,38,0.050)");
  hotG.addColorStop(0.68, "rgba(235,195,90,0.165)");
  hotG.addColorStop(0.85, "rgba(255,238,155,0.460)");
  hotG.addColorStop(0.95, "rgba(255,255,220,0.720)");
  hotG.addColorStop(1.00, "rgba(255,255,255,0.880)");
  ctx.fillStyle = hotG;
  ctx.fillRect(0, 0, Math.min(bladeXPx + 8, W), H);
}

function HeatCanvas({
  bladeXFraction,
  containerW,
  containerH,
  opacity,
}: {
  bladeXFraction: number;
  containerW:     number;
  containerH:     number;
  opacity:        number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || containerW === 0) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width  = containerW * dpr;
    c.height = containerH * dpr;
    ctx.scale(dpr, dpr);
    drawHeatGlow(ctx, containerW, containerH, bladeXFraction * containerW);
  }, [bladeXFraction, containerW, containerH]);

  return (
    <canvas
      ref={ref}
      style={{
        display:       "block",
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        opacity,
        transition:    "opacity 0.55s ease",
        pointerEvents: "none",
        mixBlendMode:  "screen",
      }}
    />
  );
}

// ─── LoadingScreen ────────────────────────────────────────────────────────────
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  type Phase = "pre" | "slicing" | "settling" | "revealing";

  const [phase,       setPhase]       = useState<Phase>("pre");
  const [sliceP,      setSliceP]      = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isExiting,   setIsExiting]   = useState(false);

  const logoWrapRef = useRef<HTMLDivElement>(null);
  const [wrapSz, setWrapSz] = useState({ w: 0, h: 0 });

  const rafRef = useRef<number>();
  const t0Ref  = useRef<number | null>(null);

  // Measure logo wrapper for heat canvas sizing
  useEffect(() => {
    const el = logoWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setWrapSz({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // RAF slice loop
  const startSlice = useCallback(() => {
    t0Ref.current = null;
    const tick = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const raw   = Math.min((ts - t0Ref.current) / MS_SLICE, 1);
      const eased = easeRazorPull(raw);
      setSliceP(eased);
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSliceP(1);
        setPhase("settling");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Phase machine
  useEffect(() => {
    if (phase === "pre") {
      const t = setTimeout(() => { setPhase("slicing"); startSlice(); }, MS_PREDELAY);
      return () => clearTimeout(t);
    }
    if (phase === "settling") {
      const t = setTimeout(() => setPhase("revealing"), MS_SETTLE);
      return () => clearTimeout(t);
    }
    if (phase === "revealing") {
      const t1 = setTimeout(() => setShowDetails(true), MS_DETAILS);
      const t2 = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadingComplete, MS_EXIT);
      }, MS_DETAILS + MS_HOLD);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase, startSlice, onLoadingComplete]);

  useEffect(
    () => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); },
    [],
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const isSlicing   = phase === "slicing";
  const heatOpacity = isSlicing ? 1 : 0;
  const clipRight   = `${(1 - sliceP) * 100}%`;
  const heatFrac    = Math.max(0, Math.min(1, sliceP));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="brunovini-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: MS_EXIT / 1000, ease: [0.90, 0, 0.10, 1] },
          }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9999,
            background:     C_BG,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            overflow:       "hidden",
            willChange:     "opacity",
          }}
        >

          {/* ── Film grain ─────────────────────────────────────────────── */}
          <div
            aria-hidden
            style={{
              position:        "absolute",
              inset:           0,
              zIndex:          1,
              pointerEvents:   "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize:  "260px 260px",
              opacity:         0.022,
              mixBlendMode:    "overlay" as React.CSSProperties["mixBlendMode"],
            }}
          />

          {/* ── Radial vignette ────────────────────────────────────────── */}
          <div
            aria-hidden
            style={{
              position:      "absolute",
              inset:         0,
              zIndex:        1,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%," +
                " transparent 14%, rgba(0,0,0,0.12) 100%)",
            }}
          />

          {/* ── Ambient gold bloom ─────────────────────────────────────── */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: sliceP > 0.10 ? 1 : 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            style={{
              position:      "absolute",
              inset:         0,
              zIndex:        1,
              pointerEvents: "none",
              background:
                `radial-gradient(ellipse 50% 35% at 50% 53%,` +
                ` ${pA(0.055)}, transparent 76%)`,
            }}
          />

          {/* ── Horizontal light streak ────────────────────────────────── */}
          {isSlicing && (
            <div
              aria-hidden
              style={{
                position:      "absolute",
                top:           "50%",
                left:          0,
                zIndex:        4,
                width:         `${sliceP * 100}%`,
                height:        1,
                transform:     "translateY(-50%)",
                background:
                  `linear-gradient(to right,` +
                  ` transparent 0%,` +
                  ` ${pA(0.035)} 28%,` +
                  ` ${pA(0.36)} 80%,` +
                  ` rgba(255,255,255,0.82) 100%)`,
                pointerEvents: "none",
                borderRadius:  "0 2px 2px 0",
              }}
            />
          )}

          {/* ══════════════════════════════════════════════════════════════
              MAIN CONTENT
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              position:      "relative",
              zIndex:        2,
              width:         "min(480px, 72vw)",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
            }}
          >

            {/* ══ LOGO STAGE ══════════════════════════════════════════════ */}
            <div
              ref={logoWrapRef}
              style={{
                position:     "relative",
                width:        "100%",
                marginBottom: showDetails
                  ? "clamp(1.5rem, 3.2vw, 2.2rem)"
                  : "clamp(0.3rem, 0.8vw, 0.5rem)",
                transition:   "margin-bottom 0.75s cubic-bezier(0.22,1,0.36,1)",
              }}
            >

              {/* ── Layer A: dim logo (establishes block dimensions) ─────── */}
              <img
                aria-hidden
                src={LOGO}
                alt=""
                draggable={false}
                style={{
                  display:       "block",
                  width:         "100%",
                  height:        "auto",
                  userSelect:    "none",
                  pointerEvents: "none",
                  opacity:       0.08,
                  filter:        "grayscale(1)",
                }}
              />

              {/* ── Layer B: revealed logo + heat glow (absolute overlay) ── */}
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  clipPath:   `inset(0 ${clipRight} 0 0)`,
                  willChange: "clip-path",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <img
                    src={LOGO}
                    alt={shopConfig.name}
                    draggable={false}
                    style={{
                      display:       "block",
                      width:         "100%",
                      height:        "auto",
                      userSelect:    "none",
                      pointerEvents: "none",
                      // Subtle drop-shadow for depth on light bg
                      filter:
                        `drop-shadow(0 2px 18px ${pA(0.18)})` +
                        ` drop-shadow(0 1px 4px rgba(0,0,0,0.10))`,
                    }}
                  />

                  {/* Heat-glow canvas: screen-blended over the revealed logo */}
                  {wrapSz.w > 0 && (
                    <HeatCanvas
                      bladeXFraction={heatFrac}
                      containerW={wrapSz.w}
                      containerH={wrapSz.h}
                      opacity={heatOpacity}
                    />
                  )}
                </div>
              </div>

            </div>

            {/* ══ TAGLINE ROW ═══════════════════════════════════════════════ */}
            <div
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "clamp(0.85rem, 2.6vw, 1.7rem)",
              }}
            >
              {/* Left hairline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={showDetails ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width:           "clamp(38px, 7vw, 84px)",
                  height:          1,
                  background:      `linear-gradient(to left, ${C_PRIMARY}, transparent)`,
                  transformOrigin: "right center",
                  flexShrink:      0,
                }}
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.62em" }}
                animate={showDetails ? { opacity: 1, letterSpacing: "0.36em" } : {}}
                transition={{
                  opacity:       { duration: 0.65, ease: "easeOut" },
                  letterSpacing: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{
                  margin:        0,
                  padding:       0,
                  fontFamily:    `'${FONT_BODY}', 'Courier New', monospace`,
                  fontSize:      "clamp(0.41rem, 0.93vw, 0.53rem)",
                  letterSpacing: "0.36em",
                  marginRight:   "-0.36em",
                  color:         C_PRIMARY,
                  textTransform: "uppercase",
                  whiteSpace:    "nowrap",
                  userSelect:    "none",
                }}
              >
                {`Est.\u2002${EST}\u2002·\u2002${CITY}`}
              </motion.p>

              {/* Right hairline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={showDetails ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width:           "clamp(38px, 7vw, 84px)",
                  height:          1,
                  background:      `linear-gradient(to right, ${C_PRIMARY}, transparent)`,
                  transformOrigin: "left center",
                  flexShrink:      0,
                }}
              />
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}