/**
 * LoadingScreen — The Masterpiece · Tribal Tattoo Studio
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * CONCEPT: "The Machine & The Skin"
 * ─────────────────────────────────────
 * Flawless choreography. No nested variant bugs. 
 * Mathematical precision for every SVG coordinate and delay.
 * Typography uses true clipping masks for a razor-sharp reveal.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shopConfig from "@/config/shopConfig";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const LOGO       = shopConfig.logo;
const SHOP_NAME  = shopConfig.name;
const CITY       = shopConfig.city;
const EST        = shopConfig.established;

const hslA = (t: string, a: number) => `hsl(${t} / ${a})`;
const C_BG  = hslA(shopConfig.theme.colors.background, 1);
const C_RED = hslA(shopConfig.theme.colors.primary, 1);
const C_FG  = hslA(shopConfig.theme.colors.foreground, 1);

// Cinematic Custom Easing Curves
const EASE_DRAW   = [0.25, 1, 0.5, 1] as const;       // Smooth, deliberate ink flow
const EASE_STRIKE = [0.76, 0, 0.24, 1] as const;      // Aggressive mechanical snap
const EASE_TEXT   = [0.16, 1, 0.3, 1] as const;       // Buttery smooth slide

// ─── SVG Geometry Engine (1000x1000 Canvas for Ultra-HD) ──────────────────────
const CX = 500, CY = 500;
const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const pt = (r: number, deg: number) => ({
  x: CX + r * Math.cos(toRad(deg)),
  y: CY + r * Math.sin(toRad(deg)),
});
const f = (n: number) => n.toFixed(2);

// Perfect circle path (so pathLength works flawlessly)
const circle = (r: number) => 
  `M ${CX} ${CY - r} A ${r} ${r} 0 1 1 ${CX} ${CY + r} A ${r} ${r} 0 1 1 ${CX} ${CY - r}`;

// Niho Taniwha (Shark Teeth)
const getTooth = (innerR: number, outerR: number, count: number, i: number, offset = 0) => {
  const step = 360 / count;
  const p1 = pt(innerR, offset + i * step);
  const p2 = pt(outerR, offset + (i + 0.5) * step);
  const p3 = pt(innerR, offset + (i + 1) * step);
  return `${f(p1.x)},${f(p1.y)} ${f(p2.x)},${f(p2.y)} ${f(p3.x)},${f(p3.y)}`;
};

// Puhoro/Cross Spearheads
const getSpear = (tipR: number, baseR: number, widthDeg: number, deg: number) => {
  const tip = pt(tipR, deg);
  const left = pt(baseR, deg - widthDeg);
  const right = pt(baseR, deg + widthDeg);
  return `M ${f(left.x)} ${f(left.y)} L ${f(tip.x)} ${f(tip.y)} L ${f(right.x)} ${f(right.y)}`;
};

// ─── Component: Mandala Vault ─────────────────────────────────────────────────
const Mandala = () => {
  // Pre-calculate geometry to prevent React re-render jank
  const rings = useMemo(() => [140, 260, 380], []);
  const innerTeeth = useMemo(() => Array.from({ length: 24 }, (_, i) => getTooth(140, 175, 24, i)), []);
  const outerTeeth = useMemo(() => Array.from({ length: 48 }, (_, i) => getTooth(380, 420, 48, i, 3.75)), []);
  const spears = useMemo(() => Array.from({ length: 8 }, (_, i) => getSpear(360, 275, 6, i * 45)), []);
  const dots = useMemo(() => Array.from({ length: 24 }, (_, i) => pt(220, i * 15)), []);

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
        filter: `drop-shadow(0px 0px 15px ${hslA(shopConfig.theme.colors.primary, 0.35)})`,
      }}
    >
      {/* 1. Base Rings (Draw slowly like tracing) */}
      {rings.map((r, i) => (
        <motion.path
          key={`ring-${i}`}
          d={circle(r)}
          fill="none" stroke={C_RED} strokeWidth={r === 380 ? 4 : 1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: i * 0.4, ease: EASE_DRAW }}
        />
      ))}

      {/* 2. Inner Teeth (Snap in sequentially) */}
      {innerTeeth.map((pts, i) => (
        <motion.polygon
          key={`it-${i}`} points={pts} fill={C_RED}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }} // PERFECT origin
          transition={{ duration: 0.3, delay: 0.8 + (i * 0.04), ease: EASE_STRIKE }}
        />
      ))}

      {/* 3. Dotwork Orbit */}
      {dots.map((p, i) => (
        <motion.circle
          key={`dot-${i}`} cx={f(p.x)} cy={f(p.y)} r={3} fill={C_RED}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 + (i * 0.03), ease: "backOut" }}
        />
      ))}

      {/* 4. Cross Spears (Violent strike outward) */}
      {spears.map((d, i) => (
        <motion.path
          key={`sp-${i}`} d={d} fill="none" stroke={C_RED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.8 + (i * 0.1), ease: EASE_STRIKE }}
        />
      ))}

      {/* 5. Outer Teeth (Final lock-in) */}
      {outerTeeth.map((pts, i) => (
        <motion.polygon
          key={`ot-${i}`} points={pts} fill={C_RED}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 0.2, delay: 2.2 + (i * 0.02), ease: EASE_STRIKE }}
        />
      ))}

      {/* 6. Hypnotic Dash Ring (Continuous spin after drawing) */}
      <motion.path
        d={circle(260)} fill="none" stroke={C_RED} strokeWidth={2} strokeDasharray="6 18"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{
          pathLength: { duration: 1.5, delay: 0.4, ease: EASE_DRAW },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
      />
    </svg>
  );
};



// ─── Component: LoadingScreen (Main) ──────────────────────────────────────────
export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Unmount orchestration: Let the sequence breathe, then collapse.
    const t = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 1200);
    }, 4800);
    return () => clearTimeout(t);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, scale: 1.05, filter: "blur(8px)", 
            transition: { duration: 1.2, ease: EASE_STRIKE } 
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: C_BG, overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Ambient Machine Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(circle at center, ${hslA(shopConfig.theme.colors.primary, 0.12)} 0%, transparent 55%)`,
            }}
          />

          {/* The Geometry */}
          <Mandala />

          {/* Brand Identity */}
          <div
            style={{
              position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
              alignItems: "center", pointerEvents: "none", gap: "1rem"
            }}
          >
            {/* Logo Materialization */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1.2, delay: 2.6, ease: EASE_TEXT }}
              style={{ width: "clamp(200px, 30vw, 320px)" }}
            >
              <img src={LOGO} alt={SHOP_NAME} style={{ width: "100%", height: "auto", display: "block" }} />
            </motion.div>
          </div>

          {/* Cinematic Letterbox Lines */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: EASE_STRIKE }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: C_RED, transformOrigin: "left" }}
          />
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: EASE_STRIKE }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: C_RED, transformOrigin: "right" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}