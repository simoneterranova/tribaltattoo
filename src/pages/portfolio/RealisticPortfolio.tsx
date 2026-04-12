// ╔══════════════════════════════════════════════════════════════╗
// ║     PORTFOLIO TATUAGGI REALISTICI TORINO                     ║
// ║     Target: "portfolio realistici torino", "galleria realistici"║
// ╚══════════════════════════════════════════════════════════════╝

import { PortfolioPage } from "./PortfolioPage";
import shopConfig from "@/config/shopConfig";

const RealisticPortfolio = () => {
  const portfolioData = {
    slug: "realistici-torino",
    title: "Portfolio Realistici",
    metaTitle: "Portfolio Tatuaggi Realistici Torino | Galleria Tribal Tattoo",
    metaDescription:
      "Galleria tatuaggi realistici e Black & Grey a Moncalieri (Torino). Claudio Ciliberti specialista in ritratti, animali e nature morte con dettaglio fotografico. 15+ lavori.",
    h1: "Portfolio Tatuaggi Realistici Torino",
    intro:
      "Scopri i nostri tatuaggi realistici realizzati a Moncalieri (Torino). Ritratti, animali, nature morte: ogni pezzo è studiato per catturare ogni dettaglio con precisione fotografica usando sfumature Black & Grey.",
    gallery: [
      {
        src: shopConfig.gallery[1].src,
        alt: "Tatuaggio realistico Black & Grey realizzato a Moncalieri da Tribal Tattoo",
        caption: "Realismo Black & Grey - Dettaglio ombreggiatture"
      },
      // Aggiungi più immagini qui per popolare la galleria
    ],
    servicePageSlug: "tatuaggi-realistici-torino",
    relatedPortfolios: [
      { slug: "old-school-torino", name: "Old School" },
      { slug: "black-grey-torino", name: "Black & Grey" },
      { slug: "cover-up-torino", name: "Cover-up" },
      { slug: "geometrici-torino", name: "Geometrici" }
    ],
    relatedBlogPosts: [
      { slug: "primo-tatuaggio-guida", title: "Guida al Primo Tatuaggio" },
      { slug: "cura-tatuaggio-aftercare", title: "Come Curare il Tatuaggio" }
    ]
  };

  return <PortfolioPage portfolio={portfolioData} />;
};

export default RealisticPortfolio;
