// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO FLOREALE TORINO - SEO LANDING PAGE             ║
// ║     Target keyword: "tatuaggio floreale torino"              ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const FloralePage = () => {
  const styleData = {
    slug: "tatuaggio-floreale-a-torino",
    title: "Tatuaggio Floreale a Torino",
    metaTitle: "Tatuaggio Floreale a Torino | Gran Babar Studio | Bellezza Naturale",
    metaDescription:
      "Tatuaggi floreali a Torino. Rose, loto, peonie, fiori di ciliegio. Realismo, acquerello, fine line. Studio Gran Babar. Prenota consulenza gratuita.",
    h1: "Tatuaggio Floreale a Torino",
    intro:
      "Dai delicati boccioli ai rami intricati, ogni tatuaggio floreale viene progettato per valorizzare il corpo e riflettere la personalità di chi lo indossa. Lo stile può variare dal realismo all'acquerello, dal fine line al blackwork, mantenendo sempre un'armonia perfetta tra forma e simbolismo.",
    about: [
      "Ogni fiore ha un significato profondo, radicato nella cultura e nelle emozioni di chi lo sceglie. La rosa, simbolo di passione e bellezza, si presta a interpretazioni sia classiche che moderne. Il fiore di loto, legato alla rinascita e alla spiritualità, si adatta perfettamente a chi cerca un disegno elegante e pieno di significato.",
      "I fiori di ciliegio, delicati e fugaci, rappresentano la bellezza effimera della vita, mentre la peonia evoca prosperità e forza interiore. Gran Babar guida ogni cliente nella scelta del fiore più adatto, aiutandolo a trovare il giusto equilibrio tra estetica e messaggio personale.",
      "Il tatuaggio floreale può essere declinato in molteplici stili: il realismo cattura ogni dettaglio con sfumature morbide, lo stile acquerello dona un tocco etereo, il blackwork esalta luci e ombre, mentre il fine line permette tatuaggi sottili e delicati."
    ],
    features: [
      "Vasta scelta di fiori: rose, peonie, loto, gigli, fiori di ciliegio",
      "Stili multipli: realismo, acquerello, fine line, blackwork",
      "Simbolismo profondo legato a ogni fiore",
      "Design personalizzati che valorizzano il corpo",
      "Sfumature morbide e contrasti raffinati",
      "Perfetto per composizioni su braccio, schiena, coscia",
      "Adatto sia a tatuaggi piccoli che grandi composizioni",
      "Combinabile con altri elementi (farfalle, uccelli, ecc.)"
    ],
    process: [
      "Consulenza floreale: discutiamo quale fiore rappresenta meglio la tua storia e personalità.",
      "Scelta dello stile: realistico, acquerello, fine line o blackwork - troviamo insieme l'approccio perfetto.",
      "Design su misura: creo una composizione floreale che si adatta perfettamente alla zona del corpo scelta.",
      "Esecuzione artistica: utilizzo tecniche raffinate per catturare la bellezza e la delicatezza dei fiori.",
      "Cura post-tatuaggio: ti fornisco istruzioni complete per preservare i colori e i dettagli del tuo tatuaggio floreale."
    ],
    pricing:
      "I tatuaggi floreali variano molto nel prezzo in base allo stile, dimensione e complessità. Pezzi piccoli partono da €120, mentre composizioni più elaborate richiedono un preventivo personalizzato. Consulenza gratuita disponibile.",
    gallery: [
      { src: "/images/styles/tatuaggio-floreale-a-torino/3-1.jpg", alt: "Tatuaggio Floreale delicato - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-watercolor-a-torino", name: "Watercolor" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-fine-line-a-torino", name: "Fine Line" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Cosa caratterizza un tatuaggio floreale?",
        answer: "Un tatuaggio floreale si distingue per l'uso di elementi naturali, come fiori e foglie, combinati in design che esprimono simbolismi legati alla bellezza, alla crescita e alla trasformazione personale."
      },
      {
        question: "Quali fiori sono più comuni nei tatuaggi floreali?",
        answer: "Tra i fiori più popolari troviamo rose, peonie, gigli, fiori di loto e molti altri. La scelta del fiore dipende dal significato che si desidera trasmettere e dalle preferenze estetiche del cliente."
      },
      {
        question: "Quali tecniche vengono utilizzate per realizzare un tatuaggio floreale?",
        answer: "GRAN BABAR impiega tecniche che combinano metodi tradizionali e innovativi, utilizzando strumenti di precisione e inchiostri di alta qualità per ottenere linee morbide, ombreggiature delicate e colori vibranti, che riproducono fedelmente la bellezza della natura."
      },
      {
        question: "Come avviene la cura post-tatuaggio?",
        answer: "Ti forniremo tutte le indicazioni necessarie per la corretta cura post-tatuaggio, essenziali per garantire una guarigione ottimale e la conservazione dei dettagli del lavoro."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default FloralePage;
