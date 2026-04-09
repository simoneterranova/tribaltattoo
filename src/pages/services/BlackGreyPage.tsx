// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI BLACK & GREY TORINO - SEO LANDING PAGE          ║
// ║     Target keyword: "tatuaggi black and grey torino"         ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const BlackGreyPage = () => {
  const styleData = {
    slug: "tatuaggio-black-grey-a-torino",
    title: "Tatuaggio Black & Grey a Torino",
    metaTitle: "Tatuaggio Black & Grey a Torino - GranBabar",
    metaDescription:
      "Il tatuaggio Black and Grey rappresenta l'arte della sfumatura e del chiaroscuro, uno stile senza tempo che esprime forza, emozione e realismo. Gran Babar realizza tatuaggi Black and Grey a Torino con un'attenzione maniacale ai dettagli.",
    h1: "Black & Grey Tattoo a Torino",
    intro:
      "Il tatuaggio Black and Grey rappresenta l'arte della sfumatura e del chiaroscuro, uno stile senza tempo che esprime forza, emozione e realismo. Gran Babar realizza tatuaggi Black and Grey a Torino con un'attenzione maniacale ai dettagli, trasformando ogni disegno in un'opera d'arte che resiste al tempo. Se cerchi un tatuaggio dal forte impatto visivo, capace di raccontare una storia attraverso il contrasto tra luce e ombra, sei nel posto giusto.",
    about: [
      "Lo stile Black and Grey nasce dall'utilizzo esclusivo dell'inchiostro nero, diluito in diverse gradazioni di grigio per creare profondità e tridimensionalità. Questa tecnica è ideale per tatuaggi realistici, ritratti, soggetti religiosi e motivi dettagliati, offrendo un effetto sofisticato e intenso. Gran Babar utilizza tecniche avanzate per ottenere sfumature fluide e omogenee, assicurando un risultato armonioso e duraturo.",
      "Il tatuaggio Black and Grey richiede esperienza e precisione. La qualità delle sfumature dipende dalla capacità di dosare l'inchiostro e dalla conoscenza delle transizioni tonali. Questo stile è apprezzato per la sua versatilità, adatto sia a disegni minimali sia a opere più complesse. Gli effetti di chiaroscuro sono perfetti per esaltare dettagli, creando tatuaggi che mantengono la loro intensità nel tempo senza bisogno di grandi ritocchi.",
      "Ogni tatuaggio è il risultato di uno studio attento delle forme e delle sfumature. Gran Babar unisce competenza tecnica e sensibilità artistica per garantire risultati eccellenti, lavorando con precisione su ogni dettaglio. L'obiettivo è creare tatuaggi che mantengano definizione e profondità nel tempo, offrendo un'estetica forte e duratura."
    ],
    features: [
      "Ritratti realistici con chiaroscuro perfetto",
      "Elementi sacri e religiosi",
      "Teschi e motivi dark",
      "Paesaggi dettagliati",
      "Animali in stile realistico",
      "Sfumature fluide e omogenee",
      "Inchiostro nero diluito in gradazioni di grigio",
      "Effetto sofisticato e intenso"
    ],
    process: [
      "Consulenza iniziale: Gran Babar lavora con i clienti per sviluppare disegni personalizzati, traducendo ogni idea in un'opera unica.",
      "Design personalizzato: ogni progetto è studiato su misura per valorizzare al massimo la composizione e l'anatomia del corpo.",
      "Preparazione: utilizziamo tecniche avanzate per ottenere sfumature fluide e omogenee.",
      "Esecuzione: lavoriamo con precisione su ogni dettaglio per garantire risultati eccellenti.",
      "Follow-up: resto disponibile per qualsiasi domanda o necessità di ritocchi."
    ],
    pricing:
      "Contattaci per un preventivo personalizzato. Il costo varia in base alle dimensioni e alla complessità del design. Durante la consulenza ti forniremo una stima precisa.",
    gallery: [
      { src: shopConfig.gallery[1].src, alt: "Tatuaggio black and grey realistico - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "cover-up-e-correzioni-tatuaggi", name: "Cover-up" },
      { slug: "tatuaggi-old-school-torino", name: "Old School" }
    ],
    portfolioSlug: "black-grey-torino",
    faqs: [
      { question: "Il tatuaggio Black and Grey sbiadisce più velocemente?", answer: "Se realizzato con inchiostri di qualità e curato adeguatamente, mantiene la sua intensità per molti anni senza perdere definizione." },
      { question: "Quali soggetti si adattano meglio a questo stile?", answer: "Ritratti, elementi realistici, teschi, nature morte e simboli sacri sono tra le scelte più popolari per il Black and Grey." },
      { question: "È possibile aggiungere dettagli a colori a un tatuaggio Black and Grey?", answer: "Sì, alcuni clienti scelgono di inserire piccoli accenti cromatici per enfatizzare determinati dettagli e creare un contrasto unico." },
      { question: "Come avviene la cura post-tatuaggio?", answer: "Ti forniremo tutte le indicazioni necessarie per la corretta cura post-tatuaggio, essenziali per garantire una guarigione ottimale e la conservazione dei dettagli del lavoro." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default BlackGreyPage;
