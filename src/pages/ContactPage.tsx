import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Instagram, MapPin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contatti - Prenota Appuntamento | Gran Babar Torino</title>
        <meta name="description" content="Contatta Gran Babar per prenotare il tuo tatuaggio a Torino. WhatsApp, telefono, email. Studio in Largo Dora Napoli 16D." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/contatti`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl text-foreground mb-8"
            >
              Contatti
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <p className="font-body text-lg text-muted-foreground">
                Prenota un appuntamento per il tuo tatuaggio a Torino. Rispondiamo a tutte le tue domande 
                e fissiamo insieme la consulenza personalizzata.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {/* Contact Methods */}
                <div className="space-y-6">
                  <h2 className="font-heading text-2xl text-foreground mb-6">Contattaci</h2>
                  
                  <a 
                    href="https://wa.me/393470174082" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-card rounded-sm border-2 border-accent/20 hover:border-accent/40 transition-colors"
                  >
                    <Phone className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">WhatsApp / Telefono</h3>
                      <p className="font-body text-muted-foreground">+39 347 017 4082</p>
                      <p className="text-sm text-accent mt-1">Clicca per scrivere su WhatsApp</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-sm border-2 border-accent/20">
                    <Instagram className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">Instagram</h3>
                      <a 
                        href="https://www.instagram.com/granbabar_tattoo/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-body text-accent hover:underline"
                      >
                        @granbabar_tattoo
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-sm border-2 border-accent/20">
                    <MapPin className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">Studio</h3>
                      <p className="font-body text-muted-foreground">
                        Largo Dora Napoli 16D<br />
                        Torino, Italia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-card p-8 rounded-sm border-2 border-accent/20">
                  <h2 className="font-heading text-2xl text-foreground mb-6">Prenota Appuntamento</h2>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Compila il form o usa il pulsante qui sotto per prenotare la tua consulenza gratuita.
                  </p>
                  
                  <ContactDialog>
                    <Button variant="hero" size="lg" className="w-full mb-4">
                      Apri Form di Prenotazione
                    </Button>
                  </ContactDialog>

                  <div className="border-t border-accent/20 pt-6 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Oppure scrivici direttamente su WhatsApp per una risposta immediata:
                    </p>
                    <a 
                      href="https://wa.me/393470174082" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="w-full">
                        <Phone className="mr-2 h-5 w-5" />
                        Scrivici su WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-accent/20">
                <h2 className="font-heading text-2xl text-foreground mb-4">Informazioni Utili</h2>
                <div className="space-y-4 font-body text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Orari:</strong> Su appuntamento (contattaci per fissare la tua sessione)
                  </p>
                  <p>
                    <strong className="text-foreground">Consulenza:</strong> Gratuita e senza impegno
                  </p>
                  <p>
                    <strong className="text-foreground">Pagamenti:</strong> Contanti, carta, bonifico
                  </p>
                  <p>
                    <strong className="text-foreground">Dove siamo:</strong> Nel cuore di Torino, zona Borgo Dora, facilmente raggiungibile con mezzi pubblici
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default ContactPage;
