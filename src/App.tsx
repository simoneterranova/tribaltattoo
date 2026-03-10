import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BarberNotificationsProvider } from "@/hooks/useBarberNotifications";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import LoadingScreen from "@/components/LoadingScreen";
import { CookieBanner } from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { SeoHead } from "@/components/SeoHead";

const queryClient = new QueryClient();

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
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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
