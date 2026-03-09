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

export type CookieConsent = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
};

const CONSENT_KEY = shopConfig.cookieConsentKey || "cookie-consent-preferences";

export const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    const [preferences, setPreferences] = useState<CookieConsent>({
        essential: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const savedConsent = localStorage.getItem(CONSENT_KEY);
        if (!savedConsent) {
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setPreferences(JSON.parse(savedConsent));
        }
    }, []);

    // REQUIRED BY GARANTE: Allow user to reopen preferences at any time
    useEffect(() => {
        const handleOpenPreferences = () => setShowPreferences(true);
        window.addEventListener("openCookiePreferences", handleOpenPreferences);
        return () => window.removeEventListener("openCookiePreferences", handleOpenPreferences);
    }, []);

    const saveConsent = (consentOptions: CookieConsent) => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consentOptions));
        setPreferences(consentOptions);
        window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: consentOptions }));
        setShowBanner(false);
        setShowPreferences(false);
    };

    const handleAcceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true });
    const handleRejectNonEssential = () => saveConsent({ essential: true, analytics: false, marketing: false });
    const handleSavePreferences = () => saveConsent(preferences);

    if (!showBanner && !showPreferences) return null;

    return (
        <>
            {showBanner && !showPreferences && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-6 animate-in slide-in-from-bottom-6 duration-500">
                    <div className="mx-auto max-w-5xl rounded-xl border border-border bg-background/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="space-y-3 max-w-3xl mx-auto">
                                <div className="flex items-center justify-center gap-2 text-foreground font-heading text-lg sm:text-2xl">
                                    <CookieIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                    We Value Your Privacy
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to learn more.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto text-xs uppercase h-10 px-6" onClick={() => setShowPreferences(true)}>
                                    Customize
                                </Button>
                                <Button variant="ghost" className="w-full sm:w-auto text-xs uppercase hover:bg-destructive/10 hover:text-destructive h-10 px-6" onClick={handleRejectNonEssential}>
                                    Reject Non-Essential
                                </Button>
                                <Button className="w-full sm:w-auto bg-primary text-primary-foreground text-xs uppercase h-10 px-8" onClick={handleAcceptAll}>
                                    Accept All
                                </Button>
                            </div>
                        </div>
                        <button onClick={handleRejectNonEssential} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1" aria-label="Close banner">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
                            <ShieldCheck className="h-6 w-6 text-primary" /> Privacy Preferences
                        </DialogTitle>
                        <DialogDescription className="font-body text-sm mt-2">
                            Customize your cookie preferences below. Essential cookies cannot be disabled as they are necessary for the website to function.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-6">
                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label className="font-heading text-lg">Strictly Necessary</Label>
                                <p className="font-body text-xs text-muted-foreground">Essential for basic site functions and security.</p>
                            </div>
                            <Switch checked={true} disabled className="shrink-0 data-[state=checked]:bg-primary" />
                        </div>
                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label htmlFor="analytics" className="font-heading text-lg">Analytics Cookies</Label>
                                <p className="font-body text-xs text-muted-foreground">Allows us to analyze traffic and improve performance.</p>
                            </div>
                            <Switch id="analytics" checked={preferences.analytics} onCheckedChange={(c) => setPreferences(p => ({ ...p, analytics: c }))} className="shrink-0 data-[state=checked]:bg-primary" />
                        </div>
                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1 relative pr-8">
                                <Label htmlFor="marketing" className="font-heading text-lg">Marketing Cookies</Label>
                                <p className="font-body text-xs text-muted-foreground">Used to track visitors to display relevant ads.</p>
                            </div>
                            <Switch id="marketing" checked={preferences.marketing} onCheckedChange={(c) => setPreferences(p => ({ ...p, marketing: c }))} className="shrink-0 data-[state=checked]:bg-primary" />
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button variant="outline" onClick={() => setShowPreferences(false)} className="w-full sm:w-auto text-xs uppercase">Cancel</Button>
                        <Button onClick={handleSavePreferences} className="w-full sm:w-auto bg-primary text-primary-foreground text-xs uppercase">Save Preferences</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};