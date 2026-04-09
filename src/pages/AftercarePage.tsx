import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Sun, Droplets } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const AftercarePage = () => {
  return (
    <>
      <Helmet>
        <title>Cura Post-Tatuaggio - Guida Completa | Gran Babar Torino</title>
        <meta name="description" content="Guida completa alla cura post-tatuaggio. Istruzioni dettagliate per preservare bellezza, colori e dettagli del tuo tatuaggio a Torino." />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/cura-post-tatuaggio`} />
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
              Cura Post-Tatuaggio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg text-muted-foreground mb-12"
            >
              Dopo aver concluso la seduta nel nostro studio a Torino, il percorso di guarigione del tuo 
              tatuaggio inizia immediatamente. Seguire con precisione le istruzioni di cura post-tatuaggio 
              è essenziale per preservare la bellezza, i colori e i dettagli del design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              {/* Immediate Care */}
              <div className="bg-card p-8 rounded-sm border-2 border-accent/20">
                <h2 className="font-heading text-3xl text-foreground mb-6 flex items-center gap-3">
                  <Droplets className="h-8 w-8 text-accent" />
                  Cura Immediata Dopo il Tatuaggio
                </h2>
                <div className="space-y-4 font-body text-base text-muted-foreground">
                  <p>
                    Subito dopo il tatuaggio, il nostro artista applica una medicazione protettiva studiata 
                    per isolare la zona e proteggerla da batteri e possibili irritazioni, creando una barriera 
                    temporanea che agevola il primo stadio di riparazione della pelle.
                  </p>
                  <p>
                    <strong className="text-foreground">Dopo 2-3 ore:</strong> Rimuovi la medicazione con 
                    estrema delicatezza e procedi alla prima pulizia. Utilizza acqua tiepida e un detergente 
                    specifico, privo di profumi e sostanze aggressive, per non compromettere il processo di 
                    guarigione.
                  </p>
                  <p>
                    Durante questa fase iniziale, è fondamentale adottare una routine che rispetti la 
                    sensibilità della pelle appena tatuata, evitando movimenti bruschi e contatti eccessivi 
                    che potrebbero interferire con il delicato strato protettivo formato sulla zona.
                  </p>
                </div>
              </div>

              {/* Daily Care */}
              <div>
                <h2 className="font-heading text-3xl text-foreground mb-6">
                  Pulizia e Idratazione Quotidiana
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-card rounded-sm border border-accent/20">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-xl text-foreground mb-2">Pulizia Regolare</h3>
                      <p className="font-body text-muted-foreground">
                        Pulisci il tatuaggio 2-3 volte al giorno con movimenti lenti e delicati. Elimina 
                        eventuali residui di sangue o secrezioni senza irritare la pelle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-card rounded-sm border border-accent/20">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-xl text-foreground mb-2">Asciugatura Delicata</h3>
                      <p className="font-body text-muted-foreground">
                        Dopo ogni lavaggio, asciuga tamponando con un asciugamano pulito. Non strofinare, 
                        poiché anche un lieve sfregamento può compromettere il risultato finale.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-card rounded-sm border border-accent/20">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-xl text-foreground mb-2">Idratazione</h3>
                      <p className="font-body text-muted-foreground">
                        Applica uno strato sottile di crema idratante specifica per tatuaggi. Questo aiuta 
                        a preservare la definizione delle linee e mantenere i colori vibranti, riducendo il 
                        rischio di desquamazioni o irritazioni.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Avoid */}
              <div className="bg-destructive/10 p-8 rounded-sm border-2 border-destructive/20">
                <h2 className="font-heading text-3xl text-foreground mb-6 flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  Cosa Evitare Durante la Guarigione
                </h2>
                <ul className="space-y-3 font-body text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">Calore eccessivo:</strong> Evita saune, bagni caldi e attività fisiche intense che causano sudorazione eccessiva.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">Immersione in acqua:</strong> Non entrare in piscine, mare, laghi o vasche idromassaggio per almeno 2-3 settimane.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">Esposizione al sole:</strong> I raggi UV possono alterare i colori e prolungare i tempi di recupero. Copri il tatuaggio o usa protezione solare alta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">Abiti stretti:</strong> Indossa abiti larghi in tessuti naturali che non causino sfregamenti.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✗</span>
                    <span><strong className="text-foreground">Grattare:</strong> Non grattare mai il tatuaggio, anche se prude durante la guarigione.</span>
                  </li>
                </ul>
              </div>

              {/* Long-term Care */}
              <div>
                <h2 className="font-heading text-3xl text-foreground mb-6 flex items-center gap-3">
                  <Sun className="h-8 w-8 text-accent" />
                  Cura a Lungo Termine
                </h2>
                <div className="space-y-4 font-body text-muted-foreground">
                  <p>
                    Una volta completata la guarigione iniziale (2-4 settimane), la cura a lungo termine 
                    diventa cruciale per mantenere la bellezza e vivacità del tuo tatuaggio nel tempo:
                  </p>
                  <ul className="space-y-3 ml-6 list-disc">
                    <li>
                      <strong className="text-foreground">Protezione solare:</strong> Applica sempre crema 
                      solare SPF 30+ quando esponi il tatuaggio al sole. I raggi UV sono il nemico numero 
                      uno dei tatuaggi.
                    </li>
                    <li>
                      <strong className="text-foreground">Idratazione costante:</strong> Mantieni la pelle 
                      idratata con creme nutrienti specifiche per tatuaggi o lozioni naturali.
                    </li>
                    <li>
                      <strong className="text-foreground">Controlli regolari:</strong> Se noti sbiadimenti 
                      o perdita di dettagli, contattaci per eventuali ritocchi.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Warning Signs */}
              <div className="bg-amber-500/10 p-8 rounded-sm border-2 border-amber-500/20">
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  Quando Contattarci
                </h2>
                <p className="font-body text-muted-foreground mb-4">
                  Se noti uno di questi segni, contattaci immediatamente:
                </p>
                <ul className="space-y-2 font-body text-muted-foreground ml-6 list-disc">
                  <li>Rossore eccessivo che persiste o peggiora dopo 48 ore</li>
                  <li>Gonfiore anomalo della zona tatuata</li>
                  <li>Sensazione di calore insolita o febbre</li>
                  <li>Secrezioni anomale (pus, liquidi colorati o maleodoranti)</li>
                  <li>Dolore intenso che non diminuisce con i giorni</li>
                </ul>
                <p className="font-body text-muted-foreground mt-4">
                  Il nostro team è sempre disponibile per supportarti e fornirti le indicazioni necessarie.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center pt-8">
                <p className="font-body text-lg text-muted-foreground mb-6">
                  Hai domande sulla cura del tuo tatuaggio? Contattaci per consigli personalizzati.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ContactDialog>
                    <Button variant="hero" size="lg">
                      Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </ContactDialog>
                  <a href="https://wa.me/393470174082" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      WhatsApp: 347 017 4082
                    </Button>
                  </a>
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

export default AftercarePage;
