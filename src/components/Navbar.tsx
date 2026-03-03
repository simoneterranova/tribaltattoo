import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <a href="#" className="font-heading text-3xl tracking-[0.15em] text-foreground">
          THE GENTRY
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <BookingDialog>
            <Button variant="hero" size="default" className="text-xs">
              Book Now <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </BookingDialog>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 pb-8 pt-4 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-heading text-4xl text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <BookingDialog>
            <Button variant="hero" size="lg" className="w-full mt-4">
              Book Now
            </Button>
          </BookingDialog>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
