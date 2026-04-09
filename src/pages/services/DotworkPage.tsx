// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO DOTWORK TORINO - SEO LANDING PAGE              ║
// ║     Target keyword: "tatuaggio dotwork torino"               ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const DotworkPage = () => {
  const styleData = {
    slug: "tatuaggio-dotwork-a-torino",
    title: "Tatuaggio Dotwork a Torino",
    metaTitle: "Tatuaggio Dotwork a Torino | Gran Babar Studio | Tecnica Puntinata",
    metaDescription:
      "Tatuaggi dotwork a Torino. Tecnica raffinata a punti per ombreggiature e texture uniche. Studio Gran Babar, maestria e precisione. Prenota consulenza.",
    h1: "Tatuaggi Dotwork a Torino",
    intro:
      "Il tatuaggio dotwork è una tecnica raffinata e affascinante che utilizza esclusivamente punti per creare ombreggiature, texture e dettagli incredibilmente precisi. Questo stile si distingue per il suo aspetto ipnotico e per la profondità che riesce a conferire ai soggetti.",
    about: [
      "Il termine 'dotwork' significa letteralmente 'lavoro a punti' e rappresenta uno stile di tatuaggio in cui l'immagine viene creata esclusivamente attraverso la disposizione di minuscoli punti di inchiostro. Questo metodo permette di ottenere sfumature morbide e dettagli intricati senza l'uso delle tradizionali tecniche di riempimento.",
      "Questa tecnica richiede pazienza, precisione e una conoscenza approfondita della disposizione dei punti per ottenere il massimo effetto visivo. Le sfumature vengono ottenute tramite densità di punti: più sono ravvicinati, più la zona appare scura; più sono distanziati, più risulta chiara.",
      "Gran Babar, nel suo studio a Torino, realizza tatuaggi dotwork con maestria e attenzione ai dettagli, trasformando la pelle in un'opera d'arte fatta di pazienza, precisione e armonia visiva."
    ],
    features: [
      "Tecnica esclusivamente a punti per ombreggiature uniche",
      "Sfumature ottenute tramite densità dei puntini",
      "Effetto ipnotico e profondità visiva straordinaria",
      "Perfetto per mandala e geometrie sacre",
      "Ideale per figure naturalistiche e motivi mistici",
      "Lavorazione meticolosa che richiede tempo e maestria",
      "Contorni suggeriti piuttosto che definiti",
      "Risultato delicato e armonioso"
    ],
    process: [
      "Consulenza iniziale: Gran Babar ascolta le tue idee e ti mostra esempi di dotwork per aiutarti a visualizzare il risultato finale.",
      "Design personalizzato: creazione di un progetto unico che combina simbolismo e estetica puntinata.",
      "Pianificazione delle sessioni: i tatuaggi dotwork possono richiedere più tempo, pianifichiamo insieme il percorso.",
      "Esecuzione meticolosa: ogni punto viene posizionato con precisione per creare le giuste sfumature e texture.",
      "Aftercare completo: istruzioni dettagliate per garantire una guarigione perfetta e preservare i dettagli."
    ],
    pricing:
      "I tatuaggi dotwork richiedono più tempo rispetto ad altri stili per via della tecnica meticolosa. I prezzi partono da €150 per pezzi piccoli e variano in base alla complessità. Un preventivo preciso viene fornito durante la consulenza gratuita.",
    gallery: [
      { src: "/images/styles/tatuaggio-dotwork-a-torino/Gran-Babar-torino.jpg", alt: "Tatuaggio Dotwork geometrico - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-geometrico-a-torino", name: "Geometrico" },
      { slug: "tatuaggio-minimalista-a-torino", name: "Minimalista" },
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Che cosa sono i tatuaggi dotwork?",
        answer: "I tatuaggi dotwork sono opere realizzate mediante l'applicazione di innumerevoli piccoli puntini, che, combinati, creano sfumature, texture e disegni complessi, spesso ricchi di simbolismo e significato personale."
      },
      {
        question: "Quali tecniche vengono utilizzate per realizzare i tatuaggi dotwork?",
        answer: "Il processo si basa su strumenti di precisione e l'uso di inchiostri di alta qualità. GRAN BABAR unisce metodi tradizionali e innovativi, concentrandosi sulla corretta disposizione dei puntini per ottenere disegni nitidi e gradazioni armoniose."
      },
      {
        question: "Quali sono i significati dietro un tatuaggio dotwork?",
        answer: "Il dotwork può richiamare simboli spirituali, motivi tribali o geometrie sacre, rappresentando concetti come la trasformazione, la continuità e la ricerca interiore. Ogni tatuaggio viene personalizzato per rispecchiare la storia e le emozioni del cliente."
      },
      {
        question: "Quanto tempo richiede la realizzazione di un tatuaggio dotwork?",
        answer: "La durata varia in base alla complessità e all'estensione del disegno. Progetti più articolati possono richiedere diverse sessioni, mentre disegni più contenuti si realizzano in una o più sedute, sempre con la massima cura dei dettagli."
      },
      {
        question: "Perché scegliere GRAN BABAR per il tuo tatuaggio dotwork a Torino?",
        answer: "Scegliere GRAN BABAR significa affidarsi a un'esperienza ventennale, a una passione per l'arte e a un approccio personalizzato che trasforma ogni tatuaggio in un'opera unica. La professionalità, l'attenzione al dettaglio e l'innovazione tecnologica fanno di ogni consultazione un percorso di scoperta e creazione artistica."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default DotworkPage;
