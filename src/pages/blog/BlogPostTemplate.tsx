// ╔══════════════════════════════════════════════════════════════╗
// ║     BLOG POST TEMPLATE - REUSABLE COMPONENT                  ║
// ║     SEO-optimized with schema markup                         ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    publishDate: string;
    readTime: string;
    content: {
      intro: string;
      sections: {
        heading: string;
        paragraphs: string[];
        list?: string[];
        table?: { headers: string[]; rows: string[][] };
      }[];
      conclusion: string;
    };
    relatedPosts: { slug: string; title: string }[];
  };
}

export const BlogPostTemplate = ({ post }: BlogPostProps) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: {
      "@type": "Person",
      name: shopConfig.author.name,
      jobTitle: shopConfig.author.jobTitle,
      worksFor: {
        "@type": "LocalBusiness",
        name: shopConfig.fullName
      }
    },
    publisher: {
      "@type": "Organization",
      name: shopConfig.fullName,
      logo: {
        "@type": "ImageObject",
        url: `${shopConfig.meta.siteUrl}${shopConfig.meta.ogImage}`
      }
    },
    datePublished: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${shopConfig.meta.siteUrl}/blog/${post.slug}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="author" content={shopConfig.author.name} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={shopConfig.author.name} />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <article className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                Home
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors" title="Torna al blog">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{post.title}</span>
            </nav>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishDate}>{post.publishDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} di lettura</span>
                </div>
              </div>
            </motion.header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {/* Introduction */}
              <p className="text-lg leading-relaxed text-foreground mb-8 font-body">
                {post.content.intro}
              </p>

              {/* Sections */}
              {post.content.sections.map((section, index) => (
                <section key={index} className="mb-12">
                  <h2 className="font-heading text-3xl text-foreground mb-4">{section.heading}</h2>

                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 leading-relaxed text-foreground font-body">
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="space-y-2 my-6">
                      {section.list.map((item, lIndex) => (
                        <li key={lIndex} className="flex items-start gap-3 text-foreground font-body">
                          <span className="text-primary mt-1.5">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.table && (
                    <div className="overflow-x-auto my-8">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-card">
                            {section.table.headers.map((header, hIndex) => (
                              <th
                                key={hIndex}
                                className="border border-border px-4 py-3 text-left font-heading text-foreground"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIndex) => (
                            <tr key={rIndex} className="border-t border-border">
                              {row.map((cell, cIndex) => (
                                <td
                                  key={cIndex}
                                  className="border border-border px-4 py-3 font-body text-foreground"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Conclusion */}
              <div className="mt-12 p-8 bg-card rounded-sm">
                <p className="text-lg leading-relaxed text-foreground font-body">
                  {post.content.conclusion}
                </p>
                <div className="mt-6">
                  <ContactDialog>
                    <Button variant="hero">Prenota Consulenza Gratuita</Button>
                  </ContactDialog>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {post.relatedPosts.length > 0 && (
              <aside className="mt-16 pt-16 border-t border-border">
                <h2 className="font-heading text-2xl text-foreground mb-6">
                  Articoli Correlati
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {post.relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="p-6 border border-border rounded-sm hover:border-primary hover:bg-muted transition-colors"
                    >
                      <h3 className="font-heading text-lg text-foreground">{related.title}</h3>
                    </Link>
                  ))}
                </div>
              </aside>
            )}

            {/* Back to Home */}
            <div className="mt-16 text-center">
              <Link to="/" title="Torna alla homepage Gran Babar">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Torna alla Home
                </Button>
              </Link>
            </div>
          </div>
        </article>

        <FooterSection />
      </div>
    </>
  );
};
