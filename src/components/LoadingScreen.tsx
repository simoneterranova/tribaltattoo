/**
 * LoadingScreen — ULTIMATE CYBERPUNK EDITION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * THE EXPERIENCE
 * ──────────────
 * System boot sequence → Digital materialization → Matrix code rain
 * Logo emerges through layers of digital corruption and RGB split glitches
 * Pulsing energy rings, hexadecimal streams, terminal commands
 * Cinematic reveal with dramatic effects
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shopConfig from "@/config/shopConfig";

// ─── Config ───────────────────────────────────────────────────────────────────
const LOGO         = shopConfig.logo;
const SHOP_NAME    = shopConfig.name;
const CITY         = shopConfig.city;
const EST          = shopConfig.established;
const FONT_HEADING = shopConfig.theme.fonts.heading;

const hsl        = (t: string)            => `hsl(${t})`;
const hslA       = (t: string, a: number) => `hsl(${t} / ${a})`;
const C_BG       = hsl(shopConfig.theme.colors.background);
const C_ACCENT   = hsl(shopConfig.theme.colors.accent);        // Forest Green
const C_PRIMARY  = hsl(shopConfig.theme.colors.primary);       // Brick Red
const C_FG       = hsl(shopConfig.theme.colors.foreground);    // Warm Parchment
const accentA    = (a: number) => hslA(shopConfig.theme.colors.accent, a);

// ─── Terminal Boot Messages ──────────────────────────────────────────────────
const BOOT_MESSAGES = [
  "INITIALIZING SYSTEM...",
  "LOADING NEURAL MATRIX...",
  `CONNECTING TO ${SHOP_NAME.toUpperCase()}...`,
  "SYNCHRONIZING DATA STREAMS...",
  "READY.",
];

// ─── Matrix Code Rain Component ──────────────────────────────────────────────
function MatrixRain({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    let animationId: number;
    
    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = "rgba(26, 26, 24, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = C_ACCENT;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transition: "opacity 0.8s ease",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Hexadecimal Stream ───────────────────────────────────────────────────────
function HexStream({ delay, duration }: { delay: number; duration: number }) {
  const [hex, setHex] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHex(Array.from({ length: 48 }, () => 
        Math.floor(Math.random() * 16).toString(16).toUpperCase()
      ).join(" "));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: [0, 0.6, 0], x: 0 }}
      transition={{ delay, duration, ease: "linear" }}
      style={{
        position: "absolute",
        left: "5%",
        fontFamily: "monospace",
        fontSize: "0.7rem",
        color: C_ACCENT,
        textShadow: `0 0 10px ${accentA(0.8)}`,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      0x{hex}
    </motion.div>
  );
}

// ─── LoadingScreen ────────────────────────────────────────────────────────────
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [bootIndex, setBootIndex] = useState(0);
  const [matrixOpacity, setMatrixOpacity] = useState(0.4);
  const [isExiting, setIsExiting] = useState(false);
  const [crtShutdown, setCrtShutdown] = useState(false);

  // Boot sequence
  useEffect(() => {
    const intervals = [300, 600, 500, 700, 400];
    let currentIndex = 0;
    
    const bootSequence = () => {
      if (currentIndex < BOOT_MESSAGES.length) {
        setBootIndex(currentIndex);
        currentIndex++;
        setTimeout(bootSequence, intervals[currentIndex - 1] || 500);
      } else {
        // Boot complete, start matrix fade
        setTimeout(() => setMatrixOpacity(0.15), 300);
      }
    };

    bootSequence();
  }, []);

  // Exit sequence with CRT shutdown
  useEffect(() => {
    const crtTimer = setTimeout(() => {
      setCrtShutdown(true);
      // After CRT animation completes, trigger final exit
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadingComplete, 100);
      }, 1500); // CRT animation duration (1.5s)
    }, 3800); // Start CRT shutdown at 3.8s

    return () => clearTimeout(crtTimer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="cyber-loader"
          initial={{ opacity: 1 }}
          animate={crtShutdown ? {
            scaleY: [1, 0.008, 0.008, 0.008, 0],
            scaleX: [1, 1, 1, 0.01, 0],
            opacity: [1, 1, 1, 1, 0],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1.8)", "brightness(2.5)", "brightness(0)"],
          } : {}}
          exit={{
            opacity: 0,
            transition: { duration: 0.1, ease: "easeOut" },
          }}
          transition={crtShutdown ? {
            duration: 1.5,
            times: [0, 0.6, 0.7, 0.92, 1],
            ease: "easeInOut",
          } : {}}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: C_BG,
            overflow: "hidden",
            transformOrigin: "center center",
          }}
        >
          {/* Matrix Code Rain Background */}
          <motion.div
            animate={crtShutdown ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MatrixRain opacity={matrixOpacity} />
          </motion.div>

          {/* CRT Shutdown Flash Effect */}
          {crtShutdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.35, 0.2, 0] }}
              transition={{ duration: 1.5, times: [0, 0.3, 0.6, 0.85, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 60% 30% at 50% 50%, rgba(255,255,255,0.8), transparent 70%)",
                pointerEvents: "none",
                zIndex: 100,
              }}
            />
          )}

          {/* Cyberpunk Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(hsl(127 14% 36% / 0.05) 1px, transparent 1px), " +
                "linear-gradient(90deg, hsl(127 14% 36% / 0.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              opacity: 0.6,
            }}
          />

          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, " +
                "hsl(127 14% 36% / 0.03) 2px, hsl(127 14% 36% / 0.03) 4px)",
              pointerEvents: "none",
            }}
          />

          {/* Hex Streams */}
          <motion.div
            animate={crtShutdown ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${20 + i * 15}%`,
                  width: "100%",
                }}
              >
                <HexStream delay={0.5 + i * 0.3} duration={2.5} />
              </div>
            ))}
          </motion.div>

          {/* Central Content */}
          <motion.div
            animate={crtShutdown ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Logo with Dramatic Effects */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                position: "relative",
                width: "min(380px, 65vw)",
                perspective: "1000px",
              }}
            >
              {/* Pulsing Energy Rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.3, 1.5],
                    opacity: [0.6, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.2 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    inset: -20,
                    border: `2px solid ${C_ACCENT}`,
                    borderRadius: "4px",
                    boxShadow: `0 0 30px ${accentA(0.6)}, inset 0 0 30px ${accentA(0.3)}`,
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Corner Brackets */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
                const positions = {
                  "top-left": { top: -16, left: -16, borderTop: `3px solid ${C_ACCENT}`, borderLeft: `3px solid ${C_ACCENT}` },
                  "top-right": { top: -16, right: -16, borderTop: `3px solid ${C_ACCENT}`, borderRight: `3px solid ${C_ACCENT}` },
                  "bottom-left": { bottom: -16, left: -16, borderBottom: `3px solid ${C_ACCENT}`, borderLeft: `3px solid ${C_ACCENT}` },
                  "bottom-right": { bottom: -16, right: -16, borderBottom: `3px solid ${C_ACCENT}`, borderRight: `3px solid ${C_ACCENT}` },
                };

                return (
                  <motion.div
                    key={corner}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    style={{
                      position: "absolute",
                      width: 40,
                      height: 40,
                      ...positions[corner as keyof typeof positions],
                      boxShadow: `0 0 15px ${accentA(0.5)}`,
                    }}
                  />
                );
              })}

              {/* Main Logo with Glitch */}
              <motion.img
                src={LOGO}
                alt={SHOP_NAME}
                className="cyber-glitch-2"
                initial={{ filter: "blur(20px) brightness(0.3)" }}
                animate={{ filter: "blur(0px) brightness(1.1)" }}
                transition={{ duration: 1.2, delay: 1.0 }}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: `drop-shadow(0 0 40px ${accentA(0.6)}) drop-shadow(0 0 80px ${accentA(0.3)})`,
                  '--og-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                } as React.CSSProperties}
              />

              {/* RGB Split Effect */}
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${LOGO})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  mixBlendMode: "screen",
                  filter: "blur(3px)",
                  transform: "translate(-3px, 0)",
                  opacity: 0.6,
                }}
              />
            </motion.div>

            {/* Boot Terminal Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: "monospace",
                fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                color: C_ACCENT,
                textAlign: "center",
                textShadow: `0 0 10px ${accentA(0.8)}`,
                minHeight: "1.5em",
              }}
            >
              {BOOT_MESSAGES[bootIndex] && (
                <motion.div
                  key={bootIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {"> "}{BOOT_MESSAGES[bootIndex]}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </motion.div>
              )}
            </motion.div>

            {/* Shop Info Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1rem, 3vw, 2rem)",
              }}
            >
              {/* Left Line */}
              <div
                style={{
                  width: "clamp(50px, 10vw, 100px)",
                  height: 2,
                  background: `linear-gradient(to left, ${C_ACCENT}, transparent)`,
                  boxShadow: `0 0 10px ${accentA(0.6)}`,
                }}
              />

              {/* Info Text */}
              <div
                style={{
                  fontFamily: `'${FONT_HEADING}', 'Orbitron', monospace`,
                  fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  color: C_FG,
                  textTransform: "uppercase",
                  textShadow: `0 0 15px ${accentA(0.4)}`,
                }}
              >
                EST. {EST} · {CITY}
              </div>

              {/* Right Line */}
              <div
                style={{
                  width: "clamp(50px, 10vw, 100px)",
                  height: 2,
                  background: `linear-gradient(to right, ${C_ACCENT}, transparent)`,
                  boxShadow: `0 0 10px ${accentA(0.6)}`,
                }}
              />
            </motion.div>

            {/* Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              style={{
                width: "min(300px, 70vw)",
                height: 3,
                background: "rgba(78,104,81,0.2)",
                border: `1px solid ${accentA(0.3)}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 2.6, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${C_ACCENT}, ${C_PRIMARY})`,
                  boxShadow: `0 0 20px ${accentA(0.8)}`,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}