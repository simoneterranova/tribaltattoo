import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Cookie as CookieIcon, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import shopConfig from "@/config/shopConfig";

// Define the shape of our cookie consent
export type CookieConsent = {
    essential: boolean; // always true
    analytics: boolean;
    marketing: boolean;
};

const CONSENT_KEY = shopConfig.cookieConsentKey;

export const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    // Local state for preferences modal
    const [preferences, setPreferences] = useState<CookieConsent>({
        essential: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const savedConsent = localStorage.getItem(CONSENT_KEY);
        if (!savedConsent) {
            // Small delay for better UX
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const saveConsent = (consentOptions: CookieConsent) => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consentOptions));

        // Dispatch a custom event so other parts of the app can react if needed
        window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: consentOptions }));

        setShowBanner(false);
        setShowPreferences(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ essential: true, analytics: true, marketing: true });
    };

    const handleRejectNonEssential = () => {
        saveConsent({ essential: true, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    if (!showBanner && !showPreferences) return null;

    return (
        <>
            {/* Main Banner */}
            {showBanner && !showPreferences && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom-6 duration-500">
                    <div className="mx-auto max-w-5xl rounded-xl border border-border bg-background/95 backdrop-blur-md p-6 shadow-2xl">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-foreground font-heading text-xl">
                                    <CookieIcon className="h-5 w-5 text-primary" />
                                    We Value Your Privacy
                                </div>
                                <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-3xl">
                                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to learn more.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto font-body text-xs tracking-widest uppercase transition-all whitespace-nowrap"
                                    onClick={() => setShowPreferences(true)}
                                >
                                    Customize
                                </Button>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Button
                                        variant="ghost"
                                        className="w-full sm:w-auto font-body text-xs tracking-widest uppercase transition-all whitespace-nowrap hover:bg-destructive/10 hover:text-destructive"
                                        onClick={handleRejectNonEssential}
                                    >
                                        Reject Non-Essential
                                    </Button>
                                    <Button
                                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-body text-xs tracking-widest uppercase transition-all whitespace-nowrap"
                                        onClick={handleAcceptAll}
                                    >
                                        Accept All
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Close context hint */}
                        <button
                            onClick={handleRejectNonEssential}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
                            aria-label="Close banner"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Preferences Dialog */}
            <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Privacy Preferences
                        </DialogTitle>
                        <DialogDescription className="font-body text-sm mt-2">
                            Customize your cookie preferences below. Essential cookies cannot be disabled as they are necessary for the website to function.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-6">
                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label className="font-heading text-lg">Strictly Necessary</Label>
                                <p className="font-body text-xs text-muted-foreground">
                                    These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.
                                </p>
                            </div>
                            <Switch checked={true} disabled className="shrink-0 data-[state=checked]:bg-primary" />
                        </div>

                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label htmlFor="analytics" className="font-heading text-lg">Analytics Cookies</Label>
                                <p className="font-body text-xs text-muted-foreground">
                                    Allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                                </p>
                            </div>
                            <Switch
                                id="analytics"
                                checked={preferences.analytics}
                                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                                className="shrink-0 data-[state=checked]:bg-primary"
                            />
                        </div>

                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label htmlFor="marketing" className="font-heading text-lg">Marketing Cookies</Label>
                                <p className="font-body text-xs text-muted-foreground">
                                    Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                                </p>
                            </div>
                            <Switch
                                id="marketing"
                                checked={preferences.marketing}
                                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                                className="shrink-0 data-[state=checked]:bg-primary"
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3 sm:space-x-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowPreferences(false)}
                            className="w-full sm:w-auto font-body text-xs tracking-widest uppercase"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSavePreferences}
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-body text-xs tracking-widest uppercase"
                        >
                            Save Preferences
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
