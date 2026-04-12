// ╔══════════════════════════════════════════════════════════════╗
// ║     PORTFOLIO COVER-UP TATUAGGI TORINO                       ║
// ║     Target: "cover up torino", "copertura tatuaggio torino"  ║
// ╚══════════════════════════════════════════════════════════════╝

import { PortfolioPage } from "./PortfolioPage";
import shopConfig from "@/config/shopConfig";

const CoverUpPortfolio = () => {
  const portfolioData = {
    slug: "cover-up-torino",
    title: "Portfolio Cover-up",
    metaTitle: "Portfolio Cover-up Tatuaggi Torino | Prima e Dopo | Tribal Tattoo",
    metaDescription:
      "Galleria cover-up e coperture tatuaggi a Moncalieri (Torino). Trasformiamo vecchi tatuaggi in opere d'arte nuove. Confronto prima/dopo. 10+ trasformazioni completate.",
    h1: "Portfolio Cover-up Torino",
    intro:
      "Trasformiamo vecchi tatuaggi in nuove opere d'arte. Ogni cover-up richiede studio approfondito per garantire una copertura impeccabile che rispetta la tua pelle e il nuovo design.",
    gallery: [
      // Quando avrai immagini di cover-up before/after, aggiungile qui
      // Idealmente, mostra sia il prima che il dopo
      // { src: "/assets/coverup-1-before.jpg", alt: "Prima del cover-up", caption: "Prima" },
      // { src: "/assets/coverup-1-after.jpg", alt: "Dopo il cover-up", caption: "Dopo - Cover-up completato" },
    ],
    servicePageSlug: "cover-up-tatuaggi-torino",
    relatedPortfolios: [
      { slug: "old-school-torino", name: "Old School" },
      { slug: "realistici-torino", name: "Realistici" },
      { slug: "black-grey-torino", name: "Black & Grey" },
      { slug: "geometrici-torino", name: "Geometrici" }
    ],
    relatedBlogPosts: [
      { slug: "quanto-costa-tatuaggio-torino", title: "Prezzi Cover-up Torino" },
      { slug: "cura-tatuaggio-aftercare", title: "Cura Post-Tatuaggio" }
    ]
  };

  return <PortfolioPage portfolio={portfolioData} />;
};

export default CoverUpPortfolio;
