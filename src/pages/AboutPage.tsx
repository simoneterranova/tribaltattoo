import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About - Gran Babar | Studio Tatuaggi Torino</title>
        <meta name="description" content="Scopri la storia di Gran Babar, tatuatore professionista a Torino. Passione, esperienza e dedizione per l'arte del tatuaggio." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/about-me`} />
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
              About Me
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 font-body text-base leading-relaxed text-foreground"
            >
              <p>
                Nel corso della mia vita, dedicata con passione al volontariato, all'arte e al disegno, 
                ho fuso le mie esperienze e il mio impegno umano per dare vita a <strong>GRAN BABAR</strong>.
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                Da Francesco a Gran Babar - Un nuovo nome tra amore e orgoglio
              </h2>
              
              <p>
                Tutti i nomi hanno una storia. Il mio non fa eccezione.
              </p>

              <p>
                Quando è nato mio figlio <strong>Samuele</strong>, la mia vita ha trovato un nuovo centro. 
                L'essere padre ha cambiato completamente il mio modo di vedere il mondo, arricchendo ancora 
                di più il mio modo di fare arte. Un giorno, mentre guardava un celebre cartone animato francese, 
                Samuele ha iniziato a chiamarmi <strong>Babar</strong>.
              </p>

              <p>
                Quel momento mi è rimasto impresso, tanto che ho deciso di farlo mio. Ma mancava qualcosa. 
                Volevo che il mio nome d'arte rappresentasse non solo la mia passione, ma anche il mio ruolo 
                di guida, di punto di riferimento per mio figlio e per chi si affida a me per un tatuaggio. 
                Così ho aggiunto <strong>"Gran"</strong>, a simboleggiare il desiderio di essere un faro di 
                creatività e ispirazione.
              </p>

              <p className="text-lg font-medium text-primary">
                Gran Babar non è solo un nome, è una filosofia: mettere l'arte e le persone al centro di 
                ogni tratto che incido sulla pelle.
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                La mia esperienza: tra tradizione, innovazione e cura del dettaglio
              </h2>

              <p>
                Il mondo del tatuaggio è in continua evoluzione e restare fermi significa restare indietro. 
                Per questo, in questi anni di esperienza, non ho mai smesso di studiare e perfezionarmi, 
                unendo la tradizione del tattoo con le tecniche più moderne.
              </p>

              <p>
                Nel mio studio, ogni tatuaggio nasce dalla combinazione di <strong>precisione</strong>, 
                <strong> sicurezza</strong> e <strong>attenzione ai dettagli</strong>. Lavoro solo con 
                strumenti all'avanguardia e inchiostri certificati di alta qualità, perché per me è 
                fondamentale che il risultato non sia solo bello, ma anche sicuro e duraturo nel tempo.
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                Un tatuaggio non è solo un disegno: è un pezzo di te
              </h2>

              <p>
                Il tatuaggio non è solo estetica. È identità, emozione, memoria. Ogni linea incisa sulla 
                pelle porta con sé una storia, e il mio compito è aiutarti a darle la forma migliore.
              </p>

              <div className="bg-card p-8 rounded-sm mt-8 border-2 border-accent/20">
                <h3 className="font-heading text-2xl text-foreground mb-4">Il Processo</h3>
                <ul className="space-y-3">
                  <li><strong>Ascolto e confronto</strong> – Ti chiederò di raccontarmi la tua idea, i tuoi gusti, le tue ispirazioni.</li>
                  <li><strong>Illustrazione personalizzata</strong> – Ogni disegno è unico e studiato su misura per te.</li>
                  <li><strong>Prova stencil</strong> – Valuteremo insieme il posizionamento perfetto del tatuaggio.</li>
                  <li><strong>Tatuaggio e cura</strong> – Il tuo tatuaggio prenderà vita con massima professionalità.</li>
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-accent/20">
                <h3 className="font-heading text-2xl text-foreground mb-6">Prenota il tuo tatuaggio a Torino</h3>
                <p className="mb-6">
                  Se sei pronto a fare il grande passo e a esprimere la tua personalità attraverso un tatuaggio, contattaci subito!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactDialog>
                    <Button variant="hero" size="lg">
                      Prenota Consulenza
                    </Button>
                  </ContactDialog>
                  <a href="https://wa.me/393470174082" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
                <div className="mt-6 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                  <span>Largo Dora Napoli 16D, Torino</span>
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

export default AboutPage;
