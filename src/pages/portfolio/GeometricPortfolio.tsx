// ╔══════════════════════════════════════════════════════════════╗
// ║     PORTFOLIO TATUAGGI GEOMETRICI TORINO                     ║
// ║     Target: "portfolio geometrici torino", "galleria geometric"║
// ╚══════════════════════════════════════════════════════════════╝

import { PortfolioPage } from "./PortfolioPage";
import shopConfig from "@/config/shopConfig";

const GeometricPortfolio = () => {
  const portfolioData = {
    slug: "geometrici-torino",
    title: "Portfolio Geometrici",
    metaTitle: "Portfolio Tatuaggi Geometrici Torino | Galleria Gran Babar",
    metaDescription:
      "Galleria tatuaggi geometrici e mandala a Torino. Disegni sacri, forme pure e pattern simmetrici realizzati con precisione millimetrica. 12+ lavori geometrici.",
    h1: "Portfolio Tatuaggi Geometrici Torino",
    intro:
      "Esplora la nostra collezione di tatuaggi geometrici: mandala, forme sacre, pattern simmetrici. Ogni linea è tracciata con precisione millimetrica per creare armonia perfetta.",
    gallery: [
      {
        src: shopConfig.gallery[2].src,
        alt: "Tatuaggio geometrico con mandala realizzato a Torino da Gran Babar",
        caption: "Geometrico - Mandala con pattern simmetrici"
      },
      // Aggiungi più immagini geometriche qui
    ],
    servicePageSlug: "tatuaggi-geometrici-torino",
    relatedPortfolios: [
      { slug: "old-school-torino", name: "Old School" },
      { slug: "realistici-torino", name: "Realistici" },
      { slug: "black-grey-torino", name: "Black & Grey" },
      { slug: "cover-up-torino", name: "Cover-up" }
    ],
    relatedBlogPosts: [
      { slug: "primo-tatuaggio-guida", title: "Primo Tatuaggio: Cosa Sapere" },
      { slug: "quanto-costa-tatuaggio-torino", title: "Prezzi Tatuaggi Geometrici" }
    ]
  };

  return <PortfolioPage portfolio={portfolioData} />;
};

export default GeometricPortfolio;
