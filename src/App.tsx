import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BarberNotificationsProvider } from "@/hooks/useBarberNotifications";
import LoadingScreen from "@/components/LoadingScreen";
import { CookieBanner } from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { SeoHead } from "@/components/SeoHead";

// ── CODE SPLITTING WITH REACT.LAZY() ──────────────────────────────────────────
// Lazy load route components to reduce initial bundle size and improve performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const DisegniPage = lazy(() => import("./pages/DisegniPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ServiziPage = lazy(() => import("./pages/ServiziPage"));
const TatuaggiPage = lazy(() => import("./pages/TatuaggiPage"));
const AftercarePage = lazy(() => import("./pages/AftercarePage"));

// ── SEO LANDING PAGES (NOT IN NAV MENU) ───────────────────────────────────────
// Style-specific pages for keyword targeting
const OldSchoolPage = lazy(() => import("./pages/services/OldSchoolPage"));
const RealisticPage = lazy(() => import("./pages/services/RealisticPage"));
const CoverUpPage = lazy(() => import("./pages/services/CoverUpPage"));
const GeometricPage = lazy(() => import("./pages/services/GeometricPage"));
const BlackGreyPage = lazy(() => import("./pages/services/BlackGreyPage"));
const FineLinePage = lazy(() => import("./pages/services/FineLinePage"));
const DotworkPage = lazy(() => import("./pages/services/DotworkPage"));
const FloralePage = lazy(() => import("./pages/services/FloralePage"));
const JapanesePage = lazy(() => import("./pages/services/JapanesePage"));
const LetteringPage = lazy(() => import("./pages/services/LetteringPage"));
const MinimalistPage = lazy(() => import("./pages/services/MinimalistPage"));
const GothicPage = lazy(() => import("./pages/services/GothicPage"));
const NeoTraditionalPage = lazy(() => import("./pages/services/NeoTraditionalPage"));
const NewSchoolPage = lazy(() => import("./pages/services/NewSchoolPage"));
const SurrealistPage = lazy(() => import("./pages/services/SurrealistPage"));
const TribalPage = lazy(() => import("./pages/services/TribalPage"));
const WatercolorPage = lazy(() => import("./pages/services/WatercolorPage"));
const SigilloPage = lazy(() => import("./pages/services/SigilloPage"));

// Local SEO page
const BorgoDoraTattooPage = lazy(() => import("./pages/BorgoDoraTattooPage"));

// Blog posts for long-tail keywords
const PricingBlogPost = lazy(() => import("./pages/blog/PricingBlogPost"));
const FirstTattooBlogPost = lazy(() => import("./pages/blog/FirstTattooBlogPost"));
const AftercareBlogPost = lazy(() => import("./pages/blog/AftercareBlogPost"));

// FAQ page for voice search & featured snippets
const FaqPage = lazy(() => import("./pages/FaqPage"));

// Portfolio pages - separated for SEO
const MainPortfolio = lazy(() => import("./pages/portfolio/MainPortfolio"));
const OldSchoolPortfolio = lazy(() => import("./pages/portfolio/OldSchoolPortfolio"));
const RealisticPortfolio = lazy(() => import("./pages/portfolio/RealisticPortfolio"));
const CoverUpPortfolio = lazy(() => import("./pages/portfolio/CoverUpPortfolio"));
const GeometricPortfolio = lazy(() => import("./pages/portfolio/GeometricPortfolio"));
const BlackGreyPortfolio = lazy(() => import("./pages/portfolio/BlackGreyPortfolio"));

const queryClient = new QueryClient();

// ── SUSPENSE FALLBACK ──────────────────────────────────────────────────────────
// Lightweight loading indicator for code-split routes
const RouteLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="font-body text-sm text-muted-foreground tracking-wider">Caricamento...</p>
    </div>
  </div>
);

const App = () => {
  // Skip loading animation if landing directly on legal pages
  const isLegalPage = window.location.pathname.includes('privacy-policy') ||
    window.location.pathname.includes('cookie-policy');

  const [isLoading, setIsLoading] = useState(!isLegalPage);

  // Prevent scrolling during loading and reset scroll position
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
      // Ensure we're at the top when loading completes
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <BarberNotificationsProvider>
              <TooltipProvider>
                <SeoHead />
                <Toaster />
                <Sonner />
                {isLoading && (
                  <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
                )}
                <BrowserRouter>
                  <ScrollToTop />
                  <Suspense fallback={<RouteLoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/my-bookings" element={<MyBookings />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      
                      {/* Style-specific landing pages (SEO) */}
                      <Route path="/servizi/tatuaggi-old-school-torino" element={<OldSchoolPage />} />
                      <Route path="/tatuaggi-old-school-torino" element={<OldSchoolPage />} />
                      <Route path="/servizi/tatuaggi-realistici-torino" element={<RealisticPage />} />
                      <Route path="/tatuaggio-realistico-a-torino" element={<RealisticPage />} />
                      <Route path="/servizi/cover-up-tatuaggi-torino" element={<CoverUpPage />} />
                      <Route path="/servizi/tatuaggi-geometrici-torino" element={<GeometricPage />} />
                      <Route path="/tatuaggio-geometrico-a-torino" element={<GeometricPage />} />
                      <Route path="/servizi/tatuaggi-black-grey-torino" element={<BlackGreyPage />} />
                      <Route path="/tatuaggio-black-grey-a-torino" element={<BlackGreyPage />} />
                      
                      {/* Additional tattoo styles */}
                      <Route path="/tatuaggio-fine-line-a-torino" element={<FineLinePage />} />
                      <Route path="/tatuaggio-dotwork-a-torino" element={<DotworkPage />} />
                      <Route path="/tatuaggio-floreale-a-torino" element={<FloralePage />} />
                      <Route path="/tatuaggio-giapponese-irezumi-a-torino" element={<JapanesePage />} />
                      <Route path="/tatuaggio-lettering-a-torino" element={<LetteringPage />} />
                      <Route path="/tatuaggio-minimalista-a-torino" element={<MinimalistPage />} />
                      <Route path="/tatuaggio-gotico-a-torino" element={<GothicPage />} />
                      <Route path="/tatuaggio-neo-tradizionale-a-torino" element={<NeoTraditionalPage />} />
                      <Route path="/tatuaggio-new-school-a-torino" element={<NewSchoolPage />} />
                      <Route path="/tatuaggio-surrealista-a-torino" element={<SurrealistPage />} />
                      <Route path="/tatuaggio-tribale-a-torino" element={<TribalPage />} />
                      <Route path="/tatuaggio-watercolor-a-torino" element={<WatercolorPage />} />
                      <Route path="/tatuaggio-sigillo-a-torino" element={<SigilloPage />} />
                      
                      {/* Local SEO page */}
                      <Route path="/moncalieri-tatuaggi-tribali" element={<BorgoDoraTattooPage />} />
                      
                      {/* Blog posts (high-intent keywords) */}
                      <Route path="/blog/quanto-costa-tatuaggio-torino" element={<PricingBlogPost />} />
                      <Route path="/blog/primo-tatuaggio-guida" element={<FirstTattooBlogPost />} />
                      <Route path="/blog/cura-tatuaggio-aftercare" element={<AftercareBlogPost />} />
                      
                      {/* FAQ page (voice search optimization) */}
                      <Route path="/faq-tatuaggi-torino" element={<FaqPage />} />
                      
                      {/* Portfolio pages */}
                      <Route path="/portfolio" element={<MainPortfolio />} />
                      <Route path="/portfolio/old-school-torino" element={<OldSchoolPortfolio />} />
                      <Route path="/portfolio/realistici-torino" element={<RealisticPortfolio />} />
                      <Route path="/portfolio/cover-up-torino" element={<CoverUpPortfolio />} />
                      <Route path="/portfolio/geometrici-torino" element={<GeometricPortfolio />} />
                      <Route path="/portfolio/black-grey-torino" element={<BlackGreyPortfolio />} />
                      
                      {/* Legal pages */}
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                      
                      {/* General pages */}
                      <Route path="/about-me" element={<AboutPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/disegni" element={<DisegniPage />} />
                      <Route path="/contatti" element={<ContactPage />} />
                      <Route path="/servizi" element={<ServiziPage />} />
                      <Route path="/tatuaggi" element={<TatuaggiPage />} />
                      <Route path="/cura-post-tatuaggio" element={<AftercarePage />} />
                      <Route path="/cover-up-e-correzioni-tatuaggi" element={<CoverUpPage />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <CookieBanner />
                </BrowserRouter>
              </TooltipProvider>
            </BarberNotificationsProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
