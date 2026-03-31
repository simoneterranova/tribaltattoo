// ╔══════════════════════════════════════════════════════════════╗
// ║     BORGO DORA TATUAGGI - LOCAL SEO LANDING PAGE             ║
// ║     Target keywords: "tatuaggi borgo dora", "tatuatore borgo dora"  ║
// ╚══════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Heart, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactDialog from "@/components/ContactDialog";
import shopConfig from "@/config/shopConfig";

const BorgoDoraTattooPage = () => {
  return (
    <>
      <Helmet>
        <title>Tatuaggi a Borgo Dora, Torino | Gran Babar Studio | Zona Dora</title>
        <meta
          name="description"
          content="Studio di tatuaggi professionale a Borgo Dora, Torino. Francesco tatuatore con 10+ anni esperienza. Vicino a Porta Palazzo, Balon, Lungo Dora Napoli 16. Consulenza gratuita."
        />
        <meta property="og:title" content="Tatuaggi a Borgo Dora | Gran Babar Studio Torino" />
        <meta
          property="og:description"
          content="Studio di tatuaggi nel cuore artistico di Borgo Dora. Francesco specializzato in Old School, realistici e cover-up."
        />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/borgo-dora-tatuaggi`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-foreground transition-colors" title="Torna alla homepage">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">Borgo Dora</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Tatuaggi a Borgo Dora, Torino
              </h1>

              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                Nel cuore artistico di Torino, tra il mercato del Balon e le rive della Dora, Gran
                Babar Studio è il punto di riferimento per tatuaggi di qualità in Borgo Dora dal
                2020.
              </p>

              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota Appuntamento
                </Button>
              </ContactDialog>
            </motion.div>
          </div>
        </section>

        {/* About Borgo Dora */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start gap-4 mb-6">
              <Landmark className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                  Perché Borgo Dora per il Tuo Tatuaggio?
                </h2>
                <div className="space-y-4 font-body text-base text-foreground">
                  <p>
                    Borgo Dora è il quartiere più autentico e artistico di Torino. Storicamente zona
                    operaia, oggi è un crocevia di culture, creatività e artigianato. Qui convivono
                    il famoso mercato delle pulci del Balon, gallerie d'arte indipendenti,
                    laboratori artigianali e studi creativi.
                  </p>
                  <p>
                    Gran Babar Studio si trova in Lungo Dora Napoli 16, a pochi passi da Porta
                    Palazzo e dal fiume Dora. La posizione è strategica: raggiungibile in 10 minuti
                    a piedi da Porta Susa, ben collegata con mezzi pubblici (linee 3, 4, 11, 72), e
                    con parcheggio disponibile nelle vie limitrofe.
                  </p>
                  <p>
                    Scegliere uno studio a Borgo Dora significa immergersi in un'atmosfera unica,
                    dove l'arte del tatuaggio si fonde con lo spirito bohémien del quartiere. Dopo
                    la tua sessione puoi passeggiare tra i mercatini vintage, prendere un caffè nei
                    bar storici o esplorare le gallerie d'arte contemporanea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              Come Raggiungerci
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">Indirizzo</h3>
                  <p className="font-body text-foreground">
                    Lungo Dora Napoli 16<br />
                    10152 Torino (TO)<br />
                    Zona: Borgo Dora / Porta Palazzo
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">Orari</h3>
                  <div className="font-body text-foreground space-y-1">
                    {shopConfig.hours.map((hour, index) => (
                      <p key={index}>
                        <span className="font-medium">{hour.days}:</span> {hour.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 font-body text-foreground">
              <div>
                <h3 className="font-heading text-xl mb-3">🚇 Mezzi Pubblici</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Metropolitana:</strong> Fermata Porta Susa (10 minuti a piedi)
                  </li>
                  <li>
                    <strong>Tram:</strong> Linee 3, 4 - fermata Porta Palazzo
                  </li>
                  <li>
                    <strong>Bus:</strong> Linee 11, 72 - fermata Borgo Dora
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-3">🚗 In Auto</h3>
                <p>
                  Parcheggio disponibile in Via Bologna e nelle vie limitrofe. Zone a pagamento GTT:
                  tariffe orarie convenienti. Parcheggio gratuito dopo le 20:00 e la domenica.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-3">🏛️ Punti di Riferimento</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mercato di Porta Palazzo (5 minuti a piedi)</li>
                  <li>Balon - Mercato delle Pulci (sabato e seconda domenica del mese)</li>
                  <li>Parco Dora (10 minuti a piedi)</li>
                  <li>MAO - Museo d'Arte Orientale (15 minuti)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Features */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start gap-4 mb-8">
              <Heart className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                  Perché Scegliere Gran Babar Studio
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Francesco con 10+ anni di esperienza professionale",
                    "Specializzazione in Old School, realistico e cover-up",
                    "Studio privato e riservato in atmosfera rilassante",
                    "Massimi standard di igiene e sicurezza (autoclave, monouso)",
                    "Consulenza gratuita per ogni progetto",
                    "Design personalizzati studiati su misura per te",
                    "Aftercare completo con assistenza post-tatuaggio",
                    "Portfolio verificabile su Instagram con lavori recenti"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      <p className="font-body text-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Quick Links */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              I Nostri Servizi a Borgo Dora
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { slug: "tatuaggi-old-school-torino", name: "Old School", desc: "Stile tradizionale" },
                { slug: "tatuaggi-realistici-torino", name: "Realistici", desc: "Ritratti e nature" },
                { slug: "cover-up-tatuaggi-torino", name: "Cover-up", desc: "Coperture professionali" },
                { slug: "tatuaggi-geometrici-torino", name: "Geometrici", desc: "Sacred geometry" },
                { slug: "tatuaggi-black-grey-torino", name: "Black & Grey", desc: "Sfumature perfette" }
              ].map((service) => (
                <Link
                  key={service.slug}
                  to={`/servizi/${service.slug}`}
                  className="p-6 border border-border rounded-sm hover:border-primary hover:bg-muted transition-colors"
                >
                  <h3 className="font-heading text-lg text-foreground mb-2">{service.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{service.desc}</p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota la Tua Consulenza Gratuita
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

export default BorgoDoraTattooPage;
