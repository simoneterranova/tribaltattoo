import { ArrowLeft, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import shopConfig from "@/config/shopConfig";

/**
 * Cookie Policy Page
 * 
 * SEO Implementation:
 * - noindex, follow - Prevents indexing but allows link crawling
 * - Proper title for browser tab
 * - Compliant with Italian Data Protection Authority (Garante) requirements
 */
const CookiePolicy = () => {
    // Triggers the event listened to by the CookieBanner
    const openCookieSettings = () => {
        window.dispatchEvent(new Event("openCookiePreferences"));
    };

    return (
        <>
        <Helmet>
            {/* Legal pages should not appear in search results */}
            <meta name="robots" content="noindex, follow" />
            <title>Cookie Policy | {shopConfig.name}</title>
            <meta name="description" content="Cookie policy for {shopConfig.fullName}. Learn about the cookies we use and how to manage your preferences." />
        </Helmet>

        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" title="Torna alla homepage Tribal Tattoo">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <h1 className="font-heading text-4xl md:text-6xl mb-4">Cookie <span className="text-primary">Policy</span>.</h1>
                    <p className="text-muted-foreground">Last updated: March 2026</p>
                </div>

                <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">1. What Are Cookies?</h2>
                        <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work efficiently, as well as to provide information to the owners of the site.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">2. Detailed Cookie List</h2>
                        <p>Below is a detailed list of the cookies we use on our website, as required by the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali).</p>

                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-sm text-left border border-border rounded-lg overflow-hidden">
                                <thead className="bg-muted text-foreground">
                                    <tr>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Provider</th>
                                        <th className="p-3">Purpose</th>
                                        <th className="p-3">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="p-3 font-medium text-foreground">Essential</td>
                                        <td className="p-3">cookie-consent-preferences</td>
                                        <td className="p-3">Our Website</td>
                                        <td className="p-3">Stores your cookie consent preferences.</td>
                                        <td className="p-3">1 Year</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-medium text-foreground">Analytics</td>
                                        <td className="p-3">_ga, _ga_XXXXXXX</td>
                                        <td className="p-3">Google LLC</td>
                                        <td className="p-3">Used to distinguish users and analyze site traffic.</td>
                                        <td className="p-3">2 Years</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-medium text-foreground">Marketing</td>
                                        <td className="p-3">_fbp</td>
                                        <td className="p-3">Meta Platforms Inc.</td>
                                        <td className="p-3">Used to track visits across websites to deliver targeted advertising.</td>
                                        <td className="p-3">3 Months</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">3. Managing Your Preferences</h2>
                        <p>You can change or withdraw your consent at any time. Click the button below to reopen the cookie preferences panel.</p>
                        <button
                            onClick={openCookieSettings}
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors mt-2"
                        >
                            <Settings2 className="w-4 h-4" /> Open Cookie Settings
                        </button>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">4. Third-Party Privacy Policies</h2>
                        <p>For more information on how our third-party providers use your data, please refer to their respective privacy policies:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a> | <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Opt-out Add-on</a></li>
                            <li><strong>Meta (Facebook/Instagram):</strong> <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">5. Managing Cookies via Browser Settings</h2>
                        <p>You can also disable cookies directly from your browser settings. Be aware that disabling all cookies may break essential functionality of this website. Here are the guides for major browsers:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
        </>
    );
};

export default CookiePolicy;