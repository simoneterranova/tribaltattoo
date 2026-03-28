// TypeScript: Declare window.gtag for GA4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import shopConfig from "@/config/shopConfig";

// ─────────────────────────────────────────────────────────────
// Google Analytics 4 (GA4) Loader — Placeholder Implementation
// ─────────────────────────────────────────────────────────────
function loadGA4() {
  // TODO: Replace 'G-XXXXXXXXXX' with your real GA4 Measurement ID
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;

  // Prevent duplicate injection
  if (window.gtag) return;

  // Inject gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inline gtag config
  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inlineScript);
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply all theme values from shopConfig BEFORE React renders.
// This sets CSS custom properties + injects Google Fonts, so there is no flash
// and no other file needs editing when deploying for a new barbershop.
// ─────────────────────────────────────────────────────────────────────────────
function applyShopTheme() {
  const { theme, meta } = shopConfig;
  const root = document.documentElement;
  const c = theme.colors;

  // Colors (HSL values without the hsl() wrapper — consumed by CSS as hsl(var(--x)))
  const vars: Record<string, string> = {
    "--background":                   c.background,
    "--foreground":                   c.foreground,
    "--card":                         c.card,
    "--card-foreground":              c.cardForeground,
    "--popover":                      c.popover,
    "--popover-foreground":           c.popoverForeground,
    "--primary":                      c.primary,
    "--primary-foreground":           c.primaryForeground,
    "--secondary":                    c.secondary,
    "--secondary-foreground":         c.secondaryForeground,
    "--muted":                        c.muted,
    "--muted-foreground":             c.mutedForeground,
    "--accent":                       c.accent,
    "--accent-foreground":            c.accentForeground,
    "--border":                       c.border,
    "--input":                        c.input,
    "--ring":                         c.ring,
    "--sidebar-background":           c.sidebarBackground,
    "--sidebar-foreground":           c.sidebarForeground,
    "--sidebar-primary":              c.sidebarPrimary,
    "--sidebar-primary-foreground":   c.sidebarPrimaryForeground,
    "--sidebar-accent":               c.sidebarAccent,
    "--sidebar-accent-foreground":    c.sidebarAccentForeground,
    "--sidebar-border":               c.sidebarBorder,
    "--sidebar-ring":                 c.sidebarRing,
    "--radius":                       theme.radius,
    "--font-heading":                 `'${theme.fonts.heading}', sans-serif`,
    "--font-body":                    `'${theme.fonts.body}', sans-serif`,
  };

  for (const [prop, value] of Object.entries(vars)) {
    root.style.setProperty(prop, value);
  }

  // Inject Google Fonts stylesheet
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = theme.googleFontsUrl;
  document.head.prepend(link);

  // Meta tags (title + OG — crawlers that execute JS will see the correct values)
  document.title = meta.title;
  document.querySelector('meta[name="description"]')
    ?.setAttribute("content", meta.description);
  document.querySelector('meta[property="og:title"]')
    ?.setAttribute("content", meta.ogTitle);
  document.querySelector('meta[property="og:description"]')
    ?.setAttribute("content", meta.ogDescription);
  document.querySelector('meta[property="og:image"]')
    ?.setAttribute("content", meta.ogImage);
  document.querySelector('meta[name="twitter:image"]')
    ?.setAttribute("content", meta.ogImage);
}

applyShopTheme();

// Listen for cookie consent updates to load GA4 only if analytics cookies are accepted
window.addEventListener('cookieConsentUpdate', (e) => {
  const consent = (e as CustomEvent).detail;
  if (consent?.analytics) {
    loadGA4();
  }
});

// On first load, check if analytics cookies are already accepted
try {
  const consentRaw = localStorage.getItem(shopConfig.cookieConsentKey || "cookie-consent-preferences");
  if (consentRaw) {
    const { preferences } = JSON.parse(consentRaw);
    if (preferences?.analytics) {
      loadGA4();
    }
  }
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
