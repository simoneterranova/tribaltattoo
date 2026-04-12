// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO LETTERING TORINO - SEO LANDING PAGE            ║
// ║     Target keyword: "tatuaggio lettering torino"             ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const LetteringPage = () => {
  const styleData = {
    slug: "tatuaggio-lettering-a-torino",
    title: "Tatuaggio Lettering a Torino",
    metaTitle: "Tatuaggio Lettering a Moncalieri (Torino) | Tribal Tattoo | Scritte e Citazioni",
    metaDescription:
      "Tatuaggi lettering a Moncalieri (Torino). Scritte personalizzate, citazioni, nomi. Font calligrafico, gotico, minimal. Studio Tribal Tattoo. Prenota consulenza.",
    h1: "Lettering Tattoo a Moncalieri (Torino)",
    intro:
      "Il tatuaggio lettering è molto più di una semplice scritta: è un messaggio personale che prende vita attraverso forme, stili e dettagli unici. Ogni parola, frase o citazione racchiude un significato profondo, ed è per questo che la scelta del font, della composizione e dell'armonia delle lettere è essenziale.",
    about: [
      "Un tatuaggio lettering può rappresentare un ricordo, un valore, un motto di vita o un tributo a qualcuno di speciale. La scelta della frase giusta è fondamentale, così come il carattere tipografico che ne esalterà il significato.",
      "Le citazioni motivazionali esprimono determinazione e coraggio, i versi poetici raccontano emozioni profonde, mentre le iniziali o i nomi rendono omaggio a persone importanti. Claudio Ciliberti aiuta ogni cliente a trovare la perfetta combinazione di parole e stile.",
      "La scelta dello stile tipografico è uno degli elementi più importanti. Ogni font trasmette un'emozione diversa: calligrafico per eleganza, gotico per impatto visivo, minimal per discrezione, scrittura a mano per intimità."
    ],
    features: [
      "Font calligrafico e corsivo per eleganza e fluidità",
      "Carattere gotico e blackletter per tatuaggi dal forte impatto",
      "Minimal e fine line per scritte discrete ed eleganti",
      "Scrittura a mano personalizzata per un tocco unico",
      "Stile stencil o typewriter per look vintage",
      "Design studiato per garantire leggibilità nel tempo",
      "Posizionamento strategico che valorizza il messaggio",
      "Citazioni, nomi, date, motti personali"
    ],
    process: [
      "Consulenza personalizzata: discutiamo il messaggio che vuoi tatuare e il significato che ha per te.",
      "Scelta del font: ti mostro diverse opzioni tipografiche e troviamo quella perfetta per il tuo messaggio.",
      "Studio del posizionamento: valutiamo insieme la zona del corpo più adatta per dimensione e visibilità.",
      "Design della composizione: creo il layout finale assicurando leggibilità e armonia estetica.",
      "Esecuzione precisa: ogni lettera viene tatuata con attenzione per garantire tratti netti e duraturi."
    ],
    pricing:
      "I tatuaggi lettering variano in base alla lunghezza del testo, complessità del font e dimensione. Scritte brevi partono da €80-100. Citazioni più lunghe richiedono un preventivo personalizzato. Consulenza gratuita disponibile.",
    gallery: [
      { src: "/images/styles/tatuaggio-lettering-a-torino/tatuaggio-lettering-2.jpg", alt: "Tatuaggio Lettering elegante - Tribal Tattoo Moncalieri (Torino)" }
    ],
    relatedStyles: [
      { slug: "tatuaggio-fine-line-a-torino", name: "Fine Line" },
      { slug: "tatuaggio-minimalista-a-torino", name: "Minimalista" },
      { slug: "tatuaggio-gotico-a-torino", name: "Gotico" }
    ],
    portfolioSlug: undefined,
    faqs: [
      {
        question: "Qual è la dimensione ideale per un tatuaggio lettering?",
        answer: "Dipende dalla posizione e dal font scelto. Claudio Ciliberti ti aiuterà a trovare la grandezza perfetta per garantire leggibilità e durata nel tempo."
      },
      {
        question: "Quali sono le tecniche principali per realizzare un lettering tattoo?",
        answer: "Si basano su linee precise e sfumature delicate, combinate con metodi tradizionali e innovativi, per garantire un risultato nitido, elegante e duraturo."
      },
      {
        question: "Come avviene la cura post-tatuaggio?",
        answer: "Ti forniremo tutte le indicazioni necessarie per la corretta cura post-tatuaggio, essenziali per garantire una guarigione ottimale e la conservazione dei dettagli del lavoro."
      }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default LetteringPage;
