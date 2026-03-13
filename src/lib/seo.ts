// ╔══════════════════════════════════════════════════════════════╗
// ║                    SEO HELPER FUNCTIONS                      ║
// ║                                                              ║
// ║  All functions are pure: (config: ShopConfig) => output      ║
// ║  No hardcoded strings — everything derives from shopConfig   ║
// ╚══════════════════════════════════════════════════════════════╝

import type { ShopConfig } from "@/config/shopConfig";

/**
 * Generates the canonical URL for the site.
 * ShopConfig fields used: meta.siteUrl
 */
export function getCanonicalUrl(config: ShopConfig): string {
  return config.meta.siteUrl;
}

/**
 * Generates SEO-optimized page title with location.
 * ShopConfig fields used: name, city, meta.title
 */
export function getPageTitle(config: ShopConfig): string {
  if (config.meta.title) return config.meta.title;
  const city = config.city.split(",")[0].trim(); // "Torino" not "Torino, TO"
  return `${config.name} — ${config.activity} a ${city}`;
}

/**
 * Generates SEO-optimized meta description with services and location.
 * ShopConfig fields used: meta.description, city, services[].name
 */
export function getMetaDescription(config: ShopConfig): string {
  const topServices = config.services.slice(0, 3).map(s => s.name).join(", ");
  const city = config.city.split(",")[0].trim();
  const base = config.meta.description;
  const citySuffix = base.toLowerCase().includes(city.toLowerCase())
    ? ""
    : ` Situato a ${city}.`;
  return `${base} Servizi: ${topServices}.${citySuffix}`;
}

/**
 * Estrae il colore primario dal config.
 * Nota: Restituisce il valore HSL definito nel config.
 */
export function getThemeColor(config: ShopConfig): string {
  // Rimuoviamo l'hardcoding. Usiamo il valore definito in theme.colors.primary.
  // I browser moderni accettano il formato HSL nei meta tag theme-color.
  return `hsl(${config.theme.colors.primary})`;
}

/**
 * Converts opening hours to schema.org OpeningHoursSpecification format.
 * Adattato per gli orari e i giorni in italiano.
 */
export function getOpeningHoursSpecification(config: ShopConfig): Array<{
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens?: string;
  closes?: string;
}> {
  const specs: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string | string[];
    opens?: string;
    closes?: string;
  }> =[];

  config.hours.forEach((hour) => {
    const { days, time } = hour;

    if (time.toLowerCase() === "chiuso" || time.toLowerCase() === "closed") {
      return;
    }

    // Supporta il formato 24h europeo/italiano (es. "9:00 - 20:00" o "09:00 – 20:00")
    const timeMatch = time.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    if (timeMatch) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: parseDayOfWeek(days),
        // Aggiunge lo 0 iniziale se manca (es. da "9:00" a "09:00")
        opens: timeMatch[1].padStart(5, '0'),
        closes: timeMatch[2].padStart(5, '0'),
      });
    }
  });

  return specs;
}

/**
 * Mappa i giorni italiani nei formati schema.org inglesi obbligatori.
 */
function parseDayOfWeek(days: string): string | string[] {
  const lowerDays = days.toLowerCase();
  
  // Gestisce i range italiani (Lun - Ven)
  if (lowerDays.includes("lun") && lowerDays.includes("ven")) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  }
  if (lowerDays.includes("lun") && lowerDays.includes("sab")) {
    return["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  // Mappatura giorni singoli italiani -> inglesi
  if (lowerDays.includes("lun")) return "Monday";
  if (lowerDays.includes("mar")) return "Tuesday";
  if (lowerDays.includes("mer")) return "Wednesday";
  if (lowerDays.includes("gio")) return "Thursday";
  if (lowerDays.includes("ven")) return "Friday";
  if (lowerDays.includes("sab")) return "Saturday";
  if (lowerDays.includes("dom")) return "Sunday";

  return "Monday"; // fallback
}

// (La vecchia funzione convertTo24Hour PUOI CANCELLARLA DEL TUTTO)

/**
 * Generates schema.org LocalBusiness / HairSalon structured data.
 * ShopConfig fields used: fullName, meta.description, meta.siteUrl, contact.*, hours, social, city, established
 */
export function getLocalBusinessSchema(config: ShopConfig): Record<string, unknown> {
  const canonicalUrl = getCanonicalUrl(config);

  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "LocalBusiness"],
    name: config.fullName,
    description: config.meta.description,
    url: canonicalUrl,
    telephone: config.contact.phone,
    email: config.contact.email,
    foundingDate: config.established,
    image: getOgImageUrl(config),
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.addressLines[0],
      addressLocality: config.contact.quarter?.[0] || config.city.split(",")[0],
      addressRegion: config.city.split(",")[1]?.trim() || "TO",
      addressCountry: config.contact.countryCode,
    },
    openingHoursSpecification: getOpeningHoursSpecification(config),
    priceRange: config.contact.priceRange,
    sameAs: Object.values(config.social).filter(Boolean),
    // Include geo coordinates if provided (improves local pack ranking)
    ...(config.contact.geo?.latitude && config.contact.geo?.longitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: config.contact.geo.latitude,
        longitude: config.contact.geo.longitude,
      },
    }),
    // Link to Google Maps listing (direct local pack signal)
    ...(config.contact.googleMapsEmbedUrl && {
      hasMap: config.contact.googleMapsEmbedUrl,
    }),
  };
}

/**
 * Generates schema.org Service entries for each service offered.
 * ShopConfig fields used: services[]
 */
export function getServiceSchemas(config: ShopConfig): Array<Record<string, unknown>> {
  return config.services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "HairSalon",
      name: config.fullName,
    },
    offers: {
      "@type": "Offer",
      price: service.price.toString(),
      priceCurrency: "EUR",
    },
  }));
}

/**
 * Generates schema.org Person entries for each team member.
 * ShopConfig fields used: team[]
 */
export function getPersonSchemas(config: ShopConfig): Array<Record<string, unknown>> {
  return config.team.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      "@type": "HairSalon",
      name: config.fullName,
    },
  }));
}

/**
 * Generates breadcrumb structured data for better navigation understanding.
 * ShopConfig fields used: nav.links, name
 */
export function getBreadcrumbSchema(config: ShopConfig): Record<string, unknown> {
  const canonicalUrl = getCanonicalUrl(config);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl,
      },
      ...config.nav.links.map((link, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: link.label,
        item: `${canonicalUrl}${link.href}`,
      })),
    ],
  };
}

// TODO: Inject real AggregateRating only when connected to a verified review source (e.g. Google Places API).
// Using testimonials count as ratingCount is misleading to Google and risks a manual penalty.
// Testimonials are NOT verified reviews — do not generate AggregateRating schema without real review data.

/**
 * Generates schema.org FAQPage structured data for local SEO.
 * Answers common "near me" queries that appear in local search.
 * ShopConfig fields used: fullName, contact, city, hours, services, meta.siteUrl
 */
export function getFaqSchema(config: ShopConfig): Record<string, unknown> {
  // Gracefully handle edge cases
  if (!config.services || config.services.length === 0) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
  }

  const openHours = config.hours
    ?.filter((h) => !["closed", "chiuso"].includes(h.time.toLowerCase()))
    .map((h) => `${h.days}: ${h.time}`)
    .join(". ");

  const minPrice = Math.min(...config.services.map((s) => s.price));
  const servicesList = config.services
    .map((s) => `${s.name} (€${s.price})`)
    .join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Dove si trova ${config.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${config.fullName} si trova in ${config.contact.addressLines.join(", ")}, ${config.city}.`,
        },
      },
      ...(openHours
        ? [
            {
              "@type": "Question",
              name: `Quali sono le ore di apertura di ${config.fullName}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: openHours,
              },
            },
          ]
        : []),
      {
        "@type": "Question",
        name: `Quanto costa un taglio di capelli a ${config.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `I prezzi da ${config.fullName} partono da €${minPrice}. Servizi disponibili: ${servicesList}.`,
        },
      },
      {
        "@type": "Question",
        name: `Posso prenotare un appuntamento online a ${config.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sì, puoi prenotare il tuo appuntamento online direttamente su ${config.meta.bookingSiteUrl}.`,
        },
      },
    ],
  };
}

/**
 * Generates Open Graph image URL (absolute).
 * ShopConfig fields used: meta.ogImage, meta.siteUrl
 */
export function getOgImageUrl(config: ShopConfig): string {
  // If ogImage is already absolute, return as-is
  if (config.meta.ogImage.startsWith("http")) {
    return config.meta.ogImage;
  }
  
  // Otherwise, make it absolute using siteUrl
  return `${config.meta.siteUrl}${config.meta.ogImage}`;
}
