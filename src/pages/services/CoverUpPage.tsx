// ╔══════════════════════════════════════════════════════════════╗
// ║     COVER-UP TATUAGGI TORINO - SEO LANDING PAGE              ║
// ║     Target keyword: "cover up tatuaggi torino"               ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const CoverUpPage = () => {
  const styleData = {
    slug: "cover-up-tatuaggi-torino",
    title: "Cover-up Tatuaggi Torino",
    metaTitle: "Cover-up Tatuaggi a Torino | Correzione Tatuaggi | Gran Babar Studio",
    metaDescription:
      "Cover-up e correzione tatuaggi a Torino con Francesco. Copriamo vecchi tatuaggi con nuovi design creativi. Valutazione gratuita della fattibilità. Studio in Borgo Dora.",
    h1: "Cover-up e Correzione Tatuaggi a Torino",
    intro:
      "Un cover-up è l'arte di coprire un vecchio tatuaggio indesiderato con un nuovo design. Richiede esperienza tecnica, creatività e comprensione di come gli inchiostri interagiscono sulla pelle già tatuata.",
    about: [
      "Il cover-up è una delle specialità del Gran Babar Studio. Francesco ha anni di esperienza nel trasformare tatuaggi vecchi, sbiaditi o semplicemente non più graditi in nuove opere d'arte. La chiave è progettare un design che incorpori o mascheri completamente il tatuaggio esistente.",
      "Non tutti i tatuaggi sono cover-abili: dipende da colore, dimensione, posizione e densità dell'inchiostro originale. Durante la consulenza valutiamo la fattibilità e ti mostro esempi simili dal portfolio. In alcuni casi suggeriamo qualche seduta laser prima del cover-up per schiarire l'inchiostro vecchio.",
      "A Torino offriamo consulenza gratuita per cover-up: porta foto del tatuaggio esistente da diverse angolazioni e parliamo delle opzioni creative. Il risultato finale sarà un tatuaggio di cui andare fieri, che racconta il tuo percorso e la tua evoluzione."
    ],
    features: [
      "Valutazione gratuita della fattibilità del cover-up",
      "Design creativi che incorporano o mascherano completamente il vecchio tatuaggio",
      "Uso strategico di colori scuri e contrasti per coprire inchiostri esistenti",
      "Esperienza con tatuaggi sbiaditi, neri, colorati e tribali anni '90",
      "Opzione di rework (miglioramento) invece di copertura totale quando possibile",
      "Collaborazione con centri laser per preparazione ottimale della pelle",
      "Sessioni pianificate con cura per risultati perfetti",
      "Garanzia di lavoro professionale con follow-up incluso"
    ],
    process: [
      "Consulenza e fotografie: porta foto dettagliate del tatuaggio da coprire. Valutiamo insieme la fattibilità, discutiamo le tue preferenze stilistiche e vediamo cosa è possibile fare.",
      "Progettazione creativa: creo 2-3 bozzetti di cover-up. Il design deve essere più grande e scuro del tatuaggio originale per coprire efficacemente. Ti mostro simulazioni su foto.",
      "Eventuale preparazione laser: se l'inchiostro vecchio è troppo denso, ti consiglio 2-4 sedute laser per schiarirlo (non collaboriamo direttamente, ma ti indirizzo ai centri migliori).",
      "Esecuzione del cover-up: spesso richiede sessioni più lunghe (4-6 ore) perché dobbiamo saturare l'area con nuovo inchiostro. Lavoriamo con tecnica stratificata.",
      "Ritocco finale: dopo guarigione completa (2 mesi), valutiamo se serve un ritocco per perfezionare la copertura. Incluso nel prezzo."
    ],
    pricing:
      "I cover-up costano più dei tatuaggi normali per la complessità tecnica coinvolta. Prezzi partono da €250 per cover-up piccoli e semplici. Un cover-up medio (15x20cm) costa €400-€600. Pezzi grandi hanno prezzi personalizzati. Il preventivo finale dipende da dimensione del vecchio tatuaggio, colori presenti e complessità del nuovo design. Consulenza sempre gratuita.",
    gallery: [],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggi-realistici-torino", name: "Realistici" },
      { slug: "tatuaggi-black-grey-torino", name: "Black & Grey" }
    ],
    portfolioSlug: "cover-up-torino",
    relatedBlogPosts: [
      { slug: "quanto-costa-tatuaggio-torino", title: "Prezzi Cover-up a Torino" },
      { slug: "cura-tatuaggio-aftercare", title: "Cura Post-Tatuaggio" }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default CoverUpPage;
