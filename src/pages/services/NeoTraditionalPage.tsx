// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO NEO TRADIZIONALE TORINO - SEO LANDING PAGE     ║
// ║     Target keyword: "tatuaggio neo tradizionale torino"      ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const NeoTraditionalPage = () => {
  const styleData = {
    slug: "tatuaggio-neo-tradizionale-a-torino",
    title: "Tatuaggio Neo Tradizionale a Torino",
    metaTitle: "Tatuaggio Neo Tradizionale a Torino | Gran Babar | Tradizione Evoluta",
    metaDescription:
      "Tatuaggi neo tradizionali a Torino. Evoluzione dello stile old school con più dettagli e colori. Studio Gran Babar. Prenota consulenza gratuita.",
    h1: "Tatuaggio Neo Tradizionale a Torino",
    intro:
      "Lo stile neo tradizionale rappresenta l'evoluzione naturale del tatuaggio old school, mantenendo le linee bold e i soggetti iconici ma aggiungendo profondità, sfumature raffinate e una palette di colori più ampia. È il ponte perfetto tra tradizione e innovazione.",
    about: [
      "Il tatuaggio neo tradizionale nasce come evoluzione dello stile old school, mantenendone le linee bold e i contorni marcati ma incorporando tecniche moderne come sfumature elaborate, giochi di luce e ombra più complessi, e una palette cromatica estesa che va oltre i colori primari.",
      "Mentre l'old school è caratterizzato da colori piatti e forme bidimensionali, il neo tradizionale aggiunge dimensionalità attraverso ombreggiature sofisticate e dettagli più elaborati. I soggetti rimangono simili (rose, animali, pin-up, teschi) ma vengono interpretati con maggiore realismo e profondità artistica.",
      "Gran Babar combina il rispetto per la tradizione del tatuaggio con tecniche contemporanee, creando opere neo tradizionali che celebrano l'estetica classica con un tocco moderno e personale."
    ],
    features: [
      "Evoluzione dello stile old school con più dettagli",
      "Linee bold caratteristiche mantenute",
      "Sfumature elaborate e giochi di luce e ombra",
      "Palette cromatica estesa oltre i colori primari",
      "Maggiore dimensionalità e profondità rispetto all'old school",
      "Soggetti classici interpretati in chiave moderna",
      "Rose, animali, teschi, pin-up con dettagli elaborati",
      "Perfetto bilanciamento tra tradizione e innovazione"
    ],
    process: [
      "Consulenza neo trad: discutiamo il soggetto e come interpretarlo in stile neo tradizionale.",
      "Design dettagliato: creo un bozzetto che combina linee bold con sfumature elaborate.",
      "Scelta palette colori: esploriamo una gamma cromatica più ampia rispetto all'old school tradizionale.",
      "Studio della composizione: equilibrio tra elementi classici e dettagli moderni.",
      "Esecuzione artistica: linee bold per i contorni, sfumature sofisticate per la profondità."
    ],
    pricing:
      "I tatuaggi neo tradizionali richiedono più tempo dell'old school per via dei dettagli elaborati. Pezzi medi partono da €200-300. Composizioni più grandi richiedono preventivo personalizzato. Consulenza gratuita disponibile.",
    gallery: [
      { src: "/images/styles/tatuaggio-neo-tradizionale-a-torino/gotico.jpg", alt: "Tatuaggio Neo Tradizionale - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-giapponese-irezumi-a-torino", name: "Giapponese" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Che cosa caratterizza un tatuaggio neo tradizionale?",
        answer: "Un tatuaggio neo tradizionale unisce l'estetica classica dell'old school a elementi moderni, con linee audaci, colori intensi e dettagli innovativi che rendono ogni opera d'arte unica e ricca di significato."
      },
      {
        question: "Quali simboli sono tipici del tatuaggio neo tradizionale?",
        answer: "Tra i simboli più comuni troviamo rose, teschi, ancore, cuori e altri elementi iconici, reinterpretati in chiave contemporanea per esprimere temi di forza, passione e rinascita."
      },
      {
        question: "Come avviene la cura post-tatuaggio?",
        answer: "Ti forniremo tutte le indicazioni necessarie per la corretta cura post-tatuaggio, essenziali per garantire una guarigione ottimale e la conservazione dei dettagli del lavoro."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default NeoTraditionalPage;
