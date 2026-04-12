import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Wand2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const services = [
  {
    icon: Palette,
    title: "Tattoo Personalizzati",
    description: "Tatuaggi personalizzati con materiali di alta qualità e attenzione ai dettagli.",
    link: "/tatuaggi",
    linkText: "Scopri di più"
  },
  {
    icon: Wand2,
    title: "Cover-up e Correzioni",
    description: "Cover up di vecchi tatuaggi per un look completamente nuovo e personalizzato.",
    link: "/servizi/cover-up-tatuaggi-torino",
    linkText: "Scopri di più"
  },
  {
    icon: Heart,
    title: "Cura Post-Tatuaggio",
    description: "Il maestro Claudio Ciliberti ti consiglierà le migliori tecniche e prodotti per guarire al meglio il tuo tatuaggio, così da garantire un risultato finale ottimale.",
    link: "/cura-post-tatuaggio",
    linkText: "Scopri di più"
  }
];

const ServiziPage = () => {
  return (
    <>
      <Helmet>
        <title>Servizi - Tatuaggi e Cover-up | Tribal Tattoo Torino</title>
        <meta name="description" content="Servizi professionali di tatuaggio tribale a Moncalieri: tatuaggi personalizzati, cover-up, correzioni e cura post-tatuaggio. Tribal Tattoo Studio." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/servizi`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Servizi
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                Dopo aver concluso la seduta nel nostro studio a Torino, il percorso di guarigione del tuo 
                tatuaggio inizia immediatamente, e seguire con precisione le istruzioni di cura post-tatuaggio 
                è essenziale per preservare la bellezza, i colori e i dettagli del design.
              </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid gap-8 mb-16"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card p-8 rounded-sm border-2 border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      <service.icon className="h-12 w-12 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl text-foreground mb-3">
                        {service.title}
                      </h2>
                      <p className="font-body text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <Link to={service.link}>
                        <Button variant="outline">
                          {service.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Process Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-8 rounded-sm border border-accent/20 mb-12"
            >
              <h2 className="font-heading text-3xl text-foreground mb-6">
                Il Nostro Processo
              </h2>
              <div className="space-y-4 font-body text-muted-foreground">
                <div className="flex items-start gap-4">
                  <span className="font-heading text-2xl text-accent">01</span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">Consulenza Iniziale</h3>
                    <p>Discutiamo la tua idea e ti guidiamo nella scelta dello stile e del design perfetto.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-heading text-2xl text-accent">02</span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">Design Personalizzato</h3>
                    <p>Creiamo un bozzetto unico studiato appositamente per te e il tuo corpo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-heading text-2xl text-accent">03</span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">Esecuzione Professionale</h3>
                    <p>Realizziamo il tuo tatuaggio con strumenti all'avanguardia e massima attenzione all'igiene.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-heading text-2xl text-accent">04</span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1">Cura e Follow-up</h3>
                    <p>Ti forniamo istruzioni dettagliate per la cura e rimaniamo disponibili per qualsiasi domanda.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">
                Prenota il Tuo Tatuaggio a Torino
              </h2>
              <p className="font-body text-muted-foreground mb-8 max-w-2xl mx-auto">
                Se sei pronto a fare il grande passo e a esprimere la tua personalità attraverso un tatuaggio, 
                contattaci subito! Utilizza il pulsante WhatsApp per prenotare la tua consulenza. Il nostro studio, 
                situato a {shopConfig.city} in {shopConfig.contact.addressLines[0]}, offre un ambiente accogliente e sicuro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ContactDialog>
                  <Button variant="hero" size="lg">
                    Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
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

export default ServiziPage;
