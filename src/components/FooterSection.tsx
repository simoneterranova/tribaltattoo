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
            {shopConfig.sections.contact.label}
          </span>

          {/* Big CTA text */}
          <div className="mt-6 mb-16 md:mb-24">
            <h2 className="font-heading text-5xl md:text-[8rem] leading-none text-foreground">
              {shopConfig.sections.contact.heading[0]}<br />{shopConfig.sections.contact.heading[1]}<span className="text-primary">.</span>
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
                  {shopConfig.sections.contact.locationLabel}
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
                  {shopConfig.sections.contact.hoursLabel}
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
                  {shopConfig.sections.contact.contactLabel}
                </h3>
                <div className="space-y-2 font-body text-sm text-muted-foreground">
                  <a href={shopConfig.contact.phoneHref} className="block hover:text-foreground transition-colors" title="Chiama Gran Babar Studio">
                    {shopConfig.contact.phone}
                  </a>
                  <a href={`mailto:${shopConfig.contact.email}`} className="block hover:text-foreground transition-colors" title="Invia email a Gran Babar Studio">
                    {shopConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  {shopConfig.sections.contact.socialLabel}
                </h3>
                <div className="space-y-2">
                  {shopConfig.social.instagram && (
                    <a href={shopConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group" title="Segui Gran Babar su Instagram">
                      Instagram <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {/* Facebook link - uncomment when added to shopConfig.social */}
                  {/* {shopConfig.social.facebook && (
                    <a href={shopConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group" title="Segui Gran Babar su Facebook">
                      Facebook <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )} */}
                  {shopConfig.social.tiktok && (
                    <a href={shopConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group" title="Segui Gran Babar su TikTok">
                      TikTok <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                style={{ border: 0 }}
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
        
        {/* SEO Links Section - Service Pages & Blog */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Servizi Specializzati */}
            <div>
              <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Servizi Specializzati
              </h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <Link to="/servizi/tatuaggi-old-school-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri i tatuaggi Old School a Torino">
                    Old School
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/tatuaggi-realistici-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri i tatuaggi realistici a Torino">
                    Realistici
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/cover-up-tatuaggi-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri i cover-up di tatuaggi a Torino">
                    Cover-up
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/tatuaggi-geometrici-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri i tatuaggi geometrici a Torino">
                    Geometrici
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/tatuaggi-black-grey-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri i tatuaggi Black & Grey a Torino">
                    Black & Grey
                  </Link>
                </li>
              </ul>
            </div>

            {/* Zona Torino */}
            <div>
              <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Dove Siamo
              </h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <Link to="/borgo-dora-tatuaggi" className="text-muted-foreground hover:text-foreground transition-colors" title="Studio di tatuaggi in Borgo Dora, Torino">
                    Tatuaggi Borgo Dora
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors" title="Vedi come raggiungerci">
                    Come Raggiungerci
                  </a>
                </li>
              </ul>
            </div>

            {/* Guide e Risorse */}
            <div>
              <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Guide Utili
              </h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <Link to="/blog/quanto-costa-tatuaggio-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Guida completa ai prezzi dei tatuaggi a Torino">
                    Prezzi Tatuaggi
                  </Link>
                </li>
                <li>
                  <Link to="/blog/primo-tatuaggio-guida" className="text-muted-foreground hover:text-foreground transition-colors" title="Guida per chi fa il primo tatuaggio">
                    Primo Tatuaggio
                  </Link>
                </li>
                <li>
                  <Link to="/blog/cura-tatuaggio-aftercare" className="text-muted-foreground hover:text-foreground transition-colors" title="Come curare il tatuaggio dopo la sessione">
                    Cura Tatuaggio
                  </Link>
                </li>
                <li>
                  <Link to="/faq-tatuaggi-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Domande frequenti sui tatuaggi a Torino">
                    FAQ Tatuaggi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info Studio */}
            <div>
              <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Info Studio
              </h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors" title="Scopri Francesco, tatuatore professionista">
                    Francesco Tatuatore
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors" title="Leggi le recensioni dei nostri clienti">
                    Recensioni Clienti
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors" title="Guarda il portfolio di lavori realizzati">
                    Portfolio Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Portfolio Completo */}
            <div>
              <h3 className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Portfolio
              </h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors" title="Vedi tutto il portfolio">
                    Tutti i Lavori
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/old-school-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Portfolio tatuaggi Old School">
                    Old School
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/realistici-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Portfolio tatuaggi realistici">
                    Realistici
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/cover-up-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Portfolio cover-up">
                    Cover-up
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/geometrici-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Portfolio tatuaggi geometrici">
                    Geometrici
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/black-grey-torino" className="text-muted-foreground hover:text-foreground transition-colors" title="Portfolio Black & Grey">
                    Black & Grey
                  </Link>
                </li>
              </ul>
            </div>
          </div>
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
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors" title="Leggi l'informativa sulla privacy">{shopConfig.footer.privacyPolicyLabel}</Link>
              <Link to="/cookie-policy" className="hover:text-foreground transition-colors" title="Leggi la policy sui cookie">{shopConfig.footer.cookiePolicyLabel}</Link>
              {/* Mandatory Garante requirement: User must be able to reopen banner */}
              <button
                onClick={openCookiePreferences}
                className="hover:text-foreground transition-colors uppercase cursor-pointer"
                title="Modifica le preferenze cookie"
              >
                {shopConfig.footer.cookieSettingsLabel}
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
                © {shopConfig.footer?.copyrightYear || new Date().getFullYear()} {shopConfig.footer.allRightsReserved}
              </p>
            </div>
          )}

        </div>
      </div>
    </footer>
  );
};

export default FooterSection;