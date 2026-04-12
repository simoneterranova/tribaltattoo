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
        <title>About - {shopConfig.author.name} | {shopConfig.fullName} {shopConfig.city.split(",")[0]}</title>
        <meta name="description" content={`Scopri la storia di ${shopConfig.author.name}, maestro tatuatore tribale a ${shopConfig.city} dal ${shopConfig.established}. ${shopConfig.team[0].years} anni di esperienza in arte ${shopConfig.team[0].tags.slice(0, 3).join(", ").toLowerCase()} originale.`} />
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
              Il Maestro
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 font-body text-base leading-relaxed text-foreground"
            >
              <p>
                Dal 1994, Claudio Ciliberti porta nei corpi dei suoi clienti l'essenza delle culture tribali 
                di tutto il mondo. <strong>TRIBAL TATTOO STUDIO</strong> non è solo un nome — è un tempio dedicato 
                all'arte sacra tribale, dove ogni segno diventa magia antica.
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                Un Viaggio di 30 Anni nel Cuore dell'Arte Tribale
              </h2>
              
              <p>
                Claudio ha dedicato tre decenni a studiare, viaggiare e incarnare l'arte tribale autentica. 
                I suoi viaggi in Polinesia, Nuova Zelanda e nei luoghi sacri dell'Asia gli hanno permesso di 
                costruire un rapporto profondo con le culture originarie — non per copiarne i simboli, ma per 
                comprenderne lo spirito e reinterpretarli sull'energia di ogni individuo.
              </p>

              <p>
                Ogni tatuaggio è un <strong>rito sacro</strong>. Il design viene disegnato a mano libera direttamente 
                sul corpo con il marcatore rosso, seguendo il flusso dei muscoli, rispettando l'anatomia. 
                Non è una copia — è arte viva che nasce dall'incontro tra il maestro e il corpo di chi si affida.
              </p>

              <p className="text-lg font-medium text-primary">
                "Tribal Tattoo non è solo un nome, è una promessa: portare sulla tua pelle vera arte originale 
                di magie antiche, rispettando le tradizioni culturali e l'energia del tuo corpo."
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                Arte Tribale Originale — Non Semplici Copie
              </h2>

              <p>
                In un mondo dove i tatuaggi tribali vengono spesso copiati da cataloghi senza rispetto per la 
                cultura originaria, Claudio Ciliberti si distingue per la sua dedizione all'autenticità. 
                Ogni progetto è studiato in profondità: dalla consultazione iniziale in cui si ascolta la storia 
                del cliente, alla ricerca simbolica, fino al disegno freehand che nasce direttamente sul corpo.
              </p>

              <p>
                <strong>Polinesiano</strong>, <strong>Maori</strong>, <strong>Tribale</strong>, <strong>Dot Work</strong>, 
                <strong> Black Work</strong> — ogni stile è affrontato con la massima competenza tecnica e rispetto 
                culturale. Il risultato? Tatuaggi che non sono solo esteticamente potenti, ma portano in sé un 
                significato profondo e autentico.
              </p>

              <h2 className="font-heading text-3xl text-foreground mt-12 mb-4">
                Un Tatuaggio Non È Solo un Disegno: È Sacred Ink in Sacred Places
              </h2>

              <p>
                Il tatuaggio tribale è identità, protezione, memoria ancestrale. Ogni linea incisa sulla 
                pelle porta con sé secoli di tradizione, e il compito del maestro è di onorare questa eredità 
                mentre la rende parte di te.
              </p>

              <div className="bg-card p-8 rounded-sm mt-8 border-2 border-accent/20">
                <h3 className="font-heading text-2xl text-foreground mb-4">Il Processo Sacro</h3>
                <ul className="space-y-3">
                  <li><strong>Consultazione Gratuita</strong> – Incontro per conoscersi, studiare l'anatomia e costruire insieme il progetto ideale.</li>
                  <li><strong>Ricerca Simbolica</strong> – Studio approfondito dei significati culturali e della tradizione tribale.</li>
                  <li><strong>Design Freehand</strong> – Il maestro disegna direttamente sul tuo corpo seguendo il flusso muscolare.</li>
                  <li><strong>Il Rito del Tatuaggio</strong> – L'arte prende vita con precisione, sicurezza e rispetto sacro.</li>
                  <li><strong>Cura Post-Tatuaggio</strong> – Istruzioni complete e assistenza continua — il rito non finisce con l'ago.</li>
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-accent/20">
                <h3 className="font-heading text-2xl text-foreground mb-6">Prenota il Tuo Tatuaggio Tribale a Moncalieri</h3>
                <p className="mb-6">
                  Se cerchi vera arte tribale originale — non copie da catalogo —  affidati a 30 anni di esperienza 
                  e passione. La consulenza è gratuita e senza impegno.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactDialog>
                    <Button variant="hero" size="lg">
                      Prenota Consulenza
                    </Button>
                  </ContactDialog>
                  <a href={shopConfig.contact.phoneHref} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
                <div className="mt-6 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                  <span>{shopConfig.contact.addressLines.join(", ")}</span>
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
