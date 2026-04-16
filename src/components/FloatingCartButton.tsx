// ╔══════════════════════════════════════════════════════════════╗
// ║     FLOATING CART BUTTON — STICKY CART INDICATOR             ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const FloatingCartButton = () => {
  const { itemCount, setIsOpen } = useCart();

  // Only show if there are items in cart
  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-2xl transition-colors"
        aria-label={`Carrello con ${itemCount} ${itemCount === 1 ? "articolo" : "articoli"}`}
      >
        <ShoppingCart className="h-6 w-6" />
        <Badge className="absolute -top-2 -right-2 bg-primary-foreground text-primary px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center font-body text-xs">
          {itemCount}
        </Badge>

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingCartButton;
