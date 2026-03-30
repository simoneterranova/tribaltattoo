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
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
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
