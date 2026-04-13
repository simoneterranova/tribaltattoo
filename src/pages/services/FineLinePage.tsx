// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO FINE LINE TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggio fine line torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const FineLinePage = () => {
  const styleData = {
    slug: "tatuaggio-fine-line-a-torino",
    title: "Tatuaggio Fine Line a Torino",
    metaTitle: "Tatuaggio Fine Line a Moncalieri (Torino) | Tribal Tattoo Studio | Eleganza Minimalista",
    metaDescription:
      "Tatuaggi fine line a Moncalieri (Torino). Linee sottili, design minimalisti ed eleganti. Studio Tribal Tattoo, esperienza di oltre 30 anni dal 1994. Prenota consulenza gratuita.",
    h1: "Tatuaggio Fine Line a Moncalieri (Torino)",
    intro:
      "Il tatuaggio fine line a Moncalieri (Torino) rappresenta una delle forme più raffinate e contemporanee dell'arte del tatuaggio. Da Tribal Tattoo, ogni linea sottile diventa una dichiarazione di stile, una scelta di eleganza e precisione che trasforma la pelle in un racconto personale.",
    about: [
      "Lo stile Fine Line si distingue per l'utilizzo di linee sottilissime, disegnate con ago singolo o aghi estremamente fini, che permettono di realizzare tatuaggi dal tratto pulito e delicato. Questa tecnica richiede una mano esperta, un controllo assoluto della pressione e una sensibilità artistica capace di bilanciare minimalismo e dettaglio.",
      "Il tatuaggio fine line non è solo una scelta estetica, ma una forma d'espressione intima e moderna. Le linee sottili, spesso monocromatiche, raccontano emozioni e momenti significativi senza bisogno di colori o riempimenti complessi. È la scelta ideale per chi desidera un tatuaggio elegante, discreto e senza tempo.",
      "La realizzazione di un tatuaggio fine line richiede esperienza, controllo e strumenti di altissima qualità. Nel nostro studio a Moncalieri (Torino) utilizziamo macchinette precise e aghi ultrasottili che consentono di creare tratti netti, senza sbavature e con una definizione che resiste nel tempo."
    ],
    features: [
      "Linee sottilissime e tratti delicati per tatuaggi minimalisti",
      "Design eleganti e raffinati, perfetti per ogni stile",
      "Simboli minimal, scritte, disegni botanici e illustrazioni piccole",
      "Tecnica precision che richiede controllo assoluto della mano",
      "Ideale per tatuaggi discreti ma significativi",
      "Perfetto per polsi, caviglie, collo e zone delicate",
      "Guarigione rapida grazie al minor trauma cutaneo",
      "Stile contemporaneo che non passa di moda"
    ],
    process: [
      "Consulenza personalizzata: Claudio Ciliberti ascolta le tue idee e ti guida nella scelta del design perfetto per il tuo tatuaggio fine line.",
      "Progettazione del disegno: ogni linea viene studiata per garantire equilibrio, armonia e significato personale.",
      "Preparazione della sessione: ti spieghiamo come preparare la pelle e cosa aspettarti durante la seduta.",
      "Esecuzione con precisione: utilizziamo aghi ultrasottili e tecnica impeccabile per creare tratti netti e definiti.",
      "Aftercare dettagliato: ti forniamo istruzioni complete per la cura post-tatuaggio, fondamentali per preservare i dettagli nel tempo."
    ],
    pricing:
      "Il costo varia in base alla complessità del disegno e alle dimensioni. Durante la consulenza gratuita ti forniremo un preventivo preciso e trasparente per il tuo progetto.",
    gallery: [
      { src: "/images/tatuaggi/Minimal-tattoo-1.jpg", alt: "Tatuaggio Fine Line elegante - Tribal Tattoo Moncalieri (Torino)" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-minimalista-a-torino", name: "Minimalista" },
      { slug: "tatuaggio-lettering-a-torino", name: "Lettering" },
      { slug: "tatuaggio-floreale-a-torino", name: "Floreale" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Che cos'è un tatuaggio fine line?",
        answer: "È una tecnica che utilizza linee sottilissime e tratti delicati per creare tatuaggi minimalisti, eleganti e raffinati."
      },
      {
        question: "Quanto dura nel tempo un tatuaggio fine line?",
        answer: "Se realizzato con precisione e curato correttamente, può mantenere la sua definizione per molti anni. La cura post-tatuaggio è fondamentale per preservarne i dettagli."
      },
      {
        question: "Quali soggetti si prestano meglio a questo stile?",
        answer: "Simboli minimal, scritte, disegni botanici, linee geometriche e piccole illustrazioni sono perfetti per il tatuaggio fine line."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default FineLinePage;
