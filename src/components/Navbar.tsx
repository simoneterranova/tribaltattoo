import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, CalendarDays, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactDialog from "./ContactDialog";
// import BookingDialog from "./BookingDialog"; // COMMENTED OUT - replaced with ContactDialog
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useAuth } from "@/contexts/AuthContext";
import shopConfig from "@/config/shopConfig";

const navLinks = shopConfig.nav.links;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { user, profile, isBarber, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract section IDs from nav links
  const sectionIds = ["hero", ...navLinks.map((link) => link.href.replace("#", ""))];
  
  // Use scroll-spy hook to track active section and update URL
  const activeSection = useScrollSpy({ sectionIds, offset: 120, updateUrl: true });

  // Handler for navigation links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    
    // If we're on the home page, just scroll to section
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Navigate to home page with hash, the Index component will handle scrolling
      navigate(`/${href}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    {/* Controlled contact dialog — lives outside AnimatePresence so it is never unmounted by the mobile overlay */}
    {!isBarber && <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />}
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b-2 border-accent/20"
          : "bg-background/60 backdrop-blur-xl border-b-2 border-border/30"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "#hero")} 
          className="relative group shrink-0" 
          title="Torna all'inizio - Homepage Tribal Tattoo"
        >
          <img
            src={shopConfig.logo}
            alt={shopConfig.name}
            width="200"
            height="56"
            className="h-14 md:h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            draggable={false}
          />
        </a>

        {/* Desktop nav — absolutely centred */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i + 0.3 }}
                className={`relative px-3 py-2 font-body text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
                title={`Vai alla sezione ${link.label}`}
              >
                {link.label}
                {/* Animated active indicator */}
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent rounded-full"
                  initial={false}
                  animate={{
                    width: isActive ? 16 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Desktop CTAs — right side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="hidden md:flex items-center gap-2 shrink-0"
        >
            {user && isBarber ? (
              <>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Sign Out
                </Button>
                <Link to="/dashboard" title="Vai alla dashboard barber">
                  <Button variant="hero" size="default" className="text-xs tracking-[0.15em]">
                    Dashboard <LayoutDashboard className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </>
            ) : user ? (
              <div className="flex items-center gap-1 border-r border-border/50 pr-3 mr-1">
                <Link to="/my-bookings" title="Vedi le tue prenotazioni">
                  <Button variant="ghost" size="sm" className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    My Bookings
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Sign Out
                </Button>
              </div>
            ) : null}
            {!isBarber && (
              <ContactDialog>
                <Button variant="hero" size="default" className="text-xs tracking-[0.15em] uppercase">
                  {shopConfig.nav.bookingCta} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </ContactDialog>
            )}
          </motion.div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 hover:bg-muted/50 rounded-sm transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col md:hidden border-4 border-accent/20"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-accent/20 shrink-0 relative z-10">
              <a
                href="#hero"
                onClick={(e) => {
                  handleNavClick(e, "#hero");
                  setMobileOpen(false);
                }}
                className="font-heading text-2xl tracking-[0.2em] text-accent"
                title="Torna all'inizio - Homepage Tribal Tattoo"
              >
                {shopConfig.name}
              </a>
              <button
                className="text-foreground p-2 hover:bg-accent/10 transition-colors border border-accent/30"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setMobileOpen(false);
                    }}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.06 * i + 0.08 }}
                    className={`flex items-center justify-between py-5 border-b-2 border-accent/20 font-heading text-4xl transition-all ${
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                    title={`Vai alla sezione ${link.label}`}
                  >
                    {link.label}
                    <ArrowUpRight
                      className={`h-5 w-5 shrink-0 ${isActive ? "text-accent" : "text-muted-foreground"}`}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* CTAs — anchored to bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.38 }}
              className="px-6 pb-10 pt-6 space-y-3 shrink-0 border-t-2 border-accent/20 relative z-10"
            >
              {user && isBarber ? (
                <>
                  <Button variant="ghost" size="lg" onClick={() => { signOut(); setMobileOpen(false); }} className="w-full rounded-none text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4 mr-1.5" />
                    Sign Out
                  </Button>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} title="Vai alla dashboard barber">
                    <Button variant="hero" size="lg" className="w-full rounded-none text-xs tracking-[0.15em]">
                      Dashboard <LayoutDashboard className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : user ? (
                <>
                  <Link to="/my-bookings" onClick={() => setMobileOpen(false)} title="Vedi le tue prenotazioni">
                    <Button variant="ghost" size="lg" className="w-full rounded-none text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                      <CalendarDays className="h-4 w-4 mr-1.5" />
                      My Bookings
                    </Button>
                  </Link>
                  <Button variant="ghost" size="lg" onClick={() => { signOut(); setMobileOpen(false); }} className="w-full rounded-none text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4 mr-1.5" />
                    Sign Out
                  </Button>
                </>
              ) : null}
              {!isBarber && (
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full rounded-none text-xs tracking-[0.15em]"
                  onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                >
                  {shopConfig.nav.bookingCta} <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
