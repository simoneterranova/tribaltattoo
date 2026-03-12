// ╔══════════════════════════════════════════════════════════════╗
// ║              SHOP CONFIGURATION — ONE FILE TO RULE THEM ALL  ║
// ║                                                              ║
// ║  To deploy this template for a new barbershop:               ║
// ║  1. Fill in this file (all sections below)                   ║
// ║  2. Replace images in src/assets/ and update the imports     ║
// ║  3. Update colors & fonts in src/index.css                   ║
// ║  4. Update font names in tailwind.config.ts                  ║
// ║  5. Update domain in public/sitemap.xml and robots.txt       ║
// ║  That's it — nothing else should need touching.              ║
// ║                                                              ║
// ║  SEO IMPLEMENTATION:                                         ║
// ║  All SEO metadata is generated dynamically from this config: ║
// ║  • Dynamic <head> meta tags (title, description, OG, etc.)   ║
// ║  • JSON-LD schemas (LocalBusiness, Services, Team, etc.)     ║
// ║  • Semantic HTML with location keywords in headings          ║
// ║  • Performance hints (preload, preconnect)                   ║
// ║  • Sitemap and robots.txt (update domains manually)          ║
// ║                                                              ║
// ║  SEO-Critical Fields (used by src/lib/seo.ts):               ║
// ║  • name, fullName, city, established                         ║
// ║  • meta.siteUrl (canonical URLs, sitemap, OG tags)           ║
// ║  • meta.locale (og:locale)                                   ║
// ║  • meta.* (all other meta fields for OG/Twitter cards)       ║
// ║  • contact.countryCode (schema.org addressCountry)           ║
// ║  • contact.priceRange (schema.org priceRange)                ║
// ║  • contact.geo (optional lat/lng for local ranking)          ║
// ║  • contact.* (address, phone, email, quarter)                ║
// ║  • services[] (service schemas and descriptions)             ║
// ║  • team[] (person schemas)                                   ║
// ║  • hours[] (opening hours specification)                     ║
// ║  • social.* (sameAs links)                                   ║
// ║  • hero.backgroundImage (preload hint)                       ║
// ║  • theme.googleFontsUrl, theme.colors.primary                ║
// ║  • nav.links (breadcrumb schema)                             ║
// ║  • gallery[] (structured image alt text)                     ║
// ╚══════════════════════════════════════════════════════════════╝

// ── IMAGE ASSETS ──────────────────────────────────────────────────────────────
// Replace these files in src/assets/ with the client's own photos.
// Filename conventions are suggestions only — update imports if you rename them.
import heroBg from "@/assets/hero-bg.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

// ── IDENTITY ──────────────────────────────────────────────────────────────────
const shopConfig = {
  /** Short brand name used in the navbar logo, loading screen, and auth page. */
  name: "GENTRY",

  /** Full brand name used in the footer bottom bar. */
  fullName: "THE GENTRY",

  /** City / location shown in hero tagline and section subtitles. */
  city: "Torino, TO",

  /** Year the shop was founded — shown in the hero tagline. */
  established: "2018",

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  // These values are used by SeoHead component to generate all meta tags dynamically.
  // No need to edit index.html — everything is generated from this config.
  meta: {
    /** Full domain without trailing slash. Used for canonical URLs, sitemap, and OG tags. */
    siteUrl: "https://www.iltuodominio.it",
    
    /** Two-letter language code + country for og:locale (e.g. "en_US", "it_IT"). */
    locale: "it_IT",
    
    title: "Barbiere Torino | Il Tuo Nome | Taglio Capelli Uomo e Barba",
    description:
      "Barbiere a Torino dal 2018. Taglio capelli uomo, rifinitura barba, rasatura classica con rasoio. Prenota online il tuo appuntamento.",
    ogTitle: "The Gentry – Barbiere a Torino",
    ogDescription: "Il tuo barbiere di fiducia a Torino. Taglio, barba e rasatura per l'uomo moderno. Prenota ora.",
    /** Absolute path from the public/ folder or a full URL. */
    ogImage: "/og-image.jpg",
  },

  // ── NAVIGATION LABELS ───────────────────────────────────────────────────────
  // Change label text here; section IDs (href) must match the id="" in each section.
  nav: {
    /** Text on the booking CTA button in the navbar (desktop & mobile). */
    bookingCta: "Prenota Ora",
    links: [
      { label: "Servizi", href: "#services" },
      { label: "Il Team", href: "#team" },
      { label: "Recensioni", href: "#testimonials" },
      { label: "Lavori", href: "#gallery" },
      { label: "Contatti", href: "#contact" },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    /** Background image — replace with client's hero photo. */
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Barbiere", "Torino"],

    /** Short descriptor line under the headline. */
    subheadline:
      "Dove la cura artigianale incontra lo stile moderno. Il barbiere di Torino per l'uomo che non scende a compromessi.",

    /** Text on the booking CTA button inside the hero section. */
    bookingCta: "Prenota il tuo posto",

    /** Items that scroll in the marquee strip at the bottom of the hero. */
    marqueeItems: [
      "Taglio Capelli",
      "Sfumatura",
      "Rifinitura Barba",
      "Rasatura Classica",
      "Styling",
    ],
  },

  // ── SECTION HEADINGS ────────────────────────────────────────────────────────
  // Labels (small uppercase eyebrow text) and headings for each page section.
  // heading arrays: first string is line 1, second is line 2.
  sections: {
    services: {
      /** Eyebrow label above the heading. */
      label: "Servizi",
      /** [ line 1, line 2 ] of the giant heading. */
      heading: ["What We", "Offer"],
      /** Two-line counter annotation shown to the right of the heading. */
      counterLabel: ["Signature", "Services"],
      /** Small disclaimer line shown below the services list. */
      footnote: "All services include consultation · Prices may vary based on length & complexity",
    },
    team: {
      label: "Il Team",
      heading: ["Meet The", "Team"],
      counterLabel: ["Master", "Barbers"],
    },
    testimonials: {
      label: "Recensioni",
      heading: "Words",
    },
    gallery: {
      label: "Lavori",
      heading: "Gallery",
    },
    contact: {
      label: "Contatti",
      /** [ line 1, line 2 ] of the giant CTA heading in the footer. */
      heading: ["Let's", "Work"],
      /** Sub-column headers inside the contact info grid. */
      locationLabel: "Location",
      hoursLabel: "Orari di apertura",
      contactLabel: "Contatti",
      socialLabel: "Social Networks",
    },
  },

  // ── SERVICES ────────────────────────────────────────────────────────────────
  // This is the single source of truth for services — used in the Services
  // section UI AND in the booking dialog / dashboard.
  // `id` values must be unique slugs; they are stored in the database.
  // `durationMinutes` must be a multiple of SLOT_DURATION (30 min default).
  services:[
      {
        id: "haircut",
        index: "01",
        name: "Taglio Sartoriale",
        price: 45,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "Inizia con una consulenza. Lavaggio, taglio di precisione e styling studiato per durare tutta la settimana.",
        badge: "Più richiesto" as string | null,
      },
      {
        id: "beard",
        index: "02",
        name: "Regolazione & Sagomatura Barba",
        price: 30,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "Scolpiamo la tua barba per definire la mascella. Linee pulite, sfumature perfette, modellate su di te.",
        badge: null as string | null,
      },
      {
        id: "shave",
        index: "03",
        name: "Rasatura Panno Caldo",
        price: 40,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "La vera arte della rasatura. Rasoio a mano libera, panno caldo, schiuma montata a pennello e balsamo finale.",
        badge: "Classico" as string | null,
      },
      {
        id: "combo",
        index: "04",
        name: "Combo Taglio + Barba",
        price: 65,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "Il nostro taglio sartoriale abbinato alla cura completa della barba. Il pacchetto imbattibile.",
        badge: "Miglior Valore" as string | null,
      },
      {
        id: "deluxe",
        index: "05",
        name: "Il Deluxe",
        price: 95,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "Taglio, rasatura tradizionale, trattamento viso e massaggio alla cute. Ne uscirai trasformato.",
        badge: "Premium" as string | null,
      },
      {
        id: "kids",
        index: "06",
        name: "Taglio Bambino",
        price: 25,
        duration: "30 min",
        durationMinutes: 30,
        description:
          "Pazienza e precisione per la prossima generazione di gentiluomini. Solo under 12.",
        badge: null as string | null,
      },
    ],

  // ── TEAM ────────────────────────────────────────────────────────────────────
  // Add or remove team members freely — the TeamSection renders any length array.
  team:[
      {
        index: "01",
        name: "Marco Cole",
        role: "Specialista Sfumature",
        image: barber1,
        bio: "La precisione è tutto. Marco trasforma un semplice taglio in uno stile inconfondibile.",
        tags: ["Skin Fades", "Lineamenti", "Tapers", "Forbici"],
        years: "8",
      },
      {
        index: "02",
        name: "Giacomo Rivera",
        role: "Esperto Barba & Rasatura",
        image: barber2,
        bio: "Maestria artigianale e tocco moderno. Il suo lavoro con il rasoio a mano libera non ha eguali.",
        tags:["Panno Caldo", "Sagomatura Barba", "Mano Libera", "Grooming"],
        years: "6",
      },
      {
        index: "03",
        name: "Dmitri Volkov",
        role: "Creative Stylist",
        image: barber3,
        bio: "Dove la barberia incontra l'arte. Dmitri spinge ogni taglio al suo limite creativo.",
        tags:["Tagli Testurizzati", "Design", "Colore", "Styling Moderno"],
        years: "10",
      },
    ],

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  testimonials:[
      {
        name: "Michele T.",
        text: "Il miglior barbiere a Torino, senza dubbio. Marco azzecca sempre la sfumatura e l'atmosfera è fantastica.",
      },
      {
        name: "Davide L.",
        text: "L'esperienza Deluxe vale ogni centesimo. Sono uscito sentendomi un uomo nuovo. Ho già prenotato la prossima visita.",
      },
      {
        name: "Cristian P.",
        text: "Salone pulitissimo, barbieri esperti che ascoltano davvero quello che vuoi. Vengo qui da due anni.",
      },
      {
        name: "Lorenzo R.",
        text: "Sono entrato per caso e sono uscito con il miglior taglio della mia vita. L'attenzione ai dettagli è maniacale.",
      },
      {
        name: "Antonio W.",
        text: "Solo l'esperienza della rasatura con panno caldo vale il viaggio. È un rito, non solo un taglio.",
      },
      {
        name: "Matteo S.",
        text: "Ho prenotato online in meno di un minuto, zero attesa, e il risultato è stato perfetto. 5 stelle.",
      },
    ],

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  // Replace gallery-N.jpg files in src/assets/ — or add more imports above
  // and extend this array. Labels appear as captions on hover.
  gallery:[
      { src: gallery1, alt: "Interno del salone da barbiere", label: "Salone" },
      { src: gallery2, alt: "Taglio di capelli sfumato", label: "Sfumature" },
      { src: gallery3, alt: "Attrezzi da barbiere", label: "Strumenti" },
      { src: gallery4, alt: "Rasatura con panno caldo", label: "Rasatura" },
      { src: gallery5, alt: "Cura e regolazione barba", label: "Barba" },
      { src: gallery6, alt: "Esterno del salone a Torino", label: "Esterno" },
    ],

  // ── CONTACT & LOCATION ──────────────────────────────────────────────────────
  contact: {
    /** Each string becomes a line in the address block. */
    addressLines: ["Via Roma 10", "10121 Torino TO"],

    /** Neighborhood/district name for schema.org addressLocality — important for local SEO. */
    quarter:["Centro"],

    /** ISO 3166-1 alpha-2 country code for schema.org (e.g. "US", "IT", "GB", "CA"). */
    countryCode: "IT",

    /** Schema.org priceRange indicator. Use "$" (budget), "$$" (moderate), "$$$" (expensive), or "$$$$" (luxury). */
    priceRange: "$$",

    /** Optional: Lat/lng coordinates for schema.org geo property — improves local pack ranking. */
    geo: {
      latitude: "45.0703",
      longitude: "7.6869",
    },

    /** Displayed phone number string. */
    phone: "+39 011 123 4567",

    /** href value for the phone anchor (e.g. "tel:+15551234567"). */
    phoneHref: "tel:+390111234567",

    email: "hello@thegentry.com",

    /**
     * Google Maps embed URL.
     * Get it from: maps.google.com → Share → Embed a map → copy the src URL.
     */
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.274280690498!2d-73.99!3d40.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzI0LjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1700000000000",
  },

  // ── OPENING HOURS ───────────────────────────────────────────────────────────
  hours: [
    { days: "Lun – Ven", time: "9:00 – 20:00" },
    { days: "Sabato", time: "9:00 – 18:00" },
    { days: "Domenica", time: "Chiuso" },
  ],

  // ── SOCIAL LINKS ────────────────────────────────────────────────────────────
  // Remove a key entirely to hide that social link from the footer.
  social: {
    instagram: "https://www.instagram.com/thegentry",
    facebook: "https://www.facebook.com/thegentry",
    // twitter: "https://twitter.com/thegentry",
    // tiktok: "https://tiktok.com/@thegentry",
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    copyrightYear: "2025",
    /** Suffix shown after © year in the bottom bar. */
    allRightsReserved: "All rights reserved",
    /** Labels for the policy links in the bottom bar. */
    privacyPolicyLabel: "Privacy Policy",
    cookiePolicyLabel: "Cookie Policy",
    cookieSettingsLabel: "Cookie Settings",
  },

  // ── LEGAL (Privacy Policy & Cookie Policy) ──────────────────────────────────
  legal: {
    /** Full legal entity name shown in Privacy Policy contact section. */
    legalName: "The Gentry S.r.l.",
    /** Privacy / legal contact email. */
    privacyEmail: "privacy@thegentry.it",
    /** Registered postal address. */
    postalAddress: "[Insert Address]",
    /** VAT / tax identification number. */
    vatNumber: "[Insert P.IVA Number]",
    /** REA Number (Numero REA) - Mandatory if registered with Chamber of Commerce. */
    reaNumber: "RM-123456",
    /** Share Capital (Capitale Sociale) - Mandatory for Corporations (S.r.l., S.p.A.). */
    shareCapital: "€ 10.000,00",
    /** Certified email (PEC) - Strongly recommended/mandatory to display for Italian Companies. */
    pecEmail: "thegentry@pec.it",
  },

  // ── THEME ────────────────────────────────────────────────────────────────────
  // All colors are HSL without the hsl() wrapper: "hue saturation% lightness%"
  // Change any value here — index.css and tailwind.config.ts never need touching.
  theme: {
    /**
     * Google Fonts stylesheet URL.
     * Build it at: fonts.google.com → select families → copy the @import URL.
     * Replace both font families here when switching typefaces.
     */
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",

    fonts: {
      /** Must match the family name in googleFontsUrl */
      heading: "Bebas Neue",
      /** Must match the family name in googleFontsUrl */
      body: "Space Grotesk",
    },

    /** 0px = sharp corners. Try "4px" or "8px" for a rounder look. */
    radius: "0px",

    colors: {
      background:             "0 0% 4%",
      foreground:             "40 10% 92%",
      card:                   "0 0% 7%",
      cardForeground:         "40 10% 92%",
      popover:                "0 0% 7%",
      popoverForeground:      "40 10% 92%",
      /** ← Primary brand accent (gold by default). Change for a different accent. */
      primary:                "36 55% 52%",
      primaryForeground:      "0 0% 4%",
      secondary:              "0 0% 10%",
      secondaryForeground:    "40 10% 75%",
      muted:                  "0 0% 12%",
      mutedForeground:        "0 0% 45%",
      accent:                 "36 55% 52%",   // keep in sync with primary
      accentForeground:       "0 0% 4%",
      border:                 "0 0% 14%",
      input:                  "0 0% 14%",
      ring:                   "36 55% 52%",   // keep in sync with primary
      sidebarBackground:      "0 0% 4%",
      sidebarForeground:      "40 10% 92%",
      sidebarPrimary:         "36 55% 52%",
      sidebarPrimaryForeground: "0 0% 4%",
      sidebarAccent:          "0 0% 10%",
      sidebarAccentForeground:"40 10% 92%",
      sidebarBorder:          "0 0% 14%",
      sidebarRing:            "36 55% 52%",
    },
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  // Change this key when deploying a new brand so consent preferences don't
  // carry over between different barbershop deployments on the same domain.
  cookieConsentKey: "the-gentry-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;
