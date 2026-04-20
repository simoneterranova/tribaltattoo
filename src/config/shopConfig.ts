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

import disegni1  from "@/assets/disegni-photos/disegni-1.webp";
import disegni2  from "@/assets/disegni-photos/disegni-2.webp";
import disegni3  from "@/assets/disegni-photos/disegni-3.webp";
import disegni4  from "@/assets/disegni-photos/disegni-4.webp";
import disegni5  from "@/assets/disegni-photos/disegni-5.webp";
import disegni6  from "@/assets/disegni-photos/disegni-6.webp";
import disegni7  from "@/assets/disegni-photos/disegni-7.webp";
import disegni8  from "@/assets/disegni-photos/disegni-8.webp";
import disegni9  from "@/assets/disegni-photos/disegni-9.webp";
import disegni10 from "@/assets/disegni-photos/disegni-10.webp";
import disegni11 from "@/assets/disegni-photos/disegni-11.webp";
import disegni12 from "@/assets/disegni-photos/disegni-12.webp";
import disegni13 from "@/assets/disegni-photos/disegni-13.webp";  
import disegni14 from "@/assets/disegni-photos/disegni-14.webp";

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
    siteUrl: "https://www.tribaltattoo.it",   // ← update with real domain

    /** Link di prenotazione o contatto */
    bookingSiteUrl: "https://www.tribaltattoo.it",

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
      heading: "I nostri Tattoo",
    },
    piercings: {
      label: "Piercings",
      heading: "I nostri Piercings",
    },
    disegni: {
      label: "Disegni",
      heading: "I Nostri Disegni",
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
      id: "consultation",
      index: "01",
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
      index: "02",
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
      index: "03",
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
      index: "04",
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
      index: "05",
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
      index: "06",
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
      index: "07",
      name: "Piercing Orecchio",
      category: "piercing" as "tattoo" | "piercing",
      price: "30€",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing professionali all'orecchio: lobo, helix, tragus, conch, industrial. Sterilità assoluta e gioielli titanio medicale di qualità.",
      badge: "Popolare" as string | null,
    },
    {
      id: "piercing-naso",
      index: "08",
      name: "Piercing Naso/Septum",
      category: "piercing" as "tattoo" | "piercing",
      price: "40€",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing al naso (nostril) e septum. Include gioiello in titanio medicale chirurgico e consulenza per la cura post-piercing.",
      badge: null as string | null,
    },
    {
      id: "piercing-labbro",
      index: "09",
      name: "Piercing Labbro",
      category: "piercing" as "tattoo" | "piercing",
      price: "35€",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing al labbro: labret, monroe, medusa, snake bites. Procedura sicura con materiali sterili monouso e gioielli certificati.",
      badge: null as string | null,
    },
    {
      id: "piercing-lingua",
      index: "10",
      name: "Piercing Lingua",
      category: "piercing" as "tattoo" | "piercing",
      price: "45€",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing alla lingua eseguito con precisione anatomica. Include barbell in titanio e istruzioni dettagliate per la guarigione.",
      badge: null as string | null,
    },
    {
      id: "piercing-ombelico",
      index: "11",
      name: "Piercing Ombelico",
      category: "piercing" as "tattoo" | "piercing",
      price: "35€",
      duration: "20 min",
      durationMinutes: 20,
      description:
        "Piercing all'ombelico con studio della conformazione anatomica. Gioielli anallergici in titanio medicale con design eleganti.",
      badge: null as string | null,
    },
    {
      id: "piercing-sopracciglio",
      index: "12",
      name: "Piercing Sopracciglio",
      category: "piercing" as "tattoo" | "piercing",
      price: "35€",
      duration: "15 min",
      durationMinutes: 15,
      description:
        "Piercing al sopracciglio con posizionamento studiato per valorizzare lo sguardo. Materiali certificati e massima igiene.",
      badge: null as string | null,
    },
    {
      id: "piercing-capezzolo",
      index: "13",
      name: "Piercing Capezzolo",
      category: "piercing" as "tattoo" | "piercing",
      price: "50€",
      duration: "25 min",
      durationMinutes: 25,
      description:
        "Piercing al capezzolo eseguito con esperienza e professionalità. Procedura delicata con attenzione massima alla sterilità.",
      badge: null as string | null,
    },
    {
      id: "piercing-cambio-gioiello",
      index: "14",
      name: "Cambio Gioiello",
      category: "piercing" as "tattoo" | "piercing",
      price: "10€",
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
    { src: gallery7, alt: "Interno dello studio Tribal Tattoo",     label: "Lo Studio"    },
    { src: gallery8, alt: "Tatuaggio polinesiano su spalla",          label: "Polinesiano"  },
    { src: gallery9, alt: "Tatuaggio maori su gamba",                label: "Maori"        },
    { src: gallery10, alt: "Tatuaggio dot work geometrico su braccio", label: "Dot Work"     },
    { src: gallery11, alt: "Tatuaggio black work tribale su petto",  label: "Black Work"   },
    { src: gallery12, alt: "Tatuaggio tribale freehand su schiena", label: "Freehand"     },
    { src: gallery13, alt: "Video dello studio Tribal Tattoo",       label: "Lo Studio"    },
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
      id: "dotwork-001",
      src: disegni1, 
      alt: "Disegno tribale dot work geometrico",     
      label: "Dot Work Geometrico",
      category: "Dot Work",
      price: 45,
      originalPrice: null,
      size: "Medio (10-15cm)",
      badge: "Popolare",
      description: "Design geometrico realizzato con tecnica dot work. Perfetto per avambraccio o polpaccio."
    },
    { 
      id: "blackwork-001",
      src: disegni2, 
      alt: "Disegno tribale black work",              
      label: "Black Work Tribale",
      category: "Black Work",
      price: 60,
      originalPrice: null,
      size: "Grande (15-20cm)",
      badge: "Nuovo",
      description: "Potente design black work con contrasti netti. Ideale per spalla o schiena."
    },
    { 
      id: "freehand-001",
      src: disegni3, 
      alt: "Disegno tribale freehand",                
      label: "Freehand Organico",
      category: "Freehand",
      price: 55,
      originalPrice: null,
      size: "Medio (10-15cm)",
      badge: null,
      description: "Design freehand che segue il flusso naturale del corpo. Adattabile a ogni zona."
    },
    { 
      id: "geometrico-001",
      src: disegni4,  
      alt: "Disegno tribale geometrico",              
      label: "Geometrico Sacro",
      category: "Geometrico",
      price: 50,
      originalPrice: null,
      size: "Medio (10-15cm)",
      badge: null,
      description: "Forme geometriche che evocano simboli ancestrali. Versatile e potente."
    },
    { 
      id: "polinesiano-001",
      src: disegni5,  
      alt: "Disegno polinesiano originale",           
      label: "Polinesiano Autentico",
      category: "Polinesiano",
      price: 70,
      originalPrice: 85,
      size: "Grande (15-20cm)",
      badge: "In Offerta",
      description: "Autentico design polinesiano con motivi tradizionali. Arte sacra originale."
    },
    { 
      id: "maori-001",
      src: gallery9,  
      alt: "Disegno maori tradizionale",              
      label: "Maori Tradizionale",
      category: "Maori",
      price: 65,
      originalPrice: null,
      size: "Medio-Grande (12-18cm)",
      badge: "Popolare",
      description: "Motivo maori rispettoso della tradizione. Perfetto per braccia e gambe."
    },
    { 
      id: "polinesiano-002",
      src: gallery1,  
      alt: "Disegno polinesiano freehand",            
      label: "Polinesiano Freehand",
      category: "Polinesiano",
      price: 75,
      originalPrice: null,
      size: "Grande (15-20cm)",
      badge: "Bestseller",
      description: "Combinazione di tradizione polinesiana e tecnica freehand moderna."
    },
    { 
      id: "maori-002",
      src: gallery2,  
      alt: "Disegno maori su braccio",                
      label: "Maori Bracciale",
      category: "Maori",
      price: 55,
      originalPrice: null,
      size: "Medio (10-15cm)",
      badge: null,
      description: "Design maori pensato specificamente per l'avambraccio. Elegante e potente."
    },
    { 
      id: "dotwork-002",
      src: gallery3, 
      alt: "Disegno dot work complesso",     
      label: "Dot Work Mandala",
      category: "Dot Work",
      price: 80,
      originalPrice: null,
      size: "Grande (15-20cm)",
      badge: "Premium",
      description: "Complesso design mandala realizzato interamente con tecnica dot work puntinato."
    },
    { 
      id: "blackwork-002",
      src: gallery4, 
      alt: "Disegno black work grande",              
      label: "Black Work Totale",
      category: "Black Work",
      price: 90,
      originalPrice: null,
      size: "Extra Grande (20-25cm)",
      badge: "Premium",
      description: "Design black work di grande impatto visivo. Per chi cerca il massimo contrasto."
    },
    { 
      id: "freehand-002",
      src: gallery5, 
      alt: "Disegno freehand sleeve",                
      label: "Freehand Full Sleeve",
      category: "Freehand",
      price: 120,
      originalPrice: null,
      size: "Full Sleeve",
      badge: "Bestseller",
      description: "Design completo per manica intera. Disegnato per seguire perfettamente il braccio."
    },
    { 
      id: "geometrico-002",
      src: gallery6,  
      alt: "Disegno geometrico minimale",              
      label: "Geometrico Minimalista",
      category: "Geometrico",
      price: 40,
      originalPrice: null,
      size: "Piccolo (5-10cm)",
      badge: null,
      description: "Design geometrico essenziale e pulito. Perfetto per chi cerca l'eleganza minimal."
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