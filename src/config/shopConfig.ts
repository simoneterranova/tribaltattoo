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

  /** Primary author/artist for blog posts and content authorship. */
  author: {
    name: "Francesco Sansone",
    jobTitle: "Tatuatore Professionista",
  },

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  meta: {
    /** Full domain without trailing slash. */
    siteUrl: "https://www.granbabar.it",

    /** Link di prenotazione o contatto */
    bookingSiteUrl: "https://www.granbabar.it",

    /** og:locale */
    locale: "it_IT",

    /**
     * Google Search Console verification code.
     * Get it from: https://search.google.com/search-console
     * Add property → URL prefix → Copy the content="..." value from the meta tag.
     * Leave empty or remove this field if not using Google Search Console.
     */
    googleSiteVerification: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    
    /**
     * Google Analytics 4 Measurement ID.
     * Get it from: https://analytics.google.com → Admin → Data Streams
     * Format: "G-XXXXXXXXXX"
     * Leave empty or set to placeholder if not using GA4.
     */
    googleAnalyticsId: "G-XXXXXXXXXX",
    
    title: "Tatuaggi Torino | Tatuatore Professionista | Gran Babar Studio",
    description:
      "Tatuaggi a Torino dal 2020. Francesco, tatuatore esperto in Old School, realistici, geometrici e cover-up. Studio professionale in Borgo Dora. Consulenza gratuita.",
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
      { label: "Francesco",  href: "#team"         },
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
      label: "Francesco",
      heading: ["Chi è", "Francesco"],
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
    id: "consultation",
    index: "01",
    name: "Consulenza",
    price: 0,
    duration: "30 min",
    durationMinutes: 30,
    description:
      "Un primo confronto per definire l'idea, valutare la fattibilità e costruire insieme il progetto ideale per il tuo tatuaggio.",
    badge: "Iniziale" as string | null,
    },
    {
      id: "custom-tattoo",
      index: "02",
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
      index: "03",
      name: "Cover-up & Correzioni",
      price: 180,
      duration: "da 1 ora",
      durationMinutes: 60,
      description:
        "Diamo nuova vita a vecchi tatuaggi. Studio approfondito del progetto per una copertura impeccabile che rispetta la tua pelle.",
      badge: "Specialità" as string | null,
    },
    {
      id: "aftercare",
      index: "04",
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
      name: "FRANCESCO",
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
      text: "L'esperienza è stata fantastica fin dal primo momento: l'ambiente è pulito, accogliente e professionale. Francesco è stato molto attento a capire le mie esigenze e ha creato un design personalizzato che mi ha stupita!",
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
      name: "Valentina Bessone",
      text: "Francesco ha una cura del dettaglio e un realismo incredibile! È stato meraviglioso come ha interpretato i miei suggerimenti e li ha trasformati in un design perfetto. In più è stato davvero delicatissimo.",
    },
    {
      name: "Luca Tedeschi",
      text: "Sono più che soddisfatto, il tatuaggio è stupendo e Francesco ti accoglie benissimo. Raccomando a tutti!",
    },
    {
      name: "Laura Ramon",
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
    privacyEmail:  "granbabarstudio@gmail.com",
    /** Registered postal address. */
    postalAddress: "Lungo Dora Napoli 16 – 10152 – Torino (TO)",
    /** VAT / Partita IVA. */
    vatNumber:     "13057470018",
    /** REA Number — update if registered with the Camera di Commercio. */
    reaNumber:     "[Inserire Numero REA]",
    /** Share Capital — update if applicable. */
    shareCapital:  "[Inserire Capitale Sociale]",
    /** PEC — strongly recommended for Italian businesses. */
    pecEmail:      "francesco.sansone@pec.fiscozen.it",
  },

  // ── THEME ────────────────────────────────────────────────────────────────────
  // All colors are HSL without the hsl() wrapper: "hue saturation% lightness%"
  //
  // ┌─────────────────────────────────────────────────────────────────────┐
  // │  CYBERPUNK DARK THEME — vintage dystopian aesthetic                 │
  // │                                                                     │
  // │  ANCHOR          HEX        HSL               ROLE                  │
  // │  Deep Charcoal   #1A1A18    30 4% 10%         page background       │
  // │  Brick Red       #B83A2D     6 61% 45%        primary / CTA         │
  // │  Forest Green    #4E6851   127 14% 36%        accents              │
  // │  Parchment       #DCC9A9    38 42% 76%        foreground / text     │
  // │                                                                     │
  // │  Dark dystopian base with warm parchment text, brick red CTAs,      │
  // │  and forest green accents. Cyberpunk razors, glitch effects, and    │
  // │  angular UI elements throughout.                                     │
  // └─────────────────────────────────────────────────────────────────────┘
  //
  theme: {
    /**
     * Google Fonts stylesheet URL.
     * Cyberpunk fonts will be loaded from local cyberpunk.css
     * These Google fonts are fallbacks for body text
     */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap",
 
    fonts: {
      heading: "Orbitron",        // Tech-inspired bold display font
      body:    "Share Tech Mono", // Monospace cyberpunk body font
    },

    /** Angular cyberpunk aesthetic — sharp corners */
    radius: "0px",

    colors: {
      // ── Base surface — Deep Charcoal #1A1A18 ─────────────────────────────
      background:              "30 4% 10%",
      // ── Primary text — Warm Parchment #DCC9A9 ────────────────────────────
      foreground:              "38 42% 76%",

      // ── Cards & popovers — Slightly lighter charcoal ─────────────────────
      card:                    "30 4% 14%",
      cardForeground:          "38 42% 76%",
      popover:                 "30 4% 12%",
      popoverForeground:       "38 42% 76%",

      // ── Primary / CTA — Brick Red #B83A2D ────────────────────────────────
      primary:                 "6 61% 45%",
      primaryForeground:       "38 42% 90%",

      // ── Secondary — Forest Green #4E6851 ─────────────────────────────────
      secondary:               "127 14% 36%",
      secondaryForeground:     "38 42% 85%",

      // ── Muted — Dark muted surface ───────────────────────────────────────
      muted:                   "30 4% 16%",
      mutedForeground:         "38 20% 55%",

      // ── Accent — Forest Green for vintage dystopian highlights ──────────
      accent:                  "127 14% 36%",   // Forest Green #4E6851
      accentForeground:        "38 42% 76%",

      // ── Borders & inputs — Subtle forest green tint ──────────────────────
      border:                  "127 14% 25%",
      input:                   "30 4% 18%",

      // ── Focus ring — Forest Green for vintage aesthetic ──────────────────
      ring:                    "127 14% 36%",

      // ── Sidebar — Dark elevated surface ──────────────────────────────────
      sidebarBackground:         "30 4% 12%",
      sidebarForeground:         "38 42% 76%",
      sidebarPrimary:            "6 61% 45%",
      sidebarPrimaryForeground:  "38 42% 90%",
      sidebarAccent:             "30 4% 18%",
      sidebarAccentForeground:   "38 42% 76%",
      sidebarBorder:             "127 14% 25%",
      sidebarRing:               "127 14% 36%",
    },
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  cookieConsentKey: "gran-babar-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;