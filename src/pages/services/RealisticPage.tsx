// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI REALISTICI TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggi realistici torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const RealisticPage = () => {
  const styleData = {
    slug: "tatuaggio-realistico-a-torino",
    title: "Tatuaggio realistico a Torino",
    metaTitle: "Tatuaggio realistico a Moncalieri (Torino) - Tribal Tattoo",
    metaDescription:
      "Il tatuaggio realistico è la massima espressione tecnica dell'arte del tatuaggio. Basato sulla precisione dei dettagli e sull'uso sapiente delle sfumature. Tribal Tattoo è un punto di riferimento per chi desidera un tatuaggio realistico a Moncalieri (Torino).",
    h1: "Tatuaggio realistico a Moncalieri (Torino)",
    intro:
      "Il tatuaggio realistico è la massima espressione tecnica dell'arte del tatuaggio. Basato sulla precisione dei dettagli e sull'uso sapiente delle sfumature, questo stile consente di riprodurre immagini fedeli alla realtà, dai ritratti umani agli animali, dagli elementi naturali ai paesaggi. Tribal Tattoo è un punto di riferimento per chi desidera un tatuaggio realistico a Moncalieri (Torino), realizzato con cura, esperienza e una profonda sensibilità artistica.",
    about: [
      "Il tatuaggio realistico si distingue per la capacità di riprodurre soggetti con un alto livello di dettaglio, dando l'impressione di tridimensionalità e profondità. Ogni sfumatura e ogni linea sono studiate per rendere il disegno il più fedele possibile alla realtà. Questo stile può essere eseguito in Black and Grey, per un effetto elegante e senza tempo, o a colori, per una resa ancora più vivida e d'impatto.",
      "La tecnica del tatuaggio realistico si basa su un lavoro meticoloso di sfumature e transizioni tonali. A differenza di altri stili, non utilizza contorni marcati, ma lavora con contrasti delicati per ottenere un effetto naturale. Tribal Tattoo utilizza strumenti di alta precisione e pigmenti di qualità per garantire un risultato nitido e duraturo.",
      "Realizzare un tatuaggio realistico richiede una profonda conoscenza della tecnica e un occhio attento ai dettagli. Tribal Tattoo si distingue per la sua capacità di riprodurre sfumature morbide, dettagli nitidi e proporzioni perfette, garantendo risultati straordinari. Ogni tatuaggio è studiato con cura per adattarsi armoniosamente alla zona del corpo scelta, valorizzando la forma e l'effetto visivo."
    ],
    features: [
      "Ritratti: volti di persone care, icone famose o personaggi cinematografici",
      "Animali: rappresentazioni dettagliate di cani, gatti, leoni, lupi e altri",
      "Paesaggi e natura: scenari evocativi, alberi e ambientazioni suggestive",
      "Elementi simbolici: oggetti dal forte valore emotivo, come orologi, mani intrecciate o occhi espressivi",
      "Sfumature morbide e dettagli nitidi",
      "Proporzioni perfette",
      "Black and Grey o a colori",
      "Strumenti di alta precisione e pigmenti di qualità"
    ],
    process: [
      "Consulenza iniziale: discutiamo il soggetto che desideri e valutiamo insieme le dimensioni e il posizionamento ideale.",
      "Design personalizzato: Claudio Ciliberti lavora in stretta collaborazione con ogni cliente per creare un'opera su misura, che racconti una storia e trasmetta emozione.",
      "Preparazione: ogni tatuaggio è studiato con cura per adattarsi armoniosamente alla zona del corpo scelta.",
      "Esecuzione: utilizziamo strumenti di alta precisione e pigmenti di qualità per garantire un risultato nitido e duraturo.",
      "Follow-up: resto disponibile per qualsiasi domanda o necessità di ritocchi."
    ],
    pricing:
      "Contattaci per un preventivo personalizzato. Il costo varia in base alle dimensioni e alla complessità del disegno. Alcuni tatuaggi realistici richiedono più sessioni per ottenere il massimo livello di dettaglio e sfumatura. Durante la consulenza ti forniremo una stima precisa.",
    gallery: [
      { src: shopConfig.gallery[1].src, alt: "Tatuaggio realistico black and grey - Tribal Tattoo Moncalieri (Torino)" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" },
      { slug: "tatuaggio-geometrico-a-torino", name: "Geometrico" }
    ],
    portfolioSlug: "realistic-torino",
    faqs: [
      { question: "È possibile fare un tatuaggio realistico di piccole dimensioni?", answer: "Sì, ma per ottenere un effetto iperrealistico è consigliabile una dimensione sufficiente a valorizzare i dettagli." },
      { question: "Il tatuaggio realistico si può fare in un'unica sessione?", answer: "Dipende dalla complessità del disegno. Alcuni tatuaggi realistici richiedono più sessioni per ottenere il massimo livello di dettaglio e sfumatura." },
      { question: "Meglio un tatuaggio realistico in Black and Grey o a colori?", answer: "Entrambe le versioni hanno il loro fascino. Il Black and Grey è più classico e duraturo, mentre il colore dona un effetto più vivido e d'impatto. Claudio Ciliberti aiuta ogni cliente a scegliere la soluzione più adatta alle proprie preferenze." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default RealisticPage;
