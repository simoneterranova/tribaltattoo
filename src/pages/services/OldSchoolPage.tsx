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
    metaTitle: "Tatuaggi Old School a Torino | Gran Babar Studio | Stile Tradizionale",
    metaDescription:
      "Tatuaggi Old School a Torino con Francesco. Stile tradizionale americano con colori brillanti, linee bold e soggetti iconici. Prenota consulenza gratuita.",
    h1: "Tatuaggi Old School a Torino",
    intro:
      "Lo stile Old School, nato negli anni '30 con i marinai americani, rappresenta le radici storiche del tatuaggio moderno. Linee bold, colori brillanti primari (rosso, giallo, verde, blu) e soggetti iconici come ancore, rondini, cuori e pin-up.",
    about: [
      "Il tatuaggio Old School (o Traditional American) è lo stile che ha definito l'estetica del tatuaggio occidentale. Nato nei porti americani, portato in giro per il mondo dai marinai, è diventato l'icona del tatuaggio classico.",
      "Francesco al Gran Babar Studio specializza in questo stile dal 2020, rispettando le regole tradizionali: linee spesse e decise, colori saturi senza sfumature, soggetti simbolici con significati profondi. Ogni tatuaggio Old School è un omaggio alla storia del tatuaggio.",
      "A Torino, nel cuore di Borgo Dora, portiamo avanti questa tradizione con tecnica moderna ma estetica vintage. Ogni pezzo è studiato per durare nel tempo, con colori che resistono e linee che rimangono definite anche dopo anni."
    ],
    features: [
      "Linee bold nere da 3-5mm che definiscono chiaramente ogni soggetto",
      "Colori primari saturi (rosso, giallo, blu, verde) senza sfumature",
      "Soggetti iconici: ancore, rondini, rose, cuori, daghe, pin-up, aquile",
      "Significati simbolici legati alla tradizione marinaresca e americana",
      "Durata eccezionale: le linee bold invecchiano meglio di stili più delicati",
      "Estetica senza tempo che non passa mai di moda",
      "Adatto a tutte le zone del corpo, specialmente braccia, petto, schiena",
      "Tempi di esecuzione ridotti grazie alla tecnica senza sfumature complesse"
    ],
    process: [
      "Consulenza iniziale: discutiamo il soggetto e il significato che vuoi dare al tatuaggio. Ti mostro il portfolio Old School e valutiamo insieme dimensioni e posizionamento.",
      "Design personalizzato: creo il bozzetto rispettando le regole dello stile Old School. Puoi richiedere modifiche fino a quando non sei completamente soddisfatto.",
      "Preparazione della sessione: ti spiego come preparare la pelle, cosa portare e quanto tempo ci vorrà (di solito 1-3 ore per pezzi medi).",
      "Esecuzione del tatuaggio: lavoro con macchine tradizionali, inchiostri di alta qualità e massima attenzione all'igiene. Il dolore è gestibile e la tecnica è veloce.",
      "Aftercare completo: ti fornisco istruzioni dettagliate per la guarigione e resto disponibile per qualsiasi domanda nelle settimane successive."
    ],
    pricing:
      "I tatuaggi Old School partono da €150 per pezzi piccoli (5-10cm). Pezzi medi (10-15cm) vanno da €200 a €350. Per composizioni più grandi o sleeve, il preventivo è personalizzato. Il prezzo finale dipende da dimensione, complessità e numero di colori. Durante la consulenza gratuita ti fornirò un preventivo preciso.",
    gallery: [
      { src: shopConfig.gallery[0].src, alt: "Tatuaggio Old School con ancora e rondini - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-realistici-torino", name: "Tatuaggi Realistici" },
      { slug: "tatuaggi-geometrici-torino", name: "Tatuaggi Geometrici" },
      { slug: "cover-up-tatuaggi-torino", name: "Cover-up" }
    ],
    portfolioSlug: "old-school-torino",
    relatedBlogPosts: [
      { slug: "quanto-costa-tatuaggio-torino", title: "Quanto Costa un Tatuaggio a Torino?" },
      { slug: "primo-tatuaggio-guida", title: "Guida al Primo Tatuaggio" }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default OldSchoolPage;
