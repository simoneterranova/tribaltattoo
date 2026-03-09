import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import shopConfig from "@/config/shopConfig";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <h1 className="font-heading text-4xl md:text-6xl mb-4">Privacy <span className="text-primary">Policy</span>.</h1>
                    <p className="text-muted-foreground">Last updated: March 2026</p>
                </div>

                <div className="space-y-8 font-body text-muted-foreground leading-relaxed">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">1. Data Controller (Titolare del Trattamento)</h2>
                        <p>
                            Under the GDPR, the Data Controller responsible for your personal data is <strong>{shopConfig.legal.legalName}</strong>. If you have any questions regarding this privacy policy or your data, you can contact us at the details provided at the bottom of this page.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading text-foreground">2. The Data We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> first name, last name, username.</li>
                            <li><strong>Contact Data:</strong> email address and telephone number.</li>
                            <li><strong>Transaction Data:</strong> details about payments and services purchased (e.g., booking history).</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, location, and device technology.</li>
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
                        <p>Under the GDPR, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Request access, correction, or erasure of your data.</li>
                            <li>Object to or restrict the processing of your data.</li>
                            <li>Request data portability.</li>
                            <li>Withdraw consent at any time.</li>
                            <li><strong>Lodge a complaint:</strong> You have the right to lodge a complaint with the Italian Supervisory Authority: <em>Garante per la protezione dei dati personali</em> (www.garanteprivacy.it).</li>
                        </ul>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border bg-muted/30 p-6 rounded-lg">
                        <h2 className="text-2xl font-heading text-foreground mb-4">Contact Details</h2>
                        <div className="space-y-2">
                            <p><strong>Legal Entity:</strong> {shopConfig.legal.legalName}</p>
                            <p><strong>Registered Office (Sede Legale):</strong> {shopConfig.legal.postalAddress}</p>
                            <p><strong>VAT Number (Partita IVA):</strong> {shopConfig.legal.vatNumber}</p>
                            {/* IF YOU HAVE A REA NUMBER OR SHARE CAPITAL, ADD THEM IN CONFIG AND HERE */}
                            {shopConfig.legal.reaNumber && <p><strong>REA:</strong> {shopConfig.legal.reaNumber}</p>}
                            {shopConfig.legal.shareCapital && <p><strong>Capitale Sociale:</strong> {shopConfig.legal.shareCapital} i.v.</p>}
                            <p><strong>Email:</strong> <a href={`mailto:${shopConfig.legal.privacyEmail}`} className="text-primary hover:underline">{shopConfig.legal.privacyEmail}</a></p>
                            {/* Certified email is heavily recommended for Italian businesses */}
                            {shopConfig.legal.pecEmail && <p><strong>PEC:</strong> <a href={`mailto:${shopConfig.legal.pecEmail}`} className="text-primary hover:underline">{shopConfig.legal.pecEmail}</a></p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;