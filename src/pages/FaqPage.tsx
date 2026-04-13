// ╔══════════════════════════════════════════════════════════════╗
// ║     FAQ PAGE - VOICE SEARCH OPTIMIZED                        ║
// ║     Target: "domande frequenti tatuaggi", voice queries      ║
// ║     Schema: FAQPage for Google featured snippets             ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronDown, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

const FaqPage = () => {
  // FAQ data structured for voice search & featured snippets
  const faqCategories = [
    {
      category: "Informazioni Generali",
      icon: "ℹ️",
      questions: [
        {
          id: "dove-si-trova",
          question: "Dove si trova Tribal Tattoo Studio?",
          answer: `Il nostro studio di tatuaggi si trova in ${shopConfig.contact.addressLines[0]}, ${shopConfig.contact.addressLines[1]}, nel cuore del quartiere ${shopConfig.contact.quarter[0]}. Siamo facilmente raggiungibili con i mezzi pubblici e c'è parcheggio nelle vicinanze.`,
          link: { to: "/moncalieri-tatuaggi-tribali", text: "Vedi come arrivare" }
        },
        {
          id: "orari-apertura",
          question: "Quali sono gli orari di apertura?",
          answer: `Siamo aperti ${shopConfig.hours.map(h => `${h.days}: ${h.time}`).join(", ")}. Lavoriamo solo su appuntamento per garantire la massima attenzione a ogni cliente. Contattaci per prenotare la tua consulenza gratuita.`,
          link: { to: "/#contact", text: "Prenota ora" }
        },
        {
          id: "chi-e-claudio",
          question: `Chi è ${shopConfig.author.name}, il maestro tatuatore?`,
          answer: `${shopConfig.author.name} è il fondatore e maestro tatuatore di ${shopConfig.fullName}. Con oltre ${shopConfig.team[0].years} anni di esperienza, è specializzato in stili ${shopConfig.team[0].tags.join(", ")}. La sua passione per l'arte tribale sacra si riflette in ogni lavoro personalizzato.`,
          link: { to: "/#team", text: `Scopri di più su ${shopConfig.author.name}` }
        },
        {
          id: "perche-tribal-tattoo",
          question: `Perché scegliere ${shopConfig.fullName}?`,
          answer: "Tribal Tattoo offre consulenza gratuita, design 100% personalizzati e freehand, massimi standard di igiene, oltre 60 lavori documentati nel portfolio e un approccio professionale ma umano. Ogni tatuaggio è un'opera d'arte unica studiata per te e disegnata direttamente sul tuo corpo.",
          link: { to: "/portfolio", text: "Vedi i nostri lavori" }
        }
      ]
    },
    {
      category: "Prezzi e Preventivi",
      icon: "💰",
      questions: [
        {
          id: "quanto-costa",
          question: "Quanto costa un tatuaggio a Torino?",
          answer: `Il costo finale dipende da dimensione, complessità, colori e tempo di esecuzione. Ogni tatuaggio è unico e il prezzo viene definito dopo la consulenza gratuita durante la quale ti forniremo un preventivo preciso e trasparente per il tuo progetto.`,
          link: { to: "/blog/quanto-costa-tatuaggio-torino", text: "Guida completa ai prezzi" }
        },
        {
          id: "preventivo-gratuito",
          question: "Come posso ottenere un preventivo?",
          answer: `Prenota una consulenza gratuita chiamando il ${shopConfig.contact.phone} o scrivendoci a ${shopConfig.contact.email}. Durante l'incontro discuteremo la tua idea, valutiamo dimensioni e posizionamento, e ti forniremo un preventivo dettagliato senza impegno.`,
          link: { to: "/#contact", text: "Contattaci ora" }
        },
        {
          id: "metodi-pagamento",
          question: "Quali metodi di pagamento accettate?",
          answer: "Accettiamo contanti e carte di credito/debito. Per tatuaggi grandi che richiedono più sessioni, è possibile concordare un acconto alla prima seduta e saldare alla fine del lavoro.",
          link: null
        },
        {
          id: "costo-cover-up",
          question: "Quanto costa un cover-up?",
          answer: "I cover-up richiedono più lavoro progettuale e tecnico rispetto ad un tatuaggio standard. Il prezzo dipende dalla dimensione del vecchio tatuaggio, dai colori presenti e dalla complessità del nuovo design. Offriamo valutazione gratuita per fornirti un preventivo personalizzato.",
          link: { to: "/servizi/cover-up-tatuaggi-torino", text: "Info cover-up" }
        }
      ]
    },
    {
      category: "Processo e Preparazione",
      icon: "📋",
      questions: [
        {
          id: "primo-tatuaggio",
          question: "È il mio primo tatuaggio, cosa devo sapere?",
          answer: "Non preoccuparti! Durante la consulenza gratuita ti spiegheremo tutto il processo passo per passo: design, preparazione, esecuzione e cura post-tatuaggio. Ti forniremo tutte le informazioni per affrontare l'esperienza con serenità.",
          link: { to: "/blog/primo-tatuaggio-guida", text: "Guida completa primo tatuaggio" }
        },
        {
          id: "quanto-dura-seduta",
          question: "Quanto dura una seduta di tatuaggio?",
          answer: "Dipende dalle dimensioni e dalla complessità. Tatuaggi piccoli richiedono 1-2 ore, mentre pezzi medi 3-5 ore. Lavori grandi possono richiedere più sedute da 4-6 ore ciascuna. Ti comunicheremo la durata stimata durante la consulenza.",
          link: null
        },
        {
          id: "fa-male",
          question: "Fa male farsi tatuare?",
          answer: "Il dolore varia da persona a persona e dipende dalla zona del corpo. Generalmente è sopportabile e molti lo descrivono come un fastidio piuttosto che un dolore acuto. Zone con più grasso o muscolo fanno meno male di quelle vicino alle ossa. Facciamo pause se necessario.",
          link: { to: "/blog/primo-tatuaggio-guida#dolore", text: "Approfondisci" }
        },
        {
          id: "come-prepararsi",
          question: "Come devo prepararmi per la sessione?",
          answer: "Dormi bene la notte prima, mangia un pasto completo prima dell'appuntamento, evita alcol 24 ore prima, indossa abiti comodi, e porta acqua e snack. Ti invieremo istruzioni dettagliate via email dopo la prenotazione.",
          link: null
        },
        {
          id: "posso-portare-idea",
          question: "Posso portare la mia idea o un disegno?",
          answer: "Assolutamente sì! Puoi portare foto, disegni, riferimenti o semplicemente descrivere la tua idea. Claudio Ciliberti lavorerà con te per trasformarla in un design personalizzato che funzioni perfettamente sulla tua pelle.",
          link: { to: "/#contact", text: "Prenota consulenza" }
        }
      ]
    },
    {
      category: "Cura e Guarigione",
      icon: "🏥",
      questions: [
        {
          id: "come-curare",
          question: "Come devo curare il tatuaggio nuovo?",
          answer: "Dopo la sessione ti forniamo istruzioni dettagliate scritte. In generale: tieni la pellicola protettiva 2-4 ore, lava delicatamente con sapone neutro, applica crema specifica 2-3 volte al giorno, evita sole e bagni per 2-3 settimane. Resti sempre a disposizione per domande.",
          link: { to: "/blog/cura-tatuaggio-aftercare", text: "Guida completa aftercare" }
        },
        {
          id: "quanto-dura-guarigione",
          question: "Quanto tempo ci vuole per guarire?",
          answer: "La guarigione superficiale richiede 2-3 settimane, mentre quella completa (profonda) circa 3-4 mesi. Durante questo periodo segui le istruzioni di cura che ti forniamo. La guarigione corretta garantisce che i colori rimangano brillanti e le linee definite.",
          link: { to: "/blog/cura-tatuaggio-aftercare", text: "Leggi di più" }
        },
        {
          id: "posso-fare-sport",
          question: "Posso fare sport dopo il tatuaggio?",
          answer: "Evita attività intense per 1-2 settimane, soprattutto se coinvolgono la zona tatuata. Niente palestra, piscina, sauna o mare per almeno 2-3 settimane. Puoi riprendere gradualmente dopo che la pelle superficiale è guarita, ma ascolta sempre il tuo corpo.",
          link: null
        },
        {
          id: "sole-tatuaggio",
          question: "Posso esporre il tatuaggio al sole?",
          answer: "NO durante la guarigione (2-3 settimane). Dopo la guarigione, usa sempre protezione solare SPF 50+ per preservare i colori e prevenire lo sbiadimento. Il sole è il nemico numero uno dei tatuaggi vividi.",
          link: null
        }
      ]
    },
    {
      category: "Stili e Design",
      icon: "🎨",
      questions: [
        {
          id: "quali-stili",
          question: "Quali stili di tatuaggio realizzate?",
          answer: "Siamo specializzati in Polinesiano, Maori, Tribale, Freehand, Dot Work, Black Work e tatuaggi geometrici. Ogni stile ha caratteristiche uniche che possiamo spiegarti in consulenza. La nostra specialità è l'arte tribale autentica, non semplici copie.",
          link: { to: "/#services", text: "Vedi tutti gli stili" }
        },
        {
          id: "posso-vedere-portfolio",
          question: "Posso vedere esempi di lavori realizzati?",
          answer: "Certamente! Abbiamo un portfolio completo con oltre 60 tatuaggi realizzati, organizzato per stile. Puoi vederlo online o durante la consulenza gratuita. Ogni lavoro è documentato per mostrarti la qualità e l'attenzione ai dettagli.",
          link: { to: "/portfolio", text: "Guarda il portfolio" }
        },
        {
          id: "tatuaggio-personalizzato",
          question: "Posso avere un tatuaggio completamente personalizzato?",
          answer: "Sì, il 100% dei nostri lavori sono design personalizzati. Non usiamo mai flash (disegni pre-fatti). Ogni tatuaggio nasce dalla tua idea e viene studiato appositamente per te, considerando la tua pelle, il tuo corpo e i tuoi gusti.",
          link: { to: "/servizi/tatuaggi-old-school-torino", text: "Scopri il processo" }
        },
        {
          id: "cover-up-possibile",
          question: "Posso coprire un vecchio tatuaggio?",
          answer: "Nella maggior parte dei casi sì. Durante la consulenza valutiamo la fattibilità considerando colore, dimensione e posizione del vecchio tatuaggio. A volte consigliamo qualche seduta laser prima per schiarire l'inchiostro e ottenere risultati ottimali.",
          link: { to: "/servizi/cover-up-tatuaggi-torino", text: "Info cover-up" }
        }
      ]
    },
    {
      category: "Igiene e Sicurezza",
      icon: "🧼",
      questions: [
        {
          id: "standard-igiene",
          question: "Quali standard di igiene seguite?",
          answer: "Seguiamo rigorosamente le normative europee e italiane: aghi e materiali monouso, autoclave per sterilizzazione, superfici disinfettate dopo ogni cliente, guanti monouso, workspace sterile. La tua sicurezza è la nostra priorità assoluta.",
          link: null
        },
        {
          id: "allergie",
          question: "E se sono allergico agli inchiostri?",
          answer: "Usiamo inchiostri di altissima qualità certificati EU. Le allergie sono rare ma possibili. Se hai pelle sensibile o allergie note, faccelo sapere durante la consulenza. Possiamo fare un test patch su una piccola area prima di procedere.",
          link: null
        },
        {
          id: "rischi-infezioni",
          question: "Ci sono rischi di infezioni?",
          answer: "Con i nostri standard di igiene professionale e seguendo correttamente le istruzioni di aftercare che ti forniamo, i rischi sono minimi. Usiamo solo materiali sterili monouso e ti insegniamo come prenderti cura del tatuaggio per prevenire qualsiasi problema.",
          link: { to: "/blog/cura-tatuaggio-aftercare", text: "Prevenzione infezioni" }
        }
      ]
    },
    {
      category: "Altre Domande",
      icon: "❓",
      questions: [
        {
          id: "eta-minima",
          question: "Qual è l'età minima per tatuarsi?",
          answer: "In Italia è vietato tatuare i minori di 18 anni, anche con il consenso dei genitori. È una legge che rispettiamo rigorosamente. Dovrai portare un documento d'identità valido per confermare la maggiore età.",
          link: null
        },
        {
          id: "posso-tatuarmi-incinta",
          question: "Posso farmi tatuare se sono incinta o in allattamento?",
          answer: "No, sconsigliamo fortemente di tatuarsi durante la gravidanza o l'allattamento. È meglio attendere almeno 6 mesi dopo il parto o la fine dell'allattamento per tutelare la tua salute e quella del bambino.",
          link: null
        },
        {
          id: "quanto-dura-tatuaggio",
          question: "Quanto dura un tatuaggio?",
          answer: "I tatuaggi sono permanenti e durano tutta la vita. Nel tempo possono sbiadire leggermente a causa dell'esposizione al sole e dell'invecchiamento della pelle, ma con cura adeguata (protezione solare) mantengono vivacità per decenni. Eventuali ritocchi sono disponibili.",
          link: null
        },
        {
          id: "posso-modificare-appuntamento",
          question: "Posso modificare o cancellare l'appuntamento?",
          answer: "Sì, ma ti chiediamo di avvisarci con almeno 48 ore di anticipo. Gli appuntamenti richiedono preparazione del design personalizzato e bloccano spazio agenda. Con preavviso adeguato possiamo riprogrammare senza problemi.",
          link: { to: "/#contact", text: "Contattaci" }
        }
      ]
    }
  ];

  // Generate FAQPage schema for Google rich results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap(category =>
      category.questions.map(q => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer
        }
      }))
    )
  };

  return (
    <>
      <Helmet>
        <title>FAQ Tatuaggi Torino | Domande Frequenti | Tribal Tattoo Studio</title>
        <meta 
          name="description" 
          content={`Domande frequenti sui tatuaggi tribali a ${shopConfig.city}. Prezzi, preparazione, cura, stili, igiene. Risposte complete da ${shopConfig.author.name}, maestro tatuatore con ${shopConfig.team[0].years} anni esperienza.`} 
        />
        <meta name="author" content={shopConfig.author.name} />
        <meta property="og:title" content="FAQ Tatuaggi Torino | Tutte le Risposte" />
        <meta property="og:description" content="Tutte le risposte alle domande più frequenti sui tatuaggi tribali: prezzi, dolore, cura, stili, igiene. Guida completa by Tribal Tattoo Studio Moncalieri." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/faq-tatuaggi-torino`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">FAQ Tatuaggi</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
              >
                <MessageCircleQuestion className="h-8 w-8 text-primary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-5xl md:text-7xl text-foreground mb-6 leading-none"
              >
                Domande<br />Frequenti<span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Tutte le risposte che cerchi sui tatuaggi a Torino: prezzi, preparazione, 
                cura, stili e sicurezza. Se hai altre domande, {" "}
                <ContactDialog>
                  <button className="text-primary hover:underline">contattaci</button>
                </ContactDialog>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <ContactDialog>
                  <Button variant="hero" size="lg">
                    Prenota Consulenza Gratuita <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </ContactDialog>
                <Link to="/portfolio" title="Vedi portfolio completo di tutti gli stili">
                  <Button variant="outline" size="lg">
                    Vedi Portfolio
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl space-y-16">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              >
                {/* Category Header */}
                <div className="mb-6">
                  <h2 className="font-heading text-3xl md:text-4xl text-foreground flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    {category.category}
                  </h2>
                  <div className="h-1 w-20 bg-primary mt-3 rounded-full" />
                </div>

                {/* Questions Accordion */}
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-border rounded-sm bg-card hover:border-primary/50 transition-colors"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <span className="font-body text-base md:text-lg text-foreground text-left group-hover:text-primary transition-colors pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <p className="font-body text-muted-foreground leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        {faq.link && (
                          <Link 
                            to={faq.link.to} 
                            className="inline-flex items-center gap-2 text-sm font-body text-primary hover:underline"
                            title={faq.link.text}
                          >
                            {faq.link.text} <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Non Hai Trovato la Risposta?
            </h2>
            <p className="font-body text-lg mb-8 opacity-90">
              Contattaci per una consulenza gratuita. Claudio Ciliberti sarà felice di rispondere 
              a tutte le tue domande e aiutarti a realizzare il tatuaggio perfetto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${shopConfig.contact.phoneHref.replace('tel:', '')}`} title="Chiama Tribal Tattoo Studio per informazioni">
                <Button variant="secondary" size="lg">
                  Chiama Ora
                </Button>
              </a>
              <ContactDialog>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Invia Messaggio
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

export default FaqPage;
