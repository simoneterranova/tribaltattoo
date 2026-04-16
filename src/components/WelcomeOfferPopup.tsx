// ╔══════════════════════════════════════════════════════════════╗
// ║     WELCOME OFFER POPUP — DISCOUNT FOR BULK PURCHASES        ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const WelcomeOfferPopup = () => {
  // Only show popup if discount is enabled
  if (!shopConfig.discount.enabled) {
    return null;
  }
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup every time user lands on the page
    const timer = setTimeout(() => setIsVisible(true), 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAccept = () => {
    handleClose();
    // Scroll to products
    const productsSection = document.getElementById("products-grid");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl pointer-events-auto">
            <div className="relative bg-card border-2 border-primary rounded-sm overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--primary))' }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-2.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Chiudi"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative p-5 sm:p-6 md:p-8 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full mb-3 sm:mb-4"
                >
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-2"
                >
                  Offerta Speciale<span className="text-primary">!</span>
                </motion.h2>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-5"
                >
                  Benvenuto nella nostra collezione esclusiva
                </motion.p>

                {/* Offer Details */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-primary/10 border border-primary/30 rounded-sm p-4 sm:p-5 mb-4 sm:mb-5"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                    <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary">-{shopConfig.discount.percentage}%</span>
                  </div>
                  <p className="font-body text-sm sm:text-base text-foreground font-medium mb-1">
                    Sconto su acquisti multipli
                  </p>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground">
                    Acquista {shopConfig.discount.minItems} o più disegni e ricevi automaticamente{" "}
                    il <strong className="text-primary">{shopConfig.discount.percentage}% di sconto</strong> sul totale
                  </p>
                </motion.div>

                {/* Features - Compact Grid */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5 sm:mb-6 text-left max-w-md mx-auto"
                >
                  {[
                    "✓ Design personalizzabili",
                    "✓ 30+ anni esperienza",
                    "✓ Originali unici",
                    "✓ Consulenza gratuita",
                  ].map((item, index) => (
                    <li key={index} className="font-body text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5">
                      <span className="text-primary flex-shrink-0 mt-0.5">{item.charAt(0)}</span>
                      <span className="leading-tight">{item.slice(2)}</span>
                    </li>
                  ))}
                </motion.ul>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full gap-2 text-sm sm:text-base h-10 sm:h-11"
                    onClick={handleAccept}
                  >
                    Inizia a Cercare
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground hover:text-foreground text-xs sm:text-sm h-8 sm:h-9"
                    onClick={handleClose}
                  >
                    Forse più tardi
                  </Button>
                </motion.div>

                {/* Fine Print */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-body text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 leading-tight"
                >
                  * Lo sconto viene applicato automaticamente con {shopConfig.discount.minItems}+ articoli
                </motion.p>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOfferPopup;
