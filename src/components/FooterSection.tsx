import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="border-t border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Location */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-semibold uppercase text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Location
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              742 Barber Lane, Suite 3<br />
              Brooklyn, NY 11201
            </p>
            <div className="mt-4 h-40 overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center">
              <p className="font-body text-xs text-muted-foreground">Google Maps Placeholder</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-semibold uppercase text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Opening Hours
            </h3>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Monday – Friday</span><span className="text-foreground">9:00 AM – 8:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-foreground">9:00 AM – 6:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-foreground">Closed</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-semibold uppercase text-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" /> Get in Touch
            </h3>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@thegentry.com" className="hover:text-primary transition-colors">hello@thegentry.com</a>
              </li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="font-heading text-sm tracking-widest text-muted-foreground uppercase">
            © 2025 The Gentry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
