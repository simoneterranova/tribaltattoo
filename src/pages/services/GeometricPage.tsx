// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI GEOMETRICI TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggi geometrici torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const GeometricPage = () => {
  const styleData = {
    slug: "tatuaggi-geometrici-torino",
    title: "Tatuaggi Geometrici Torino",
    metaTitle: "Tatuaggi Geometrici a Torino | Stile Sacred Geometry | Gran Babar",
    metaDescription:
      "Tatuaggi geometrici e sacred geometry a Torino. Design matematici, mandala, pattern simmetrici e forme sacre. Francesco al Gran Babar Studio. Consulenza gratuita.",
    h1: "Tatuaggi Geometrici a Torino",
    intro:
      "Il tatuaggio geometrico combina arte, matematica e spiritualità. Forme pure, pattern ripetuti, mandala e sacred geometry creano composizioni ipnotiche e cariche di significato simbolico.",
    about: [
      "Lo stile geometrico ha radici antiche nelle culture di tutto il mondo: dai mandala buddhisti, alla geometria sacra islamica, ai pattern tribali polinesiani. Ogni forma ha un significato: il cerchio rappresenta l'unità, il triangolo la trinità, l'esagono l'equilibrio naturale.",
      "Al Gran Babar Studio di Torino, Francesco crea tatuaggi geometrici personalizzati che fondono estetica minimale con profondità simbolica. Ogni design è progettato con precisione matematica: simmetrie perfette, proporzioni auree, pattern che si ripetono con armonia.",
      "I tatuaggi geometrici funzionano magnificamente sia come pezzi autonomi che come elementi di composizioni più ampie. Sono particolarmente adatti per braccia, avambracci, polpacci e schiena, dove le linee possono seguire la muscolatura naturale del corpo."
    ],
    features: [
      "Disegni basati su geometria sacra e proporzioni matematiche",
      "Mandala personalizzati con simbolismi specifici per te",
      "Pattern ripetuti e tessellazioni ipnotiche",
      "Linework ultra-preciso con linee perfettamente dritte",
      "Dotwork (puntinismo) per creare sfumature geometriche",
      "Fusione di stili: geometrico + realistico, geometrico + nature",
      "Simmetrie perfette calculate digitalmente prima dell'esecuzione",
      "Possibilità di espandere il design nel tempo con nuove sezioni"
    ],
    process: [
      "Consulenza e significati: parliamo dei simboli che ti parlano. Sacred geometry? Mandala? Pattern astratti? Ogni forma ha un significato e ti spiego le opzioni.",
      "Design digitale: creo il progetto al computer usando software di design geometrico. Questo garantisce simmetrie perfette e proporzioni precise. Ti mostro rendering 3D su foto del tuo corpo.",
      "Trasferimento accurato: lo stencil è fondamentale per la geometria. Lo posiziono con cura assoluta, controllando angoli e centrature. Anche 1mm di errore si nota nei pattern geometrici.",
      "Esecuzione metodica: lavoro a sezioni, costruendo il pattern passo dopo passo. Le linee devono essere perfettamente dritte e uniformi. Uso righelli e strumenti di precisione.",
      "Verifica finale: dopo la guarigione controlliamo che tutte le linee siano definite. I ritocchi sono rari ma inclusi se necessari."
    ],
    pricing:
      "I tatuaggi geometrici richiedono design digitale personalizzato e precisione maniacale nell'esecuzione. Pezzi piccoli (8-10cm) partono da €180. Mandala medi (15-20cm) costano €300-€500. Composizioni geometriche grandi (mezze maniche, polpacci completi) hanno prezzi personalizzati da €600 in su. Consulenza gratuita con visualizzazione digitale del design sul tuo corpo.",
    gallery: [
      { src: shopConfig.gallery[2].src, alt: "Tatuaggio geometrico con mandala - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggi-realistici-torino", name: "Realistici" },
      { slug: "tatuaggi-black-grey-torino", name: "Black & Grey" }
    ],
    portfolioSlug: "geometrici-torino",
    relatedBlogPosts: [
      { slug: "primo-tatuaggio-guida", title: "Primo Tatuaggio: Cosa Sapere" },
      { slug: "quanto-costa-tatuaggio-torino", title: "Prezzi Tatuaggi Geometrici" }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default GeometricPage;
