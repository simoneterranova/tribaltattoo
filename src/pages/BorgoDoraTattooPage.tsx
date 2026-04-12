// ╔══════════════════════════════════════════════════════════════╗
// ║     MONCALIERI TATUAGGI - LOCAL SEO LANDING PAGE            ║
// ║     Target keywords: "tatuaggi moncalieri", "tatuatore moncalieri"  ║
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
        <title>Tatuaggi Tribali {shopConfig.city.split(",")[0]} | {shopConfig.fullName} | Arte Sacra dal {shopConfig.established}</title>
        <meta
          name="description"
          content={`Studio di tatuaggi tribali professionali a ${shopConfig.city}. ${shopConfig.author.name}, maestro tatuatore con ${shopConfig.team[0].years} anni esperienza. Arte polinesiaca, maori e tribale originale. ${shopConfig.contact.addressLines[0]}.`}
        />
        <meta property="og:title" content={`Tatuaggi Tribali ${shopConfig.city.split(",")[0]} | ${shopConfig.fullName}`} />
        <meta
          property="og:description"
          content={`Vera arte tribale originale a ${shopConfig.city.split(",")[0]} dal ${shopConfig.established}. ${shopConfig.author.name} specializzato in ${shopConfig.team[0].tags.slice(0, 3).join(", ").toLowerCase()}.`}
        />
        <link rel="canonical" href={`${shopConfig.meta.siteUrl}/moncalieri-tatuaggi-tribali`} />
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
                <span className="text-foreground font-medium">{shopConfig.city.split(",")[0]}</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Tatuaggi Tribali a {shopConfig.city.split(",")[0]}
              </h1>

              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                A {shopConfig.city}, {shopConfig.fullName} è il tempio dell'arte tribale sacra dal {shopConfig.established}. 
                Vera arte original di magie antiche polinesiache e maori — non semplici copie.
              </p>

              <ContactDialog>
                <Button variant="hero" size="lg">
                  Prenota Appuntamento
                </Button>
              </ContactDialog>
            </motion.div>
          </div>
        </section>

        {/* About Moncalieri */}
        <section className="py-16 px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start gap-4 mb-6">
              <Landmark className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                  Perché {shopConfig.city.split(",")[0]} per il Tuo Tatuaggio Tribale?
                </h2>
                <div className="space-y-4 font-body text-base text-foreground">
                  <p>
                    {shopConfig.city.split(",")[0]} è una città storica alle porte di Torino, con un centro caratteristico 
                    e una forte identità culturale. Qui, dal {shopConfig.established}, {shopConfig.fullName} custodisce 
                    l'arte sacra dei tatuaggi tribali, portando nei corpi dei clienti l'essenza delle 
                    culture polinesiache e maori autentiche.
                  </p>
                  <p>
                    {shopConfig.fullName} si trova in {shopConfig.contact.addressLines[0]}, nel cuore di {shopConfig.city.split(",")[0]}, facilmente 
                    raggiungibile da Torino (10 minuti in auto), ben collegato con mezzi pubblici e con 
                    ampio parcheggio nelle vicinanze. La posizione strategica permette di accogliere 
                    clienti da tutta la provincia di Torino.
                  </p>
                  <p>
                    Scegliere uno studio a {shopConfig.city.split(",")[0]} significa affidarsi a un maestro con {shopConfig.team[0].years} anni di esperienza 
                    e viaggi nei luoghi sacri dell'arte tribale. Qui ogni tatuaggio è un rito, ogni segno viene 
                    disegnato a mano sull'energia del tuo corpo — non copie, ma magie antiche reinterpretate.
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
                    {shopConfig.contact.addressLines[0]}<br />
                    {shopConfig.contact.addressLines[1]}<br />
                    Zona: {shopConfig.contact.quarter[0]}
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
                <h3 className="font-heading text-xl mb-3">� In Auto</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Da Torino:</strong> 10 minuti via Corso Moncalieri o Strada Genova
                  </li>
                  <li>
                    <strong>Parcheggio:</strong> Disponibile in Corso Roma e vie limitrofe
                  </li>
                  <li>
                    <strong>Zone sosta:</strong> Parcheggi gratuiti nelle vicinanze del centro
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-3">🚌 Mezzi Pubblici</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Autobus:</strong> Linee GTT da Torino verso Moncalieri (fermata Corso Roma)
                  </li>
                  <li>
                    <strong>Treno:</strong> Stazione Moncalieri (10 minuti a piedi)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-3">🏛️ Punti di Riferimento</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Castello Reale di Moncalieri (5 minuti a piedi)</li>
                  <li>Centro storico di Moncalieri</li>
                  <li>A 10 km dal centro di Torino</li>
                  <li>Vicinanza con Nichelino, Trofarello, Cambiano</li>
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
                  Perché Scegliere {shopConfig.fullName}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    `${shopConfig.author.name}, maestro tatuatore con ${shopConfig.team[0].years} anni di esperienza dal ${shopConfig.established}`,
                    `Specializzazione tribale: ${shopConfig.team[0].tags.join(", ")}`,
                    "Arte tribale originale — non copie, ma magie antiche autentiche",
                    "Design freehand disegnati a mano direttamente sul corpo",
                    "Studio privato con atmosfera sacra e rilassante",
                    "Massimi standard di igiene e sicurezza (autoclave, monouso certificati)",
                    "Consulenza gratuita per ogni progetto tribale",
                    "Viaggi nei luoghi sacri: Polinesia, Nuova Zelanda, Asia per approfondire la cultura tribale"
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
              Servizi Tribali a Moncalieri
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { slug: "tatuaggio-polinesiano-a-torino", name: "Polinesiano", desc: "Arte sacra delle isole" },
                { slug: "tatuaggio-maori-a-torino", name: "Maori", desc: "Tradizione Neozelandese" },
                { slug: "tatuaggio-tribale-a-torino", name: "Tribale Freehand", desc: "Disegnato sul corpo" },
                { slug: "tatuaggio-dotwork-a-torino", name: "Dot Work", desc: "Puntinatura sacra" },
                { slug: "tatuaggio-black-work-a-torino", name: "Black Work", desc: "Solido e potente" }
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
