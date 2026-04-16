// ╔══════════════════════════════════════════════════════════════╗
// ║     PRODUCT CARD — E-COMMERCE DISEGNI CARD                   ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductCardProps {
  id: string;
  src: string;
  alt: string;
  label: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  size: string;
  badge?: string | null;
  description?: string;
  index: number;
}

const ProductCard = ({
  id,
  src,
  alt,
  label,
  category,
  price,
  originalPrice,
  size,
  badge,
  description,
  index,
}: ProductCardProps) => {
  const { addToCart, items, setIsOpen } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = items.some((item) => item.id === id);

  const handleAddToCart = () => {
    addToCart({ id, label, category, price, originalPrice, src, alt, size });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickAddToCart = () => {
    handleAddToCart();
    setTimeout(() => setIsOpen(true), 300);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        className="group relative bg-card border border-border rounded-sm overflow-hidden hover:border-primary/50 transition-all duration-300"
      >
        {/* Badge */}
        {badge && (
          <Badge
            variant={badge === "In Offerta" ? "destructive" : "default"}
            className="absolute top-3 left-3 z-10 font-body text-xs uppercase tracking-wider"
          >
            {badge}
          </Badge>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
          title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov') ? (
            <video
              src={src}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading={index < 8 ? "eager" : "lazy"}
            />
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsQuickViewOpen(true)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Anteprima
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="font-body text-xs text-primary uppercase tracking-wider mb-2">
            {category}
          </p>

          {/* Title */}
          <h3 className="font-heading text-foreground text-lg mb-1 line-clamp-1">
            {label}
          </h3>

          {/* Size */}
          <p className="font-body text-xs text-muted-foreground mb-3">
            {size}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-heading text-2xl text-primary">
                €{price.toFixed(2)}
              </p>
              {originalPrice && (
                <p className="font-body text-sm text-muted-foreground line-through">
                  €{originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            <Button
              variant={isInCart || justAdded ? "outline" : "default"}
              size="sm"
              onClick={handleAddToCart}
              className="gap-2 flex-shrink-0"
              disabled={justAdded}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Aggiunto
                </>
              ) : isInCart ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Nel carrello
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Aggiungi
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl bg-card max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="pr-8">
            <DialogTitle className="font-heading text-2xl sm:text-3xl">{label}</DialogTitle>
            <DialogDescription className="font-body text-muted-foreground text-sm">
              {category} • {size}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-4">
            {/* Image */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden bg-muted">
              {src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov') ? (
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between gap-4">
              <div>
                {badge && (
                  <Badge variant={badge === "In Offerta" ? "destructive" : "default"} className="mb-3 sm:mb-4">
                    {badge}
                  </Badge>
                )}

                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  {description}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-body text-sm text-muted-foreground">Categoria</span>
                    <span className="font-body text-sm text-foreground">{category}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-body text-sm text-muted-foreground">Dimensione</span>
                    <span className="font-body text-sm text-foreground">{size}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-body text-sm text-muted-foreground">Codice</span>
                    <span className="font-body text-sm text-foreground font-mono">{id.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <p className="font-heading text-3xl sm:text-4xl text-primary">
                    €{price.toFixed(2)}
                  </p>
                  {originalPrice && (
                    <p className="font-body text-base sm:text-lg text-muted-foreground line-through">
                      €{originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2 h-12 sm:h-auto"
                  onClick={() => {
                    handleAddToCart();
                    setIsQuickViewOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  Aggiungi al Carrello
                </Button>

                <p className="text-center font-body text-xs text-muted-foreground">
                  Ogni disegno può essere personalizzato secondo le tue esigenze
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
