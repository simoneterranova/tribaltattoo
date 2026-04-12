// ╔══════════════════════════════════════════════════════════════╗
// ║     MAIN PORTFOLIO HUB PAGE                                  ║
// ║     Overview of all tattoo style portfolios                  ║
// ║     Target: "portfolio tatuaggi tribali", "tribal tattoo"    ║
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

const MainPortfolio = () => {
  const portfolios = [
    {
      slug: "old-school-torino",
      name: "Old School",
      description: "Stile tradizionale americano con linee bold e colori primari",
      image: shopConfig.gallery[0].src,
      count: "10+ lavori"
    },
    {
      slug: "realistici-torino",
      name: "Realistici",
      description: "Ritratti e soggetti con dettaglio fotografico in Black & Grey",
      image: shopConfig.gallery[1].src,
      count: "15+ lavori"
    },
    {
      slug: "geometrici-torino",
      name: "Geometrici",
      description: "Mandala, forme sacre e pattern simmetrici con precisione millimetrica",
      image: shopConfig.gallery[2].src,
      count: "12+ lavori"
    },
    {
      slug: "black-grey-torino",
      name: "Black & Grey",
      description: "Sfumature eleganti e contrasti drammatici senza colore",
      image: shopConfig.gallery[1].src,
      count: "18+ lavori"
    },
    {
      slug: "cover-up-torino",
      name: "Cover-up",
      description: "Trasformiamo vecchi tatuaggi in nuove opere d'arte",
      image: shopConfig.gallery[0].src,
      count: "8+ trasformazioni"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio Tatuaggi Torino | Galleria Completa | Tribal Tattoo Studio</title>
        <meta 
          name="description" 
          content="Esplora il portfolio completo di tatuaggi realizzati a Moncalieri (Torino) da Claudio Ciliberti. Old School, Realistici, Geometrici, Black & Grey e Cover-up. 60+ lavori in galleria." 
        />
        <meta property="og:title" content="Portfolio Completo Tatuaggi Torino | Tribal Tattoo" />
        <meta 
          property="og:description" 
          content="Guarda oltre 60 tatuaggi realizzati nel nostro studio a Moncalieri (Torino). Ogni stile, dalla tradizione americana al realismo contemporaneo." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/portfolio`} />
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
              <span className="text-foreground font-medium">Portfolio</span>
            </nav>

            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs tracking-[0.4em] text-primary uppercase"
              >
                I Nostri Lavori
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-6xl md:text-8xl text-foreground mt-4 mb-6 leading-none"
              >
                Portfolio<br />Completo<span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Esplora oltre 60 tatuaggi realizzati nel nostro studio a Moncalieri (Torino) con oltre 30 anni di esperienza. 
                Ogni pezzo racconta una storia unica, dalla tradizione Old School americana 
                al realismo contemporaneo. Scegli uno stile per vedere la collezione completa.
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

        {/* Portfolio Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio, index) => (
                <motion.div
                  key={portfolio.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/portfolio/${portfolio.slug}`}
                    className="group block"
                    title={`Vedi portfolio ${portfolio.name}`}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-card mb-4">
                      {portfolio.image.endsWith('.mp4') ? (
                        <video
                          src={portfolio.image}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={portfolio.image}
                          alt={`Portfolio ${portfolio.name} - Tribal Tattoo Moncalieri`}
                          width="600"
                          height="600"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Count badge */}
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-sm font-body text-xs tracking-wider">
                        {portfolio.count}
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {portfolio.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3 leading-relaxed">
                      {portfolio.description}
                    </p>
                    <span className="inline-flex items-center gap-2 font-body text-sm text-primary uppercase tracking-wide">
                      Vedi Galleria <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
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
                <p className="font-heading text-5xl text-foreground mb-2">60+</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Tatuaggi Realizzati</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">5</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Stili Specializzati</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">30+</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Anni di Esperienza</p>
              </div>
              <div>
                <p className="font-heading text-5xl text-foreground mb-2">100%</p>
                <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">Lavori Personalizzati</p>
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
              Ogni pezzo nel nostro portfolio è iniziato con una consulenza gratuita. 
              Parliamo della tua idea e creiamo insieme qualcosa di unico.
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

export default MainPortfolio;
