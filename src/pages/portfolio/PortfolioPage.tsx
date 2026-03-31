// ╔══════════════════════════════════════════════════════════════╗
// ║     REUSABLE PORTFOLIO PAGE TEMPLATE                         ║
// ║     SEO-optimized gallery pages for each tattoo style        ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

interface PortfolioPageProps {
  portfolio: {
    slug: string;
    title: string; // "Portfolio Tatuaggi Old School Torino"
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    gallery: { src: string; alt: string; caption?: string }[];
    servicePageSlug: string; // Link back to service page
    relatedPortfolios: { slug: string; name: string }[];
    relatedBlogPosts?: { slug: string; title: string }[];
  };
}

export const PortfolioPage = ({ portfolio }: PortfolioPageProps) => {
  return (
    <>
      <Helmet>
        <title>{portfolio.metaTitle}</title>
        <meta name="description" content={portfolio.metaDescription} />
        <meta property="og:title" content={portfolio.metaTitle} />
        <meta property="og:description" content={portfolio.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={portfolio.gallery[0]?.src || shopConfig.meta.ogImage} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/portfolio/${portfolio.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <Link to="/portfolio" className="hover:text-foreground transition-colors" title="Tutti i portfolio">
                Portfolio
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{portfolio.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-5xl md:text-7xl text-foreground mb-4 leading-none"
                >
                  {portfolio.h1}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl"
                >
                  {portfolio.intro}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to={`/servizi/${portfolio.servicePageSlug}`} title="Scopri il servizio completo">
                  <Button variant="outline" size="lg">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Info Servizio
                  </Button>
                </Link>
                <ContactDialog>
                  <Button variant="hero" size="lg" title="Prenota una consulenza gratuita">
                    Prenota Consulenza <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </ContactDialog>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative aspect-square overflow-hidden rounded-sm bg-card"
                >
                  {item.src.endsWith('.mp4') ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                      title={item.alt}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      width="600"
                      height="600"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Caption overlay on hover */}
                  {item.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="font-body text-sm text-background">{item.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Gallery stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="font-body text-sm text-muted-foreground tracking-wider uppercase">
                {portfolio.gallery.length} {portfolio.gallery.length === 1 ? 'lavoro' : 'lavori'} in questa collezione
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Portfolios */}
        {portfolio.relatedPortfolios.length > 0 && (
          <section className="py-16 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                Altri Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {portfolio.relatedPortfolios.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/portfolio/${related.slug}`}
                    className="group p-6 border border-border rounded-sm hover:border-primary hover:bg-background transition-all"
                    title={`Vedi portfolio ${related.name}`}
                  >
                    <p className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                      {related.name}
                    </p>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {portfolio.relatedBlogPosts && portfolio.relatedBlogPosts.length > 0 && (
          <section className="py-16 px-6">
            <div className="container mx-auto max-w-7xl">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                Guide e Risorse
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {portfolio.relatedBlogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group p-6 bg-card border border-border rounded-sm hover:border-primary transition-colors"
                    title={post.title}
                  >
                    <p className="font-body text-base text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary mt-3 transition-colors">
                      Leggi l'articolo <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Trasforma la Tua Idea in Arte
            </h2>
            <p className="font-body text-lg mb-8 opacity-90">
              Ogni tatuaggio nel nostro portfolio inizia con una consulenza gratuita.
              Parliamo del tuo progetto e creiamo insieme qualcosa di unico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/servizi/${portfolio.servicePageSlug}`} title="Scopri dettagli e prezzi">
                <Button variant="secondary" size="lg">
                  Scopri il Servizio
                </Button>
              </Link>
              <ContactDialog>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" title="Prenota ora">
                  Prenota Subito
                </Button>
              </ContactDialog>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};
