import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary uppercase animate-fade-in-up">
          Est. 2018 — Premium Grooming
        </p>
        <h1 className="mb-6 font-heading text-5xl font-bold uppercase leading-tight text-foreground md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          Precision Cuts<br />
          <span className="text-gradient-gold">for the Modern Man</span>
        </h1>
        <p className="mx-auto mb-10 max-w-lg font-body text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Where craftsmanship meets confidence. Experience grooming the way it was meant to be.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <BookingDialog>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-widest uppercase px-10 py-6 gold-glow">
              Book Your Seat
            </Button>
          </BookingDialog>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center pt-2">
          <div className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
