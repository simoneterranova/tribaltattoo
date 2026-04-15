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
// ║  #090805  →  HSL  40 10%  4%  — sfondo (ossidiana calda)    ║
// ║  #B8870B  →  HSL  43 87% 38%  — primario / CTA (oro tribale)║
// ║  #F2E8CE  →  HSL  40 52% 87%  — testo (pergamena antica)    ║
// ║                                                              ║
// ║  FONT STACK                                                  ║
// ║  Heading: Cinzel         — inciso, monolitico, tribale       ║
// ║  Body:    Raleway        — geometrico, leggibile, artigianale║
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
import gallery14 from "@/assets/studio.mp4";
import logo      from "@/assets/original_logo_no_bg.png";     // Fishbone logo (red)

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
    name: "Claudio Ciliberti",
    jobTitle: "Maestro Tatuatore Tribale",
  },

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  meta: {
    /** Full domain without trailing slash. */
    siteUrl: "https://www.tribaltattoo.it",

    /** Link di prenotazione o contatto */
    bookingSiteUrl: "https://www.tribaltattoo.it",

    /** og:locale */
    locale: "it_IT",

    googleSiteVerification: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    googleAnalyticsId:      "G-XXXXXXXXXX",

    title:
      "Tatuaggi Tribali Moncalieri Torino | Arte Sacra Originale dal 1994 | Tribal Tattoo Studio",
    description:
      "Tatuaggi tribali a Moncalieri (Torino) dal 1994. Arte polinesiaca, maori e tribale originale — disegnata a mano libera, sul corpo, con rispetto per l'anatomia e per la tradizione. Consulenza gratuita.",
    ogTitle:
      "Tribal Tattoo – Arte Sacra Tribale a Moncalieri, Torino",
    ogDescription:
      "Dal 1994 portiamo nel corpo magie antiche. Tatuaggi tribali freehand, polinesiani e maori. Prenota la tua consulenza con il maestro.",
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
      { label: "Disegni",    href: "#disegni"      },
      { label: "Contatti",   href: "#contact"      },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Tribal", "Tattoo"],

    // ✦ MODIFICA: interamente in italiano — eliminato l'incipit in inglese
    subheadline:
      "Inchiostro sacro in luoghi sacri. Arte tribale originale dal 1994 — ogni segno disegnato a mano sull'energia del tuo corpo.",

    bookingCta: "Prenota una Consulenza",

    // ✦ MODIFICA: termini tecnici tatuaggio mantenuti (sono terminologia di settore
    //   universalmente usata anche in italiano), resto in italiano
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
    disegni: {
      label: "Disegni",
      heading: "I Nostri Disegni",
    },
    contact: {
      label: "Contatti",
      heading: ["Vieni a", "Trovarci"],
      locationLabel: "Dove Siamo",
      hoursLabel: "Orari di Apertura",
      contactLabel: "Contatti",
      socialLabel: "Seguici",
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
        "Vera arte originale di magie antiche. Motivi polinesiani e maori studiati nel rispetto delle tradizioni culturali e dell'anatomia del cliente.",
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
      name: "Claudio Ciliberti",
      role: "Fondatore & Maestro Tatuatore",
      image: artist1,
      images: [artist1, artist2, artist3],
      bio: "Dal 1994 porta nel corpo dei suoi clienti l'essenza delle culture tribali di tutto il mondo. I suoi viaggi in Polinesia, Nuova Zelanda e nei luoghi sacri dell'Asia gli hanno permesso di costruire un rapporto autentico con l'arte tribale originale — non semplici copie, ma magie antiche reinterpretate sull'energia di ogni individuo.",
      tags: ["Polinesiano", "Maori", "Tribale", "Freehand", "Dot Work", "Black Work"],
      years: "30+",
    },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  // ← Sostituire con recensioni reali da Google / social
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
    { src: gallery1,  alt: "Tatuaggio polinesiano freehand",            label: "Polinesiano"  },
    { src: gallery2,  alt: "Tatuaggio maori su braccio",                label: "Maori"        },
    { src: gallery3,  alt: "Dot work tribale geometrico",               label: "Dot Work"     },
    { src: gallery4,  alt: "Black work tribale su schiena",             label: "Black Work"   },
    { src: gallery5,  alt: "Tatuaggio tribale full sleeve",             label: "Full Sleeve"  },
    { src: gallery6,  alt: "Dettaglio freehand tribale",                label: "Freehand"     },
    { src: gallery7,  alt: "Interno dello studio Tribal Tattoo",        label: "Lo Studio"    },
    { src: gallery8,  alt: "Tatuaggio polinesiano su spalla",           label: "Polinesiano"  },
    { src: gallery9,  alt: "Tatuaggio maori su gamba",                  label: "Maori"        },
    { src: gallery10, alt: "Tatuaggio dot work geometrico su braccio",  label: "Dot Work"     },
    { src: gallery11, alt: "Tatuaggio black work tribale su petto",     label: "Black Work"   },
    { src: gallery12, alt: "Tatuaggio tribale freehand su schiena",     label: "Freehand"     },
    { src: gallery13, alt: "Video dello studio Tribal Tattoo",          label: "Lo Studio"    },
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

    email: "info@tribaltattoo.it",

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
    instagram: "https://www.instagram.com/tribaltattoo",
    facebook:  "https://www.facebook.com/TribaltattooItalia",
    youtube:   "https://www.youtube.com/@tribaltattooitalia",
    // tiktok:    "https://www.tiktok.com/@tribaltattoo",
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    copyrightYear:       "2025",
    // ✦ MODIFICA: tradotto in italiano
    allRightsReserved:   "Tutti i diritti riservati",
    privacyPolicyLabel:  "Privacy Policy",
    cookiePolicyLabel:   "Cookie Policy",
    cookieSettingsLabel: "Impostazioni Cookie",
  },

  // ── LEGAL (Privacy Policy & Cookie Policy) ──────────────────────────────────
  legal: {
    legalName:     "Tribal Tattoo Studio",
    privacyEmail:  "info@tribaltattoo.it",
    postalAddress: "Corso Roma, 51 – 10024 – Moncalieri (TO)",
    vatNumber:     "[Inserire Partita IVA]",
    reaNumber:     "[Inserire Numero REA]",
    shareCapital:  "[Inserire Capitale Sociale]",
    pecEmail:      "[Inserire PEC]",
  },


  // ── THEME ────────────────────────────────────────────────────────────────────
  //
  // ┌──────────────────────────────────────────────────────────────────────────┐
  // │  TEMA SCURO — "Ossidiana & Oro Tribale"  (palette completa)              │
  // │                                                                          │
  // │  ANCHOR             HEX        HSL               RUOLO                  │
  // │  Ossidiana Calda    #090805    40 10%  4%        sfondo pagina           │
  // │  Oro Tribale        #B8870B    43 87% 38%        primario / CTA          │
  // │  Pergamena          #F2E8CE    40 52% 87%        testo principale        │
  // │  Superficie Calda   #130D02    40 70%  5%        card                    │
  // │  ─────────────────────────────────────────────────────────────────────  │
  // │  Terracotta Sacra   #7E2C14    12 68% 30%        destructive / errori    │
  // │  Rame Antico        #9E4A0E    22 75% 35%        accent (≠ primary)      │
  // │  Mana Verde         #1A3D28   145 30% 16%        secondary surfaces      │
  // │  Oceano Profondo    #0E2438   210 55% 14%        popover / dropdown      │
  // │  Osso Intagliato    #B8A98C    38 22% 68%        muted foreground        │
  // │  Inchiostro Nero    #0D0B08    40  8%  5%        input / border forte    │
  // │  ─────────────────────────────────────────────────────────────────────  │
  // │  FONT TRIBALE                                                            │
  // │  Cinzel  — inciso come la pietra, monolitico, ancestrale (heading)       │
  // │  Raleway — geometrico e artigianale, ottima leggibilità (body)           │
  // └──────────────────────────────────────────────────────────────────────────┘
  //
  theme: {
    /**
     * Font: Cinzel + Raleway
     *   Cinzel — iscrizioni romane su pietra, pesante, ancestrale, rituale.
     *   Raleway — geometrico, artigianale, leggibile. Contrasto perfetto con Cinzel.
     *   Pesi: Cinzel 400/700/900 · Raleway 300/400/500/700
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
      // Più caldo del nero neutro (60 6% 4%) — ossidiana con sottotono terra
      background:              "40 10% 4%",

      // ── Testo principale — Pergamena #F2E8CE ─────────────────────────────
      foreground:              "40 52% 87%",

      // ── Card — Superficie Calda #130D02 ──────────────────────────────────
      card:                    "40 70% 5%",
      cardForeground:          "40 52% 87%",

      // ── Popover / Dropdown — Oceano Profondo #0E2438 ─────────────────────
      // Unico tono freddo della palette: distingue visivamente i popover
      // dalle card senza rompere l'atmosfera scura. Evoca il Pacifico,
      // le origini dei maestri navigatori polinesiani.
      popover:                 "210 55% 14%",
      popoverForeground:       "40 52% 87%",

      // ── Primario / CTA — Oro Tribale #B8870B ─────────────────────────────
      // Oro saturo e profondo (87% sat, 38% light) — ambra antica,
      // non "dorato moderno". Usato solo per CTA e azioni principali.
      primary:                 "43 87% 38%",
      primaryForeground:       "40 80% 8%",

      // ── Secondario — Mana Verde #1A3D28 ──────────────────────────────────
      // Nelle culture polinesiane il verde è sacro quanto il mare.
      // Pannelli secondari, tooltip, sezioni alternate — profondità
      // cromatica senza competere con l'oro.
      secondary:               "145 30% 16%",
      secondaryForeground:     "40 52% 87%",

      // ── Muted surface ─────────────────────────────────────────────────────
      muted:                   "40 18% 10%",
      // Osso Intagliato #B8A98C — più leggibile del 40 20% 48% precedente.
      // Ispirato ai materiali tribali tradizionali (denti di squalo, osso).
      mutedForeground:         "38 22% 68%",

      // ── Accent — Rame Antico #9E4A0E ─────────────────────────────────────
      // Separato dal primary per la prima volta: gioielleria, metallo antico.
      // Tag "Specialità", badge decorativi, icone hover, highlights secondari.
      accent:                  "22 75% 35%",
      accentForeground:        "40 52% 87%",

      // ── Destructive — Terracotta Sacra #7E2C14 ───────────────────────────
      // Pigmenti tribali originali: ocra rossa, argilla. Molto più identitario
      // di un rosso generico. Usato per errori, avvertimenti, azioni distruttive.
      destructive:             "12 68% 30%",
      destructiveForeground:   "40 52% 87%",

      // ── Bordi standard — tono caldo ───────────────────────────────────────
      border:                  "40 22% 14%",

      // ── Input border — Inchiostro Nero #0D0B08 ───────────────────────────
      // Leggermente più caldo e profondo del border standard.
      // I form sembrano scritti a inchiostro vero, non stampati.
      input:                   "40 8% 5%",

      // ── Focus ring — Terracotta Sacra ─────────────────────────────────────
      // Stesso tono del destructive — coerenza e contrasto visivo forte
      // rispetto all'oro che domina il resto della UI.
      ring:                    "12 68% 30%",

      // ── Effetti & overlay ─────────────────────────────────────────────────
      gridPattern:             "40 22% 14%",
      primaryGlow:             "43 87% 38%",
      shadowLight:             "0 0% 0%",
      shadowDark:              "0 0% 0%",

      // ── Sidebar ───────────────────────────────────────────────────────────
      sidebarBackground:         "210 55% 14%",   // Oceano Profondo — distinto dalla pagina
      sidebarForeground:         "40 52% 87%",
      sidebarPrimary:            "43 87% 38%",
      sidebarPrimaryForeground:  "40 80% 8%",
      sidebarAccent:             "145 30% 16%",   // Mana Verde — hover item sidebar
      sidebarAccentForeground:   "40 52% 87%",
      sidebarBorder:             "210 30% 20%",   // bordo più chiaro dell'oceano
      sidebarRing:               "43 87% 38%",
    },
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  cookieConsentKey: "tribal-tattoo-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;