import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shopConfig from "@/config/shopConfig";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const targetText = Array.from(shopConfig.name);
  const [scrambledText, setScrambledText] = useState(targetText.map(() => "_"));
  const [isComplete, setIsComplete] = useState(false);
  const [lettersRevealed, setLettersRevealed] = useState<boolean[]>(targetText.map(() => false));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Letter scramble animation - scrambles then reveals correct letter
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    targetText.forEach((targetLetter, index) => {
      let count = 0;
      const maxScrambles = 15 + index * 2; // More scrambles for later letters
      
      const interval = setInterval(() => {
        count++;
        
        if (count <= maxScrambles) {
          // Scramble phase
          setScrambledText((prev) => {
            const newText = [...prev];
            newText[index] = chars[Math.floor(Math.random() * chars.length)];
            return newText;
          });
        } else {
          // Reveal correct letter
          setScrambledText((prev) => {
            const newText = [...prev];
            newText[index] = targetLetter;
            return newText;
          });
          setLettersRevealed((prev) => {
            const newRevealed = [...prev];
            newRevealed[index] = true;
            return newRevealed;
          });
          clearInterval(interval);
        }
      }, 60 + index * 30);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Progress bar synced with letter reveals
  useEffect(() => {
    const revealedCount = lettersRevealed.filter(r => r).length;
    const totalLetters = targetText.length;
    const targetProgress = (revealedCount / totalLetters) * 100;

    let animationFrame: number;
    let completed = false;

    const animate = () => {
      if (completed) return;
      
      setProgress(prev => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.1) return targetProgress;
        return prev + diff * 0.15;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    // When all letters revealed, complete loading
    if (revealedCount === totalLetters) {
      setTimeout(() => {
        setProgress(100);
        completed = true;
        cancelAnimationFrame(animationFrame);
        
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onLoadingComplete, 800);
        }, 400);
      }, 300);
    }

    return () => {
      completed = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [lettersRevealed, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-12"
        >
          {/* Logo Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl tracking-[0.3em] text-foreground relative"
          >
            {scrambledText.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  color: lettersRevealed[index] ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.3,
                  color: { duration: 0.4 }
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Brand Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: lettersRevealed.filter(r => r).length >= 3 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.4em] text-muted-foreground uppercase"
          >
            {shopConfig.city}
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1,
              y: 0
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-64 sm:w-80 space-y-4"
          >
            {/* Progress Bar */}
            <div className="relative w-full h-px bg-border/30 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ width: "100%" }}
              />
            </div>

            {/* Percentage */}
            <div className="font-body text-xs tracking-[0.35em] text-muted-foreground text-center">
              {Math.floor(progress)}%
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--primary) / 0.05), transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
