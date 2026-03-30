// ╔══════════════════════════════════════════════════════════════╗
// ║                      SEO HEAD COMPONENT                      ║
// ║                                                              ║
// ║  Injects all meta tags and JSON-LD structured data           ║
// ║  Values sourced dynamically from shopConfig                  ║
// ╚══════════════════════════════════════════════════════════════╝

import { Helmet } from "react-helmet-async";
import shopConfig from "@/config/shopConfig";
import {
  getPageTitle,
  getMetaDescription,
  getCanonicalUrl,
  getThemeColor,
  getLocalBusinessSchema,
  getServiceSchemas,
  getPersonSchemas,
  getBreadcrumbSchema,
  getFaqSchema,
  getOgImageUrl,
} from "@/lib/seo";

/**
 * SeoHead Component
 * 
 * Dynamically generates:
 * - Page title with location keywords
 * - Meta description with services and city
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL
 * - Geo meta tags for local SEO (geo.region, geo.placename, geo.position, ICBM)
 * - Theme color for mobile browsers
 * - Preload/Preconnect hints for performance
 * - JSON-LD structured data (LocalBusiness, Services, Team, Breadcrumbs, FAQ)
 * 
 * ShopConfig fields used:
 * - name, fullName, city, established
 * - meta.* (all meta fields including siteUrl, locale)
 * - contact.* (address, phone, email, countryCode, priceRange, geo, googleMapsEmbedUrl)
 * - services[] (for service schemas and description)
 * - team[] (for person schemas)
 * - hours[] (for opening hours and FAQ)
 * - social.* (for sameAs links)
 * - hero.backgroundImage (for preload)
 * - theme.googleFontsUrl, theme.colors.primary
 * - nav.links (for breadcrumbs)
 */
export function SeoHead() {
  const title = getPageTitle(shopConfig);
  const description = getMetaDescription(shopConfig);
  const canonicalUrl = getCanonicalUrl(shopConfig);
  const themeColor = getThemeColor(shopConfig);
  const ogImageUrl = getOgImageUrl(shopConfig);

  // Generate all structured data schemas
  const localBusinessSchema = getLocalBusinessSchema(shopConfig);
  const serviceSchemas = getServiceSchemas(shopConfig);
  const personSchemas = getPersonSchemas(shopConfig);
  const breadcrumbSchema = getBreadcrumbSchema(shopConfig);
  const faqSchema = getFaqSchema(shopConfig);

  // Extract Google Fonts domain for preconnect
  const googleFontsDomain = shopConfig.theme.googleFontsUrl.includes("fonts.googleapis.com")
    ? "https://fonts.googleapis.com"
    : null;
  const googleFontsGstaticDomain = shopConfig.theme.googleFontsUrl.includes("fonts.googleapis.com")
    ? "https://fonts.gstatic.com"
    : null;

  return (
    <Helmet>
      {/* ── PRIMARY META TAGS ──────────────────────────────────────────────── */}
      <title>{title}</title>

      {/* ── GOOGLE SEARCH CONSOLE VERIFICATION ─────────────────────────────── */}
      {shopConfig.meta.googleSiteVerification && (
        <meta name="google-site-verification" content={shopConfig.meta.googleSiteVerification} />
      )}
      
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* ── GEO TAGS FOR LOCAL SEO ─────────────────────────────────────────── */}
      {/* These tags help search engines understand your exact physical location */}
      {shopConfig.contact.geo?.latitude && shopConfig.contact.geo?.longitude && (
        <>
          <meta 
            name="geo.region" 
            content={`${shopConfig.contact.countryCode}-${shopConfig.city.split(",")[1]?.trim() || ""}`} 
          />
          <meta name="geo.placename" content={shopConfig.city.split(",")[0].trim()} />
          <meta 
            name="geo.position" 
            content={`${shopConfig.contact.geo.latitude};${shopConfig.contact.geo.longitude}`} 
          />
          <meta 
            name="ICBM" 
            content={`${shopConfig.contact.geo.latitude}, ${shopConfig.contact.geo.longitude}`} 
          />
        </>
      )}
      
      {/* ── LANGUAGE & HREFLANG ────────────────────────────────────────────── */}
      <html lang={shopConfig.meta.locale.split("_")[0]} />
      <link rel="alternate" hrefLang="it" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* ── OPEN GRAPH / FACEBOOK ──────────────────────────────────────────── */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={shopConfig.meta.ogTitle || title} />
      <meta property="og:description" content={shopConfig.meta.ogDescription || description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={shopConfig.meta.locale} />
      <meta property="og:site_name" content={shopConfig.fullName} />

      {/* ── TWITTER CARD ───────────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shopConfig.meta.ogTitle || title} />
      <meta name="twitter:description" content={shopConfig.meta.ogDescription || description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* ── THEME & MOBILE ─────────────────────────────────────────────────── */}
      <meta name="theme-color" content={themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* ── PERFORMANCE HINTS ──────────────────────────────────────────────── */}
      {/* Preload hero background for LCP improvement */}
      {shopConfig.hero.backgroundImage && (
        <link
          rel="preload"
          as="image"
          href={shopConfig.hero.backgroundImage}
          // @ts-expect-error - fetchpriority is valid but not in types yet
          fetchpriority="high"
        />
      )}

      {/* Preconnect to Google Fonts for faster font loading */}
      {googleFontsDomain && (
        <>
          <link rel="preconnect" href={googleFontsDomain} />
          <link rel="preconnect" href={googleFontsGstaticDomain!} crossOrigin="anonymous" />
        </>
      )}

      {/* ── JSON-LD STRUCTURED DATA ────────────────────────────────────────── */}
      
      {/* LocalBusiness / HairSalon Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Services Schema */}
      {serviceSchemas.map((schema, index) => (
        <script key={`service-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Team Members (Person) Schema */}
      {personSchemas.map((schema, index) => (
        <script key={`person-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Breadcrumb Schema for Navigation */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* FAQ Schema for Local SEO — answers "near me" queries */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Note: AggregateRating schema removed — testimonials are NOT verified reviews.
          Only inject AggregateRating when connected to verified review source (e.g. Google Places API).
          Using testimonial count as ratingCount risks manual penalty from Google. */}
    </Helmet>
  );
}
