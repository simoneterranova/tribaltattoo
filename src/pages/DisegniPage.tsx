// ╔══════════════════════════════════════════════════════════════╗
// ║     DISEGNI (FLASH DESIGNS) E-COMMERCE PAGE                  ║
// ║     Modern e-commerce experience for tribal tattoo designs   ║
// ║     Target: "disegni tribali torino", "flash tattoo torino"  ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  ShoppingCart, 
  Filter, 
  Grid3x3, 
  Grid2x2, 
  SlidersHorizontal,
  ArrowUpDown,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import WelcomeOfferPopup from "@/components/WelcomeOfferPopup";
import FloatingCartButton from "@/components/FloatingCartButton";
import { useCart } from "@/contexts/CartContext";
import shopConfig from "@/config/shopConfig";

const DisegniPage = () => {
  const { itemCount, setIsOpen } = useCart();
  
  // E-commerce state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = shopConfig.disegni.map((d) => d.category);
    return ["all", ...Array.from(new Set(cats))];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...shopConfig.disegni];

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case "name-desc":
        products.sort((a, b) => b.label.localeCompare(a.label));
        break;
      default:
        // Keep original order
        break;
    }

    return products;
  }, [selectedCategory, sortBy]);

  const gridClass = gridCols === 3 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      <Helmet>
        <title>Disegni Tribali | Flash Designs | {shopConfig.name} {shopConfig.city.split(",")[0]}</title>
        <meta 
          name="description" 
          content={`Acquista disegni tribali originali presso ${shopConfig.name} a ${shopConfig.city.split(",")[0]}. Flash designs unici pronti per essere tatuati e personalizzati. ${shopConfig.discount.enabled ? `Sconto ${shopConfig.discount.percentage}% su acquisti multipli.` : ''}`} 
        />
        <meta property="og:title" content={`Disegni Tribali Flash | ${shopConfig.name}`} />
        <meta 
          property="og:description" 
          content={`${shopConfig.disegni.length} disegni tribali originali creati dal maestro Claudio Ciliberti. ${shopConfig.discount.enabled ? 'Sconto speciale su acquisti multipli!' : 'Design personalizzabili.'}`} 
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/disegni`} />
      </Helmet>

      {/* Welcome Offer Popup */}
      <WelcomeOfferPopup />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Floating Cart Button */}
      <FloatingCartButton />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 border-b border-accent/20">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Disegni</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 flex-wrap"
                >
                  <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                    Shop Flash Designs
                  </span>
                  {shopConfig.discount.enabled && (
                    <Badge variant="default" className="px-2.5 py-0.5 text-xs font-medium">
                      -{shopConfig.discount.percentage}% su {shopConfig.discount.minItems}+
                    </Badge>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-heading text-5xl md:text-7xl text-foreground mt-4 mb-6 leading-none"
                >
                  Disegni Tribali<span className="text-primary">.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-body text-lg text-muted-foreground leading-relaxed"
                >
                  Disegni tribali originali creati dal maestro Claudio Ciliberti. 
                  Ogni design è personalizzabile e può essere adattato alle tue esigenze.
                </motion.p>
              </div>

              {/* Cart Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setIsOpen(true)}
                  className="gap-2 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Carrello
                  {itemCount > 0 && (
                    <Badge className="ml-2 bg-primary-foreground text-primary">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters & Toolbar */}
        <section className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm border-b border-accent/20 py-4 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Left side - Filters & Results count */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Category Filter - Mobile Drawer */}
                <div className="sm:hidden flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filtri
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="ml-auto">1</Badge>
                    )}
                  </Button>
                </div>

                {/* Category Filter - Desktop */}
                <div className="hidden sm:flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="capitalize"
                      >
                        {cat === "all" ? "Tutti" : cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Results count */}
                <p className="hidden md:block font-body text-sm text-muted-foreground whitespace-nowrap">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "prodotto" : "prodotti"}
                </p>
              </div>

              {/* Right side - Sort & View */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Prezzo: Basso → Alto</SelectItem>
                    <SelectItem value="price-desc">Prezzo: Alto → Basso</SelectItem>
                    <SelectItem value="name-asc">Nome: A → Z</SelectItem>
                    <SelectItem value="name-desc">Nome: Z → A</SelectItem>
                  </SelectContent>
                </Select>

                {/* Grid View Toggle - Desktop */}
                <div className="hidden lg:flex items-center gap-1 border border-border rounded-sm p-1">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-2 rounded-sm transition-colors ${
                      gridCols === 3 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    }`}
                    title="Vista a 3 colonne"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-2 rounded-sm transition-colors ${
                      gridCols === 4 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    }`}
                    title="Vista a 4 colonne"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Cart Button - Mobile */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  className="lg:hidden gap-2 relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge className="ml-1 bg-primary-foreground text-primary px-2 py-0.5">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden mt-4 pt-4 border-t border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-sm font-medium">Categoria</p>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                      className="capitalize"
                    >
                      {cat === "all" ? "Tutti" : cat}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section id="products-grid" className="py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-muted-foreground text-lg">
                  Nessun disegno trovato in questa categoria.
                </p>
              </div>
            ) : (
              <div className={`grid ${gridClass} gap-6`}>
                {filteredProducts.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    src={item.src}
                    alt={item.alt}
                    label={item.label}
                    category={item.category}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    size={item.size}
                    badge={item.badge}
                    description={item.description}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">{shopConfig.disegni.length}</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Disegni Disponibili</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">100%</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Personalizzabili</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">30+</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Anni di Esperienza</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">
                  {shopConfig.discount.enabled ? `-${shopConfig.discount.percentage}%` : '∞'}
                </p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                  {shopConfig.discount.enabled ? `Su ${shopConfig.discount.minItems}+ Disegni` : 'Variazioni Possibili'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Hai Bisogno di Aiuto?
            </h2>
            <p className="font-body text-lg mb-8 opacity-90">
              Ogni disegno può essere personalizzato e adattato perfettamente a te. 
              Contattaci per una consulenza gratuita e creiamo insieme il tuo tatuaggio unico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#services" title="Scopri tutti i servizi">
                <Button variant="secondary" size="lg">
                  Scopri i Servizi
                </Button>
              </Link>
              <ContactDialog>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  title="Prenota ora la consulenza"
                >
                  Consulenza Gratuita
                </Button>
              </ContactDialog>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default DisegniPage;
