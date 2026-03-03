import { MapPin, Clock, Phone, Mail, Instagram, ArrowUpRight } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="border-t border-border py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section label */}
        <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
          Contact
        </span>

        {/* Big CTA text */}
        <div className="mt-6 mb-20 md:mb-32">
          <h2 className="font-heading text-5xl md:text-[8rem] leading-none text-foreground">
            Let's<br />Work<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* Location */}
          <div>
            <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
              Location
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              742 Barber Lane, Suite 3<br />
              Brooklyn, NY 11201
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
              Hours
            </h3>
            <div className="space-y-1 font-body text-sm text-muted-foreground">
              <p>Mon – Fri: 9AM – 8PM</p>
              <p>Saturday: 9AM – 6PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
              Contact
            </h3>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <a href="tel:+15551234567" className="block hover:text-foreground transition-colors">
                +1 (555) 123-4567
              </a>
              <a href="mailto:hello@thegentry.com" className="block hover:text-foreground transition-colors">
                hello@thegentry.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
              Social
            </h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group">
                Instagram <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group">
                Facebook <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-2xl tracking-[0.15em] text-foreground">
            THE GENTRY
          </span>
          <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
