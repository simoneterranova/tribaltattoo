// ╔══════════════════════════════════════════════════════════════╗
// ║     COVER-UP TATUAGGI TORINO - SEO LANDING PAGE              ║
// ║     Target keyword: "cover up tatuaggi torino"               ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";
import shopConfig from "@/config/shopConfig";

const CoverUpPage = () => {
  const styleData = {
    slug: "cover-up-e-correzioni-tatuaggi",
    title: "Cover-up e correzioni tatuaggi",
    metaTitle: "Cover up e correzioni tatuaggi - GranBabar",
    metaDescription:
      "Se hai un vecchio tatuaggio che non ti rappresenta più, o se desideri trasformare un tatuaggio poco riuscito in un'opera d'arte, Gran Babar è specializzato nel cover-up di tatuaggi a Torino.",
    h1: "Cover-up di Vecchi Tatuaggi",
    intro:
      "Se hai un vecchio tatuaggio che non ti rappresenta più, o se desideri trasformare un tatuaggio poco riuscito in un'opera d'arte, sei nel posto giusto. Gran Babar è specializzato nel cover-up di tatuaggi a Torino, creando nuovi disegni che non solo coprono, ma arricchiscono e rinnovano la tua pelle con creatività e precisione.",
    about: [
      "Un cover-up non è solo una semplice copertura di un tatuaggio esistente, ma un processo artistico che richiede attenzione e conoscenza tecnica. Gran Babar esamina il tuo tatuaggio attuale, valuta le sue caratteristiche (come i colori, la forma e la posizione), e sviluppa un nuovo design che si integra perfettamente con il lavoro precedente, senza compromettere la qualità e l'estetica.",
      "Gran Babar si dedica alla creazione di tatuaggi personalizzati che raccontano storie uniche. Con anni di esperienza, ha perfezionato la tecnica del cover-up, trasformando vecchi tatuaggi in opere d'arte contemporanee. Ogni cover-up che realizza è studiato con precisione, per garantire che la nuova creazione non solo copra il vecchio disegno, ma lo renda parte di una nuova storia.",
      "Con il nostro approccio personalizzato, il tuo vecchio tatuaggio può diventare un nuovo capolavoro che ti farà sentire finalmente soddisfatto."
    ],
    features: [
      "Consulenza personalizzata per valutare il tatuaggio esistente",
      "Progettazione di nuovi disegni che integrano il lavoro precedente",
      "Tecnica avanzata per cover-up efficaci",
      "Trasformazione di vecchi tatuaggi in opere d'arte",
      "Valutazione di colori, forma e posizione",
      "Design studiati con precisione",
      "Anni di esperienza nel cover-up",
      "Risultati duraturi e di qualità"
    ],
    process: [
      "Consultazione: La prima cosa da fare è una chiacchierata per capire cosa non ti piace del tuo tatuaggio e quali sono le tue aspettative.",
      "Progettazione del nuovo disegno: Dopo aver ascoltato le tue esigenze, inizia la fase di progettazione. Il disegno viene creato tenendo conto del tatuaggio esistente e delle sue dimensioni, per garantire una copertura adeguata.",
      "Valutazione tecnica: Gran Babar esamina caratteristiche come colori, forma e posizione.",
      "Realizzazione: Una volta approvato il disegno, il tatuaggio viene realizzato utilizzando inchiostri e tecniche avanzate per ottenere un risultato duraturo e dettagliato.",
      "Follow-up: resto disponibile per qualsiasi domanda o necessità di ritocchi."
    ],
    pricing:
      "Contattaci per un preventivo personalizzato. Il costo varia in base alle dimensioni e alla complessità del cover-up. Durante la consulenza ti forniremo una stima precisa.",
    gallery: [],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggio-realistico-a-torino", name: "Realistico" },
      { slug: "tatuaggio-black-grey-a-torino", name: "Black & Grey" }
    ],
    portfolioSlug: "cover-up-torino"
  };

  return <TattooStylePage style={styleData} />;
};

export default CoverUpPage;
