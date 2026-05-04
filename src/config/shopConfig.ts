// ╔══════════════════════════════════════════════════════════════╗
// ║              SHOP CONFIGURATION — ONE FILE TO RULE THEM ALL  ║
// ║                                                              ║
// ║  To deploy this template for a new studio:                   ║
// ║  1. Fill in this file (all sections below)                   ║
// ║  2. Replace images in src/assets/ and update the imports     ║
// ║  3. Update colors & fonts in src/index.css                   ║
// ║  4. Update font names in tailwind.config.ts                  ║
// ║  5. Update domain in public/sitemap.xml and robots.txt       ║
// ║  That's it — nothing else should need touching.              ║
// ║                                                              ║
// ║  PALETTE (TEMA SCURO — "Ossidiana & Oro Tribale")            ║
// ║  #090805  →  HSL  40 10%  4%  — sfondo (ossidiana calda)   ║
// ║  #B8870B  →  HSL  43 87% 38%  — primario, CTA (oro tribale)║
// ║  #F2E8CE  →  HSL  40 52% 87%  — testo (pergamena antica)   ║
// ║                                                              ║
// ║  FONT STACK                                                  ║
// ║  Heading: Cinzel         — inciso, monolitico, tribale       ║
// ║  Body:    Raleway        — geometrico, leggibile, artigianale║
// ╚══════════════════════════════════════════════════════════════╝

// ── IMAGE ASSETS ──────────────────────────────────────────────────────────────
// Replace these files in src/assets/ with Tribal Tattoo's own photos/videos.
import heroBg    from "@/assets/output_web.mp4";

import artist1   from "@/assets/claudio1.webp";   // CEO – portrait 1
import artist2   from "@/assets/claudio2.webp";   // CEO – portrait 2
import artist3   from "@/assets/claudio3.webp";   // CEO – portrait 3

import gallery1  from "@/assets/tattoo-1.webp";
import gallery2  from "@/assets/tattoo-2.webp";
import gallery3  from "@/assets/tattoo-3.webp";
import gallery4  from "@/assets/tattoo-4.webp";
import gallery5  from "@/assets/tattoo-5.webp";
import gallery6  from "@/assets/tattoo-6.webp";
import gallery7  from "@/assets/tattoo-7.webp";
import gallery8  from "@/assets/tattoo-8.webp";
import gallery9  from "@/assets/tattoo-9.webp";
import gallery10 from "@/assets/tattoo-10.webp";
import gallery11 from "@/assets/tattoo-11.webp";
import gallery12 from "@/assets/tattoo-12.webp";
import gallery13 from "@/assets/tattoo-13.webp";  
import gallery14 from "@/assets/tattoo-14.webp";
import gallery15 from "@/assets/studio.mp4";
import gallery16 from "@/assets/Progetto video 3.mp4";

import piercing1  from "@/assets/piercings-photos/piercing-1.webp";
import piercing2  from "@/assets/piercings-photos/piercing-2.webp";
import piercing3  from "@/assets/piercings-photos/piercing-3.webp";
import piercing4  from "@/assets/piercings-photos/piercing-4.webp";
import piercing5  from "@/assets/piercings-photos/piercing-5.webp";
import piercing6  from "@/assets/piercings-photos/piercing-6.webp";
import piercing7  from "@/assets/piercings-photos/piercing-7.webp";
import piercing8  from "@/assets/piercings-photos/piercing-8.webp";
import piercing9  from "@/assets/piercings-photos/piercing-9.webp";
import piercing10 from "@/assets/piercings-photos/piercing-10.webp";
import piercing11 from "@/assets/piercings-photos/piercing-11.webp";
import piercing12 from "@/assets/piercings-photos/piercing-12.webp";
import piercing13 from "@/assets/piercings-photos/piercing-13.webp";  
import piercing14 from "@/assets/piercings-photos/piercing-14.webp";

import disegno1  from "@/assets/disegni-photos/disegno-1.webp";
import disegno2  from "@/assets/disegni-photos/disegno-2.webp";
import disegno3  from "@/assets/disegni-photos/disegno-3.webp";
import disegno4  from "@/assets/disegni-photos/disegno-4.webp";
import disegno5  from "@/assets/disegni-photos/disegno-5.webp";
import disegno6  from "@/assets/disegni-photos/disegno-6.webp";
import disegno7  from "@/assets/disegni-photos/disegno-7.webp";
import disegno8  from "@/assets/disegni-photos/disegno-8.webp";
import disegno9  from "@/assets/disegni-photos/disegno-9.webp";
import disegno10 from "@/assets/disegni-photos/disegno-10.webp";
import disegno11 from "@/assets/disegni-photos/disegno-11.webp";
import disegno12 from "@/assets/disegni-photos/disegno-12.webp";
import disegno13 from "@/assets/disegni-photos/disegno-13.webp";
import disegno14 from "@/assets/disegni-photos/disegno-14.webp";
import disegno15 from "@/assets/disegni-photos/disegno-15.webp";
import disegno16 from "@/assets/disegni-photos/disegno-16.webp";
import disegno17 from "@/assets/disegni-photos/disegno-17.webp";
import disegno18 from "@/assets/disegni-photos/disegno-18.webp";
import disegno19 from "@/assets/disegni-photos/disegno-19.webp";
import disegno20 from "@/assets/disegni-photos/disegno-20.webp";
import disegno21 from "@/assets/disegni-photos/disegno-21.webp";
import disegno22 from "@/assets/disegni-photos/disegno-22.webp";
import disegno23 from "@/assets/disegni-photos/disegno-23.webp";
import disegno24 from "@/assets/disegni-photos/disegno-24.webp";
import disegno25 from "@/assets/disegni-photos/disegno-25.webp";
import disegno26 from "@/assets/disegni-photos/disegno-26.webp";
import disegno27 from "@/assets/disegni-photos/disegno-27.webp";
import disegno28 from "@/assets/disegni-photos/disegno-28.webp";
import disegno29 from "@/assets/disegni-photos/disegno-29.webp";
import disegno30 from "@/assets/disegni-photos/disegno-30.webp";
import disegno31 from "@/assets/disegni-photos/disegno-31.webp";
import disegno32 from "@/assets/disegni-photos/disegno-32.webp";
import disegno33 from "@/assets/disegni-photos/disegno-33.webp";
import disegno34 from "@/assets/disegni-photos/disegno-34.webp";
import disegno35 from "@/assets/disegni-photos/disegno-35.webp";
import disegno36 from "@/assets/disegni-photos/disegno-36.webp";
import disegno37 from "@/assets/disegni-photos/disegno-37.webp";
import disegno38 from "@/assets/disegni-photos/disegno-38.webp";
import disegno39 from "@/assets/disegni-photos/disegno-39.webp";
import disegno40 from "@/assets/disegni-photos/disegno-40.webp";
import disegno41 from "@/assets/disegni-photos/disegno-41.webp";
import disegno42 from "@/assets/disegni-photos/disegno-42.webp";
import disegno43 from "@/assets/disegni-photos/disegno-43.webp";
import disegno44 from "@/assets/disegni-photos/disegno-44.webp";
import disegno45 from "@/assets/disegni-photos/disegno-45.webp";
import disegno46 from "@/assets/disegni-photos/disegno-46.webp";
import disegno47 from "@/assets/disegni-photos/disegno-47.webp";
import disegno48 from "@/assets/disegni-photos/disegno-48.webp";
import disegno49 from "@/assets/disegni-photos/disegno-49.webp";
import disegno50 from "@/assets/disegni-photos/disegno-50.webp";
import disegno51 from "@/assets/disegni-photos/disegno-51.webp";
import disegno52 from "@/assets/disegni-photos/disegno-52.webp";
import disegno53 from "@/assets/disegni-photos/disegno-53.webp";
import disegno54 from "@/assets/disegni-photos/disegno-54.webp";
import disegno55 from "@/assets/disegni-photos/disegno-55.webp";
import disegno56 from "@/assets/disegni-photos/disegno-56.webp";
import disegno57 from "@/assets/disegni-photos/disegno-57.webp";
import disegno58 from "@/assets/disegni-photos/disegno-58.webp";

//import logo      from "@/assets/logo_coloured__no_bg.svg";     // Fishbone logo (red)
import logo      from "@/assets/original_logo_no_bg.png";     // Fishbone logo (red)
import { sr } from "date-fns/locale";


// ── IDENTITY ──────────────────────────────────────────────────────────────────
const shopConfig = {
  /** Short brand name used in the navbar logo, loading screen, and auth page. */
  name: "TRIBAL TATTOO",

  /** Full brand name used in the footer bottom bar. */
  fullName: "TRIBAL TATTOO STUDIO",

  /** Logo image. */
  logo: logo,

  /** City / location shown in hero tagline and section subtitles. RESPECT THE FORMATTING */
  city: "Moncalieri, TO",

  /** Year the shop was founded — shown in the hero tagline. */
  established: "1994",

  /** The type of business activity. */
  activity: "Studio di Tatuaggi Tribali",

  /** Primary author/artist for blog posts and content authorship. */
  author: {
    name: "Claudio Ciliberti",                    // ← update with CEO's name
    jobTitle: "Maestro Tatuatore Tribale",
  },

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  meta: {
    /** Full domain without trailing slash. */
    siteUrl: "https://tribaltattoo.vercel.app",

    /** Link di prenotazione o contatto */
    bookingSiteUrl: "https://tribaltattoo.vercel.app",

    /** og:locale */
    locale: "it_IT",

    googleSiteVerification: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", //metti in index.html per farlo leggere
    googleAnalyticsId:      "G-XXXXXXXXXX",

    title:
      "Tatuaggi Tribali Moncalieri Torino | Arte Originale | Tribal Tattoo",
    description:
      "Tatuaggi tribali a Moncalieri (Torino) dal 1994. Arte polinesiaca, maori e tribale originale — non semplici copie. Design freehand su misura, rispettoso dell'anatomia. Consulenza gratuita.",
    ogTitle:
      "Tribal Tattoo – Arte Sacra Tribale a Moncalieri, Torino",
    ogDescription:
      "Vera arte originale di magie antiche. Tatuaggi tribali freehand, polinesiaci e maori. Prenota la tua consultazione con il maestro.",
    /** Absolute path from the public/ folder or a full URL. */
    ogImage: "/og-image.jpg",
  },

  // ── NAVIGATION LABELS ───────────────────────────────────────────────────────
  nav: {
    bookingCta: "Prenota",
    links: [
      { label: "Servizi",    href: "#services"     },
      { label: "Maestro", href: "#team"         },
      { label: "Tattoo",     href: "#gallery"      },
      { label: "Disegni",    href: "#disegni"      },
      { label: "Piercings",  href: "#piercings"    },
      { label: "Recensioni", href: "#testimonials" },
      { label: "Contatti",   href: "#contact"      },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Tribal", "Tattoo"],

    subheadline:
      "Arte tribale originale dal 1994 — ogni segno disegnato a mano sull'energia del tuo corpo.",

    bookingCta: "Prenota",

    marqueeItems: [
      "Polinesiano",
      "Maori",
      "Tribale",
      "Freehand",
      "Dot Work",
      "Black Work",
      "Geometrico",
      "Su Misura",
    ],
  },

  // ── SECTION HEADINGS ────────────────────────────────────────────────────────
  sections: {
    services: {
      label: "Servizi",
      heading: ["I Nostri", "Servizi"],
      counterLabel: ["Servizi", "Personalizzati"],
      footnote:
        "Ogni progetto è un rito unico · I preventivi sono personalizzati in base a dimensione, complessità e posizionamento anatomico · Consulenza gratuita",
    },
    team: {
      label: "Il Maestro",
      heading: ["Chi è il", "Maestro"],
      counterLabel: ["Anni di", "Esperienza"],
    },
    testimonials: {
      label: "Recensioni",
      heading: "Dicono di noi",
    },
    gallery: {
      label: "Gallery",
      heading: ["I nostri", "Tattoo"],
    },
    piercings: {
      label: "Piercings",
      heading: ["I nostri", " Piercings"],
    },
    disegni: {
      label: "Disegni",
      heading: ["I nostri", "Disegni"],
    },
    contact: {
      label: "Contatti",
      heading: ["Vieni a", "Trovarci"],
      locationLabel: "Dove Siamo",
      hoursLabel: "Orari di apertura",
      contactLabel: "Contatti",
      socialLabel: "Social Networks",
    },
  },

  // ── SERVICES ────────────────────────────────────────────────────────────────
  services: [
    // ── TATTOO SERVICES ──────────────────────────────────────────────────────
    {
      id: "wild-tattoo",
      index: "01",
      name: "Wild Tattoo",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Su Misura Globale",
      duration: "Variabile",
      durationMinutes: 120,
      description:
        "Chiama da qualsiasi parte del mondo e il maestro raggiungerà il tuo luogo per incidere magie antiche sulla tua pelle. Spese di viaggio a carico del cliente.",
      badge: "Leggendario" as string | null,
    },
    {
      id: "consultation",
      index: "02",
      name: "Consulenza",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Gratuita",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Un primo incontro per conoscersi, studiare l'anatomia e costruire insieme il progetto tribale ideale per il tuo corpo.",
      badge: "Iniziale" as string | null,
    },
    {
      id: "tribal-freehand",
      index: "03",
      name: "Tribale Freehand",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Il design viene disegnato a mano libera direttamente sul corpo con il marcatore rosso, seguendo il flusso dei muscoli. Arte viva, non copiata.",
      badge: "Più richiesto" as string | null,
    },
    {
      id: "polynesian",
      index: "04",
      name: "Polinesiano & Maori",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "da 2 ore",
      durationMinutes: 120,
      description:
        "Vera arte originale di magie antiche. Motivi polinesiaci e maori studiati nel rispetto delle tradizioni culturali e dell'anatomia del cliente.",
      badge: "Specialità" as string | null,
    },
    {
      id: "dot-work",
      index: "05",
      name: "Dot Work & Black Work",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Puntinatura di precisione e solido blackwork per chi cerca contrasti netti e una resa visiva potente.",
      badge: null as string | null,
    },
    {
      id: "cover-up",
      index: "06",
      name: "Cover-up & Correzioni",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Trasformiamo vecchi tatuaggi in nuove opere tribali. Studio approfondito per una copertura che rispetta la tua pelle.",
      badge: null as string | null,
    },
    {
      id: "aftercare",
      index: "07",
      name: "Cura Post-Tatuaggio",
      category: "tattoo" as "tattoo" | "piercing",
      price: "Inclusa",
      duration: "inclusa",
      durationMinutes: 30,
      description:
        "Istruzioni dettagliate e assistenza continua per la guarigione del tuo tatuaggio. Il rito non finisce con l'ago.",
      badge: "Inclusa" as string | null,
    },

    // ── PIERCING SERVICES ────────────────────────────────────────────────────
    {
      id: "piercing-orecchio",
      index: "08",
      name: "Piercing Orecchio",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing professionali all'orecchio: lobo, helix, tragus, conch, industrial. Sterilità assoluta e gioielli titanio medicale di qualità.",
      badge: "Popolare" as string | null,
    },
    {
      id: "piercing-naso",
      index: "09",
      name: "Piercing Naso/Septum",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing al naso (nostril) e septum. Include gioiello in titanio medicale chirurgico e consulenza per la cura post-piercing.",
      badge: null as string | null,
    },
    {
      id: "piercing-labbro",
      index: "10",
      name: "Piercing Labbro",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing al labbro: labret, monroe, medusa, snake bites. Procedura sicura con materiali sterili monouso e gioielli certificati.",
      badge: null as string | null,
    },
    {
      id: "piercing-lingua",
      index: "11",
      name: "Piercing Lingua",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing alla lingua eseguito con precisione anatomica. Include barbell in titanio e istruzioni dettagliate per la guarigione.",
      badge: null as string | null,
    },
    {
      id: "piercing-ombelico",
      index: "12",
      name: "Piercing Ombelico",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing all'ombelico con studio della conformazione anatomica. Gioielli anallergici in titanio medicale con design eleganti.",
      badge: null as string | null,
    },
    {
      id: "piercing-sopracciglio",
      index: "13",
      name: "Piercing Sopracciglio",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing al sopracciglio con posizionamento studiato per valorizzare lo sguardo. Materiali certificati e massima igiene.",
      badge: null as string | null,
    },
    {
      id: "piercing-capezzolo",
      index: "14",
      name: "Piercing Capezzolo",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "25 min",
      durationMinutes: 25,
      description:
        "Piercing al capezzolo eseguito con esperienza e professionalità. Procedura delicata con attenzione massima alla sterilità.",
      badge: null as string | null,
    },
    {
      id: "piercing-cambio-gioiello",
      index: "15",
      name: "Cambio Gioiello",
      category: "piercing" as "tattoo" | "piercing",
      price: "Su Preventivo",
      duration: "10 min",
      durationMinutes: 10,
      description:
        "Cambio gioiello professionale per qualsiasi tipo di piercing. Verifica dello stato di guarigione e pulizia inclusa.",
      badge: "Servizio" as string | null,
    },
  ],

  // ── TEAM ────────────────────────────────────────────────────────────────────
  team: [
    {
      index: "01",
      name: "Claudio Ciliberti",                  // ← update with CEO's name
      role: "Fondatore & Maestro Tatuatore",
      image: artist1,  // Kept for backward compatibility
      images: [artist1, artist2, artist3],  // Multiple images carousel
      bio: "Dal 1994 porta nel corpo dei suoi clienti l'essenza delle culture tribali di tutto il mondo. I suoi viaggi in Polinesia, Nuova Zelanda e nei luoghi sacri dell'Asia gli hanno permesso di costruire un rapporto autentico con l'arte tribale originale — non semplici copie, ma magie antiche reinterpretate sull'energia di ogni individuo.",
      tags: ["Polinesiano", "Maori", "Tribale", "Freehand", "Dot Work", "Black Work"],
      years: "30+",
    },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  // ← Replace / add with real reviews from Google / social
  testimonials: [
    {
      name: "F. T.",
      text: "Centro aperto da 30 anni: igiene, pulizia e professionalità al TOP. Non perdetevi nella jungla dei tatuatori!",
    },
    {
      name: "A. M.",
      text: "5 anni fa il piercing all'ombelico, soddisfatta al 100%. Oggi ci ho portato mia sorella — sapevo già dove andare: TRIBAL TATTOO! Professionalità e attenzione al cliente GARANTITE. CONSIGLIATISSIMO!",
    },
    {
      name: "C. L.",
      text: "Uscita soddisfatta e contenta. Professionali, competenti, posto pulito. Vivamente consigliato!",
    },
    {
      name: "G.",
      text: "Titolare bravissimo e professionale, vere opere d'arte. Ho già 3 tatuaggi stupendi — tornerò sicuramente!",
    },
    {
      name: "C. S.",
      text: "Simpatici, spiegano tutto e consigliano. Davvero bravi.",
    },
    {
      name: "M. T.",
      text: "Piercing all'ombelico: grande professionalità, pulizia e gentilezza.",
    },
    {
      name: "C. C.",
      text: "Il tempio del tattoo e del piercing, vasta gioielleria da piercing.",
    },
    {
      name: "F. S.",
      text: "Titolare gentile, simpatico e competente. Locale particolare e a tema. Super consigliato.",
    },
    {
      name: "G. T.",
      text: "Accogliente, pulito, personale competente. Buoni prezzi, da consigliare!",
    },
    {
      name: "A. R.",
      text: "Proprietario gentile, ti spiega tutto nei minimi dettagli. Ho 3 tattoo bellissimi. Luogo accogliente.",
    },
    {
      name: "V. L.",
      text: "Negozio pulito, personale gentile ed esperto, buoni prezzi.",
    },
    {
      name: "M. M.",
      text: "Professionali ed estremamente puliti! Piercing fatto meno di una settimana fa — mi sembra di averlo da una vita. Grandiiiii!",
    },
    {
      name: "I. M.",
      text: "Piercing ombelico: bravissimo, zero dolore e zero infiammazione. Consigliatissimo!",
    },
    {
      name: "M. B.",
      text: "Molto bravi. Titolare con iride tatuata — uno dei pochi casi!",
    },
    {
      name: "P. L.",
      text: "Un professionista raro.",
    },
    {
      name: "S. B.",
      text: "Ottimo lavoro, personale preparato, locale pulito.",
    },
    {
      name: "G. B.",
      text: "Competenti, puliti, tutto alla perfezione. Ottimo!",
    },
    {
      name: "E. S.",
      text: "Professionalità, gentilezza e pulizia ottima.",
    },
    {
      name: "M. V.",
      text: "Vuoi farti \"dipingere\" il corpo? Lui è il migliore. Assolutamente SÌ!",
    },
    {
      name: "P. R.",
      text: "Carino, pulito, prezzi modici.",
    },
    {
      name: "R. S.",
      text: "Professionale e competente.",
    },
    {
      name: "G. V.",
      text: "Professionalità e igiene assoluta. Consigliatissimo.",
    },
    {
      name: "E. M.",
      text: "Professionalità, igiene e bravura.",
    },
    {
      name: "A. H.",
      text: "Claudio è un grande artista: tatuaggi tribali polinesiani impeccabili e colori fantastici. Ricerca la perfezione in tutto ciò che fa.",
    },
  ],

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  gallery: [
    { src: gallery1, alt: "Tatuaggio polinesiano freehand",         label: "Polinesiano"  },
    { src: gallery2, alt: "Tatuaggio maori su braccio",             label: "Maori"        },
    { src: gallery3, alt: "Dot work tribale geometrico",            label: "Dot Work"     },
    { src: gallery4, alt: "Black work tribale su schiena",          label: "Black Work"   },
    { src: gallery15, alt: "Studio", label: "Lo Studio"    },
    { src: gallery5, alt: "Tatuaggio tribale full sleeve",          label: "Full Sleeve"  },
    { src: gallery6, alt: "Dettaglio freehand tribale",             label: "Freehand"     },
    { src: gallery7, alt: "Tatuaggio Polinesiano su petto",     label: "Polinesiano"    },
    { src: gallery8, alt: "Tatuaggio polinesiano su spalla",          label: "Polinesiano"  },
    { src: gallery9, alt: "Tatuaggio maori su gamba",                label: "Maori"        },
    { src: gallery10, alt: "Tatuaggio tribale geometrico su braccio", label: "Tribale"     },
    { src: gallery11, alt: "Tatuaggio black work tribale su petto",  label: "Black Work"   },
    { src: gallery12, alt: "Tatuaggio tribale freehand su schiena", label: "Freehand"     },
    { src: gallery13, alt: "Face Tattoo",       label: "Face Tattoo"    },
    { src: gallery14, alt: "Tatuaggio in tutto il corpo", label: "Total Body"    },
    { src: gallery16, alt: "Video del processo di tatuaggio", label: "Il Rito"    },
  ],

  // ── PIERCINGS ───────────────────────────────────────────────────────────────
  // TODO: Replace with real piercing photos
  piercings: [
    { src: piercing1, alt: "Piercing orecchio - placeholder",      label: "Ombelico"  },
    { src: piercing2, alt: "Piercing naso - placeholder",          label: "Braccio"      },
    { src: piercing3, alt: "Piercing sopracciglio - placeholder",  label: "Sopracciglio" },
    { src: piercing4, alt: "Piercing labbro - placeholder",        label: "Lingua"    },
    { src: piercing5, alt: "Piercing lingua - placeholder",        label: "Collo"    },
    { src: piercing6, alt: "Piercing ombelico - placeholder",      label: "Orecchio"  },
    { src: piercing7, alt: "Studio piercing - placeholder",        label: "Orecchio" },
    { src: piercing8, alt: "Piercing industriale - placeholder",   label: "Bocca" },
    { src: piercing9, alt: "Piercing trago - placeholder",         label: "Braccio"     },
    { src: piercing10, alt: "Piercing helix - placeholder",        label: "Orecchio"     },
    { src: piercing11, alt: "Piercing septum - placeholder",       label: "Orecchio"    },
    { src: piercing12, alt: "Piercing surface - placeholder",      label: "Ombelico"   },
    { src: piercing13, alt: "Piercing surface - placeholder",      label: "Sopracciglio"   },
    { src: piercing14, alt: "Piercing surface - placeholder",      label: "Capezzolo"   },

  ],

  // ── DISEGNI (FLASH DESIGNS) ────────────────────────────────────────────────
  disegni: [
    {
      id: "polinesiano-001",
      src: disegno1,
      alt: "Tartaruga honu e maschera tiki in stile polinesiano-maori",
      label: "Honu & Tiki Maschera",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Foglio flash polinesiano-maori: tartaruga honu simmetrica con koru e, sotto, una maschera tiki circondata da onde e uncini. Arte sacra originale."
    },
    {
      id: "polinesiano-002",
      src: disegno2,
      alt: "Bande tribali verticali e profilo tiki polinesiano",
      label: "Bande & Tiki Profile",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Panel con profilo tiki che scende in triangoli (denti di squalo) e bande verticali: spirali koru, clessidre e zigzag. Ideale per avambraccio o polpaccio."
    },
    {
      id: "tribale-001",
      src: disegno3,
      alt: "Creatura manta tribale con lancia e banda geometrica simmetrica",
      label: "Manta & Banda Geometrica",
      category: "Tribale",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Due elementi: creatura manta/pterosauro in volute nere con lancia orizzontale, e ampia banda simmetrica con fiore lotus, koru e triangoli. Versatile."
    },
    {
      id: "polinesiano-003",
      src: disegno4,
      alt: "Tiki solare doppio viso e gecko tribale decorato",
      label: "Tiki Solare & Gecko",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Semisfera solare con doppia maschera tiki (due paia d'occhi) al centro, raggi dentati e geometria esterna. In basso un gecko interamente decorato in stile tribale."
    },
    {
      id: "polinesiano-004",
      src: disegno5,
      alt: "Grande tiki triangolare aggressivo e delfino tribale",
      label: "Grande Tiki & Delfino",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Bestseller",
      description: "Design triangolare per petto o spalla: tiki centrale con occhi ovali e bocca larga, onde simmetriche e bordi frastagliati. Più in basso, delfino decorato con spirali interne."
    },
    {
      id: "blackwork-001",
      src: disegno6,
      alt: "Blackwork geometrico con cerchio vuoto centrale e frammenti",
      label: "Blackwork Cerchio Sacro",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Grande blocco rettangolare con cerchio vuoto al centro incorniciato da masse nere simmetriche e bordi a denti di squalo. In basso, frammenti di onde e mezzo mandala."
    },
    {
      id: "marino-001",
      src: disegno7,
      alt: "Tre grandi cetacei tribali: squalo martello, orca e capodoglio",
      label: "Squalo, Orca & Capodoglio",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Foglio marino con tre creature: squalo martello dall'alto (weave e spearhead), orca di profilo con geometria lineare, capodoglio frontale con elementi polinesiani classici."
    },
    {
      id: "siciliano-001",
      src: disegno8,
      alt: "Trinacria tribale, vaso decorato, fishhook maori e cuore Sicilia",
      label: "Flash Siciliano Vol.1",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Nuovo",
      description: "Quattro motivi tribali siciliani: Trinacria con Medusa e gambe stilizzate, vaso tradizionale con bande, grande fishhook Hei Matau e cuore con mappa della Sicilia e plumerie."
    },
    {
      id: "zodiac-001",
      src: disegno9,
      alt: "I 12 segni zodiacali reinterpretati in stile polinesiano tribale",
      label: "Zodiac Polinesiano",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Tutti e 12 i segni zodiacali riletti come creature polinesiane: Toro-squalo, Ariete-medusa, Scorpione-anglerfish, Acquario-razza, Capricorno-nautilus, e così via. Ognuno su misura."
    },
    {
      id: "siciliano-002",
      src: disegno10,
      alt: "Mappa tribale della Sicilia, serpente-pugnale e cornicello",
      label: "Flash Siciliano Vol.2",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Due mappe tribali della Sicilia con weave e volti, serpente intrecciato a pugnale (lettera S), cornicello decorato con geometrie tribali. Arte identitaria siciliana."
    },
    {
      id: "geometrico-001",
      src: disegno12,
      alt: "Sole-croce tribale, emblema circolare, infinito maschera e fenice in volo",
      label: "Sole, Emblema & Fenice",
      category: "Geometrico",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Quattro disegni: sole-croce con core circolare a raggi segmentati, emblema circolare simmetrico, figura otto con maschere, e grande fenice tribale in volo con coda maestosa."
    },
    {
      id: "natura-001",
      src: disegno13,
      alt: "Fiori di loto, rondini, farfalle e quadrifoglio in stile polinesiano",
      label: "Natura Tribale",
      category: "Natura",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Foglio natura polinesiana: due loti (uno in fiore, uno chiuso), due rondini con ali spiegate, due farfalle, un quadrifoglio e plumerie stellate. Tutto in geometrie tribali fini."
    },
    {
      id: "sardo-001",
      src: disegno15,
      alt: "Mappa tribale della Sardegna con Quattro Mori e coltello pattadesa",
      label: "Flash Sardo",
      category: "Sardo",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Nuovo",
      description: "Arte identitaria sarda: teschio in alloro, coltello resolza intrecciato, mappa con croce rossa dei Quattro Mori e teste tribali, più seconda mappa interamente riempita di geometrie."
    },
    {
      id: "marino-002",
      src: disegno16,
      alt: "Gecko, squalo, tartaruga, manta ray con tiki e pesce spada tribali",
      label: "Creature Marine & Rettili",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Cinque soggetti tribali su un foglio: gecko dai piedi arricciati, squalo dall'alto, tartaruga circolare, manta ray con tiki incorporato e pesce spada che scende. Classici polinesiani."
    },
    {
      id: "polinesiano-005",
      src: disegno17,
      alt: "Grande design sleeve o spalla con profilo tiki e bande koru",
      label: "Sleeve Tiki Maestoso",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Bestseller",
      description: "Pezzo verticale per manica o polpaccio: profilo tiki dominante a destra, colonne di bande kurvilinee con weave, triangoli e onde negative a sinistra. Ancoraggio con volti centrali."
    },
    {
      id: "siciliano-003",
      src: disegno18,
      alt: "Ruota carretto, coppola, cuore Sicilia, carretto e cavallo tribali",
      label: "Flash Siciliano Vol.3",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Iconografia siciliana tribale: ruota di carretto con raggi decorati, coppola con intrecci, cuore con ibisco e Sicilia, piccolo carretto, bastone con volto e cavallo bardato."
    },
    {
      id: "blackwork-002",
      src: disegno19,
      alt: "Rettangolo blackwork con cerchio vuoto e tiki V-shape triangolare",
      label: "Blackwork Doppio Panel",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Due pesanti panel: rettangolo con ampio cerchio vuoto centrale (sole/vuoto) incorniciato da curve spesse e denti di squalo, e grande V-chest con tiki simmetrico spezzato al centro."
    },
    {
      id: "marino-003",
      src: disegno20,
      alt: "Polpo tribale, tiki rotondo, mappa Sicilia, corona e coltelli",
      label: "Polpo, Tiki & Sicilia",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Mix di soggetti: polpo con tentacoli avvolgenti e testa-maschera, piccolo tiki rotondo, mappa Sicilia su ventaglio solare, volto in corona d'alloro e due coltelli tribali sovrapposti."
    },
    {
      id: "siciliano-004",
      src: disegno21,
      alt: "Mappa Sicilia tribale, cuore plumeria, trinacria e emblema con uccelli",
      label: "Flash Siciliano Vol.4",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Cinque elementi: mappa Sicilia geometrica con scritta, cuore con plumerie tribali, emblema con teste di uccelli gemelle su ruota, Trinacria stilizzata e seconda mappa densa."
    },
    {
      id: "geometrico-002",
      src: disegno23,
      alt: "Sole yin-yang con koru, simbolo meandro e grande fenice tribale",
      label: "Sole Yin-Yang & Fenice",
      category: "Geometrico",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Bestseller",
      description: "Sole tribale con yin-yang puntinato al centro, bordi a spirale quadrata e raggi di fiamma. Accanto, simbolo meandro angolare. In basso, immensa fenice/araba fenice in pieno volo."
    },
    {
      id: "marino-005",
      src: disegno24,
      alt: "Squali tribali: piccolo squalo, grande great white, swordfish, hammerhead e cavalluccio",
      label: "Flash Squali",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Cinque pesci tribali: piccolo squalo aggressivo, grande squalo bianco pieno di weave, pesce spada, coppia hammerhead+squalo con volto centrale, e cavalluccio marino intrecciato a fishhook."
    },
    {
      id: "blackwork-003",
      src: disegno29,
      alt: "Doppio panel blackwork con cerchio vuoto e tiki V-shape — alt",
      label: "Blackwork Doppio Panel Vol.2",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Variante fotografica del foglio 19: rettangolo con cerchio solare vuoto e V-chest con tiki speculare. Due grandi pezzi blackwork pesanti per petto, spalle o schiena."
    },
    {
      id: "polinesiano-006",
      src: disegno30,
      alt: "Grande panel tribale a tre colonne e delfino stilizzato",
      label: "Panel Tribale & Delfino",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Imponente panel verticale a tre colonne (curve con volto, loop a C, onde e triangoli a destra) per petto, schiena o coscia. In basso delfino tribale stilizzato rivolto a sinistra."
    },
    {
      id: "polinesiano-007",
      src: disegno31,
      alt: "Sleeve o gamba con koru, uccello tribale e tiki mask tartaruga",
      label: "Sleeve Koru & Tiki Mask",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Bestseller",
      description: "Grande pezzo per manica o gamba: metà sinistra con onde koru e weave interni, metà destra con bande di triangoli. Uccello/manta in picchiata sopra e tiki mask a forma di tartaruga in basso."
    },
    {
      id: "geometrico-003",
      src: disegno32,
      alt: "Cinque mandala ed emblemi circolari tribali",
      label: "Cinque Mandala Tribali",
      category: "Geometrico",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Cinque cerchi: onde-uccelli astratti, labirinto con croce in negativo, sole con cuore interno, mandala complesso con raggi e volti, piccolo cerchio con forma geometrica centrale."
    },
    {
      id: "siciliano-009",
      src: disegno35,
      alt: "Coltelli serramanico siciliani decorati con geometrie tribali polinesiane",
      label: "Coltelli Serramanico Siciliani",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Nuovo",
      description: "Foglio con numerosi coltelli a serramanico siciliani in posizioni variegate (aperti, chiusi, di profilo), ciascuno interamente riempito con geometrie tribali polinesiane — denti di squalo, weave e bande intrecciate. Cornici barocche agli angoli. Il serramanico, simbolo identitario siciliano, reinterpretato in chiave tribale."
    },
    {
      id: "polinesiano-008",
      src: disegno37,
      alt: "Design verticale simmetrico: tartaruga, farfalle e fiori frangipani per schiena",
      label: "Spine Piece: Tartaruga & Frangipani",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Eleganissimo pezzo per la schiena: tartaruga centrale integrata in struttura verticale di spearhead e sunburst. Ai lati, viti di frangipani e due farfalle tribali dettagliate. Per chi cerca il massimo."
    },
    {
      id: "blackwork-004",
      src: disegno38,
      alt: "Due pesanti panel blackwork: wedge con koru e grande chest con mandala",
      label: "Blackwork Chest & Wedge",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Sopra: wedge/spalla con linee massive e spirale koru centrale. Sotto: enorme pezzo petto/schiena con mandala solare e croce interna, circondato da bande di triangoli, archi e geometrie aggressive."
    },
    {
      id: "polinesiano-009",
      src: disegno39,
      alt: "Croce con quattro tiki e armband con tiki speculari su denti di squalo",
      label: "Croce Tiki & Armband",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "In alto: emblema a croce con stella centrale e quattro tiki che guardano ai punti cardinali, raggi a spearhead. In basso: band rettangolare con due tiki speculari su base a denti di squalo."
    },
    {
      id: "polinesiano-010",
      src: disegno40,
      alt: "Tartaruga con tiki ai lati per petto e panel curvato per addome",
      label: "Tartaruga Petto & Addome",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Bestseller",
      description: "Pezzo arcuato per petto/schiena: grande tartaruga tribale le cui pinne si fondono con tiki che guardano a destra e sinistra. Sotto: panel curvo per lombi con ventaglio solare e onde speculari."
    },
    {
      id: "marino-007",
      src: disegno41,
      alt: "Tartaruga, gecko, cavalluccio marino e tre delfini tribali",
      label: "Tartaruga, Gecko & Delfini",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Foglio marino: grande tartaruga in alto, due gecko sui lati sinistri, cavalluccio marino a destra e tre delfini stilizzati in picchiata in basso. Tutti riempiti con geometrie polinesiane."
    },
    {
      id: "marino-010",
      src: disegno42,
      alt: "Tartaruga honu, gecko, delfino in salto e lucertola in stile tribale polinesiano",
      label: "Honu, Gecko & Delfino",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Foglio flash tribale con quattro creature: tartaruga honu in alto con motivi polinesiani intrecciati, gecko sulla sinistra, delfino saltante al centro decorato con spirali interne, e lucertola in basso a destra."
    },
    {
      id: "marino-011",
      src: disegno46,
      alt: "Tre grandi balene tribali: capodoglio con bocca aperta, balenottera e megattera — variante",
      label: "Tre Balene Tribali Vol.2",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Variante fotografica del foglio balene: capodoglio in alto con bocca spalancata e denti, balenottera di profilo al centro con pattern geometrici lineari, megattera in basso con solchi gutturali stilizzati. Tutti in stile maori-polinesiano."
    },
    {
      id: "tribale-004",
      src: disegno49,
      alt: "Coltelli a serramanico tribali sparsi — nove lame decorate con geometrie polinesiane",
      label: "Coltelli Serramanico Tribali",
      category: "Tribale",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Foglio con nove coltelli a serramanico in diverse posizioni (aperti, semi-aperti, chiusi), disposti in modo sparso sulla pagina. Ogni lama e manico è interamente riempito di geometrie tribali polinesiane, denti di squalo e weave intrecciati."
    },
    {
      id: "marino-012",
      src: disegno50,
      alt: "Tartaruga honu tribale, due delfini saltanti e sole mandala polinesiano",
      label: "Honu, Delfini & Sole",
      category: "Marino",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Nuovo",
      description: "Foglio marino polinesiano con quattro elementi: grande tartaruga honu in alto con geometrie tribali intrecciate, sole mandala circolare a destra, due delfini stilizzati al centro decorati con weave e spirali, e creatura marina in basso. Classici dell'arte tribale del Pacifico."
    },
    {
      id: "siciliano-010",
      src: disegno51,
      alt: "Ruota carretto, vaso tribale, uccello, ciondolo, carretto in cerchio e cavallo decorato",
      label: "Flash Siciliano Vol.5",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Foglio siciliano con sei motivi tribali: grande ruota di carretto con raggi decorati (in alto a sinistra), ampia forma organica/vaso con intrecci tribali (in alto a destra), piccolo uccello con fiore (centro sinistra), ciondolo ornamentale con pendenti (centro), carretto siciliano in medaglione circolare (basso sinistra) e cavallo bardato con decorazioni tribali (basso destra)."
    },
    {
      id: "blackwork-005",
      src: disegno52,
      alt: "Arco-maschera blackwork con koru e panel rettangolare simmetrico",
      label: "Arco Maschera & Panel",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Sopra: arco curvo sopra un triangolo centrale con linee koru e spearhead — evoca maschera o occhio. Sotto: ampio panel orizzontale con croci sovrapposte, onde speculari e bordo a denti di squalo."
    },
    {
      id: "polinesiano-012",
      src: disegno53,
      alt: "Panel verticale con volti astratti, spearhead e banda orizzontale tribale",
      label: "Panel Verticale Tribale",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Composizione mista: piccola banda orizzontale, arco semi-circolare con fiore interno, quadrato diagonale bianco su koru, e lungo panel verticale con onde interlacciate, spearhead e volti astratti."
    },
    {
      id: "polinesiano-013",
      src: disegno54,
      alt: "Disegno a matita 3D ombreggiato: sleeve polinesiano con profondità e dettaglio",
      label: "Sleeve 3D — Matita",
      category: "Polinesiano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Eccezionale disegno a grafite che simula un tatuaggio sleeve in 3D: strati sovrapposti di weave, bande a denti di squalo, spearhead e un occhio-maschera in cima. Realismo tattile e profondità visiva unici."
    },
    {
      id: "blackwork-006",
      src: disegno55,
      alt: "Tartaruga abstract blackwork con curve spesse e rettangolo con cerchio",
      label: "Tartaruga Blackwork & Panel",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Sopra: tartaruga astratta con curve massive e occhi in negativo — pura forza blackwork. Sotto: blocco rettangolare con grande cerchio vuoto al centro, circondato da strati di triangoli, onde e geometria."
    },
    {
      id: "blackwork-007",
      src: disegno56,
      alt: "Grande scudo a mezza luna con stella a 8 punte centrale per petto o schiena",
      label: "Scudo Stella 8 Punte",
      category: "Black Work",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Premium",
      description: "Design monumentale: singolo scudo semi-circolare altamente simmetrico con stella a 8 punte inscritta in un cerchio al centro. Masse di koru, tagli geometrici e curve aggressive riempiono ogni spazio."
    },
    {
      id: "natura-003",
      src: disegno57,
      alt: "Swoosh floreali con frangipani, farfalle tribali e infinito con fiore",
      label: "Viti Floreali & Farfalle",
      category: "Natura",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: "Popolare",
      description: "Linee fluenti per avvolgere gli arti: swoosh decorati con denti di squalo, frangipani e ibisco. Simbolo infinito con fiore incorporato, due farfalle tribali dettagliate e motivo lancia centrale."
    },
    {
      id: "siciliano-008",
      src: disegno58,
      alt: "Siciliano tribale: ruota carretto, coppola, carretto e cavallo — alt",
      label: "Flash Siciliano Vol.3b",
      category: "Siciliano",
      price: 20,
      originalPrice: null,
      size: "A4 (21x29,7 cm)",
      badge: null,
      description: "Vista alternativa del foglio siciliano: ruota di carretto, coppola intrecciata, cuore con mappa e ibisco, piccolo carretto, bastone con volto e cavallo decorato. Variante fotografica del foglio 18."
    },
  ],

  // ── E-COMMERCE DISCOUNT SETTINGS ────────────────────────────────────────────
  discount: {
    /** Enable bulk purchase discount */
    enabled: true,
    /** Percentage discount (0-100) */
    percentage: 15,
    /** Minimum items required to qualify for discount */
    minItems: 3,
    /** Display message for the discount offer */
    message: "Acquista {minItems} o più disegni e ricevi automaticamente il {percentage}% di sconto sul totale!",
  },

  // ── CONTACT & LOCATION ──────────────────────────────────────────────────────
  contact: {
    addressLines: ["Corso Roma, 51", "10024 Moncalieri TO"],

    quarter: ["Moncalieri"],

    countryCode: "IT",

    priceRange: "$$",

    geo: {
      latitude:  "44.9980",
      longitude: "7.6863",
    },

    phone:     "+39 338 839 8005",
    phoneHref: "tel:+393388398005",

    email: "tribaltattoo@tribaltattoo.it",   // ← update with real email

    /**
     * Google Maps embed URL.
     * Get it from: maps.google.com → Share → Embed a map → copy the src URL.
     */
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819!2d7.6863!3d44.9980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ29yc28gUm9tYSA1MSwgTW9uY2FsaWVyaSBUTw!5e0!3m2!1sit!2sit!4v1700000000000",
  },

  // ── OPENING HOURS ───────────────────────────────────────────────────────────
  hours: [
    { days: "Lun – Ven", time: "10:00 – 12:30  |  15:00 – 19:30" },
    { days: "Sabato",    time: "09:30 – 13:00  |  15:00 – 19:00" },
    { days: "Domenica",  time: "Chiuso"                           },
  ],

  // ── SOCIAL LINKS ────────────────────────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/tribaltattoo",  // ← update
    facebook:  "https://www.facebook.com/TribaltattooItalia",
    youtube:   "https://www.youtube.com/@tribaltattooitalia",
    tiktok:    "https://www.tiktok.com/@tribaltattooitalia?_r=1&_t=ZN-95azfmUBDRG",
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    copyrightYear:       "2025",
    allRightsReserved:   "All rights reserved",
    privacyPolicyLabel:  "Privacy Policy",
    cookiePolicyLabel:   "Cookie Policy",
    cookieSettingsLabel: "Cookie Settings",
  },

  // ── LEGAL (Privacy Policy & Cookie Policy) ──────────────────────────────────
  legal: {
    legalName:     "Tribal Tattoo Studio",          // ← update with legal entity
    privacyEmail:  "tribaltattoo@tribaltattoo.it",          // ← update
    postalAddress: "Corso Roma, 51 – 10024 – Moncalieri (TO)",
    vatNumber:     "07519240019",
    //reaNumber:     "[Inserire Numero REA]",
    //shareCapital:  "[Inserire Capitale Sociale]",
    pecEmail:      "tribaltattoo@pec.tribaltattoo.it",
  },

  
 // ── THEME ────────────────────────────────────────────────────────────────────
  //
  // ┌──────────────────────────────────────────────────────────────────────────┐
  // │  TEMA SCURO — "Ossidiana & Oro Tribale"                                  │
  // │                                                                          │
  // │  ANCHOR           HEX        HSL               RUOLO                    │
  // │  Ossidiana Calda  #090805    40 10%  4%        sfondo pagina             │
  // │  Oro Tribale      #B8870B    43 87% 38%        primario / CTA            │
  // │  Pergamena        #F2E8CE    40 52% 87%        testo principale          │
  // │  Terracotta Scura #7A2E1A    12 62% 29%        accento / ring            │
  // │  Superficie Calda #130D02    40 85%  5%        card & superfici          │
  // │                                                                          │
  // │  FONT TRIBALE                                                            │
  // │  Cinzel  — inciso come la pietra, monolitico, ancestrale (heading)       │
  // │  Raleway — geometrico e artigianale, ottima leggibilità (body)           │
  // └──────────────────────────────────────────────────────────────────────────┘
  //
  theme: {
    /**
     * ✦ MODIFICA FONT: Cinzel + Raleway
     *
     *   Cinzel è ispirato alle iscrizioni romane su pietra — pesante, inciso,
     *   ancestrale. Funziona perfettamente per un brand tribale perché evoca
     *   l'idea di qualcosa di scolpito, permanente, rituale.
     *
     *   Raleway è geometrico e leggermente artigianale — abbastanza moderno da
     *   essere leggibile online, abbastanza caldo da non contrastare con Cinzel.
     *   Molto meglio di Inter in questo contesto visivo.
     *
     *   Pesi caricati:
     *   - Cinzel 400 (testo) / 700 (bold) / 900 (display)
     *   - Raleway 300 (light body) / 400 (regular) / 500 (medium) / 700 (labels)
     */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Raleway:wght@300;400;500;700&display=swap",
 
    fonts: {
      heading: "Cinzel",
      body:    "Raleway",
    },
 
    /** Bordi netti — estetica grezza, senza compromessi */
    radius: "0px",
 
    colors: {
      // ── Sfondo — Ossidiana Calda #090805 ─────────────────────────────────
      // ✦ MODIFICA: più caldo (40 10% vs 60 6%) — ossidiana con sottotono terra
      background:              "40 10% 4%",
 
      // ── Testo principale — Pergamena #F2E8CE ─────────────────────────────
      // ✦ MODIFICA: leggermente più calda e satura (40 52% 87% vs 38 65% 91%)
      foreground:              "40 52% 87%",
 
      // ── Card & popover — Superficie Calda #130D02 ────────────────────────
      // ✦ MODIFICA: più profonda e calda (40 85% 5% vs 43 30% 9%)
      card:                    "40 70% 5%",
      cardForeground:          "40 52% 87%",
      popover:                 "40 60% 5%",
      popoverForeground:       "40 52% 87%",
 
      // ── Primario / CTA — Oro Tribale #B8870B ─────────────────────────────
      // ✦ MODIFICA: oro più ricco e profondo (43 87% 38% vs 43 66% 47%)
      //   Il colore è ora più saturo e meno "dorato chiaro" — più primitivo,
      //   più antico, quasi il colore dell'ambra o dell'oro di una maschera tribale.
      primary:                 "43 87% 38%",
      primaryForeground:       "40 80% 8%",
 
      // ── Secondario — Bruno scuro caldo ────────────────────────────────────
      secondary:               "40 25% 11%",
      secondaryForeground:     "40 52% 87%",
 
      // ── Muted — Superficie smorzata calda ─────────────────────────────────
      muted:                   "40 18% 10%",
      mutedForeground:         "40 20% 48%",
 
      // ── Accent — Stesso oro tribale per coerenza ──────────────────────────
      accent:                  "43 87% 38%",
      accentForeground:        "40 80% 8%",
 
      // ── Bordi & input — Tono caldo ────────────────────────────────────────
      border:                  "40 22% 14%",
      input:                   "40 18% 11%",
 
      // ── Focus ring — Terracotta scura #7A2E1A ────────────────────────────
      // ✦ MODIFICA: ring in terracotta invece che nell'oro — crea contrasto
      //   visivo interessante e rafforza l'identità tribale/primitiva
      ring:                    "12 62% 29%",
 
      // ── Effetti & overlay ─────────────────────────────────────────────────
      gridPattern:             "40 22% 14%",
      primaryGlow:             "43 87% 38%",
      shadowLight:             "0 0% 0%",
      shadowDark:              "0 0% 0%",
 
      // ── Sidebar ───────────────────────────────────────────────────────────
      sidebarBackground:         "40 60% 5%",
      sidebarForeground:         "40 52% 87%",
      sidebarPrimary:            "43 87% 38%",
      sidebarPrimaryForeground:  "40 80% 8%",
      sidebarAccent:             "40 18% 10%",
      sidebarAccentForeground:   "40 52% 87%",
      sidebarBorder:             "40 22% 14%",
      sidebarRing:               "43 87% 38%",
    },
  },
 
  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  cookieConsentKey: "tribal-tattoo-cookie-consent",
};
 
export type ShopConfig = typeof shopConfig;
export default shopConfig;
