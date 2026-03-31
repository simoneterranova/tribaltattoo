// ╔══════════════════════════════════════════════════════════════╗
// ║     PORTFOLIO TATUAGGI OLD SCHOOL TORINO                    ║
// ║     Target: "portfolio old school torino", "galleria old school"║
// ╚══════════════════════════════════════════════════════════════╝

import { PortfolioPage } from "./PortfolioPage";
import shopConfig from "@/config/shopConfig";

const OldSchoolPortfolio = () => {
  const portfolioData = {
    slug: "old-school-torino",
    title: "Portfolio Old School",
    metaTitle: "Portfolio Tatuaggi Old School Torino | Galleria Gran Babar",
    metaDescription:
      "Guarda il portfolio completo di tatuaggi Old School realizzati a Torino da Francesco. Stile tradizionale americano con linee bold e colori brillanti. 20+ lavori.",
    h1: "Portfolio Old School Torino",
    intro:
      "Esplora la nostra collezione di tatuaggi Old School realizzati a Torino. Ogni pezzo rispetta la tradizione americana: linee bold, colori primari saturi e soggetti iconici come ancore, rondini, rose e pin-up.",
    gallery: [
      {
        src: shopConfig.gallery[0].src,
        alt: "Tatuaggio Old School con ancora e rondini realizzato a Torino da Gran Babar",
        caption: "Old School - Ancora con rondini"
      },
      // In futuro, aggiungi più immagini qui per popolare la galleria
      // { src: "/path/to/image.jpg", alt: "...", caption: "..." },
    ],
    servicePageSlug: "tatuaggi-old-school-torino",
    relatedPortfolios: [
      { slug: "realistici-torino", name: "Realistici" },
      { slug: "geometrici-torino", name: "Geometrici" },
      { slug: "cover-up-torino", name: "Cover-up" },
      { slug: "black-grey-torino", name: "Black & Grey" }
    ],
    relatedBlogPosts: [
      { slug: "quanto-costa-tatuaggio-torino", title: "Quanto Costa un Tatuaggio a Torino?" },
      { slug: "primo-tatuaggio-guida", title: "Guida al Primo Tatuaggio" }
    ]
  };

  return <PortfolioPage portfolio={portfolioData} />;
};

export default OldSchoolPortfolio;
