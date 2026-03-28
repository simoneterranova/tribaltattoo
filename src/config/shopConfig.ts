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
// ║  PALETTE (LIGHT THEME)                                       ║
// ║  #DCC9A9  →  HSL  38 42% 76%  — background (warm parchment) ║
// ║  #B83A2D  →  HSL   6 61% 45%  — primary / CTA buttons (red) ║
// ║  #4E6851  →  HSL 127 14% 36%  — foreground / text (green)   ║
// ╚══════════════════════════════════════════════════════════════╝

// ── IMAGE ASSETS ──────────────────────────────────────────────────────────────
// Replace these files in src/assets/ with Gran Babar's own photos.
import heroBg    from "@/assets/hero-bg.jpg";
import artist1   from "@/assets/fra.mp4";   // Francesco – main portrait
import gallery1  from "@/assets/tattoo-1.jpeg";
import gallery2  from "@/assets/tattoo-2.mp4";
import gallery3  from "@/assets/tattoo-3.mp4";
import gallery4  from "@/assets/tattoo-4.mp4";
import gallery5  from "@/assets/tattoo-5.mp4";
import gallery6  from "@/assets/tattoo-6.jpg";
import gallery7  from "@/assets/studio-babar.mp4";
import logo      from "@/assets/logo.png";        // Gran Babar logo

// ── IDENTITY ──────────────────────────────────────────────────────────────────
const shopConfig = {
  /** Short brand name used in the navbar logo, loading screen, and auth page. */
  name: "GRAN BABAR",

  /** Full brand name used in the footer bottom bar. */
  fullName: "GRAN BABAR STUDIO",

  /** Logo image. */
  logo: logo,

  /** City / location shown in hero tagline and section subtitles. RESPECT THE FORMATTING */
  city: "Torino, TO",

  /** Year the shop was founded — shown in the hero tagline. */
  established: "2020",

  /** The type of business activity. */
  activity: "Studio di Tatuaggi",

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  meta: {
    /** Full domain without trailing slash. */
    siteUrl: "https://www.granbabar.it",

    /** Link di prenotazione o contatto */
    bookingSiteUrl: "https://www.granbabar.it",

    /** og:locale */
    locale: "it_IT",

    title: "Tatuaggi Torino | Gran Babar | Studio di Tatuaggi Personalizzati",
    description:
      "Studio di tatuaggi a Torino. Tatuaggi personalizzati, cover-up, realistici, old school, geometrici e tribali. Consulenza gratuita. Contatta Francesco.",
    ogTitle: "Gran Babar – Studio di Tatuaggi a Torino",
    ogDescription:
      "Ogni tatuaggio è un'opera d'arte unica. Prenota la tua consulenza gratuita con Francesco, artista tatuatore a Torino.",
    /** Absolute path from the public/ folder or a full URL. */
    ogImage: "/og-image.jpg",
  },

  // ── NAVIGATION LABELS ───────────────────────────────────────────────────────
  nav: {
    /** Text on the contact CTA button in the navbar. */
    bookingCta: "Contattami",
    links: [
      { label: "Servizi",    href: "#services"     },
      { label: "L'Artista",  href: "#team"         },
      { label: "Recensioni", href: "#testimonials" },
      { label: "Gallery",    href: "#gallery"      },
      { label: "Contatti",   href: "#contact"      },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    /** Background image — replace with Gran Babar's hero photo. */
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Gran", "Babar"],

    /** Short descriptor line under the headline. */
    subheadline:
      "Studio di tatuaggi a Torino. Ogni segno racconta una storia, ogni opera d'arte è pensata su di te.",

    /** Text on the contact CTA button inside the hero section. */
    bookingCta: "Contattami",

    /** Items that scroll in the marquee strip at the bottom of the hero. */
    marqueeItems: [
      "Old School",
      "Realistico",
      "Black & Grey",
      "Geometrico",
      "Gotico",
      "Tribale",
      "Cover-up",
      "Personalizzato",
    ],
  },

  // ── SECTION HEADINGS ────────────────────────────────────────────────────────
  sections: {
    services: {
      label: "Servizi",
      heading: ["I Nostri", "Servizi"],
      counterLabel: ["Trattamenti", "Personalizzati"],
      footnote:
        "Tutti i preventivi sono concordati durante la consulenza · I prezzi variano in base a dimensione e complessità del progetto",
    },
    team: {
      label: "L'Artista",
      heading: ["Chi è", "Gran Babar"],
      counterLabel: ["Anni di", "Esperienza"],
    },
    testimonials: {
      label: "Recensioni",
      heading: "Dicono di noi",
    },
    gallery: {
      label: "Gallery",
      heading: "I nostri Lavori",
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
  // Prices are indicative starting points — final quote agreed during consultation.
  // `durationMinutes` is approximate; tattoo sessions vary greatly.
  services: [
    {
      id: "custom-tattoo",
      index: "01",
      name: "Tattoo Personalizzato",
      price: 150,
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Ogni tatuaggio nasce da un'idea tua e si trasforma in un'opera d'arte unica. Consulenza inclusa, design su misura studiato per la tua pelle.",
      badge: "Più richiesto" as string | null,
    },
    {
      id: "cover-up",
      index: "02",
      name: "Cover-up & Correzioni",
      price: 180,
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Diamo nuova vita a vecchi tatuaggi. Studio approfondito del progetto per una copertura impeccabile che rispetta la tua pelle.",
      badge: "Specialità" as string | null,
    },
    {
      id: "old-school",
      index: "03",
      name: "Old School",
      price: 120,
      duration: "da 45 min",
      durationMinutes: 45,
      description:
        "Linee decise, colori saturi e soggetti iconici. Il classico del tatuaggio tradizionale con un tocco personale.",
      badge: null as string | null,
    },
    {
      id: "realistic",
      index: "04",
      name: "Realistico & Black Grey",
      price: 200,
      duration: "da 2 ore",
      durationMinutes: 120,
      description:
        "Ritratti, nature morte, paesaggi. Una resa fotografica direttamente sulla pelle, con sfumature e profondità senza eguali.",
      badge: "Premium" as string | null,
    },
    {
      id: "geometric",
      index: "05",
      name: "Geometrico & Tribale",
      price: 130,
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Simmetrie perfette, linee pulite e pattern ancestrali. Eleganza matematica che si adatta alla forma del corpo.",
      badge: null as string | null,
    },
    {
      id: "aftercare",
      index: "06",
      name: "Cura Post-Tatuaggio",
      price: 0,
      duration: "inclusa",
      durationMinutes: 30,
      description:
        "Istruzioni dettagliate e assistenza continua per la guarigione del tuo tatuaggio. Il lavoro non finisce con l'ago.",
      badge: "Inclusa" as string | null,
    },
  ],

  // ── TEAM ────────────────────────────────────────────────────────────────────
  // Gran Babar è uno studio indipendente — un solo artista, Francesco.
  team: [
    {
      index: "01",
      name: "Francesco",
      role: "Fondatore & Artista Tatuatore",
      image: artist1,
      bio: "Il percorso di Francesco è segnato dalla passione per il disegno, la musica e il volontariato. Il nome Gran Babar nasce da una storia speciale con suo figlio Samuele. L'aggiunta di 'Gran' rappresenta il desiderio di essere un punto di riferimento per chi cerca un tatuaggio che vada oltre il semplice disegno.",
      tags: ["Old School", "Realistico", "Geometrico", "Cover-up", "Gotico", "Tribale"],
      years: "10+",
    },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  testimonials: [
    {
      name: "Clara Collino",
      text: "L'esperienza è stata fantastica fin dal primo momento: l'ambiente è pulito, accogliente e professionale. Francesco è stato molto attento a capire le mie esigenze e ha creato un design personalizzato che ha superato le mie aspettative. I dettagli sono incredibili!",
    },
    {
      name: "Carlotta Irene G.",
      text: "Cinque stelle per professionalità, impegno e lato artistico in continua evoluzione. C'è molta cura della persona e del suo progetto, con delicatezza e attenzione. Un artista che mette passione in ogni tratto.",
    },
    {
      name: "Antonia Murdocca",
      text: "Avevo timore di tatuarmi vista la mia età ed inesperienza. Grazie Francesco per la pazienza e la bravura — è stata un'esperienza molto bella. Mi sono sentita rassicurata e seguita molto bene.",
    },
    {
      name: "Valentina Baudino Bessone",
      text: "Francesco ha una cura del dettaglio e un realismo incredibile! È stato meraviglioso come ha interpretato i miei suggerimenti e li ha trasformati in un design perfetto. In più è stato davvero delicatissimo.",
    },
    {
      name: "Luca Tedeschi",
      text: "Sono più che soddisfatto, il tatuaggio è stupendo e Francesco ti accoglie benissimo. Raccomando a tutti!",
    },
    {
      name: "Laura Pineda Ramon",
      text: "Lo studio è bellissimo, accogliente e curato nei minimi dettagli. Francesco ha la capacità di metterti subito a tuo agio. Non è solo un artista, ma una guida che ti aiuta a esprimere te stesso attraverso il tatuaggio.",
    },
  ],

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  gallery: [
    { src: gallery1, alt: "Tatuaggio Old School realizzato da Gran Babar",     label: "Old School"  },
    { src: gallery2, alt: "Tatuaggio realistico Black & Grey",                  label: "Black & Grey" },
    { src: gallery3, alt: "Tatuaggio geometrico a Torino",                      label: "Geometrico"  },
    { src: gallery4, alt: "Tatuaggio gotico su braccio",                        label: "Gotico"      },
    { src: gallery5, alt: "Tatuaggio tribale personalizzato",                   label: "Tribale"     },
    { src: gallery6, alt: "Tatuaggio fineline personalizzato",                  label: "Fineline"    },
    { src: gallery7, alt: "Interno dello studio Gran Babar Torino",             label: "Lo Studio"   },
  ],

  // ── CONTACT & LOCATION ──────────────────────────────────────────────────────
  contact: {
    /** Each string becomes a line in the address block. */
    addressLines: ["Lungo Dora Napoli 16", "10152 Torino TO"],

    /** Neighborhood/district name — important for local SEO. */
    quarter: ["Borgo Dora"],

    /** ISO 3166-1 alpha-2 country code for schema.org. */
    countryCode: "IT",

    /** Schema.org priceRange indicator. */
    priceRange: "$$",

    /** Lat/lng for schema.org geo property — improves local pack ranking. */
    geo: {
      latitude:  "45.0778",
      longitude: "7.6880",
    },

    phone:     "+39 347 017 4082",
    phoneHref: "tel:+393470174082",

    email: "info@granbabar.it",

    /**
     * Google Maps embed URL.
     * Get it from: maps.google.com → Share → Embed a map → copy the src URL.
     * Replace this placeholder with the actual embed URL for Lungo Dora Napoli 16, Torino.
     */
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.3!2d7.6880!3d45.0778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d6b5b5b5b5b%3A0x0!2zTHVuZ28gRG9yYSBOYXBvbGkgMTYsIFRvcmlubyBUTw!5e0!3m2!1sit!2sit!4v1700000000000",
  },

  // ── OPENING HOURS ───────────────────────────────────────────────────────────
  // Orari non specificati sul sito — aggiornare con quelli reali.
  hours: [
    { days: "Lun – Ven", time: "10:00 – 19:00" },
    { days: "Sabato",    time: "10:00 – 17:00" },
    { days: "Domenica",  time: "Solo su appuntamento" },
  ],

  // ── SOCIAL LINKS ────────────────────────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/gran_babar_tattoo?igsh=MWtuamRheWl6NXUxeA==",
    // facebook:  "https://www.facebook.com/granbabar",
    tiktok:    "https://www.tiktok.com/@gran_babar_studio?_r=1&_t=ZN-953tCgIQjSA",
    // whatsapp is handled via phoneHref — not a social profile link
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
    /** Full legal entity name. */
    legalName:     "Tatuaggi e Piercing – Gran Babar",
    /** Privacy / legal contact email. */
    privacyEmail:  "info@granbabar.it",
    /** Registered postal address. */
    postalAddress: "Lungo Dora Napoli 16 – 10152 – Torino (TO)",
    /** VAT / Partita IVA. */
    vatNumber:     "13057470018",
    /** REA Number — update if registered with the Camera di Commercio. */
    reaNumber:     "[Inserire Numero REA]",
    /** Share Capital — update if applicable. */
    shareCapital:  "[Inserire Capitale Sociale]",
    /** PEC — strongly recommended for Italian businesses. */
    pecEmail:      "[Inserire PEC]",
  },

  // ── THEME ────────────────────────────────────────────────────────────────────
  // All colors are HSL without the hsl() wrapper: "hue saturation% lightness%"
  //
  // ┌─────────────────────────────────────────────────────────────────────┐
  // │  LIGHT THEME — three-color system, no extras                        │
  // │                                                                     │
  // │  ANCHOR          HEX        HSL               ROLE                  │
  // │  Parchment       #DCC9A9    38 42% 76%        page background       │
  // │  Tattoo Red      #B83A2D     6 61% 45%        primary / CTA         │
  // │  Forest Green    #4E6851   127 14% 36%        foreground / text     │
  // │                                                                     │
  // │  ALL other tokens are tonal derivations of these three anchors.     │
  // │  Lighter parchment tones → cards, inputs, muted surfaces.           │
  // │  Darker/lighter green tones → muted text, borders, sidebar.         │
  // │  Red tones → hover states, ring, accent highlights.                 │
  // └─────────────────────────────────────────────────────────────────────┘
  //
  theme: {
    /**
     * Google Fonts stylesheet URL.
     * Barrio: raw, expressive display font — perfect for a tattoo studio.
     * DM Sans: clean, modern body text with quiet personality.
     */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Barrio&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap",

    fonts: {
      heading: "Barrio",  // expressive, hand-drawn character
      body:    "DM Sans", // legible, contemporary
    },

    /** Sharp edges — fitting for the raw aesthetic of tattooing. */
    radius: "2px",

    colors: {
      // ── Base surface — exact parchment anchor #DCC9A9 ───────────────────
      background:              "38 42% 76%",
      // ── Primary text — exact forest green anchor #4E6851 ────────────────
      // Darkened one step (127 18% 26%) for WCAG AA on the parchment bg.
      foreground:              "127 18% 26%",

      // ── Cards & popovers — lighter parchment tone (+8% L) ───────────────
      // Creates gentle elevation above the background without leaving the palette.
      card:                    "38 38% 84%",
      cardForeground:          "127 18% 26%",
      popover:                 "38 38% 84%",
      popoverForeground:       "127 18% 26%",

      // ── Primary / CTA — exact tattoo red anchor #B83A2D ─────────────────
      primary:                 "6 61% 45%",
      // White-ish parchment for text on red buttons — stays in warm family.
      primaryForeground:       "38 60% 95%",

      // ── Secondary — mid parchment tone (−10% L, −8% S) ──────────────────
      // Used for secondary buttons and less prominent surfaces.
      secondary:               "38 28% 66%",
      secondaryForeground:     "127 18% 26%",

      // ── Muted — lightest parchment tone (+12% L) ────────────────────────
      muted:                   "38 32% 88%",
      // Muted text — forest green at reduced saturation & raised lightness.
      mutedForeground:         "127 10% 50%",

      // ── Accent — same red as primary (consistent action color) ───────────
      accent:                  "6 61% 45%",
      accentForeground:        "38 60% 95%",

      // ── Borders & inputs — green-tinted parchment border ─────────────────
      // A desaturated blend of green + parchment for natural harmony.
      border:                  "90 12% 62%",
      // Input fields sit on a slightly lighter parchment than the bg.
      input:                   "38 32% 82%",

      // ── Focus ring — red, matching CTA (accessibility + brand) ───────────
      ring:                    "6 61% 45%",

      // ── Sidebar — slightly deeper parchment to separate it from content ──
      sidebarBackground:         "38 35% 70%",
      sidebarForeground:         "127 18% 26%",
      // Sidebar active item uses the red CTA color.
      sidebarPrimary:            "6 61% 45%",
      sidebarPrimaryForeground:  "38 60% 95%",
      // Sidebar hover — light parchment lift.
      sidebarAccent:             "38 38% 80%",
      sidebarAccentForeground:   "127 18% 26%",
      sidebarBorder:             "90 12% 58%",
      sidebarRing:               "6 61% 45%",
    },
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  cookieConsentKey: "gran-babar-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;