// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO GOTICO TORINO - SEO LANDING PAGE               ║
// ║     Target keyword: "tatuaggio gotico torino"                ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const GothicPage = () => {
  const styleData = {
    slug: "tatuaggio-gotico-a-torino",
    title: "Tatuaggio Gotico a Torino",
    metaTitle: "Tatuaggio Gotico a Torino | Gran Babar | Stile Dark ed Elegante",
    metaDescription:
      "Tatuaggi gotici a Torino. Teschi, rose nere, architetture gotiche, blackletter. Studio Gran Babar. Atmosfera dark ed elegante. Prenota consulenza.",
    h1: "Tatuaggio Gotico a Torino",
    intro:
      "Il tatuaggio gotico unisce eleganza oscura e simbolismo profondo, attingendo dall'estetica medievale, dall'architettura delle cattedrali e dalla cultura dark. Teschi ornamentali, rose nere, croci elaborate e caratteri blackletter creano tatuaggi dal forte impatto visivo e dal significato intenso.",
    about: [
      "Lo stile gotico nel tatuaggio abbraccia diverse influenze: l'arte medievale con i suoi arabeschi elaborati, l'architettura delle cattedrali con le vetrate e gli archi a sesto acuto, e la cultura dark contemporanea con la sua estetica romantica e misteriosa.",
      "I tatuaggi gotici spesso incorporano elementi come teschi decorati con ornamenti floreali, rose nere simbolo di bellezza oscura, croci elaborate, architetture gotiche, angeli caduti e creature fantastiche. Il nero profondo e le ombreggiature intense sono caratteristiche distintive di questo stile.",
      "Gran Babar interpreta lo stile gotico con sensibilità artistica, creando tatuaggi che bilanciano l'oscurità con l'eleganza, il macabro con il bello, risultando in opere che celebrano l'estetica gotica in tutte le sue sfumature."
    ],
    features: [
      "Estetica dark ed elegante ispirata al periodo medievale",
      "Soggetti caratteristici: teschi ornamentali, rose nere, croci",
      "Architetture gotiche: archi, vetrate, cattedrali",
      "Font blackletter perfetto per scritte gotiche",
      "Ombreggiature intense e contrasti marcati",
      "Dettagli ornamentali elaborati e arabeschi",
      "Simbolismo profondo legato a morte, rinascita, spiritualità",
      "Combinabile con elementi romantici e floreali"
    ],
    process: [
      "Consulenza gotica: esploriamo insieme quale aspetto dello stile gotico ti affascina di più.",
      "Selezione elementi: teschi, rose, architetture, scritte blackletter - creiamo la combinazione perfetta.",
      "Design elaborato: lavoro sui dettagli ornamentali che rendono unico ogni tatuaggio gotico.",
      "Studio ombreggiature: le ombreggiature intense sono fondamentali per l'atmosfera gotica.",
      "Esecuzione artistica: creo il tuo tatuaggio gotico con attenzione ad ogni dettaglio decorativo."
    ],
    pricing:
      "I tatuaggi gotici variano molto in complessità. Design semplici con elementi gotici partono da €120. Pezzi elaborati con molti dettagli ornamentali richiedono più tempo e un preventivo personalizzato. Consulenza gratuita disponibile.",
    gallery: [
      { src: "/images/styles/tatuaggio-gotico-a-torino/gotico-1.jpg", alt: "Tatuaggio Gotico elegante - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" },
      { slug: "tatuaggio-lettering-a-torino", name: "Lettering" },
      { slug: "tatuaggio-floreale-a-torino", name: "Floreale" }
    ],
    portfolioSlug: undefined,
    faqs: [
      { question: "Che cosa rappresenta un tatuaggio gotico?", answer: "Un tatuaggio gotico incarna temi di mistero, trasformazione e dualità, utilizzando simboli come teschi, fiori e motivi esoterici per esprimere la bellezza nascosta nelle ombre della vita." },
      { question: "Quali sono gli elementi tipici di un tatuaggio gotico?", answer: "Gli elementi più comuni includono teschi, fiori scuri, architetture imponenti e simboli esoterici, che insieme creano un design ricco di significato e atmosfera misteriosa." },
      { question: "Quali tecniche vengono utilizzate per realizzare un tatuaggio gotico?", answer: "GRAN BABAR utilizza una combinazione di tecniche tradizionali e moderne, impiegando strumenti di precisione e inchiostri di alta qualità per ottenere tratti definiti e sfumature armoniose, esaltando il carattere simbolico del design." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default GothicPage;
