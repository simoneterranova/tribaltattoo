/**
 * LoadingScreen — Animated loading screen
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * THE EXPERIENCE
 * ──────────────
 * Animated logo reveal with fade-in effects
 * Shop information display
 * Smooth transition to main content
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

// ─── Loading Messages ───────────────────────────────────
const LOADING_MESSAGES = [
  "INITIALIZING...",
  "LOADING...",
  `CONNECTING TO ${SHOP_NAME.toUpperCase()}...`,
  "PREPARING...",
  "READY.",
];

// ─── LoadingScreen ────────────────────────────────────────────────────────────
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Loading sequence
  useEffect(() => {
    const intervals = [300, 600, 500, 700, 400];
    let currentIndex = 0;
    
    const loadingSequence = () => {
      if (currentIndex < LOADING_MESSAGES.length) {
        setLoadingIndex(currentIndex);
        currentIndex++;
        setTimeout(loadingSequence, intervals[currentIndex - 1] || 500);
      }
    };

    loadingSequence();
  }, []);

  // Exit sequence
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 100);
    }, 3800);

    return () => clearTimeout(exitTimer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: C_BG,
            overflow: "hidden",
          }}
        >
          {/* Grid Background */}
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

          {/* Central Content */}
          <motion.div
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
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut",
              }}
              style={{
                position: "relative",
                width: "min(380px, 65vw)",
              }}
            >
              {/* Main Logo */}
              <motion.img
                src={LOGO}
                alt={SHOP_NAME}
                initial={{ filter: "blur(10px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                } as React.CSSProperties}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                color: C_ACCENT,
                textAlign: "center",
                minHeight: "1.5em",
              }}
            >
              {LOADING_MESSAGES[loadingIndex] && (
                <motion.div
                  key={loadingIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {LOADING_MESSAGES[loadingIndex]}
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
                }}
              />

              {/* Info Text */}
              <div
                style={{
                  fontFamily: `var(--font-heading)`,
                  fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  color: C_FG,
                  textTransform: "uppercase",
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