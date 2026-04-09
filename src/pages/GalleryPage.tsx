import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import GallerySection from "@/components/GallerySection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import shopConfig from "@/config/shopConfig";

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>Gallery - Portfolio Tatuaggi | Gran Babar Torino</title>
        <meta name="description" content="Sfoglia la galleria dei tatuaggi realizzati da Gran Babar a Torino. Trova ispirazione per il tuo prossimo tatuaggio." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/gallery`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl text-foreground mb-6"
            >
              Gallery
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 font-body text-base leading-relaxed text-foreground mb-12"
            >
              <h2 className="font-heading text-3xl text-foreground">
                Lasciati Ispirare
              </h2>
              
              <p>
                Sfogliando le immagini nella gallery, puoi trovare idee e ispirazioni per il tuo prossimo 
                tatuaggio. Se vedi uno stile che ti piace, Gran Babar sarà felice di aiutarti a personalizzarlo 
                secondo le tue esigenze.
              </p>

              <p>
                Ogni tatuaggio realizzato è unico e pensato appositamente per il cliente, per fare in modo 
                che l'opera sia sempre autentica e personale.
              </p>

              <div className="mt-8">
                <ContactDialog>
                  <Button variant="hero" size="lg">
                    Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </ContactDialog>
              </div>
            </motion.div>
          </div>
        </section>

        <GallerySection />

        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="font-heading text-3xl text-foreground mb-6">
              Prenota il Tuo Tatuaggio con Gran Babar
            </h3>
            <p className="font-body text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Se una delle opere presenti nella gallery ti ha colpito o se hai un'idea tutta tua, 
              non esitare a contattare Gran Babar per una consulenza personalizzata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota Appuntamento
                </Button>
              </ContactDialog>
              <a href="https://wa.me/393470174082" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  WhatsApp: 347 017 4082
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Studio a Torino - Largo Dora Napoli 16D
            </p>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default GalleryPage;
