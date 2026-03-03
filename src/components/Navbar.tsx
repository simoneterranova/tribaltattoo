import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="#" className="relative py-6 group">
          <span className="font-heading text-2xl tracking-[0.2em] text-foreground transition-colors group-hover:text-primary">
            THE GENTRY
          </span>
          <span className="absolute -bottom-0.5 left-0 w-6 h-[2px] bg-primary" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-1 mr-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-6 font-body text-[11px] tracking-[0.25em] uppercase transition-colors group"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Hover underline */}
                  <span
                    className={`absolute bottom-4 left-5 right-5 h-[1px] bg-primary transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="h-6 w-[1px] bg-border mr-8" />

          <BookingDialog>
            <button className="group flex items-center gap-3 font-body text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-primary transition-colors py-6">
              <span className="relative">
                Book Now
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-foreground/20 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ArrowRight className="h-3 w-3" />
              </span>
            </button>
          </BookingDialog>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background border-t border-border/50"
          >
            <div className="px-6 py-10 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-center justify-between py-4 border-b border-border/30 group"
                >
                  <span className="font-heading text-4xl text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </motion.a>
              ))}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-6"
              >
                <BookingDialog>
                  <Button variant="hero" size="lg" className="w-full">
                    Book Now
                  </Button>
                </BookingDialog>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
