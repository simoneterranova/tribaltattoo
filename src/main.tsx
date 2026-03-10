import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import shopConfig from "@/config/shopConfig";

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

createRoot(document.getElementById("root")!).render(<App />);
