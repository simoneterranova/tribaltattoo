// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO WATERCOLOR TORINO - SEO LANDING PAGE           ║
// ║     Target keyword: "tatuaggio watercolor torino"            ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const WatercolorPage = () => {
  const styleData = {
    slug: "tatuaggio-watercolor-a-torino",
    title: "Tatuaggio Watercolor a Torino",
    metaTitle: "Tatuaggio Watercolor a Torino | Gran Babar | Effetto Acquerello",
    metaDescription:
      "Tatuaggi watercolor a Torino. Effetto acquerello, colori sfumati, pennellate artistiche. Studio Gran Babar. Arte pittorica sulla pelle. Prenota consulenza.",
    h1: "Tatuaggio Watercolor a Torino",
    intro:
      "Il tatuaggio watercolor porta sulla pelle la leggerezza e la luminosità della pittura ad acquerello, con pennellate fluide, sfumature delicate e colori che sembrano sciogliersi l'uno nell'altro. È uno stile artistico e contemporaneo, perfetto per chi cerca un tatuaggio che sembri un'opera d'arte dipinta direttamente sulla pelle.",
    about: [
      "Lo stile watercolor nel tatuaggio emula le tecniche della pittura ad acquerello, con colori traslucidi che si fondono senza linee definite, macchie di colore che sembrano schizzi spontanei, e sfumature che creano profondità e movimento. A differenza degli stili tradizionali, il watercolor spesso omette i contorni neri, lasciando che siano i colori stessi a definire la forma.",
      "Questo stile è particolarmente adatto per soggetti naturalistici come fiori, uccelli, farfalle, paesaggi e animali, ma può essere applicato anche a design astratti e geometrici. L'effetto finale è etereo, leggero e incredibilmente pittorico.",
      "Gran Babar realizza tatuaggi watercolor con tecnica raffinata, utilizzando sfumature morbide e transizioni di colore che richiedono grande maestria. Ogni tatuaggio viene studiato per mantenere la sua vibrazione cromatica nel tempo."
    ],
    features: [
      "Effetto acquerello con pennellate fluide",
      "Colori traslucidi che si fondono tra loro",
      "Spesso senza contorni neri definiti",
      "Macchie di colore spontanee e artistiche",
      "Sfumature delicate e transizioni morbide",
      "Effetto etereo e leggero",
      "Perfetto per soggetti naturalistici e astratti",
      "Stile contemporaneo e artistico"
    ],
    process: [
      "Consulenza artistica: discutiamo il soggetto e la palette cromatica per il tuo acquerello sulla pelle.",
      "Design pittorico: creo una composizione che cattura la spontaneità e la leggerezza dell'acquerello.",
      "Scelta dei colori: selezioniamo tonalità che si fondono armoniosamente.",
      "Studio delle sfumature: pianifico le transizioni di colore per un effetto naturale.",
      "Esecuzione delicata: applico i colori con tecnica che emula le pennellate dell'acquerello."
    ],
    pricing:
      "I tatuaggi watercolor richiedono tempo per le sfumature elaborate. Pezzi medi partono da €180. La complessità della palette cromatica influenza il prezzo. Preventivo personalizzato durante la consulenza gratuita.",
    gallery: [
      { src: "/images/styles/tatuaggio-watercolor-a-torino/Watercolor.jpg", alt: "Tatuaggio Watercolor artistico - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-floreale-a-torino", name: "Floreale" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-new-school-a-torino", name: "New School" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Che cosa caratterizza un tatuaggio Watercolor?",
        answer: "Un tatuaggio Watercolor è caratterizzato da pennellate delicate e sfumate che creano un effetto simile a un dipinto ad acquerello, rendendo l'opera vibrante e ricca di espressività."
      },
      {
        question: "Quali tecniche vengono impiegate per realizzare un tatuaggio Watercolor?",
        answer: "Utilizzo tecniche specifiche per diluire e diffondere l'inchiostro, abbinando strumenti di precisione e inchiostri di alta qualità, per garantire sfumature armoniose e dettagli impeccabili."
      },
      {
        question: "Perché scegliere GRAN BABAR per il tuo tatuaggio Watercolor a Torino?",
        answer: "Scegliere GRAN BABAR significa affidarsi a vent'anni di esperienza e a una passione per l'arte che si traduce in tatuaggi Watercolor unici e personalizzati. La mia attenzione ai dettagli, l'uso di tecnologie all'avanguardia e un approccio empatico assicurano risultati che non solo incantano per la loro bellezza, ma raccontano storie e emozioni in modo autentico e duraturo."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default WatercolorPage;
