/**
 * LoadingScreen — GENTRY Barbershop
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * THE EXPERIENCE
 * ──────────────
 * Pure darkness. The razor enters with real weight and momentum.
 * As the blade crosses the screen it BURNS the brand name in —
 * the cut line flares white-hot at the tip, cooling backward
 * through ivory → gold → amber, exactly like heated steel cooling.
 *
 * After the blade exits: the name settles. Two hairline rules
 * extend from centre outward flanking the tagline. Then a
 * cinematic iris-close dissolve into the app.
 *
 * CENTERING FIX
 * ─────────────
 * CSS letter-spacing adds trailing space after the LAST character,
 * shifting the visual block to the right. The fix:
 *   • The text wrapper uses display:flex + justifyContent:center
 *   • The text node itself carries a negative marginRight equal to
 *     the letterSpacing value, cancelling the phantom trailing gap
 *   • The clip-path container and the heat canvas both sit inside
 *     this same wrapper so they inherit identical geometry
 *   • The razor left-position uses the same coordinate space as the
 *     clip-path, so the blade tip tracks the reveal edge exactly
 *
 * ARCHITECTURE
 * ────────────
 * • RAF loop → sliceP (0→1) with barbershop-pull easing
 * • THREE composited text layers (dead / revealed / heat-canvas)
 * • Full procedural razor canvas redrawn every frame
 * • ResizeObserver keeps heat canvas in sync at every viewport size
 * • All values from shopConfig — zero hardcoding
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shopConfig from "@/config/shopConfig";

// ─── shopConfig bindings ──────────────────────────────────────────────────────
const NAME      = shopConfig.name;                // "GENTRY"
const CITY      = shopConfig.city;                // "Brooklyn, NY"
const EST       = shopConfig.established;         // "2018"
const FONT_HEAD = shopConfig.theme.fonts.heading; // "Bebas Neue"
const FONT_BODY = shopConfig.theme.fonts.body;    // "Space Grotesk"

// shopConfig stores HSL tokens WITHOUT the hsl() wrapper → we add it here
const hsl        = (t: string)              => `hsl(${t})`;
const hslA       = (t: string, a: number)   => `hsl(${t} / ${a})`;
const C_BG       = hsl(shopConfig.theme.colors.background);  // hsl(0 0% 4%)
const C_FG       = hsl(shopConfig.theme.colors.foreground);  // hsl(40 10% 92%)
const C_PRIMARY  = hsl(shopConfig.theme.colors.primary);     // hsl(36 55% 52%)
const pA         = (a: number) => hslA(shopConfig.theme.colors.primary, a);

// Fixed shades (derived from primary, not hardcoded identity)
const C_FG_DEAD  = "hsl(0,0%,6%)";   // near-invisible pre-cut ghost

// ─── Typography constants ────────────────────────────────────────────────────
// letterSpacing used on the brand name.
// The SAME value is used for paddingLeft on the wrapper and negative marginRight
// on the text so the visual block is perfectly centred.
const LS = "0.28em";

// ─── Timing (ms) ──────────────────────────────────────────────────────────────
const MS_PREDELAY  = 160;
const MS_SLICE     = 1780;
const MS_RAZOR_OUT = 480;
const MS_SETTLE    = 220;
const MS_DETAILS   = 380;
const MS_HOLD      = 1150;
const MS_EXIT      = 920;

// ─── Easing ──────────────────────────────────────────────────────────────────
// Barbershop-pull: explosive cubic-in, feather quad-out
function easeRazorPull(t: number): number {
  if (t < 0.65) {
    const r = t / 0.65;
    return r * r * r * 0.86;
  }
  const r = (t - 0.65) / 0.35;
  return 0.86 + (1 - (1 - r) * (1 - r)) * 0.14;
}

// ─── Razor canvas draw ────────────────────────────────────────────────────────
function drawRazor(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  glint: number,
): void {
  ctx.clearRect(0, 0, W, H);

  // Setup anatomical proportions
  const cy       = H * 0.50;
  const tipX     = 2;
  const pivotX   = W * 0.52;
  const tailX    = pivotX + (W * 0.08);

  const bladeLen = (pivotX - tipX) * 0.68;
  const heelX    = tipX + bladeLen;

  const bladeTop = cy - H * 0.22;
  const bladeBot = cy + H * 0.22;
  const tangTop  = cy - H * 0.065;
  const tangBot  = cy + H * 0.065;

  // Reusable handle function for front and back scales
  const drawHandle = (isBack: boolean) => {
    ctx.save();
    ctx.translate(pivotX, cy);
    // Back scale drops slightly lower for perspective
    ctx.rotate(isBack ? 10 * Math.PI / 180 : 7 * Math.PI / 180);
    if (isBack) ctx.translate(1, 2);

    const hLen      = W * 0.44;
    const hTopLocal = -H * 0.17;
    const hBotLocal = H * 0.17;

    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.bezierCurveTo(-14, hTopLocal, 10, hTopLocal, 30, hTopLocal + 2);
    ctx.lineTo(hLen - 20, hTopLocal + 6);
    ctx.bezierCurveTo(hLen, hTopLocal + 6, hLen, hBotLocal - 6, hLen - 20, hBotLocal - 6);
    ctx.lineTo(30, hBotLocal - 2);
    ctx.bezierCurveTo(10, hBotLocal, -14, hBotLocal, -14, 0);
    ctx.closePath();

    if (isBack) {
      // Dark/shadowed back scale
      ctx.fillStyle = "#0c0603";
      ctx.fill();
    } else {
      // Rich tortoiseshell / polished dark wood front scale
      const woodGrad = ctx.createLinearGradient(0, hTopLocal, 0, hBotLocal);
      woodGrad.addColorStop(0, "#2b180d");
      woodGrad.addColorStop(0.2, "#4a2a16");
      woodGrad.addColorStop(0.5, "#1c0f07");
      woodGrad.addColorStop(0.8, "#381f10");
      woodGrad.addColorStop(1, "#0d0703");
      ctx.fillStyle = woodGrad;
      ctx.fill();

      // Delicate bevel highlight
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth   = 1;
      ctx.stroke();

      // Handle spacer pin (at the end of the scale)
      ctx.beginPath();
      ctx.arc(hLen - 15, 0, 2.5, 0, Math.PI * 2);
      const pinGrad = ctx.createRadialGradient(hLen - 16, -1, 0, hLen - 15, 0, 2.5);
      pinGrad.addColorStop(0, "#ffeaa7");
      pinGrad.addColorStop(1, "#8a6d1c");
      ctx.fillStyle = pinGrad;
      ctx.fill();
    }
    ctx.restore();
  };

  // 1. DRAW BACK SCALE
  drawHandle(true);

  // 2. DRAW BLADE & TANG
  const createBladePath = () => {
    ctx.beginPath();
    // Start top left (spine point)
    ctx.moveTo(tipX + 12, bladeTop);
    // Straight spine
    ctx.lineTo(heelX, bladeTop);
    // Drop down into tang (Shoulder)
    ctx.quadraticCurveTo(heelX + 8, bladeTop, heelX + 12, tangTop);
    ctx.lineTo(pivotX, tangTop);
    // Curled Tail (sticking out past the pivot)
    ctx.quadraticCurveTo(tailX + 2, tangTop - 2, tailX + 8, cy - 6);
    ctx.quadraticCurveTo(tailX + 2, tangBot + 4, pivotX, tangBot);
    // Tang bottom
    ctx.lineTo(heelX + 12, tangBot);
    // Drop down into heel
    ctx.quadraticCurveTo(heelX + 8, bladeBot, heelX, bladeBot);
    // Cutting edge (slight traditional smile curve)
    ctx.quadraticCurveTo(tipX + (bladeLen / 2), bladeBot + 2, tipX + 12, bladeBot);
    // Dutch Point (rounded nose rolling up to the spine)
    ctx.quadraticCurveTo(tipX, bladeBot, tipX, cy);
    ctx.quadraticCurveTo(tipX, bladeTop, tipX + 12, bladeTop);
    ctx.closePath();
  };

  createBladePath();

  // Master steel gradient for the iconic "Hollow Ground" look
  const steelGrad = ctx.createLinearGradient(0, bladeTop, 0, bladeBot);
  steelGrad.addColorStop(0,    "#e8e8e8"); // Spine top
  steelGrad.addColorStop(0.08, "#6b6b6b"); // Spine shadow
  steelGrad.addColorStop(0.12, "#444444"); // Spine edge bevel
  steelGrad.addColorStop(0.18, "#d4d4d4"); // Hollow grind top transition
  steelGrad.addColorStop(0.40, "#ffffff"); // Hollow grind belly (bright)
  steelGrad.addColorStop(0.70, "#666666"); // Hollow grind bottom shadow
  steelGrad.addColorStop(0.85, "#cccccc"); // Edge bevel start
  steelGrad.addColorStop(0.95, "#ffffff"); // Edge micro-highlight
  steelGrad.addColorStop(1,    "#111111"); // Absolute cutting edge (dark = sharp)

  ctx.fillStyle = steelGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth   = 0.5;
  ctx.stroke();

  // Hollow grind vertical shoulder line
  ctx.beginPath();
  ctx.moveTo(heelX, bladeTop + 2);
  ctx.quadraticCurveTo(heelX + 6, cy, heelX, bladeBot - 2);
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth   = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(heelX + 1, bladeTop + 2);
  ctx.quadraticCurveTo(heelX + 7, cy, heelX + 1, bladeBot - 2);
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth   = 1;
  ctx.stroke();

  // Jimping (small grip lines on the tang)
  ctx.strokeStyle = "rgba(0,0,0,0.6)";
  ctx.lineWidth   = 1;
  for (let i = 0; i < 6; i++) {
    let jx = heelX + 16 + i * 4;
    if (jx < pivotX - 6) {
      ctx.beginPath();
      ctx.moveTo(jx, tangBot);
      ctx.lineTo(jx, tangBot - 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(jx, tangTop);
      ctx.lineTo(jx, tangTop + 3);
      ctx.stroke();
    }
  }

  // Maker's Mark (etched into tang)
  ctx.save();
  ctx.translate(heelX + 14, cy);
  ctx.beginPath();
  ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.lineWidth   = 0.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-1, -1);
  ctx.lineTo(1, 1);
  ctx.moveTo(1, -1);
  ctx.lineTo(-1, 1);
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth   = 0.5;
  ctx.stroke();
  ctx.restore();

  // Specular Glint (Traveling highlight constrained inside blade path)
  if (glint > 0 && glint < 1) {
    ctx.save();
    createBladePath();
    ctx.clip();
    const bladeFullLen = tailX - tipX;
    const gx           = tipX + bladeFullLen * glint;
    const gSpan        = W * 0.08;
    const glintGrad    = ctx.createLinearGradient(gx - gSpan, 0, gx + gSpan, 0);
    glintGrad.addColorStop(0,    "rgba(255,255,255,0)");
    glintGrad.addColorStop(0.35, "rgba(255,245,210,0.15)");
    glintGrad.addColorStop(0.50, "rgba(255,255,255,0.95)");
    glintGrad.addColorStop(0.65, "rgba(255,245,210,0.15)");
    glintGrad.addColorStop(1,    "rgba(255,255,255,0)");
    ctx.fillStyle = glintGrad;
    ctx.globalCompositeOperation = "screen";
    ctx.fillRect(gx - gSpan, bladeTop - 5, gSpan * 2, (bladeBot - bladeTop) + 10);
    ctx.restore();
  }

  // Centerline highlight separating shadow/light on hollow grind
  ctx.beginPath();
  ctx.moveTo(tipX + 8, cy - 1);
  ctx.lineTo(heelX - 2, cy - 1);
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth   = 0.5;
  ctx.stroke();

  // 3. DRAW FRONT SCALE
  drawHandle(false);

  // 4. MAIN PIVOT PIN
  ctx.beginPath();
  ctx.arc(pivotX, cy, 4.5, 0, Math.PI * 2);
  const pinGrad = ctx.createRadialGradient(pivotX - 1.5, cy - 1.5, 0.5, pivotX, cy, 4.5);
  pinGrad.addColorStop(0,   "#fff5c3");
  pinGrad.addColorStop(0.4, "#d4af37");
  pinGrad.addColorStop(1,   "#634e11");
  ctx.fillStyle = pinGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth   = 0.8;
  ctx.stroke();

  // Pivot micro-highlight
  ctx.beginPath();
  ctx.arc(pivotX - 1.5, cy - 1.5, 1, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill();
}

// ─── Heat-glow canvas draw ────────────────────────────────────────────────────
function drawHeatGlow(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  bladeXPx: number,
): void {
  ctx.clearRect(0, 0, W, H);
  if (bladeXPx <= 2) return;
  const start = Math.max(0, bladeXPx - 300);
  const hotG = ctx.createLinearGradient(start, 0, bladeXPx + 6, 0);
  hotG.addColorStop(0,    "rgba(0,0,0,0)");
  hotG.addColorStop(0.42, "rgba(195,148,38,0.050)");
  hotG.addColorStop(0.68, "rgba(235,195,90,0.165)");
  hotG.addColorStop(0.85, "rgba(255,238,155,0.460)");
  hotG.addColorStop(0.95, "rgba(255,255,220,0.720)");
  hotG.addColorStop(1.00, "rgba(255,255,255,0.880)");
  ctx.fillStyle = hotG;
  ctx.fillRect(0, 0, Math.min(bladeXPx + 8, W), H);
}

// ─── RazorCanvas ─────────────────────────────────────────────────────────────
function RazorCanvas({ glintPos, opacity }: { glintPos: number; opacity: number }) {
  const ref     = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const w = c.offsetWidth, h = c.offsetHeight;
    if (sizeRef.current.w !== w || sizeRef.current.h !== h) {
      c.width  = w * dpr;
      c.height = h * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w, h };
    }
    drawRazor(ctx, w, h, glintPos);
  }, [glintPos]);

  return (
    <canvas
      ref={ref}
      style={{
        display:    "block",
        width:      "100%",
        height:     "100%",
        opacity,
        transition: opacity < 1
          ? `opacity ${MS_RAZOR_OUT}ms cubic-bezier(0.65,0,1,1)`
          : "none",
        filter:
          "drop-shadow(0 0 20px rgba(196,162,60,0.44))" +
          " drop-shadow(0 10px 30px rgba(0,0,0,0.98))",
        willChange: "opacity",
      }}
    />
  );
}

// ─── HeatCanvas ──────────────────────────────────────────────────────────────
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
  const[isExiting,   setIsExiting]   = useState(false);

  // The text wrapper (used for heat-canvas sizing via ResizeObserver)
  const textWrapRef = useRef<HTMLDivElement>(null);
  const[wrapSz,    setWrapSz]    = useState({ w: 0, h: 0 });

  const rafRef = useRef<number>();
  const t0Ref  = useRef<number | null>(null);

  // Measure text wrapper
  useEffect(() => {
    const el = textWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setWrapSz({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  },[]);

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
  },[]);

  // Phase machine
  useEffect(() => {
    if (phase === "pre") {
      const t = setTimeout(() => { setPhase("slicing"); startSlice(); }, MS_PREDELAY);
      return () => clearTimeout(t);
    }
    if (phase === "settling") {
      const t = setTimeout(() => setPhase("revealing"), MS_RAZOR_OUT + MS_SETTLE);
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
    () => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); },[],
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const isSlicing    = phase === "slicing";
  const razorVisible = phase === "pre" || isSlicing;
  const razorOpacity = razorVisible ? 1 : 0;
  const heatOpacity  = isSlicing ? 1 : 0;

  // clip-path: right side collapses as blade advances (left→right reveal)
  const clipRight = `${(1 - sliceP) * 100}%`;

  // Razor left inside the text wrapper:
  //   sliceP=0 → -15% (tip fully off-left)
  //   sliceP=1 → +115% (tip fully off-right)
  const razorLeft = `calc(${sliceP * 130 - 15}% - 6px)`;

  // Heat canvas blade-x fraction
  const heatFrac = Math.max(0, Math.min(1, sliceP));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="gentry-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: MS_EXIT / 1000, ease:[0.90, 0, 0.10, 1] },
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
                " transparent 14%, rgba(0,0,0,0.80) 100%)",
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
                ` ${pA(0.062)}, transparent 76%)`,
            }}
          />

          {/* ── Horizontal light streak (screen-level, z above content) ── */}
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
              width:         "min(760px, 86vw)",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
            }}
          >

            {/* ══ LOGO STAGE ══════════════════════════════════════════════ */}
            <div
              ref={textWrapRef}
              style={{
                position:     "relative",
                width:        "100%",
                marginBottom: showDetails
                  ? "clamp(1.5rem, 3.2vw, 2.2rem)"
                  : "clamp(0.3rem, 0.8vw, 0.5rem)",
                transition:   "margin-bottom 0.75s cubic-bezier(0.22,1,0.36,1)",
              }}
            >

              {/* ── Layer A: dim/pre-cut text (establishes block height) ── */}
              <div
                aria-hidden
                style={{
                  display:        "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize:      "clamp(5.5rem, 15.5vw, 10rem)",
                    lineHeight:    1,
                    letterSpacing: LS,
                    marginRight:   `-${LS}`,
                    fontFamily:    `'${FONT_HEAD}', 'Arial Narrow', sans-serif`,
                    fontWeight:    400,
                    color:         C_FG_DEAD,
                    userSelect:    "none",
                    textShadow:    `0 0 55px ${pA(0.12)}`,
                    display:       "block",
                  }}
                >
                  {NAME}
                </span>
              </div>

              {/* ── Layer B: revealed text + heat glow (absolute overlay) ── */}
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  clipPath:   `inset(0 ${clipRight} 0 0)`,
                  willChange: "clip-path",
                }}
              >
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "center",
                    position:       "relative",
                    width:          "100%",
                    height:         "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize:      "clamp(5.5rem, 15.5vw, 10rem)",
                      lineHeight:    1,
                      letterSpacing: LS,
                      marginRight:   `-${LS}`,
                      fontFamily:    `'${FONT_HEAD}', 'Arial Narrow', sans-serif`,
                      fontWeight:    400,
                      color:         C_FG,
                      userSelect:    "none",
                      textShadow:
                        `0 0 120px ${pA(0.13)},` +
                        ` 0 2px 24px rgba(0,0,0,0.99)`,
                      display:       "block",
                    }}
                  >
                    {NAME}
                  </span>

                  {/* Heat-glow canvas: screen-blended over the revealed text */}
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

              {/* ── Razor: absolute inside wrapper, tip at clip edge ─────── */}
              <div
                aria-hidden
                style={{
                  position:      "absolute",
                  top:           "50%",
                  left:          razorLeft,
                  width:         "min(325px, 52vw)",
                  height:        "min(78px, 12.5vw)",
                  transform:     "translateY(-53%) rotate(-1.2deg)",
                  pointerEvents: "none",
                  willChange:    "left",
                }}
              >
                <RazorCanvas glintPos={sliceP} opacity={razorOpacity} />
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
                transition={{ duration: 1.05, ease:[0.22, 1, 0.36, 1] }}
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
                  letterSpacing: { duration: 1.15, ease:[0.22, 1, 0.36, 1] },
                }}
                style={{
                  margin:        0,
                  padding:       0,
                  fontFamily:    `'${FONT_BODY}', 'Courier New', monospace`,
                  fontSize:      "clamp(0.41rem, 0.93vw, 0.53rem)",
                  letterSpacing: "0.36em",
                  // Cancel trailing spacing so tagline centres between the rules
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
                transition={{ duration: 1.05, ease:[0.22, 1, 0.36, 1] }}
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