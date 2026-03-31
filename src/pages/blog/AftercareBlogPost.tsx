// Aftercare Guide Blog Post - POST-PURCHASE SUPPORT
import { BlogPostTemplate } from "./BlogPostTemplate";

const AftercareBlogPost = () => {
  const postData = {
    slug: "cura-tatuaggio-aftercare",
    title: "Come Curare un Tatuaggio Nuovo: Guida Completa all'Aftercare 2026",
    metaTitle: "Come Curare un Tatuaggio Nuovo | Aftercare Completo | Gran Babar",
    metaDescription:
      "Guida completa alla cura del tatuaggio nuovo. Cosa fare giorno per giorno, prodotti consigliati, errori da evitare, segni di infezione. Guarigione perfetta garantita.",
    publishDate: "2026-03-30",
    readTime: "12 minuti",
    content: {
      intro:
        "La cura del tatuaggio nelle prime settimane è fondamentale per un risultato perfetto. Un tatuaggio mal curato può perdere dettagli, colori o peggio, infettarsi. In questa guida ti spiego esattamente cosa fare giorno per giorno per una guarigione perfetta.",
      sections: [
        {
          heading: "Perché l'Aftercare è Così Importante",
          paragraphs: [
            "Un tatuaggio è una ferita controllata: aghi hanno perforato migliaia di volte la pelle per depositare inchiostro. Il corpo reagisce come a qualsiasi ferita: infiammazione, essudato, formazione di crosta. La cura corretta influenza:",
            "La qualità finale del tatuaggio (colori, definizione delle linee), il tempo di guarigione (2-4 settimane con cura corretta), il rischio di infezioni (quasi zero se segui le regole), la necessità di ritocchi (rari con aftercare perfetto)."
          ]
        },
        {
          heading: "Timeline Completa: Cosa aspettarsi Giorno per Giorno",
          paragraphs: [],
          table: {
            headers: ["Periodo", "Cosa Succede", "Cosa Fare"],
            rows: [
              ["Giorno 1-3", "Rossore, gonfiore, essudato trasparente. Pelle lucida", "Lavaggi delicati 2-3 volte/giorno. Crema sottile. NO pellicola"],
              ["Giorno 4-7", "Inizio formazione croste sottili. Prurito leggero", "Non toccare! Lava delicatamente. Crema spesso. Evita sfregamenti"],
              ["Giorno 8-14", "Desquamazione (pelle argentata che si stacca). Forte prurito", "Lascia staccare naturalmente! Crema più volte al giorno. NO grattare"],
              ["Giorno 15-21", "Pelle nuova sottile. Colori ancora opachi", "Continua crema idratante. Evita sole e mare/piscina"],
              ["Giorno 22-30", "Guarigione epidermica completa. Colori ritornano brillanti", "Crema normale. Puoi riprendere attività normali"],
              ["Mese 2-3", "Guarigione dermica profonda. Tatuaggio stabilizzato", "Solo idratazione normale. Dopo 2 mesi valuta eventuale ritocco"]
            ]
          }
        },
        {
          heading: "Prodotti Consigliati (e Quelli da Evitare)",
          paragraphs: [
            "Usa prodotti giusti fin dal primo giorno. Ecco la mia lista testata dopo 10 anni:"
          ],
          list: [
            "✅ Sapone neutro antibatterico (es. Saugella, pH 5.5) - Per lavaggi delicati",
            "✅ Bepanthenol / Bepanten crema - Classico per tatuaggi, ripara la pelle",
            "✅ Hustle Butter / Tattoo Goo - Creme specifiche per tatuaggi (costano di più ma ottime)",
            "✅ Eucerin pH5 / Nivea Soft - Alternative economiche per fattoria continua",
            "✅ Pellicola protettiva (prima notte) - Ti fornisco io, mantieni 12-24h",
            "❌ NO Vaselina pura - Troppo occlusiva, non fa respirare",
            "❌ NO creme profumate o con alcol - Irritano la pelle",
            "❌ NO Gentalyn / creme antibiotiche senza prescrizione medica - Inutili e potenzialmente dannose",
            "❌ NO cotone, tovaglioli,carta - Lasciano fibre, usa solo spugna pulita o mani lavate"
          ]
        },
        {
          heading: "Istruzioni Dettagliate: Giorno 1-7 (Cruciali)",
          paragraphs: [
            "Le prime 48-72 ore determinano il 70% del risultato finale. Segui queste regole alla lettera:"
          ],
          list: [
            "Mantieni la pellicola 12-24h: Te la applico io in studio. Protegge da batteri e sfregamenti. Quando la rimuovi: bagna con acqua tiepida, togli delicatamente tirando lateralmente.",
            "Primo lavaggio (dopo aver tolto pellicola): Mani lavate con sapone. Acqua tiepida (mai calda). Sapone neutro. Massaggia delicatamente con mano piatta (NO spugne). Risciacqua bene. Tampona con carta da cucina pulita (NO asciugamano).",
            "Idratazione: 15-20 minuti dopo lavaggio (pelle deve essere asciutta). Mani pulite. Crema quantità fina (strato sottile, non deve luccicare). Massaggia fino ad assorbimento completo. 2-3 volte al giorno (mattina, pomeriggio, sera).",
            "Cosa evitare assolutamente: NO bagni, mare, piscina per 2-3 settimane. NO palestra, saune, bagno turco. NO esposizione diretta al sole. NO grattare, toccare con mani sporche. NO abiti che sfregano (usa vestiti morbidi e larghi)."
          ]
        },
        {
          heading: "Gestire Prurito e Desquamazione (Giorno 7-14)",
          paragraphs: [
            "Il prurito è il momento più critico. Il 90% delle persone che rovinano il tatuaggio lo fanno grattando. Ecco come gesserlo:"
          ],
          list: [
            "Perché prude? La pelle si rigenera e la crosta secca tira. È segno che guarigione procede correttamente.",
            "Non grattare mai! Rischi di rimuovere crosta prematuramente e con essa l'inchiostro. Risultato: macchie vuote, linee spezzate.",
            "Tecniche anti-prurito: Pacca leggermente con mano piatta (non graffiare!). Applica crema extra per idratare. Raffreddalo con impacco di acqua freddaterssosa. Prendi antistaminico orale se insopportabile (chiedi farmacista).",
            "Desquamazione: La pelle si stacca a scaglie argentate come dopo scottatura solare. Lasciala cadere naturalmente! Strappare=danno al tatuaggio."
          ]
        },
        {
          heading: "Segni di Infezione: Quando Preoccuparsi",
          paragraphs: [
            "Le infezioni sono rare (<1% dei casi) se segui l'igiene corretta. Ma è importante riconoscere i segnali:"
          ],
          list: [
            "✅ NORMALE: Rossore 1-2cm attorno al tatuaggio primi 3 giorni. Gonfiore leggero. Essudato trasparente o giallino chiaro. Pruritto dopo 7-10 giorni. Pelle calda al tatto.",
            "🚨 ALLERTA (contatta tatuatore): Rossore che si espande oltre 3-4cm. Dolore pulsante che aumenta dopo 48h. Essudato giallo denso o verdognolo. Cattivo odore.",
            "🔴 EMERGENZA MEDICA (vai da un medico subito!): Febbre oltre 38°C. Striature rosse che si allontanano dal tatuaggio (linfangite). Pus denso e maleodorante. Gonfiore estremo. Dolore insopportabile.",
            "Se in dubbio, manda foto su WhatsApp. Rispondo entro poche ore e valutiamo insieme."
          ]
        },
        {
          heading: "Ritocchi: Quando Sono Necessari?",
          paragraphs: [
            "Con aftercare corretto i ritocchi sono rari. Ma ci sono casi legittimi in cui servono:"
          ],
          list: [
            "Guarigione anomala - Alcune persone guariscono perdendo inchiostro in zone specifiche (non è colpa tua né del tatuatore, è fisiologia)",
            "Linee che necessitano rinforzo - Rare linee possono risultare più chiare dopo guarigione",
            "Colori che sbiadiscono - Alcuni coloro (giallo, bianco) possono schiarirsi più del previsto",
            "Aree con sfregamento costante -Mani, piedi tendono a perdere inchiostro",
            "Il ritocco è incluso! Al Granada Gran Babar Studio il primo ritocco entro 3 mesi è compreso nel prezzo iniziale. Dopo guarigione completa (2 mesi) vediamo insieme se serve.",
            "Come si fa: Appuntamento breve (30-60min). Si rinforzano solo le aree necessarie. Guarigione più veloce della prima volta."
          ]
        },
        {
          heading: "Esposizione Solare: Protezione Fondamentale",
          paragraphs: [
            "Il sole è il nemico numero 1 dei tatuaggi, sia durante guarigione che dopo:"
          ],
          list: [
            "Durante guarigione (primi 30 giorni): NO esposizione diretta al sole. Se inevitabile: coprirlo completamente con vestiti. NO creme solari su tatuaggio fresco (irritano).",
            "Dopo guarigione (per sempre): Crema solare SPF 50+ ogni volta che esposto. Il sole sbiadisce i colori e fa invecchiare le linee. Riapplica ogni 2 ore se stai al sole molto tempo. Invest in cream solare di qualità: il tatuaggio è un investimento per la vita."
          ]
        },
        {
          heading: "Attività Sportiva e Vita Quotidiana",
          paragraphs: [
            "Quando puoi riprendere le normali attività?"
          ],
          list: [
            "Doccia: Subito, ma veloce con acqua tiepida. No strofinare.",
            "Palestra: Dopo 10-14 giorni quando croste sono cadute. Il sudore può irritare.",
            "Nuoto (piscina): Dopo 3-4 settimane. Cloro è aggressivo su tatuaggio fresco.",
            "Mare: Dopo 3-4 settimane. Sale + sole = combo deleteria per guarigione.",
            "Sauna/bagno turco: Dopo 1 mese. Calore e umidità eccessive non vanno bene.",
            "Sesso: Dipende dalla zona tatuata. Se non sfrega, anche subito. Usa preservativo se vicino a zone intime (igiene).",
            "Lavoro: Dipende. Ufficio=ok subito. Cantiere/cucina= coprilo primi giorni per igiene."
          ]
        }
      ],
      conclusion:
        "La cura del tatuaggio è semplice se segui le regole: lava corretto delicato, crema sottile regolare, no grattare, no sole. Il 99% delle complicazioni deriva da non seguire queste basi. Al Gran Babar Studio ti fornisco istruzioni scritte dettagliate e resto disponibile 24/7 per qualsiasi dubbio via WhatsApp. Ricorda: il tatuaggio è per semmage, vale la pena prendersi cura di lui per 3 settimane."
    },
    relatedPosts: [
      { slug: "primo-tatuaggio-guida", title: "Primo Tatuaggio: Guida Completa" },
      { slug: "quanto-costa-tatuaggio-torino", title: "Quanto Costa un Tatuaggio a Torino" }
    ]
  };

  return <BlogPostTemplate post={postData} />;
};

export default AftercareBlogPost;
