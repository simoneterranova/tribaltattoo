import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
                <div className="mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="font-heading text-4xl md:text-6xl mb-4">
                        Cookie <span className="text-primary">Policy</span>.
                    </h1>
                    <p className="text-muted-foreground">Last updated: March 2026</p>
                </div>

                <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">2. How We Use Cookies</h2>
                        <p>
                            We use different types of cookies for different purposes:
                        </p>

                        <div className="space-y-6 mt-4">
                            <div className="bg-muted/30 p-6 rounded-lg border border-border">
                                <h3 className="text-lg font-heading text-foreground mb-2">Essential Cookies (Strictly Necessary)</h3>
                                <p className="mb-2">These cookies are essential for the website to function properly. They enable basic functions like page navigation, secure areas access (like your bookings dashboard), and authentication. The website cannot function properly without these cookies. You cannot opt-out of these cookies.</p>
                                <div className="text-sm">
                                    <strong>Examples:</strong> Session management, security tokens, acceptance of this policy.
                                </div>
                            </div>

                            <div className="bg-muted/30 p-6 rounded-lg border border-border">
                                <h3 className="text-lg font-heading text-foreground mb-2">Analytical / Performance Cookies</h3>
                                <p className="mb-2">These allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</p>
                                <div className="text-sm">
                                    <strong>Examples:</strong> Google Analytics (anonymized IPs).
                                </div>
                            </div>

                            <div className="bg-muted/30 p-6 rounded-lg border border-border">
                                <h3 className="text-lg font-heading text-foreground mb-2">Marketing Cookies</h3>
                                <p className="mb-2">These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</p>
                                <div className="text-sm">
                                    <strong>Examples:</strong> Facebook Pixel, retargeting cookies.
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">3. Managing Your Cookie Preferences</h2>
                        <p>
                            You can manage your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of our website. Alternatively, most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutcookies.org</a> or <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">allaboutcookies.org</a>.
                        </p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border">
                        <h2 className="text-2xl font-heading text-foreground">Contact Us</h2>
                        <p>
                            If you have any questions about our use of cookies, please contact us.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
