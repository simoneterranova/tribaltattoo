import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import shopConfig from "@/config/shopConfig";

/**
 * Privacy Policy Page
 * 
 * SEO Implementation:
 * - noindex, follow - Prevents indexing but allows link crawling
 * - Proper title for browser tab and analytics
 * - Legal compliance with GDPR requirements
 */
const PrivacyPolicy = () => {
    return (
        <>
        <Helmet>
            {/* Legal pages should not appear in search results */}
            <meta name="robots" content="noindex, follow" />
            <title>Privacy Policy | {shopConfig.name}</title>
            <meta name="description" content="Privacy policy and GDPR compliance information for {shopConfig.fullName}. Learn how we collect, use, and protect your personal data." />
        </Helmet>

        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" title="Torna alla homepage Gran Babar">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <h1 className="font-heading text-4xl md:text-6xl mb-4">Privacy <span className="text-primary">Policy</span>.</h1>
                    <p className="text-muted-foreground">Last updated: March 2026</p>
                </div>

                <div className="space-y-8 font-body text-muted-foreground leading-relaxed">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">1. Data Controller & DPO</h2>
                        <p>
                            Under the GDPR, the Data Controller responsible for your personal data is <strong>{shopConfig.legal.legalName}</strong>.
                            The Data Controller has not appointed a Data Protection Officer (DPO / RPD) as the mandatory conditions under Art. 37 of the GDPR are not met.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">2. The Data We Collect, Purpose, and Legal Basis</h2>
                        <p>We process your personal data for the following purposes, based on specific legal grounds defined by the GDPR:</p>
                        <ul className="list-disc pl-6 space-y-4">
                            <li>
                                <strong>Fulfilling Orders & Bookings:</strong> Identity data (name), Contact data (email, phone), and Transaction data.
                                <br /><span className="text-sm text-muted-foreground"><strong>Legal Basis:</strong> Contractual necessity (Art. 6.1.b GDPR). Providing this data is mandatory to use our services; refusal means we cannot process your booking.</span>
                            </li>
                            <li>
                                <strong>Legal & Accounting Obligations:</strong> Billing details and transaction records.
                                <br /><span className="text-sm text-muted-foreground"><strong>Legal Basis:</strong> Legal obligation (Art. 6.1.c GDPR). Providing this data is mandatory for compliance with Italian tax laws.</span>
                            </li>
                            <li>
                                <strong>Marketing & Profiling:</strong> Email address and browsing data (via cookies).
                                <br /><span className="text-sm text-muted-foreground"><strong>Legal Basis:</strong> Explicit Consent (Art. 6.1.a GDPR). Providing this data is entirely optional and does not affect your ability to purchase our services. If you consent, your data may be subject to profiling to show personalized ads.</span>
                            </li>
                            <li>
                                <strong>Security & Fraud Prevention:</strong> Technical data (IP address, browser type).
                                <br /><span className="text-sm text-muted-foreground"><strong>Legal Basis:</strong> Legitimate Interest (Art. 6.1.f GDPR) to ensure the security of our website.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">3. Data Retention (Periodo di conservazione)</h2>
                        <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Accounting & Tax Data:</strong> Retained for 10 years as required by Italian civil and tax law.</li>
                            <li><strong>Marketing Data:</strong> Retained for 24 months from the date of your consent, unless withdrawn earlier.</li>
                            <li><strong>Booking Data:</strong> Retained for as long as you maintain an active account with us.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">4. Recipients of Data (Destinatari dei dati)</h2>
                        <p>Your data may be shared with third-party service providers acting as Data Processors (Responsabili del Trattamento) to help us run our business. These include:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Hosting and cloud infrastructure providers.</li>
                            <li>Payment gateways (e.g., Stripe, Nexi) for processing transactions safely.</li>
                            <li>Booking management software providers.</li>
                            <li>Analytics and marketing platforms (if consent is provided).</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">5. International Data Transfers (Extra-EU)</h2>
                        <p>
                            Some of our third-party processors (e.g., Google, Meta) are based outside the European Economic Area (EEA). Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring that specific legal safeguards are in place, such as the <strong>EU-US Data Privacy Framework</strong> or standard contractual clauses approved by the European Commission.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">6. Your Legal Rights</h2>
                        <p>Under the GDPR, you have the right to request access, correction, erasure, restriction, or data portability. You may also withdraw consent at any time.</p>
                        <p><strong>How to exercise your rights:</strong> You can exercise these rights at any time, free of charge, by sending an email to <a href={`mailto:${shopConfig.legal.privacyEmail}`} className="text-primary hover:underline">{shopConfig.legal.privacyEmail}</a>.</p>
                        <p><strong>Lodge a complaint:</strong> You have the right to lodge a complaint with the Italian Supervisory Authority: <em>Garante per la protezione dei dati personali</em> (www.garanteprivacy.it).</p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border bg-muted/30 p-6 rounded-lg">
                        <h2 className="text-2xl font-heading text-foreground mb-4">Contact Details</h2>
                        <div className="space-y-2">
                            <p><strong>Legal Entity:</strong> {shopConfig.legal.legalName}</p>
                            <p><strong>Registered Office (Sede Legale):</strong> {shopConfig.legal.postalAddress}</p>
                            <p><strong>VAT Number (Partita IVA):</strong> {shopConfig.legal.vatNumber}</p>
                            {shopConfig.legal.reaNumber && <p><strong>REA:</strong> {shopConfig.legal.reaNumber}</p>}
                            {shopConfig.legal.shareCapital && <p><strong>Capitale Sociale:</strong> {shopConfig.legal.shareCapital} i.v.</p>}
                            <p><strong>Email:</strong> <a href={`mailto:${shopConfig.legal.privacyEmail}`} className="text-primary hover:underline">{shopConfig.legal.privacyEmail}</a></p>
                            {shopConfig.legal.pecEmail && <p><strong>PEC:</strong> <a href={`mailto:${shopConfig.legal.pecEmail}`} className="text-primary hover:underline">{shopConfig.legal.pecEmail}</a></p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </>
    );
};

export default PrivacyPolicy;