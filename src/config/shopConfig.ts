// ╔══════════════════════════════════════════════════════════════╗
// ║              SHOP CONFIGURATION — ONE FILE TO RULE THEM ALL  ║
// ║                                                              ║
// ║  To deploy this template for a new barbershop:               ║
// ║  1. Fill in this file (all sections below)                   ║
// ║  2. Replace images in src/assets/ and update the imports     ║
// ║  3. Update colors & fonts in src/index.css                   ║
// ║  4. Update font names in tailwind.config.ts                  ║
// ║  5. Update the <title> and OG meta in index.html             ║
// ║  That's it — nothing else should need touching.              ║
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
  city: "Brooklyn, NY",

  /** Year the shop was founded — shown in the hero tagline. */
  established: "2018",

  // ── SEO / HTML <head> ───────────────────────────────────────────────────────
  // Also update the <title> and <meta> tags directly in index.html.
  meta: {
    title: "GENTRY — Premium Barbershop",
    description:
      "Premium grooming in Brooklyn, NY. Book your appointment online.",
    ogTitle: "GENTRY Barbershop",
    ogDescription: "Premium grooming for the modern man.",
    /** Absolute path from the public/ folder or a full URL. */
    ogImage: "/og-image.jpg",
  },

  // ── NAVIGATION LABELS ───────────────────────────────────────────────────────
  // Change label text here; section IDs (href) must match the id="" in each section.
  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "The Crew", href: "#team" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Our Work", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
  },

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    /** Background image — replace with client's hero photo. */
    backgroundImage: heroBg,

    /** Two-line editorial headline rendered in giant type. */
    headline: ["Precision", "Cuts"],

    /** Short descriptor line under the headline. */
    subheadline:
      "Where craftsmanship meets confidence. Premium grooming for the modern man who demands nothing less.",

    /** Items that scroll in the marquee strip at the bottom of the hero. */
    marqueeItems: [
      "Haircuts",
      "Fades",
      "Beard Grooming",
      "Hot Towel Shave",
      "Styling",
    ],
  },

  // ── SERVICES ────────────────────────────────────────────────────────────────
  // This is the single source of truth for services — used in the Services
  // section UI AND in the booking dialog / dashboard.
  // `id` values must be unique slugs; they are stored in the database.
  // `durationMinutes` must be a multiple of SLOT_DURATION (30 min default).
  services: [
    {
      id: "haircut",
      index: "01",
      name: "Signature Haircut",
      price: "€45",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Starts with a consultation. Wash, precision cut, and a styled finish built to last all week.",
      badge: "Most Popular" as string | null,
    },
    {
      id: "beard",
      index: "02",
      name: "Beard Trim & Shape",
      price: "€30",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Expert sculpting to define your jawline. Clean edges, tidy neckline, shaped entirely to you.",
      badge: null as string | null,
    },
    {
      id: "shave",
      index: "03",
      name: "Hot Towel Shave",
      price: "€40",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Old-world craft. A straight-razor shave with warm lather, a cooling rinse, and a balm finish.",
      badge: "Classic" as string | null,
    },
    {
      id: "combo",
      index: "04",
      name: "Cut + Beard Combo",
      price: "€65",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Our signature cut paired with a full beard groom. The complete, unbeatable package.",
      badge: "Best Value" as string | null,
    },
    {
      id: "deluxe",
      index: "05",
      name: "The Deluxe",
      price: "€95",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Cut, straight-razor shave, facial treatment, and scalp massage. Leave transformed.",
      badge: "Premium" as string | null,
    },
    {
      id: "kids",
      index: "06",
      name: "Kids Cut",
      price: "€25",
      duration: "30 min",
      durationMinutes: 30,
      description:
        "Patient, precise cuts for the next generation of gentlemen. Under 12 only.",
      badge: null as string | null,
    },
  ],

  // ── TEAM ────────────────────────────────────────────────────────────────────
  // Add or remove team members freely — the TeamSection renders any length array.
  team: [
    {
      index: "01",
      name: "Marcus Cole",
      role: "Fade Specialist",
      image: barber1,
      bio: "Precision is everything. Marcus turns a haircut into a statement that lasts all week.",
      tags: ["Skin Fades", "Lineups", "Tapers", "Faux Hawks"],
      years: "8",
    },
    {
      index: "02",
      name: "Jake Rivera",
      role: "Beard & Shave Expert",
      image: barber2,
      bio: "Old-world craft, modern edge. Jake's straight-razor work is simply unmatched.",
      tags: ["Hot Towel", "Beard Sculpt", "Straight Razor", "Grooming"],
      years: "6",
    },
    {
      index: "03",
      name: "Dmitri Volkov",
      role: "Creative Stylist",
      image: barber3,
      bio: "Where barbering meets art. Dmitri pushes every cut to its creative limit.",
      tags: ["Textured Cuts", "Designs", "Color Work", "Perms"],
      years: "10",
    },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  testimonials: [
    {
      name: "Michael T.",
      text: "Best barbershop in the city, hands down. Marcus always nails my fade and the atmosphere is unmatched.",
    },
    {
      name: "David L.",
      text: "The Deluxe Experience is worth every penny. I walked out feeling like a new man. Already booked my next visit.",
    },
    {
      name: "Chris P.",
      text: "Clean shop, skilled barbers, and they actually listen to what you want. Two years and counting.",
    },
    {
      name: "James R.",
      text: "Walked in on a whim and left with the best haircut of my life. The attention to detail is second to none.",
    },
    {
      name: "Anthony W.",
      text: "The hot towel shave experience alone is worth the trip. It's a ritual, not just a haircut.",
    },
    {
      name: "Tyler S.",
      text: "Booked online in under a minute, Marcus was ready on time, and the result was perfect. Five stars every time.",
    },
  ],

  // ── GALLERY ─────────────────────────────────────────────────────────────────
  // Replace gallery-N.jpg files in src/assets/ — or add more imports above
  // and extend this array. Labels appear as captions on hover.
  gallery: [
    { src: gallery1, alt: "Barbershop interior", label: "Interior" },
    { src: gallery2, alt: "Fresh fade haircut", label: "Fades" },
    { src: gallery3, alt: "Barber tools", label: "Tools" },
    { src: gallery4, alt: "Hot towel shave", label: "Shaves" },
    { src: gallery5, alt: "Beard grooming", label: "Grooming" },
    { src: gallery6, alt: "Shop exterior", label: "Exterior" },
  ],

  // ── CONTACT & LOCATION ──────────────────────────────────────────────────────
  contact: {
    /** Each string becomes a line in the address block. */
    addressLines: ["742 Barber Lane, Suite 3", "Brooklyn, NY 11201"],

    /** Displayed phone number string. */
    phone: "+1 (555) 123-4567",

    /** href value for the phone anchor (e.g. "tel:+15551234567"). */
    phoneHref: "tel:+15551234567",

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
    { days: "Mon – Fri", time: "9AM – 8PM" },
    { days: "Saturday", time: "9AM – 6PM" },
    { days: "Sunday", time: "Closed" },
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
    vatNumber: "[Insert VAT Number]",
    /** REA Number (Numero REA) - Mandatory if registered with Chamber of Commerce. */
    reaNumber: "RM-123456",
    /** Share Capital (Capitale Sociale) - Mandatory for Corporations (S.r.l., S.p.A.). */
    shareCapital: "€ 10.000,00",
    /** Certified email (PEC) - Strongly recommended/mandatory to display for Italian Companies. */
    pecEmail: "thegentry@pec.it",
  },

  // ── INTERNAL / STORAGE ──────────────────────────────────────────────────────
  // Change this key when deploying a new brand so consent preferences don't
  // carry over between different barbershop deployments on the same domain.
  cookieConsentKey: "the-gentry-cookie-consent",
};

export type ShopConfig = typeof shopConfig;
export default shopConfig;
