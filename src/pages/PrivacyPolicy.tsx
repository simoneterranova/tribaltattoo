import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import shopConfig from "@/config/shopConfig";

const PrivacyPolicy = () => {
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
                        Privacy <span className="text-primary">Policy</span>.
                    </h1>
                    <p className="text-muted-foreground">Last updated: March 2026</p>
                </div>

                <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to our website. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you, in compliance with the General Data Protection Regulation (GDPR).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">2. The Data We Collect About You</h2>
                        <p>
                            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us (e.g., haircut bookings).</li>
                            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">3. How We Use Your Personal Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., managing your booking).</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">5. Your Legal Rights</h2>
                        <p>
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Request access to your personal data.</li>
                            <li>Request correction of your personal data.</li>
                            <li>Request erasure of your personal data ("right to be forgotten").</li>
                            <li>Object to processing of your personal data.</li>
                            <li>Request restriction of processing your personal data.</li>
                            <li>Request transfer of your personal data.</li>
                            <li>Right to withdraw consent.</li>
                        </ul>
                        <p>
                            If you wish to exercise any of the rights set out above, please contact us.
                        </p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border">
                        <h2 className="text-2xl font-heading text-foreground">Contact Details</h2>
                        <p>
                            Our full details are:<br />
                            Full name of legal entity: {shopConfig.legal.legalName}<br />
                            Email address: <a href={`mailto:${shopConfig.legal.privacyEmail}`} className="text-primary hover:underline">{shopConfig.legal.privacyEmail}</a><br />
                            Postal address: {shopConfig.legal.postalAddress}<br />
                            VAT Number: {shopConfig.legal.vatNumber}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
