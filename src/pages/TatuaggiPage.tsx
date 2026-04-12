import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const tattooStyles = [
  { name: "Old School", slug: "tatuaggi-old-school-torino", image: "/images/tatuaggi/old-school-2.jpg" },
  { name: "Black & Grey", slug: "tatuaggio-black-grey-a-torino", image: "/images/tatuaggi/gotico-1.jpg" },
  { name: "Giapponese", slug: "tatuaggio-giapponese-irezumi-a-torino", image: "/images/tatuaggi/giapponese.jpg" },
  { name: "Gotico", slug: "tatuaggio-gotico-a-torino", image: "/images/tatuaggi/gotico-1.jpg" },
  { name: "New School", slug: "tatuaggio-new-school-a-torino", image: "/images/tatuaggi/new-school.jpg" },
  { name: "Realistico", slug: "tatuaggio-realistico-a-torino", image: "/images/tatuaggi/Tatuaggio-realista.jpg" },
  { name: "Neo Tradizionale", slug: "tatuaggio-neo-tradizionale-a-torino", image: "/images/tatuaggi/old-school-2.jpg" },
  { name: "Minimalista", slug: "tatuaggio-minimalista-a-torino", image: "/images/tatuaggi/Minimal-tattoo-1.jpg" },
  { name: "Geometrico", slug: "tatuaggio-geometrico-a-torino", image: "/images/tatuaggi/geometrico-tattoo.jpg" },
  { name: "Watercolor", slug: "tatuaggio-watercolor-a-torino", image: "/images/tatuaggi/Watercolor-floreale.jpg" },
  { name: "Dotwork", slug: "tatuaggio-dotwork-a-torino", image: "/images/tatuaggi/Gran-Babar-torino.jpg" },
  { name: "Sigillo", slug: "tatuaggio-sigillo-a-torino", image: "/images/styles/tatuaggio-sigillo-a-torino/sigillo-geometrico.svg" },
  { name: "Tribale", slug: "tatuaggio-tribale-a-torino", image: "/images/tatuaggi/geometrico-tattoo.jpg" },
  { name: "Lettering", slug: "tatuaggio-lettering-a-torino", image: "/images/tatuaggi/lettering-tattoo.jpg" },
  { name: "Floreale", slug: "tatuaggio-floreale-a-torino", image: "/images/tatuaggi/Floreale-1.jpg" },
  { name: "Surrealista", slug: "tatuaggio-surrealista-a-torino", image: "/images/tatuaggi/Tatuaggio-realista.jpg" },
  { name: "Fine Line", slug: "tatuaggio-fine-line-a-torino", image: "/images/tatuaggi/Minimal-tattoo-1.jpg" },
];

const TatuaggiPage = () => {
  return (
    <>
      <Helmet>
        <title>Tatuaggi Torino - Tutti gli Stili | Tribal Tattoo Studio</title>
        <meta name="description" content="Scopri tutti gli stili di tatuaggio disponibili da Tribal Tattoo a Moncalieri. Specializzazione in tribali, polinesiani, maori e freehand. Studio professionale dal 1994." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/tatuaggi`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Tatuaggi
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Da Tribal Tattoo ogni tatuaggio nasce come un progetto unico, dove creatività e tecnica si 
                fondono per trasformare il tuo corpo in un'opera d'arte. Dai design tribali autentici ai polinesiani, 
                passando per il maori, il dotwork e il freehand, realizziamo soluzioni su misura per 
                ogni personalità.
              </p>
              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </ContactDialog>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-20"
            >
              <div className="bg-card p-8 rounded-sm border border-accent/20 text-center">
                <Palette className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl text-foreground mb-2">Design Personalizzati</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Ogni tatuaggio è unico e studiato su misura per te
                </p>
              </div>
              <div className="bg-card p-8 rounded-sm border border-accent/20 text-center">
                <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl text-foreground mb-2">Massima Sicurezza</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Materiali certificati e ambiente sterilizzato
                </p>
              </div>
              <div className="bg-card p-8 rounded-sm border border-accent/20 text-center">
                <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl text-foreground mb-2">Esperienza Ventennale</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Professionalità e passione in ogni tratto
                </p>
              </div>
            </motion.div>

            {/* All Tattoo Styles Grid */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8 text-center">
                Scopri Tutti gli Stili
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tattooStyles.map((style, index) => (
                  <motion.div
                    key={style.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/${style.slug}`}
                      className="group block relative aspect-square overflow-hidden rounded-sm border-2 border-accent/20 hover:border-accent/60 transition-colors"
                    >
                      <img
                        src={style.image}
                        alt={`Tatuaggio ${style.name} - Tribal Tattoo Torino`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                        <h3 className="font-heading text-lg text-white">{style.name}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-12 rounded-sm border-2 border-accent/20 text-center"
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">
                Prenota il Tuo Tatuaggio a Torino
              </h2>
              <p className="font-body text-muted-foreground mb-8 max-w-2xl mx-auto">
                Se sei pronto a fare il grande passo e a esprimere la tua personalità attraverso un tatuaggio, 
                contattaci subito! Il nostro studio in {shopConfig.contact.addressLines[0]}, {shopConfig.city}, offre un ambiente 
                accogliente e sicuro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ContactDialog>
                  <Button variant="hero" size="lg">
                    Prenota Appuntamento
                  </Button>
                </ContactDialog>
                <a href={`https://wa.me/${shopConfig.contact.phone.replace(/\s|\+/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    WhatsApp: {shopConfig.contact.phone.replace('+39 ', '')}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default TatuaggiPage;
