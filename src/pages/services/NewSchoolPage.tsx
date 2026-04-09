// ╔══════════════════════════════════════════════════════════════╗
// ║     TATUAGGIO NEW SCHOOL TORINO - SEO LANDING PAGE           ║
// ║     Target keyword: "tatuaggio new school torino"            ║
// ╚══════════════════════════════════════════════════════════════╝

import { TattooStylePage } from "./TattooStylePage";

const NewSchoolPage = () => {
  const styleData = {
    slug: "tatuaggio-new-school-a-torino",
    title: "Tatuaggio New School a Torino",
    metaTitle: "Tatuaggio New School a Torino - GranBabar",
    metaDescription:
      "Se sei alla ricerca di un tatuaggio che unisca espressività, colori accesi e linee dinamiche, lo stile New School è la scelta perfetta. Gran Babar realizza tatuaggi New School a Torino, trasformando idee in opere d'arte uniche.",
    h1: "New School Tattoo a Torino",
    intro:
      "Se sei alla ricerca di un tatuaggio che unisca espressività, colori accesi e linee dinamiche, lo stile New School è la scelta perfetta. Gran Babar realizza tatuaggi New School a Torino, trasformando idee in opere d'arte uniche, con uno stile audace e inconfondibile.",
    about: [
      "Lo stile New School nasce negli anni '80 e si evolve come un'interpretazione moderna e più esagerata dello stile Old School. Prendendo ispirazione da fumetti, graffiti e cultura pop, questo genere si distingue per linee spesse e dinamiche che danno un effetto quasi tridimensionale, colori sgargianti e sfumature audaci per un impatto visivo esplosivo, e personaggi ed elementi cartoonizzati con un'estetica esagerata e irriverente.",
      "Gran Babar combina tecnica ed esperienza per realizzare tatuaggi New School a Torino con dettagli vibranti e un carattere inconfondibile. Il segreto di un new school tattoo di successo risiede nella precisione tecnica e nell'attenzione ai dettagli. UtilizziamometodI tradizionali che garantiscono inchiostri duraturi e disegni nitidi.",
      "Gran Babar non si limita a riprodurre uno stile: ogni tatuaggio diventa una reinterpretazione originale di un'idea, trasformandola in un'opera d'arte personalizzata. Grazie alla sua esperienza e al suo background artistico, è in grado di dare vita a tatuaggi unici, che rispettano i canoni del New School ma con un tocco distintivo. Lavorando con inchiostri di alta qualità e tecniche avanzate."
    ],
    features: [
      "Colori vivaci, brillanti, spesso fluorescenti",
      "Linee bold e prospettive esagerate",
      "Soggetti cartoon e fumettistici",
      "Proporzioni volutamente distorte per effetto dinamico",
      "Influenze da graffiti, street art e cultura pop",
      "Espressioni facciali esagerate e umoristiche",
      "Sfumature elaborate per effetti tridimensionali",
      "Stile giocoso, energico e anticonformista"
    ],
    process: [
      "Consulenza creativa: esploriamo insieme soggetti e idee senza limiti di fantasia.",
      "Concept cartoonesco: trasformo la tua idea in un design new school con colori e proporzioni esagerate.",
      "Palette esplosiva: selezioniamo colori vivaci che daranno vita al tuo tatuaggio.",
      "Studio delle prospettive: creo effetti dinamici attraverso angolazioni creative.",
      "Esecuzione vibrante: linee bold e colori brillanti per un risultato che cattura l'occhio."
    ],
    pricing:
      "I tatuaggi new school, ricchi di colori e dettagli, partono da €150 per pezzi piccoli. La complessità dei colori e delle sfumature influenza il prezzo. Preventivo personalizzato durante la consulenza gratuita.",
    gallery: [
      { src: "/images/tatuaggi/new-school.jpg", alt: "Tatuaggio New School colorato - Gran Babar Torino" }
    ],
    relatedStyles: [
      { slug: "tatuaggi-old-school-torino", name: "Old School" },
      { slug: "tatuaggio-watercolor-a-torino", name: "Watercolor" },
      { slug: "tatuaggio-surrealista-a-torino", name: "Surrealista" }
    ],
    portfolioSlug: undefined,
    faqs: [
      { question: "Il tatuaggio New School si rovina più facilmente per via dei colori accesi?", answer: "No, con una corretta cura post-tatuaggio e protezione dal sole, i colori rimangono vividi nel tempo. Gran Babar utilizza pigmenti di alta qualità per garantire una durata eccellente." },
      { question: "Posso portare un mio disegno e farlo reinterpretare in stile New School?", answer: "Assolutamente sì! Gran Babar lavora sempre sulla personalizzazione, adattando qualsiasi idea allo stile New School, per un risultato unico e su misura." },
      { question: "Il tatuaggio New School può essere combinato con altri stili?", answer: "Sì! È possibile integrare elementi realistici, tradizionali o surrealisti per creare un mix originale e creativo. Gran Babar può consigliarti la soluzione migliore per un risultato armonioso." }
    ]
  };

  return <TattooStylePage style={styleData} />;
};

export default NewSchoolPage;
