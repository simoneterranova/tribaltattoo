// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI REALISTICI TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggi realistici torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const RealisticPage = () => {
  const styleData = {
    slug: "tatuaggi-realistici-torino",
    title: "Tatuaggi Realistici Torino",
    metaTitle: "Tatuaggi Realistici a Torino | Iperrealismo | Gran Babar Studio",
    metaDescription:
      "Tatuaggi realistici e iperrealisti a Torino. Francesco specializzato in ritratti fotorealistici, animali e nature morte. Tecnica black & grey e colore. Consulenza gratuita.",
    h1: "Tatuaggi Realistici a Torino",
    intro:
      "Il tatuaggio realistico riproduce immagini con fedeltà fotografica sulla pelle. Ritratti, animali, paesaggi: ogni dettaglio è curato per creare l'illusione della tridimensionalità.",
    about: [
      "Il realismo è lo stile più tecnico e impegnativo nel mondo del tatuaggio. Richiede anni di studio dell'anatomia, delle luci e ombre, della prospettiva. Francesco ha perfezionato questa tecnica lavorando principalmente in black & grey, dove ogni sfumatura conta.",
      "Al Gran Babar Studio realizziamo ritratti di persone care, animali domestici, soggetti naturalistici e composizioni artistiche. Ogni tatuaggio è un'opera unica che racconta una storia personale. La tecnica richiede tempo: un ritratto medio può richiedere 4-6 ore di lavoro.",
      "A Torino siamo specialisti del realismo che dura nel tempo. Studiamo attentamente la posizione sulla pelle per garantire che le sfumature rimangano leggibili anche dopo anni. La preparazione del design è meticolosa: ogni ritratto richiede uno studio fotografico approfondito."
    ],
    features: [
      "Riproduzioni fotografiche fedeli con attenzione a ogni dettaglio",
      "Tecnica black & grey con sfumature progressive da bianco a nero",
      "Ritratti di persone: studio dei tratti somatici e delle espressioni",
      "Animali: pellicce texturizzate, occhi realistici, anatomia corretta",
      "Gestione professionale di luci, ombre e prospettiva",
      "Possibilità di realismo a colori per soggetti naturalistici",
      "Sessioni lunghe (4-8 ore) per garantire qualità fotografica",
      "Dopo la guarigione il risultato è permanente e impressionante"
    ],
    process: [
      "Consulenza approfondita: porti le foto di riferimento (ritratti, animali) e discutiamo dimensioni e posizionamento. Ti spiego la fattibilità tecnica e i tempi necessari.",
      "Studio fotografico: analizzo le foto, scelgo l'inquadratura migliore e creo un bozzetto dettagliato. Per ritratti richiedo foto ad alta risoluzione con illuminazione chiara.",
      "Appuntamento per tatuaggio: le sessioni realistiche durano 4-8 ore. Lavoriamo con pause regolari per gestire il dolore e mantenere la concentrazione.",
      "Tecnica di esecuzione: uso aghi shader per sfumature morbide e liner per dettagli precisi. Il lavoro procede per zone, costruendo gradualmente l'immagine.",
      "Follow-up: dopo 1 mese valutiamo la guarigione e, se necessario, facciamo un ritocco per perfezionare le sfumature (incluso nel prezzo)."
    ],
    pricing:
      "I tatuaggi realistici richiedono tempo e tecnica avanzata. Un ritratto medio (15x20cm) costa tra €400 e €700 a seconda della complessità. Pezzi più grandi o a colori hanno prezzi personalizzati. Durante la consulenza ti mostro il portfolio e ti fornisco un preventivo dettagliato basato sul tuo progetto specifico.",
    gallery: [
      { src: shopConfig.gallery[1].src, alt: "Tatuaggio realistico black and grey - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggi-black-grey-torino", name: "Black & Grey" },
      { slug: "tatuaggi-geometrici-torino", name: "Geometrici" }
    ],
    portfolioSlug: "realistici-torino",
    relatedBlogPosts: [
      { slug: "primo-tatuaggio-guida", title: "Guida al Primo Tatuaggio" },
      { slug: "cura-tatuaggio-aftercare", title: "Come Curare il Tatuaggio" }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default RealisticPage;
