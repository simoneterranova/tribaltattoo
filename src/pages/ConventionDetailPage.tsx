// ╔══════════════════════════════════════════════════════════════╗
// ║     CONVENTION DETAIL PAGE — /convention/:slug               ║
// ║     Mostra ESCLUSIVAMENTE le foto della tappa (mai la        ║
// ║     copertina). Eventi scoperti in automatico dalle          ║
// ║     copertine copertina_<slug> in src/assets/convention-     ║
// ║     photos/ (vedi lib/conventionPhotos). Slug sconosciuto    ║
// ║     → pagina 404.                                            ║
// ╚══════════════════════════════════════════════════════════════╝

import ContactDialog from "@/components/ContactDialog";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";
import { isConventionVideo } from "@/lib/conventionPhotos";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, ImageOff, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

const ConventionDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = shopConfig.convention.find(
    (e) => e.id === slug?.toLowerCase()
  );

  // Slug inesistente (es. copertina rimossa) → 404 vera, con noindex.
  if (!event) {
    return <NotFound />;
  }

  // Solo le foto della tappa: la copertina non entra mai in pagina
  // (già esclusa in buildConventionEvents, qui doppia garanzia).
  const photos = event.gallery.filter((g) => g !== event.src);

  return (
    <>
      <Helmet>
        <title>
          {event.label} — Foto della tappa | {shopConfig.name}
        </title>
        <meta
          name="description"
          content={`Tutte le foto di ${event.label} (${event.city}): sessioni live, freehand tribale e momenti della convention con ${shopConfig.name}.`}
        />
        <meta property="og:title" content={`${event.label} — Foto | ${shopConfig.name}`} />
        <meta
          property="og:description"
          content={`Rivivi ${event.label}: le foto della tappa.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/convention/${event.id}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero testuale (niente copertina: qui solo le foto della tappa) */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="mb-6 md:mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <Link to="/convention" className="hover:text-foreground transition-colors" title="Torna a tutte le convention">
                Convention
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{event.label}</span>
            </nav>

            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs tracking-[0.4em] text-primary uppercase"
              >
                Foto della tappa
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-5xl sm:text-6xl md:text-8xl text-foreground mt-3 md:mt-4 mb-4 md:mb-6 leading-none"
              >
                {event.label}
                <span className="text-primary">.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-xs uppercase tracking-wider text-muted-foreground mb-4"
              >
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.city}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {event.date}
                </span>
                <span>
                  {photos.length} {photos.length === 1 ? "foto" : "foto"}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8"
              >
                {event.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/convention" title="Torna a tutte le convention">
                  <Button variant="secondary" size="lg">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Tutte le tappe
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery della tappa */}
        <section className="py-12 md:py-16 px-4 md:px-6 border-t-2 border-accent/20">
          <div className="container mx-auto max-w-7xl">
            {photos.length === 0 ? (
              <div className="border border-dashed border-border rounded-sm bg-card/50 px-6 py-14 text-center">
                <ImageOff className="h-10 w-10 text-primary/60 mx-auto mb-4" />
                <p className="font-heading text-2xl md:text-3xl text-foreground">
                  Foto in arrivo<span className="text-primary">.</span>
                </p>
                <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
                  Stiamo selezionando gli scatti di {event.label}: torna a
                  trovarci tra poco.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (index % 8) * 0.04, duration: 0.4 }}
                    className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-card cursor-pointer"
                  >
                    {isConventionVideo(photo) ? (
                      <video
                        src={photo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={photo}
                        alt={`${event.label} — foto ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading={index < 4 ? "eager" : "lazy"}
                      />
                    )}

                    {/* Hover overlay con numero */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <span className="font-body text-xs text-primary tracking-wider uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="font-heading text-white text-lg mt-1">
                          {event.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">
              Vuoi un pezzo come questi?
            </h2>
            <p className="font-body text-base md:text-lg mb-6 md:mb-8 opacity-90">
              Prenota una consulenza gratuita: disegniamo insieme il tuo
              prossimo tatuaggio tribale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/convention" title="Torna a tutte le convention">
                <Button variant="secondary" size="lg">
                  Tutte le tappe
                </Button>
              </Link>
              <ContactDialog>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  title="Prenota ora la consulenza"
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

export default ConventionDetailPage;
