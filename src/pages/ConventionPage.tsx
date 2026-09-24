// ╔══════════════════════════════════════════════════════════════╗
// ║     CONVENTION PAGE                                          ║
// ║     Pagina dedicata: tutti gli eventi e come incontrarci     ║
// ║     AUTOMATICO: eventi dalle copertine copertina_<slug> in   ║
// ║     src/assets/convention-photos/ (vedi lib/conventionPhotos)║
// ╚══════════════════════════════════════════════════════════════╝

import ContactDialog from "@/components/ContactDialog";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";
import { motion } from "framer-motion";
import { CalendarDays, ImageOff, Images, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const events = shopConfig.convention;

const isVideo = (src: string) =>
  src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");

const ConventionPage = () => {
  return (
    <>
      <Helmet>
        <title>Convention Tattoo Torino e Italia | Eventi Live | {shopConfig.name}</title>
        <meta
          name="description"
          content={`Incontra ${shopConfig.name} alle tattoo convention in Italia: live freehand tribale, consulenze gratuite e flash esclusivi. Scopri le prossime tappe e prenota il tuo posto.`}
        />
        <meta property="og:title" content="Convention Tattoo | Tribal Tattoo dal 1994" />
        <meta
          property="og:description"
          content="Live freehand tribale, consulenze gratuite e flash esclusivi. Scopri dove incontrarci dal vivo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/convention`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="mb-6 md:mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Convention</span>
            </nav>

            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs tracking-[0.4em] text-primary uppercase"
              >
                {shopConfig.sections.convention.label}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-5xl sm:text-6xl md:text-8xl text-foreground mt-3 md:mt-4 mb-4 md:mb-6 leading-none"
              >
                Le nostre
                <br />
                Convention<span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8"
              >
                Dal 1994 portiamo l&apos;arte tribale originale nelle fiere di tutta
                Italia: sessioni live disegnate a mano libera sul corpo, consulenze
                gratuite e flash esclusivi creati solo per l&apos;evento. Qui trovi
                le tappe e come prenotare il tuo posto in fiera.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
              </motion.div>
            </div>
          </div>
        </section>

        {/* Complete Events Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 border-t-2 border-accent/20">
          <div className="container mx-auto max-w-7xl">
            {events.length === 0 ? (
              <div className="border border-dashed border-border rounded-sm bg-card/50 px-6 py-14 text-center">
                <p className="font-heading text-2xl md:text-3xl text-foreground">
                  Stiamo preparando le prossime tappe<span className="text-primary">.</span>
                </p>
                <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
                  Torna a trovarci: gli eventi appariranno qui automaticamente.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {events.map((event, index) => (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="group relative overflow-hidden rounded-sm bg-card border border-border"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {event.src && isVideo(event.src) ? (
                        <video
                          src={event.src}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : event.src ? (
                        <img
                          src={event.src}
                          alt={event.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-muted/40 text-muted-foreground aspect-[4/3]">
                          <ImageOff className="h-10 w-10 text-primary/60" />
                          <p className="font-body text-xs uppercase tracking-[0.25em]">
                            Foto in arrivo
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-5 md:p-6 space-y-3">
                      <h3 className="font-heading text-2xl text-foreground leading-tight">
                        {event.label}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {event.city}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-primary" />
                          {event.date}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                      {event.gallery.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          {event.gallery.slice(0, 4).map((photo) => (
                            <div
                              key={photo}
                              className="aspect-square overflow-hidden rounded-sm bg-muted/40"
                            >
                              {isVideo(photo) ? (
                                <video
                                  src={photo}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                  preload="metadata"
                                />
                              ) : (
                                <img
                                  src={photo}
                                  alt={`${event.label} — foto`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <Link to={`/convention/${event.id}`} title={`Guarda le foto di ${event.label}`}>
                        <Button variant="outline" size="sm">
                          <Images className="mr-2 h-4 w-4" />
                          Foto di questa tappa
                        </Button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div>
                <p className="font-heading text-4xl md:text-5xl text-foreground mb-2">30+</p>
                <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Anni di esperienza</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl text-foreground mb-2">Live</p>
                <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Freehand in fiera</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl text-foreground mb-2">Gratuita</p>
                <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Consulenza</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl text-foreground mb-2">100%</p>
                <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Arte originale</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">
              Ci vediamo in fiera?
            </h2>
            <p className="font-body text-base md:text-lg mb-6 md:mb-8 opacity-90">
              Scrivici per sapere la prossima tappa, prenotare una sessione live o
              proporre il tuo evento. Rispondiamo a ogni messaggio.
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
                  title="Prenota ora il tuo posto"
                >
                  Prenota Subito
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

export default ConventionPage;
