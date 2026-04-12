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
// ║  PALETTE (DARK THEME — "Premium Modern Primitivism")         ║
// ║  #0D0D0B  →  HSL  60  6%  5%  — background (obsidian black) ║
// ║  #C0392B  →  HSL   5 61% 46%  — primary / CTA (crimson red) ║
// ║  #E8DCC8  →  HSL  38 42% 85%  — foreground / text (bone)    ║
// ╚══════════════════════════════════════════════════════════════╝

// ── IMAGE ASSETS ──────────────────────────────────────────────────────────────
// Replace these files in src/assets/ with Tribal Tattoo's own photos/videos.
import heroBg    from "@/assets/hero-bg.jpg";
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
import gallery14  from "@/assets/studio.mp4";
import logo      from "@/assets/logo_coloured__no_bg.svg";     // Fishbone logo (red)

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

    googleSiteVerification: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    googleAnalyticsId:      "G-XXXXXXXXXX",

    title:
      "Tatuaggi Tribali Moncalieri Torino | Arte Sacra Originale | Tribal Tattoo Studio",
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
      { label: "Il Maestro", href: "#team"         },
      { label: "Recensioni", href: "#testimonials" },
      { label: "Gallery",    href: "#gallery"      },
      { label: "Contatti",   href: "#contact"      },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Tribal", "Tattoo"],

    subheadline:
      "Sacred Ink in Sacred Places. Arte tribale originale dal 1994 — ogni segno disegnato a mano sull'energia del tuo corpo.",

    bookingCta: "Prenota una Consulenza",

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
      heading: ["I Nostri", "Rituali"],
      counterLabel: ["Anni di", "Esperienza"],
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
  services: [
    {
      id: "consultation",
      index: "01",
      name: "Consulenza",
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
      price: "Inclusa",
      duration: "inclusa",
      durationMinutes: 30,
      description:
        "Istruzioni dettagliate e assistenza continua per la guarigione del tuo tatuaggio. Il rito non finisce con l'ago.",
      badge: "Inclusa" as string | null,
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
      name: "Cliente",
      text: "Un'esperienza che va oltre il tatuaggio. Si sente che dietro ogni segno c'è una storia vera, un rispetto profondo per la tradizione. Unico.",
    },
    {
      name: "Cliente",
      text: "Ho scelto questo studio proprio per il modo in cui il maestro disegna direttamente sul corpo. Non è un semplice tatuaggio, è un rito.",
    },
    {
      name: "Cliente",
      text: "Professionalità e cultura tribale autentica. Ho finalmente un tatuaggio polinesiano che rispetta la vera tradizione e il mio corpo.",
    },
  ],

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  gallery: [
    { src: gallery1, alt: "Tatuaggio polinesiano freehand",         label: "Polinesiano"  },
    { src: gallery2, alt: "Tatuaggio maori su braccio",             label: "Maori"        },
    { src: gallery3, alt: "Dot work tribale geometrico",            label: "Dot Work"     },
    { src: gallery4, alt: "Black work tribale su schiena",          label: "Black Work"   },
    { src: gallery5, alt: "Tatuaggio tribale full sleeve",          label: "Full Sleeve"  },
    { src: gallery6, alt: "Dettaglio freehand tribale",             label: "Freehand"     },
    { src: gallery7, alt: "Interno dello studio Tribal Tattoo",     label: "Lo Studio"    },
    { src: gallery8, alt: "Tatuaggio polinesiano su spalla",          label: "Polinesiano"  },
    { src: gallery9, alt: "Tatuaggio maori su gamba",                label: "Maori"        },
    { src: gallery10, alt: "Tatuaggio dot work geometrico su braccio", label: "Dot Work"     },
    { src: gallery11, alt: "Tatuaggio black work tribale su petto",  label: "Black Work"   },
    { src: gallery12, alt: "Tatuaggio tribale freehand su schiena", label: "Freehand"     },
    { src: gallery13, alt: "Video dello studio Tribal Tattoo",       label: "Lo Studio"    },
  ],

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

    email: "info@tribaltattoo.it",   // ← update with real email

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
    // tiktok:    "https://www.tiktok.com/@tribaltattoo",
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
    privacyEmail:  "info@tribaltattoo.it",          // ← update
    postalAddress: "Corso Roma, 51 – 10024 – Moncalieri (TO)",
    vatNumber:     "[Inserire Partita IVA]",
    reaNumber:     "[Inserire Numero REA]",
    shareCapital:  "[Inserire Capitale Sociale]",
    pecEmail:      "[Inserire PEC]",
  },

  // ── THEME ────────────────────────────────────────────────────────────────────
  //
  // ┌──────────────────────────────────────────────────────────────────────┐
  // │  DARK THEME — "Premium Modern Primitivism & Sacred Ritual"           │
  // │                                                                      │
  // │  ANCHOR        HEX        HSL               ROLE                    │
  // │  Obsidian      #0D0D0B    60  6%  5%        page background         │
  // │  Crimson Red   #C0392B     5 61% 46%        primary / CTA           │
  // │  Bone White    #E8DCC8    38 42% 85%        foreground / text       │
  // │  Charcoal      #1C1C1A    60  4% 11%        cards & surfaces        │
  // └──────────────────────────────────────────────────────────────────────┘
  //
  theme: {
    /**
     * Google Fonts — rugged display heading + clean modern body.
     * Oswald gives a blocky, carved feel; Inter keeps body readable.
     */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap",

    fonts: {
      heading: "Oswald",
      body:    "Inter",
    },

    /** Sharp corners — raw, uncompromising aesthetic */
    radius: "0px",

    colors: {
      // ── Base surface — Obsidian Black #0D0D0B ────────────────────────────
      background:              "60 6% 5%",
      // ── Primary text — Bone White #E8DCC8 ────────────────────────────────
      foreground:              "38 42% 85%",

      // ── Cards & popovers — Charcoal #1C1C1A ──────────────────────────────
      card:                    "60 4% 11%",
      cardForeground:          "38 42% 85%",
      popover:                 "60 4% 8%",
      popoverForeground:       "38 42% 85%",

      // ── Primary / CTA — Crimson Red #C0392B ──────────────────────────────
      primary:                 "5 61% 46%",
      primaryForeground:       "38 42% 95%",

      // ── Secondary — Dark earthy brown (woodgrain) ─────────────────────────
      secondary:               "25 20% 20%",
      secondaryForeground:     "38 42% 85%",

      // ── Muted — Dark muted surface ────────────────────────────────────────
      muted:                   "60 4% 14%",
      mutedForeground:         "38 20% 50%",

      // ── Accent — Crimson Red highlights ──────────────────────────────────
      accent:                  "5 61% 46%",
      accentForeground:        "38 42% 95%",

      // ── Borders & inputs — Subtle warm tint ───────────────────────────────
      border:                  "38 10% 18%",
      input:                   "60 4% 15%",

      // ── Focus ring — Crimson ─────────────────────────────────────────────
      ring:                    "5 61% 46%",

      // ── Sidebar ───────────────────────────────────────────────────────────
      sidebarBackground:         "60 4% 8%",
      sidebarForeground:         "38 42% 85%",
      sidebarPrimary:            "5 61% 46%",
      sidebarPrimaryForeground:  "38 42% 95%",
      sidebarAccent:             "60 4% 14%",
      sidebarAccentForeground:   "38 42% 85%",
      sidebarBorder:             "38 10% 18%",
      sidebarRing:               "5 61% 46%",
    },
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  cookieConsentKey: "tribal-tattoo-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;