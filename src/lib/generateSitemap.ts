// ╔══════════════════════════════════════════════════════════════╗
// ║              DYNAMIC SITEMAP GENERATOR                       ║
// ║                                                              ║
// ║  Generates sitemap.xml dynamically from shopConfig           ║
// ║  Use this to avoid hardcoded domains in static sitemap       ║
// ╚══════════════════════════════════════════════════════════════╝

import type { ShopConfig } from "@/config/shopConfig";

/**
 * Generates a complete sitemap.xml string from shopConfig.
 * 
 * ShopConfig fields used:
 * - meta.siteUrl — base domain for all URLs
 * - nav.links — section anchor links
 * 
 * Usage:
 * - Call this function at build time or in a server route
 * - Serve the result at `/sitemap.xml`
 * - For Vite: create a virtual module or build-time plugin
 * - For Express/Node: create a route handler
 * 
 * Example (Vite plugin):
 * ```ts
 * import { generateSitemapXml } from './src/lib/generateSitemap';
 * import shopConfig from './src/config/shopConfig';
 * 
 * export default defineConfig({
 *   plugins: [
 *     {
 *       name: 'sitemap',
 *       configureServer(server) {
 *         server.middlewares.use((req, res, next) => {
 *           if (req.url === '/sitemap.xml') {
 *             res.setHeader('Content-Type', 'application/xml');
 *             res.end(generateSitemapXml(shopConfig));
 *           } else {
 *             next();
 *           }
 *         });
 *       }
 *     }
 *   ]
 * });
 * ```
 */
export function generateSitemapXml(config: ShopConfig): string {
  const baseUrl = config.meta.siteUrl;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Generate URL entries
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
    },
  ];

  // Add section anchor links from nav
  config.nav.links.forEach((link) => {
    const priority = getPriorityForSection(link.href);
    urls.push({
      loc: `${baseUrl}${link.href}`,
      lastmod: today,
      changefreq: "monthly",
      priority,
    });
  });

  // Add legal pages
  urls.push(
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: today,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${baseUrl}/cookie-policy`,
      lastmod: today,
      changefreq: "yearly",
      priority: "0.3",
    }
  );

  // Build XML
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Assigns priority based on section type.
 */
function getPriorityForSection(href: string): string {
  if (href.includes("#services")) return "0.9";
  if (href.includes("#contact")) return "0.9";
  if (href.includes("#gallery")) return "0.8";
  if (href.includes("#team")) return "0.8";
  if (href.includes("#testimonials")) return "0.7";
  return "0.7";
}

/**
 * Escapes special XML characters.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
