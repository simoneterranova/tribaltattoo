// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI OLD SCHOOL TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggi old school torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const OldSchoolPage = () => {
  const styleData = {
    slug: "tatuaggi-old-school-torino",
    title: "Tatuaggi Old School Torino",
    metaTitle: "Tatuaggio Old school a Moncalieri (Torino) - Tribal Tattoo",
    metaDescription:
      "Se ami lo stile senza tempo dei tatuaggi old school, sei nel posto giusto. Tribal Tattoo realizza old school tattoo a Moncalieri (Torino), mantenendo viva la tradizione con linee audaci, colori pieni e simboli iconici.",
    h1: "Old School Tattoo a Moncalieri (Torino)",
    intro:
      "Se ami lo stile senza tempo dei tatuaggi old school, sei nel posto giusto. Tribal Tattoo realizza old school tattoo a Moncalieri (Torino), mantenendo viva la tradizione con linee audaci, colori pieni e simboli iconici. Ogni tatuaggio è studiato per resistere nel tempo, unendo la forza della tradizione alla personalizzazione moderna.",
    about: [
      "L'old school tattoo nasce nei primi decenni del '900, quando marinai, avventurieri e ribelli lo usavano per raccontare la loro storia. Grazie a tatuatori leggendari come Sailor Jerry, questo stile ha mantenuto la sua forza espressiva fino ai giorni nostri. Linee spesse, colori accesi e soggetti simbolici – ancore, rondini, pugnali e pin-up – hanno reso questo genere inconfondibile. Tribal Tattoo porta avanti questa tradizione nel suo studio a Moncalieri (Torino), reinterpretandola con passione e cura per i dettagli.",
      "Il segreto di un old school tattoo di successo risiede nella precisione tecnica e nell'attenzione ai dettagli. Tribal Tattoo utilizza metodi tradizionali che garantiscono inchiostri duraturi e disegni nitidi. Questo stile si distingue per l'uso di linee spesse, contorni ben definiti e colori solidi, che resistono al tempo e mantengono la loro intensità anno dopo anno.",
      "Tribal Tattoo, con oltre 30 anni di esperienza dal 1994, ha fatto dell'old school tattoo un vero e proprio linguaggio artistico. La sua esperienza e la sua passione per il disegno lo portano a reinterpretare i classici in chiave moderna, senza mai tradirne l'essenza. Ogni tatuaggio è il risultato di un processo creativo condiviso con il cliente, per trasformare un'idea in un'opera d'arte su pelle."
    ],
    features: [
      "Aquila – Coraggio e indipendenza",
      "Ancora – Stabilità e forza interiore",
      "Cuore trafitto – Amore e passione vissuti con intensità",
      "Teschio – Accettazione del destino e celebrazione della vita",
      "Rondine – Viaggio, libertà e ritorno sicuro a casa",
      "Linee spesse e contorni ben definiti",
      "Colori solidi che resistono al tempo",
      "Inchiostri duraturi e disegni nitidi"
    ],
    process: [
      "Consulenza iniziale: discutiamo il soggetto e il significato che vuoi dare al tatuaggio. Claudio Ciliberti accompagna i suoi clienti nella scelta, curando ogni dettaglio per rendere il tatuaggio un pezzo unico.",
      "Design personalizzato: ogni simbolo può essere personalizzato per rappresentare al meglio la storia di chi lo porta.",
      "Preparazione della sessione: utilizziamo metodi tradizionali con inchiostri di alta qualità e massima attenzione all'igiene.",
      "Esecuzione del tatuaggio: ogni tatuaggio è il risultato di un processo creativo condiviso con il cliente, per trasformare un'idea in un'opera d'arte su pelle.",
      "Aftercare completo: ti fornisco istruzioni dettagliate per la guarigione."
    ],
    pricing:
      "Contattaci per un preventivo personalizzato. La durata di una sessione varia in base alla complessità e alle dimensioni del tatuaggio. In genere, una sessione può durare da 1 a 3 ore, ma il nostro team ti fornirà una stima precisa durante la consulenza iniziale.",
    gallery: [
      { src: shopConfig.gallery[0].src, alt: "Tatuaggio Old School con ancora e rondini - Tribal Tattoo Moncalieri (Torino)" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-realistico-a-torino", name: "Tatuaggi Realistici" },
      { slug: "tatuaggio-geometrico-a-torino", name: "Tatuaggi Geometrici" },
      { slug: "cover-up-e-correzioni-tatuaggi", name: "Cover-up" }
    ],
    portfolioSlug: "old-school-torino",
    faqs: [
      { question: "Cos'è un old school tattoo?", answer: "Un old school tattoo è uno stile tradizionale caratterizzato da linee spesse, colori audaci e disegni iconici come ancore, cuori e pin-up. Si distingue per la sua estetica classica e la capacità di esprimere valori come coraggio e libertà." },
      { question: "Perché scegliere un old school tattoo a Moncalieri (Torino)?", answer: "Scegliere un old school tattoo a Moncalieri (Torino) significa optare per un tatuaggio che unisce tradizione e personalizzazione. Il nostro studio garantisce un'esecuzione tecnica impeccabile, capace di creare opere d'arte durature e ricche di significato personale." },
      { question: "Quanto dura una sessione per un old school tattoo?", answer: "La durata di una sessione varia in base alla complessità e alle dimensioni del tatuaggio. In genere, una sessione può durare da 1 a 3 ore, ma il nostro team ti fornirà una stima precisa durante la consulenza iniziale." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default OldSchoolPage;
