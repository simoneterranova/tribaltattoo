// ╔══════════════════════════════════════════════════════════════╗
// ║     REUSABLE TATTOO STYLE LANDING PAGE TEMPLATE              ║
// ║     SEO-optimized with unique content per style              ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle2, ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

interface TattooStylePageProps {
  style: {
    slug: string;
    title: string; // "Tatuaggi Old School a Torino"
    metaTitle: string; // For SEO
    metaDescription: string;
    h1: string; // Main heading
    intro: string; // Opening paragraph
    about: string[]; // Multiple paragraphs about the style
    features: string[]; // Key features/characteristics
    process: string[]; // How it works / what to expect
    pricing: string; // Pricing information
    gallery: { src: string; alt: string }[];
    relatedStyles: { slug: string; name: string }[];
    portfolioSlug?: string; // Link to full portfolio page
    relatedBlogPosts?: { slug: string; title: string }[]; // Related blog posts
    faqs?: { question: string; answer: string }[]; // Optional FAQ section
  };
}

export const TattooStylePage = ({ style }: TattooStylePageProps) => {
  // Generate canonical URL for this page
  const canonicalUrl = `${shopConfig.meta.siteUrl}/${style.slug}`;
  
  // Use first gallery image for social media if available
  const socialImage = style.gallery.length > 0 
    ? `${shopConfig.meta.siteUrl}${style.gallery[0].src}`
    : `${shopConfig.meta.siteUrl}/images/tatuaggi/gran-babar-social.jpg`;

  // Generate FAQ structured data if FAQs exist
  const faqSchema = style.faqs && style.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": style.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <Helmet>
        {/* ── PRIMARY META TAGS ──────────────────────────────────────────────── */}
        <title>{style.metaTitle}</title>
        <meta name="description" content={style.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* ── OPEN GRAPH / FACEBOOK / LINKEDIN ───────────────────────────────── */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={style.metaTitle} />
        <meta property="og:description" content={style.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Tribal Tattoo - Studio Tatuaggi Tribali Moncalieri" />
        
        {/* ── TWITTER CARD ───────────────────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={style.metaTitle} />
        <meta name="twitter:description" content={style.metaDescription} />
        <meta name="twitter:image" content={socialImage} />
        
        {/* ── FAQ STRUCTURED DATA (Schema.org) ───────────────────────────────── */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{style.title}</span>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl text-foreground mb-6"
            >
              {style.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
            >
              {style.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota Consulenza Gratuita <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </ContactDialog>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-6">
              {style.about.map((paragraph, index) => (
                <p key={index} className="font-body text-base leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              Caratteristiche dello Stile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {style.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <p className="font-body text-foreground">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Teaser Section */}
        {style.gallery.length > 0 && (
          <section className="py-16 px-6 bg-card">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                <h2 className="font-heading text-3xl md:text-4xl text-foreground">
                  Anteprima Portfolio
                </h2>
                {style.portfolioSlug && (
                  <Link to={`/portfolio/${style.portfolioSlug}`}>
                    <Button variant="outline" size="default" title="Vedi galleria completa">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Vedi Portfolio Completo
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {style.gallery.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square overflow-hidden rounded-sm"
                  >
                    {image.src.endsWith('.mp4') ? (
                      <video
                        src={image.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={image.src}
                        alt={image.alt}
                        width="600"
                        height="600"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {style.portfolioSlug && style.gallery.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 text-center"
                >
                  <Link to={`/portfolio/${style.portfolioSlug}`} title="Scopri tutti i lavori">
                    <Button variant="hero" size="lg">
                      Guarda Altri {style.gallery.length - 3}+ Lavori <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Process Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              Come Funziona
            </h2>
            <div className="space-y-6">
              {style.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-sm">
                    {index + 1}
                  </div>
                  <p className="font-body text-foreground pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              Prezzi e Preventivi
            </h2>
            <p className="font-body text-lg text-foreground leading-relaxed mb-8">
              {style.pricing}
            </p>
            <ContactDialog>
              <Button variant="hero" size="lg">
                Richiedi Preventivo Gratuito
              </Button>
            </ContactDialog>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              Contenuti Correlati
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Related Styles */}
              {style.relatedStyles.length > 0 && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
                    Altri Stili di Tatuaggio
                  </h3>
                  <div className="space-y-3">
                    {style.relatedStyles.map((related) => (
                      <Link
                        key={related.slug}
                        to={`/servizi/${related.slug}`}
                        className="group flex items-center justify-between p-4 border border-border rounded-sm hover:border-primary hover:bg-muted transition-colors"
                        title={`Scopri i ${related.name} a Torino`}
                      >
                        <p className="font-body text-foreground group-hover:text-primary transition-colors">
                          {related.name}
                        </p>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blog Posts */}
              {style.relatedBlogPosts && style.relatedBlogPosts.length > 0 && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
                    Guide e Risorse
                  </h3>
                  <div className="space-y-3">
                    {style.relatedBlogPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-center justify-between p-4 border border-border rounded-sm hover:border-primary hover:bg-muted transition-colors"
                        title={post.title}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="font-body text-foreground group-hover:text-primary transition-colors">
                            {post.title}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {style.faqs && style.faqs.length > 0 && (
          <section className="py-16 px-6 bg-card">
            <div className="container mx-auto max-w-4xl">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                Domande Frequenti
              </h2>
              <div className="space-y-6">
                {style.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border rounded-sm p-6"
                  >
                    <h3 className="font-heading text-xl text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">Pronto per Iniziare?</h2>
            <p className="font-body text-lg mb-8 opacity-90">
              Prenota la tua consulenza gratuita. Parliamo del tuo progetto e creiamo insieme
              il tatuaggio perfetto per te.
            </p>
            <ContactDialog>
              <Button variant="secondary" size="lg">
                Contatta Claudio Ciliberti
              </Button>
            </ContactDialog>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};
