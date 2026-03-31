import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home, Scissors, BookOpen, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

/**
 * 404 Not Found Page
 * 
 * SEO Implementation:
 * - noindex, nofollow meta tags (don't index 404 pages)
 * - Proper title for analytics tracking
 * - Helpful navigation links to reduce bounce rate
 * - Logs 404 errors for monitoring
 * - Maintains brand consistency
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 for analytics and monitoring
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Optional: Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_not_found', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  const suggestedPages = [
    {
      icon: Home,
      label: "Homepage",
      description: "Torna alla pagina principale",
      href: "/",
    },
    {
      icon: Scissors,
      label: "Servizi",
      description: "Scopri i nostri stili",
      href: "/#services",
    },
    {
      icon: BookOpen,
      label: "Guide",
      description: "Leggi i nostri articoli",
      href: "/blog/primo-tatuaggio-guida",
    },
    {
      icon: Phone,
      label: "Contatti",
      description: "Contatta lo studio",
      href: "/#contact",
    },
  ];

  return (
    <>
      <Helmet>
        {/* Prevent indexing of 404 pages */}
        <meta name="robots" content="noindex, nofollow" />
        <title>404 - Pagina Non Trovata | {shopConfig.name}</title>
        <meta name="description" content="La pagina che stai cercando non esiste. Torna alla homepage o esplora i nostri servizi." />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number - Large Display */}
          <div className="mb-8">
            <h1 className="font-heading text-[10rem] md:text-[14rem] leading-none text-foreground/10 font-bold select-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12 -mt-32 md:-mt-40">
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
              Pagina Non Trovata<span className="text-primary">.</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              La pagina che stai cercando non esiste o è stata spostata. 
              Usa i link qui sotto per tornare alla navigazione.
            </p>
          </div>

          {/* Attempted URL */}
          <div className="mb-12 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-1">
              URL Richiesto
            </p>
            <p className="font-mono text-sm text-foreground break-all">
              {location.pathname}
            </p>
          </div>

          {/* Primary CTA - Back to Homepage */}
          <div className="mb-12">
            <Link to="/" title="Torna alla homepage Gran Babar">
              <Button size="lg" variant="default" className="gap-2">
                <ArrowLeft className="h-5 w-5" />
                Torna alla Homepage
              </Button>
            </Link>
          </div>

          {/* Suggested Pages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  to={page.href}
                  className="group p-6 border border-border rounded-lg bg-background hover:bg-muted/50 transition-all duration-300 hover:border-primary/50 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {page.label}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-body text-xs text-muted-foreground">
              Se pensi che questa sia un'errore o se la pagina dovrebbe esistere,{" "}
              <a href="/#contact" className="text-primary hover:underline">
                contattaci
              </a>{" "}
              e segnaleremo il problema.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
