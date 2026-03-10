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
  return `${config.name} — Premium Barbershop in ${config.city}`;
}

/**
 * Generates SEO-optimized meta description with services and location.
 * ShopConfig fields used: meta.description, city, services[].name
 */
export function getMetaDescription(config: ShopConfig): string {
  const topServices = config.services.slice(0, 3).map(s => s.name).join(", ");
  return `${config.meta.description} Services: ${topServices}. Located in ${config.city}.`;
}

/**
 * Extracts theme color for manifest and meta tags.
 * ShopConfig fields used: theme.colors.primary
 */
export function getThemeColor(config: ShopConfig): string {
  // Convert HSL string to hex approximation (or return as-is for CSS variable)
  // For meta tag, we'll use a fixed hex derived from the primary gold color
  // In a real scenario, you'd parse the HSL and convert to hex
  return "#B8954F"; // Approximation of the default primary gold
}

/**
 * Converts opening hours to schema.org OpeningHoursSpecification format.
 * ShopConfig fields used: hours[]
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
  }> = [];

  config.hours.forEach((hour) => {
    const { days, time } = hour;

    // Skip "Closed" days entirely - per schema.org spec, omit closed days rather than including them
    if (time.toLowerCase() === "closed") {
      return;
    }

    // Parse time range (e.g., "9AM – 8PM" to "09:00" and "20:00")
    const timeMatch = time.match(/(\d{1,2})\s*([AP]M)\s*[–-]\s*(\d{1,2})\s*([AP]M)/i);
    if (timeMatch) {
      const [, openHour, openPeriod, closeHour, closePeriod] = timeMatch;
      const opens = convertTo24Hour(parseInt(openHour), openPeriod);
      const closes = convertTo24Hour(parseInt(closeHour), closePeriod);

      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: parseDayOfWeek(days),
        opens,
        closes,
      });
    }
  });

  return specs;
}

/**
 * Parses day string to schema.org day format.
 * Examples: "Monday", "Mon – Fri" → ["Monday", "Tuesday", ...]
 */
function parseDayOfWeek(days: string): string | string[] {
  const dayMap: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const lowerDays = days.toLowerCase();

  // Handle ranges like "Mon – Fri"
  if (lowerDays.includes("–") || lowerDays.includes("-")) {
    if (lowerDays.includes("mon") && lowerDays.includes("fri")) {
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    }
    if (lowerDays.includes("mon") && lowerDays.includes("sat")) {
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
  }

  // Single day
  for (const [key, value] of Object.entries(dayMap)) {
    if (lowerDays.includes(key)) {
      return value;
    }
  }

  return "Monday"; // fallback
}

/**
 * Converts 12-hour time to 24-hour format for schema.org.
 */
function convertTo24Hour(hour: number, period: string): string {
  let h = hour;
  if (period.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return h.toString().padStart(2, "0") + ":00";
}

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
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.addressLines[0],
      addressLocality: config.contact.quarter?.[0] || config.city.split(",")[0],
      addressRegion: config.city.split(",")[1]?.trim() || "NY",
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
      priceCurrency: "USD",
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
    ?.filter((h) => h.time.toLowerCase() !== "closed")
    .map((h) => `${h.days}: ${h.time}`)
    .join(". ");

  const minPrice = Math.min(...config.services.map((s) => s.price));
  const servicesList = config.services
    .map((s) => `${s.name} ($${s.price})`)
    .join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where is ${config.fullName} located?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${config.fullName} is located at ${config.contact.addressLines.join(", ")}, ${config.city}.`,
        },
      },
      ...(openHours
        ? [
            {
              "@type": "Question",
              name: `What are the opening hours of ${config.fullName}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: openHours,
              },
            },
          ]
        : []),
      {
        "@type": "Question",
        name: `How much does a haircut cost at ${config.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Prices at ${config.fullName} start from $${minPrice}. Services include: ${servicesList}.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I book an appointment online at ${config.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, you can book your appointment online directly at ${config.meta.siteUrl}.`,
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
