import { ArrowUpRight } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="border-t border-border">
      {/* Upper section */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* Section label */}
        <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
          Contact
        </span>

        {/* Big CTA text */}
        <div className="mt-6 mb-16 md:mb-24">
          <h2 className="font-heading text-5xl md:text-[8rem] leading-none text-foreground">
            Let's<br />Work<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Two-column layout: Info + Map */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact details */}
          <div className="grid gap-10 sm:grid-cols-2">
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

          {/* Right: Google Maps */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[360px] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.274280690498!2d-73.99!3d40.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzI0LjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Gentry Barbershop Location"
              className="absolute inset-0 w-full h-full"
            />
            {/* Gold overlay tint */}
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
