// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO SURREALISTA TORINO - SEO LANDING PAGE          ║
// ║     Target keyword: "tatuaggio surrealista torino"           ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const SurrealistPage = () => {
  const styleData = {
    slug: "tatuaggio-surrealista-a-torino",
    title: "Tatuaggio Surrealista a Torino",
    metaTitle: "Tatuaggio Surrealista a Moncalieri (Torino) | Tribal Tattoo | Arte Onirica",
    metaDescription:
      "Tatuaggi surrealisti a Moncalieri (Torino). Arte onirica, composizioni impossibili, simbolismo profondo. Studio Tribal Tattoo. Creatività senza limiti. Prenota consulenza.",
    h1: "Tatuaggio Surrealista a Moncalieri (Torino)",
    intro:
      "Il tatuaggio surrealista trasporta l'arte onirica e visionaria di Dalì, Magritte e altri maestri del surrealismo sulla pelle, creando composizioni impossibili che sfidano la logica e aprono porte verso mondi interiori. È lo stile perfetto per chi cerca un tatuaggio unico, carico di simbolismo e immaginazione.",
    about: [
      "Il surrealismo nel tatuaggio attinge dall'omonimo movimento artistico del XX secolo, che celebrava l'inconscio, i sogni e l'irrazionale. Elementi familiari vengono combinati in modi inaspettati: orologi che si sciolgono, scale che portano al nulla, occhi che piangono fiori, pesci che nuotano nel cielo.",
      "Ogni tatuaggio surrealista racconta una storia personale attraverso metafore visive potenti. Le composizioni sfidano la fisica e la logica, creando immagini che provocano riflessione e stupore. L'uso di prospettive impossibili, giochi di scale e metamorfosi è caratteristico di questo stile.",
      "Tribal Tattoo interpreta il surrealismo con sensibilità artistica, trasformando sogni e visioni in tatuaggi che sono vere opere d'arte narrative, dove ogni elemento ha un significato simbolico profondo."
    ],
    features: [
      "Composizioni oniriche che sfidano la logica",
      "Combinazioni inaspettate di elementi familiari",
      "Prospettive impossibili e giochi di scala",
      "Metamorfosi e trasformazioni surreali",
      "Simbolismo profondo e personale",
      "Influenze da Dalì, Magritte, Ernst",
      "Tecnica realistica applicata a soggetti irreali",
      "Perfetto per chi cerca significati profondi e unici"
    ],
    process: [
      "Consulenza onirica: esploriamo i tuoi sogni, visioni e simboli personali.",
      "Concept surreale: traduco le tue idee in composizioni che sfidano la realtà.",
      "Simbologia personale: ogni elemento viene scelto per il suo significato nella tua storia.",
      "Studio della composizione: creo equilibri impossibili che funzionano visivamente.",
      "Esecuzione artistica: tecnica realistica per rendere credibili elementi irreali."
    ],
    pricing:
      "I tatuaggi surrealisti sono generalmente complessi e richiedono tempo per i dettagli e le composizioni elaborate. Progetti ampi possono richiedere più sessioni. Un preventivo personalizzato viene fornito durante la consulenza gratuita.",
    gallery: [
      { src: "/images/styles/tatuaggio-surrealista-a-torino/tattoo-gran-babar-torino.jpg", alt: "Tatuaggio Surrealista onirico - Tribal Tattoo Moncalieri (Torino)" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" },
      { slug: "tatuaggio-new-school-a-torino", name: "New School" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Cosa rende unico un tattuaggio surrealista?",
        answer: "Un tattuaggio surrealista unisce elementi reali e fantastici per creare immagini che parlano al subconscio, stimolando l'immaginazione e offrendo un messaggio personale e simbolico."
      },
      {
        question: "Quali tecniche vengono impiegate per realizzare un tattuaggio surrealista?",
        answer: "Si utilizzano tecniche avanzate di ombreggiatura, fusione cromatica e contrasto, supportate da strumenti di precisione e inchiostri di alta qualità, per ottenere effetti pittorici unici e vibranti."
      },
      {
        question: "Come avviene la cura post-tatuaggio?",
        answer: "Ti forniremo tutte le indicazioni necessarie per la corretta cura post-tatuaggio, essenziali per garantire una guarigione ottimale e la conservazione dei dettagli del lavoro."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default SurrealistPage;
