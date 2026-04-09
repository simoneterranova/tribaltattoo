// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO GIAPPONESE TORINO - SEO LANDING PAGE           ║
// ║     Target keyword: "tatuaggio giapponese torino irezumi"    ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const JapanesePage = () => {
  const styleData = {
    slug: "tatuaggio-giapponese-irezumi-a-torino",
    title: "Tatuaggio Giapponese (Irezumi) a Torino",
    metaTitle: "Tatuaggio Giapponese Irezumi a Torino | Gran Babar | Tradizione Nipponica",
    metaDescription:
      "Tatuaggi giapponesi Irezumi a Torino. Draghi, carpe koi, fiori di ciliegio. Tradizione e significato. Studio Gran Babar. Prenota consulenza.",
    h1: "Tatuaggio Giapponese (Irezumi) a Torino",
    intro:
      "Il tatuaggio giapponese Irezumi è uno degli stili più affascinanti e ricchi di significato nella storia del tatuaggio. Con le sue figure imponenti, le ombreggiature raffinate e i colori intensi, questo stile racconta storie di forza, coraggio e spiritualità.",
    about: [
      "L'Irezumi ha origini antichissime, risalenti al periodo Edo (1603-1868), quando i tatuaggi venivano usati per segnare criminali o identificare membri della yakuza. Con il tempo, questa pratica è diventata una vera e propria forma d'arte, adottata dai guerrieri samurai e dagli artigiani come simbolo di protezione e status.",
      "Oggi, il tatuaggio giapponese continua a rappresentare forza, onore e resistenza, mantenendo un forte legame con la cultura e la tradizione nipponica. Gran Babar, con la sua esperienza e il suo rispetto per la tradizione, realizza tatuaggi giapponesi a Torino con un'attenta ricerca stilistica e una tecnica impeccabile.",
      "I simboli che caratterizzano l'Irezumi sono intrisi di miti e leggende secolari. Il drago rappresenta potere e saggezza, mentre la carpa koi simboleggia la perseveranza. Il fiore di ciliegio richiama il ciclo della vita e il continuo rinnovarsi dell'esistenza."
    ],
    features: [
      "Stile tradizionale giapponese con origini nel periodo Edo",
      "Simboli potenti: draghi, carpe koi, fiori di ciliegio, tigri, fenici",
      "Ombreggiature raffinate e colori intensi caratteristici",
      "Significati profondi legati a miti e leggende giapponesi",
      "Composizioni elaborate che seguono il flusso del corpo",
      "Tecnica che combina tradizione e strumenti moderni",
      "Ideale per grandi pezzi: mezze maniche, maniche complete, schiena",
      "Rappresenta forza, onore, protezione e trasformazione"
    ],
    process: [
      "Consulenza approfondita: esploriamo insieme i simboli dell'Irezumi e il significato che vuoi dare al tuo tatuaggio.",
      "Studio della composizione: ogni tatuaggio giapponese segue regole precise di composizione e flusso.",
      "Design personalizzato: creo un progetto che rispetta la tradizione ma si adatta alla tua storia personale.",
      "Pianificazione sessioni: i tatuaggi giapponesi spesso richiedono più sessioni per la loro complessità.",
      "Esecuzione con rispetto della tradizione: utilizzo tecniche che onorano l'arte dell'Irezumi garantendo risultati moderni."
    ],
    pricing:
      "I tatuaggi giapponesi sono generalmente progetti ampi che richiedono più sessioni. I prezzi vengono discussi in base all'estensione del progetto (mezza manica, manica completa, schiena, ecc.). Consulenza gratuita per valutare insieme il tuo progetto Irezumi.",
    gallery: [
      { src: "/images/styles/tatuaggio-giapponese-irezumi-a-torino/giapponese.jpg", alt: "Tatuaggio Giapponese Irezumi - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-neo-tradizionale-a-torino", name: "Neo Tradizionale" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Qual è l'origine del tatuaggio giapponese (Irezumi) e cosa rappresenta?",
        answer: "L'Irezumi ha radici profonde nella cultura giapponese, risalenti ai riti dei samurai e alle tradizioni popolari. Rappresenta forza, protezione, onore e trasformazione, narrando storie mitologiche e spirituali che si intrecciano con la vita quotidiana."
      },
      {
        question: "Quali sono i simboli più comuni nell'Irezumi?",
        answer: "Tra i simboli più ricorrenti troviamo il drago, che simboleggia potere e saggezza, la carpa koi, emblema di perseveranza, e il fiore di ciliegio, che rappresenta la bellezza effimera e il ciclo della vita. Ogni elemento viene scelto in base alla storia personale del cliente."
      },
      {
        question: "Quanto tempo richiede la realizzazione di un tatuaggio Irezumi?",
        answer: "La durata varia in base alla complessità e all'estensione del disegno. Progetti più articolati possono richiedere diverse sessioni, mentre disegni più contenuti possono essere completati in una o più sedute, sempre garantendo la massima cura dei dettagli."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default JapanesePage;
