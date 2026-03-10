import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import shopConfig from "@/config/shopConfig";

const FooterSection = () => {
  // Triggers the event listened to by the CookieBanner (Required by Garante)
  const openCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openCookiePreferences"));
  };

  return (
    <footer id="contact" className="border-t border-border">
      {/* Upper section */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* Section label */}
        <ScrollReveal direction="up" duration={0.7}>
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            Contact
          </span>

          {/* Big CTA text */}
          <div className="mt-6 mb-16 md:mb-24">
            <h2 className="font-heading text-5xl md:text-[8rem] leading-none text-foreground">
              Let's<br />Work<span className="text-primary">.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Two-column layout: Info + Map */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact details */}
          <ScrollReveal direction="left" delay={0.2} duration={0.7}>
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Location */}
              <div>
                <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  Location
                </h3>
                <address className="font-body text-sm text-muted-foreground leading-relaxed not-italic">
                  {shopConfig.contact.addressLines.map((line, i) => (
                    <span key={i}>{line}{i < shopConfig.contact.addressLines.length - 1 && <br />}</span>
                  ))}
                </address>
              </div>

              {/* Hours */}
              <div>
                <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  Hours
                </h3>
                <div className="space-y-1 font-body text-sm text-muted-foreground">
                  {shopConfig.hours.map((h) => (
                    <p key={h.days}>{h.days}: {h.time}</p>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  Contact
                </h3>
                <div className="space-y-2 font-body text-sm text-muted-foreground">
                  <a href={shopConfig.contact.phoneHref} className="block hover:text-foreground transition-colors">
                    {shopConfig.contact.phone}
                  </a>
                  <a href={`mailto:${shopConfig.contact.email}`} className="block hover:text-foreground transition-colors">
                    {shopConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  Social
                </h3>
                <div className="space-y-2">
                  {shopConfig.social.instagram && (
                    <a href={shopConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group">
                      Instagram <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {shopConfig.social.facebook && (
                    <a href={shopConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group">
                      Facebook <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Google Maps */}
          <ScrollReveal direction="right" delay={0.3} duration={0.7}>
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[360px] rounded-lg overflow-hidden border border-border">
              <iframe
                src={shopConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${shopConfig.fullName} Location`}
                className="absolute inset-0 w-full h-full"
              />
              {/* Gold overlay tint */}
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom bar - UPDATED WITH ITALIAN LEGAL REQUIREMENTS */}
      <div className="border-t border-border bg-background">
        <div className="container mx-auto px-6 py-8 flex flex-col gap-8">

          {/* Top row of bottom bar: Brand & Policy Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-heading text-2xl tracking-[0.15em] text-foreground">
              {shopConfig.fullName}
            </span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-body text-xs text-muted-foreground uppercase tracking-widest">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
              {/* Mandatory Garante requirement: User must be able to reopen banner */}
              <button
                onClick={openCookiePreferences}
                className="hover:text-foreground transition-colors uppercase cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>

          {/* Bottom row of bottom bar: Mandatory Italian Corporate Info & Copyright */}
          {shopConfig.legal && (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 font-body text-[10px] text-muted-foreground/60 tracking-wider uppercase border-t border-border/50 pt-6">
              <div className="text-center lg:text-left space-y-2">
                <p>
                  {shopConfig.legal.legalName} | Sede Legale: {shopConfig.legal.postalAddress}
                </p>
                <p>
                  P.IVA / C.F.: {shopConfig.legal.vatNumber}
                  {shopConfig.legal.reaNumber && ` | REA: ${shopConfig.legal.reaNumber}`}
                  {shopConfig.legal.shareCapital && ` | Capitale Sociale: ${shopConfig.legal.shareCapital} i.v.`}
                </p>
                {shopConfig.legal.pecEmail && <p>PEC: {shopConfig.legal.pecEmail}</p>}
              </div>
              <p className="mt-4 lg:mt-0 text-center lg:text-right">
                © {shopConfig.footer?.copyrightYear || new Date().getFullYear()} All rights reserved
              </p>
            </div>
          )}

        </div>
      </div>
    </footer>
  );
};

export default FooterSection;