// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI BLACK & GREY TORINO - SEO LANDING PAGE          ║
// ║     Target keyword: "tatuaggi black and grey torino"         ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const BlackGreyPage = () => {
  const styleData = {
    slug: "tatuaggi-black-grey-torino",
    title: "Tatuaggi Black & Grey Torino",
    metaTitle: "Tatuaggi Black & Grey a Torino | Sfumature Realistiche | Gran Babar",
    metaDescription:
      "Tatuaggi black and grey (bianco e nero) a Torino. Ritratti, realistico, chicano, horror, biomeccanico. Francesco specializzato in sfumature perfette. Studio Borgo Dora.",
    h1: "Tatuaggi Black & Grey a Torino",
    intro:
      "Il Black & Grey è lo stile più versatile del tatuaggio: usando solo inchiostro nero diluito in diverse tonalità di grigio, si creano immagini dall'incredibile profondità e realismo.",
    about: [
      "Lo stile Black & Grey nasce nelle carceri americane dove i detenuti usavano inchiostro nero diluito con acqua o cenere per creare tatuaggi con sfumature. Da tecnica improvvisata è diventato uno degli stili più raffinati e richiesti nel tatuaggio professionale.",
      "Al Gran Babar Studio di Torino, Francesco è specializzato in Black & Grey da oltre 10 anni. Questa tecnica permette infinite possibilità: ritratti fotorealistici, scene horror, chicano, biomeccanico, floreale, religioso. L'assenza di colore dona un'eleganza senza tempo ai tatuaggi.",
      "Il Black & Grey invecchia splendidamente: senza colori che sbiadiscono, il tatuaggio mantiene contrasto e leggibilità anche dopo decenni. È particolarmente adatto per pelle chiara ma funziona magnificamente anche su pelle scura con la giusta tecnica."
    ],
    features: [
      "Sfumature progressive da bianco pelle a nero saturo",
      "Versatilità stilistica: realistico, horror, religioso, chicano, biomeccanico",
      "Ritratti fotografici con profondità incredibile",
      "Contrasti drammatici che catturano l'attenzione",
      "Tecnica smooth shading per transizioni morbide",
      "Nessuno sbiadimento dei colori (perché non ci sono colori)",
      "Adatto a tutte le zone del corpo e tutte le carnagioni",
      "Estetica elegante e senza tempo"
    ],
    process: [
      "Consulenza sul soggetto: il Black & Grey permette qualsiasi soggetto. Porti riferimenti fotografici e discutiamo stile e posizionamento. Ti mostro portfolio con esempi simili.",
      "Bozzetto personalizzato: creo il design studiando luci, ombre e valori tonali. Per ritratti richiedo foto ad alta risoluzione. Ti mostro preview del lavoro finito.",
      "Pianificazione delle sessioni: pezzi piccoli (fino a 15cm) si completano in 3-5 ore. Pezzi grandi richiedono sessioni multiple da 4-6 ore per costruire gradualmente le sfumature.",
      "Tecnica di esecuzione: uso diverse configurazioni di aghi (magnum, round shader) per creare sfumature di diversa morbidezza. Lavoro da chiaro a scuro, costruendo la profondità per strati.",
      "Aftercare specifico: il Black & Grey guarisce con poca perdita di dettaglio se curato bene. Ti fornisco istruzioni precise e prodotti consigliati."
    ],
    pricing:
      "I tatuaggi Black & Grey hanno prezzi variabili in base alla complessità delle sfumature. Pezzi piccoli (8-12cm) partono da €150. Ritratti e pezzi medi (15-20cm) costano €350-€600. Mezze maniche, intere maniche o pezzi grandi hanno prezzi personalizzati da €800 in su, spesso divisi in più sessioni. La consulenza è gratuita e ti fornisco un preventivo trasparente basato su ore di lavoro stimate.",
    gallery: [
      { src: shopConfig.gallery[1].src, alt: "Tatuaggio black and grey realistico - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-realistici-torino", name: "Realistici" },
      { slug: "cover-up-tatuaggi-torino", name: "Cover-up" },
      { slug: "tatuaggi-old-school-torino", name: "Old School" }
    ],
    portfolioSlug: "black-grey-torino",
    relatedBlogPosts: [
      { slug: "cura-tatuaggio-aftercare", title: "Cura del Tatuaggio Black & Grey" },
      { slug: "primo-tatuaggio-guida", title: "Primo Tatuaggio: Consigli Utili" }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default BlackGreyPage;
