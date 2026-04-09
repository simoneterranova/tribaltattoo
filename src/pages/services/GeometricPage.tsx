// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGI GEOMETRICI TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggi geometrici torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const GeometricPage = () => {
  const styleData = {
    slug: "tatuaggio-geometrico-a-torino",
    title: "Tatuaggio geometrico a Torino",
    metaTitle: "Tatuaggio geometrico a Torino - GranBabar",
    metaDescription:
      "Il tatuaggio geometrico è l'incontro tra arte, matematica e simbolismo. Linee perfette, figure astratte e motivi complessi. Gran Babar realizza tatuaggi geometrici a Torino con una precisione assoluta.",
    h1: "Tatuaggio geometrico a Torino",
    intro:
      "Il tatuaggio geometrico è l'incontro tra arte, matematica e simbolismo. Linee perfette, figure astratte e motivi complessi si intrecciano per creare tatuaggi dal forte impatto visivo e dal significato profondo. Gran Babar realizza tatuaggi geometrici a Torino con una precisione assoluta, studiando ogni composizione per valorizzare al massimo l'armonia delle forme e l'anatomia del corpo.",
    about: [
      "Il tatuaggio geometrico si basa sull'uso di linee nette, forme simmetriche e figure astratte per creare immagini armoniose ed essenziali. Questo stile può essere utilizzato per rappresentare elementi naturali stilizzati, simboli esoterici o disegni puramente decorativi. La sua estetica minimalista lo rende perfetto per chi cerca un tatuaggio elegante, preciso e senza tempo.",
      "La realizzazione di un tatuaggio geometrico richiede massima precisione e una mano ferma. Gran Babar utilizza tecniche avanzate per garantire che ogni linea sia nitida e perfettamente bilanciata. L'attenzione ai dettagli è fondamentale per ottenere un tatuaggio che mantenga la sua pulizia e definizione nel tempo.",
      "Per Gran Babar, il tatuaggio geometrico è un'arte di precisione. Ogni progetto è eseguito con cura millimetrica per garantire simmetria e armonia. Grazie all'utilizzo di strumenti all'avanguardia e alla sua esperienza nel campo, riesce a creare tatuaggi con linee impeccabili e design che si adattano perfettamente alle curve del corpo."
    ],
    features: [
      "Elementi naturali stilizzati: fiori, alberi, montagne e animali trasformati in figure geometriche",
      "Simboli spirituali e sacri: mandala, metatron, cubo di Metatron, fiore della vita",
      "Figure astratte e minimaliste: triangoli, esagoni, pattern ripetuti e linee sottili",
      "Tatuaggi ispirati alla matematica e alla scienza: sequenza di Fibonacci, frattali e forme ispirate alla fisica",
      "Linee nette e perfettamente bilanciate",
      "Massima precisione e mano ferma",
      "Forme simmetriche e figure astratte",
      "Estetica minimalista ed elegante"
    ],
    process: [
      "Consulenza iniziale: Gran Babar lavora con ogni cliente per sviluppare un design su misura, studiando l'equilibrio delle forme e l'effetto ottico sulla pelle.",
      "Design personalizzato: ogni progetto è eseguito con cura millimetrica per garantire simmetria e armonia.",
      "Preparazione: utilizziamo strumenti all'avanguardia per garantire linee impeccabili.",
      "Esecuzione: ogni linea è realizzata con massima precisione per mantenere la pulizia e definizione nel tempo.",
      "Follow-up: resto disponibile per qualsiasi domanda o necessità."
    ],
    pricing:
      "Contattaci per un preventivo personalizzato. Il costo varia in base alle dimensioni e alla complessità del design. Durante la consulenza ti forniremo una stima precisa.",
    gallery: [
      { src: shopConfig.gallery[2].src, alt: "Tatuaggio geometrico con mandala - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" }
    ],
    portfolioSlug: "geometric-torino",
    faqs: [
      { question: "Il tatuaggio geometrico mantiene la sua precisione nel tempo?", answer: "È una tecnica di tatuaggio che utilizza forme geometriche, linee pulite e simmetria per creare design moderni e simbolici, realizzati con precisione e cura." },
      { question: "Qual è la storia del Geometric Tattoo?", answer: "Le origini del Geometric Tattoo risalgono a tradizioni antiche, dove le forme geometriche erano usate per rappresentare concetti spirituali e matematici. Con il tempo, questa arte si è evoluta, fondendo elementi tradizionali e moderni per creare design innovativi." },
      { question: "Come avviene la cura post-tatuaggio per un Geometric Tattoo?", answer: "Dopo la seduta, riceverai istruzioni dettagliate per la cura post-tatuaggio, fondamentali per mantenere intatta la precisione delle linee e la qualità del design, garantendo una guarigione ottimale." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default GeometricPage;
