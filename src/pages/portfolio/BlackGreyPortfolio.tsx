// ╔══════════════════════════════════════════════════════════════╗
// ║     PORTFOLIO TATUAGGI BLACK & GREY TORINO                   ║
// ║     Target: "portfolio black grey torino", "galleria black grey"║
// ╚══════════════════════════════════════════════════════════════╝

import { PortfolioPage } from "./PortfolioPage";
import shopConfig from "@/config/shopConfig";

const BlackGreyPortfolio = () => {
  const portfolioData = {
    slug: "black-grey-torino",
    title: "Portfolio Black & Grey",
    metaTitle: "Portfolio Tatuaggi Black & Grey Torino | Galleria Gran Babar",
    metaDescription:
      "Galleria tatuaggi Black & Grey a Torino. Sfumature, chiaroscuri e contrasti drammatici senza colori. Stile elegante e senza tempo. 18+ lavori.",
    h1: "Portfolio Black & Grey Torino",
    intro:
      "Scopri i nostri tatuaggi Black & Grey: sfumature eleganti, contrasti drammatici e profondità senza l'uso del colore. Uno stile senza tempo che invecchia perfettamente.",
    gallery: [
      {
        src: shopConfig.gallery[1].src,
        alt: "Tatuaggio Black & Grey con sfumature realizzato a Torino da Gran Babar",
        caption: "Black & Grey - Sfumature e chiaroscuri"
      },
      // Aggiungi più immagini Black & Grey qui
    ],
    servicePageSlug: "tatuaggi-black-grey-torino",
    relatedPortfolios: [
      { slug: "realistici-torino", name: "Realistici" },
      { slug: "old-school-torino", name: "Old School" },
      { slug: "geometrici-torino", name: "Geometrici" },
      { slug: "cover-up-torino", name: "Cover-up" }
    ],
    relatedBlogPosts: [
      { slug: "cura-tatuaggio-aftercare", title: "Cura del Tatuaggio Black & Grey" },
      { slug: "primo-tatuaggio-guida", title: "Primo Tatuaggio: Consigli Utili" }
    ]
  };

  return <PortfolioPage portfolio={portfolioData} />;
};

export default BlackGreyPortfolio;
