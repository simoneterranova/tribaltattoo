// ╔══════════════════════════════════════════════════════════════╗
// ║     CART DRAWER — MODERN E-COMMERCE SHOPPING CART            ║
// ╚══════════════════════════════════════════════════════════════╝

import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import ContactDialog from "./ContactDialog";
import shopConfig from "@/config/shopConfig";

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, itemCount, totalPrice, isOpen, setIsOpen } = useCart();

  // Calculate discount from shopConfig
  const hasDiscount = shopConfig.discount.enabled && itemCount >= shopConfig.discount.minItems;
  const discountAmount = hasDiscount ? totalPrice * (shopConfig.discount.percentage / 100) : 0;
  const finalPrice = totalPrice - discountAmount;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-l border-border">
        <SheetHeader className="border-b border-border pb-4 pr-10">
          <SheetTitle className="flex items-center gap-3 font-heading text-2xl">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Carrello
            {itemCount > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm font-body">
                {itemCount} {itemCount === 1 ? "articolo" : "articoli"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="font-body text-muted-foreground text-lg mb-2">Il tuo carrello è vuoto</p>
                <p className="font-body text-muted-foreground text-sm max-w-xs">
                  Inizia ad aggiungere i tuoi disegni preferiti per creare la tua collezione unica.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-background border border-border rounded-sm p-4 group"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 flex-shrink-0 bg-card rounded-sm overflow-hidden">
                          {item.src.endsWith('.mp4') || item.src.endsWith('.webm') || item.src.endsWith('.mov') ? (
                            <video
                              src={item.src}
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="font-heading text-foreground text-base line-clamp-1">
                                {item.label}
                              </h3>
                              <p className="font-body text-xs text-muted-foreground mt-1">
                                {item.category} • {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                              title="Rimuovi dal carrello"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-muted rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-background transition-colors rounded-sm"
                                title="Diminuisci quantità"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="font-body text-sm w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-background transition-colors rounded-sm"
                                title="Aumenta quantità"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-heading text-primary text-lg">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.originalPrice && (
                                <p className="font-body text-xs text-muted-foreground line-through">
                                  €{(item.originalPrice * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-border pt-6 mt-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-body text-muted-foreground">Subtotale</span>
                <span className="font-heading text-xl text-foreground">€{totalPrice.toFixed(2)}</span>
              </div>

              {/* Discount */}
              {hasDiscount && (
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-primary">
                    Sconto {shopConfig.discount.percentage}% ({shopConfig.discount.minItems}+ disegni)
                  </span>
                  <span className="font-heading text-lg text-primary">-€{discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-body text-lg font-semibold text-foreground">Totale</span>
                <span className="font-heading text-3xl text-primary">€{finalPrice.toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <ContactDialog>
                  <Button variant="hero" size="lg" className="w-full">
                    Completa Ordine
                  </Button>
                </ContactDialog>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continua Acquisti
                </Button>
              </div>

              <p className="text-center font-body text-xs text-muted-foreground">
                Contattaci per finalizzare l'ordine e discutere la personalizzazione
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
