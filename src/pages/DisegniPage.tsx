// ╔══════════════════════════════════════════════════════════════╗
// ║     DISEGNI (FLASH DESIGNS) PAGE                             ║
// ║     Galleria completa dei disegni tribali disponibili        ║
// ║     Target: "disegni tribali torino", "flash tattoo torino"  ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

const DisegniPage = () => {
  return (
    <>
      <Helmet>
        <title>Disegni Tribali | Flash Designs | {shopConfig.name} {shopConfig.city.split(",")[0]}</title>
        <meta 
          name="description" 
          content={`Scopri i disegni tribali originali disponibili presso ${shopConfig.name} a ${shopConfig.city.split(",")[0]}. Flash designs unici pronti per essere tatuati e personalizzati.`} 
        />
        <meta property="og:title" content={`Disegni Tribali Flash | ${shopConfig.name}`} />
        <meta 
          property="og:description" 
          content={`${shopConfig.disegni.length} disegni tribali originali creati dal maestro Claudio Ciliberti. Ogni design può essere personalizzato secondo le tue esigenze.`} 
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/disegni`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Disegni</span>
            </nav>

            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs tracking-[0.4em] text-primary uppercase"
              >
                Flash Designs
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-6xl md:text-8xl text-foreground mt-4 mb-6 leading-none"
              >
                I Nostri<br />Disegni<span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Disegni tribali originali creati dal maestro Claudio Ciliberti con oltre 30 anni di esperienza. 
                Ogni design è unico e può essere personalizzato secondo le tue esigenze, 
                adattandolo alle dimensioni e alla posizione del corpo che preferisci. 
                I singoli disegni sono anche acquistabili. 
                Prenota una consulenza gratuita per trasformare uno di questi disegni in un tatuaggio perfetto per te.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ContactDialog>
                  <Button variant="hero" size="lg" title="Prenota una consulenza gratuita">
                    Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </ContactDialog>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Complete Gallery Section - All Designs from shopConfig */}
        <section className="py-16 px-6 border-t-2 border-accent/20">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-xs tracking-[0.4em] text-primary uppercase"
              >
                Galleria Completa
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-5xl md:text-7xl text-foreground mt-2"
              >
                Tutti i Disegni<span className="text-primary">.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto"
              >
                Ogni disegno può diventare il tuo tatuaggio unico. Esplora la nostra collezione completa.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shopConfig.disegni.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-card cursor-pointer"
                >
                  {item.src.endsWith('.mp4') || item.src.endsWith('.webm') || item.src.endsWith('.mov') ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading={index < 8 ? "eager" : "lazy"}
                    />
                  )}
                  
                  {/* Hover overlay with label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <span className="font-body text-xs text-primary tracking-wider uppercase">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="font-heading text-white text-lg mt-1">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">{shopConfig.disegni.length}</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Disegni Disponibili</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">100%</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Personalizzabili</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">30+</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Anni di Esperienza</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">∞</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Variazioni Possibili</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Pronto a Creare il Tuo Tatuaggio?
            </h2>
            <p className="font-body text-lg mb-8 opacity-90">
              Ogni disegno può essere personalizzato e adattato perfettamente a te. 
              Parliamo della tua idea e creiamo insieme qualcosa di unico e indimenticabile.
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

export default DisegniPage;
