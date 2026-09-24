# Tribal Tattoo Studio — Website Knowledge Base

*Derived entirely from `shopConfig.ts`. Intended as a reference for an AI assistant supporting the shop's website. Every fact below traces back to a specific field in that file; inferences are explicitly labeled as such.*

---

## Table of Contents

1. [About This Document & the Source File](#1-about-this-document--the-source-file)
2. [Quick Facts](#2-quick-facts)
3. [Guidance for the AI Assistant](#3-guidance-for-the-ai-assistant)
4. [The Studio & the Master Artist](#4-the-studio--the-master-artist)
5. [Services & Pricing](#5-services--pricing)
6. [Flash Designs Shop — "Disegni"](#6-flash-designs-shop--disegni)
7. [Galleries](#7-galleries)
8. [Customer Testimonials](#8-customer-testimonials)
9. [Location, Hours & Contact](#9-location-hours--contact)
10. [Payments](#10-payments)
11. [Social Media](#11-social-media)
12. [Legal & Company Information](#12-legal--company-information)
13. [Website Content Reference](#13-website-content-reference)
14. [Visual Design System](#14-visual-design-system)
15. [Data Quality Notes & Open Items](#15-data-quality-notes--open-items)

---

## 1. About This Document & the Source File

`shopConfig.ts` is a single, centralized configuration file that drives an entire business website. Its header comment frames it explicitly as a reusable template ("ONE FILE TO RULE THEM ALL"): to deploy the same site for a *different* business, a developer would fill in this one file, swap the images in `src/assets/`, adjust colors/fonts in `src/index.css` and `tailwind.config.ts`, and update the domain in `sitemap.xml`/`robots.txt` — "nothing else should need touching." This copy of the template is fully populated for one specific business: **Tribal Tattoo Studio**, a tattoo and piercing studio in Moncalieri, Italy.

**Inferred tech stack:** the `@/assets` import alias, the references to `tailwind.config.ts` and `src/index.css`, and the HSL-based color-token naming (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, plus a full `sidebar*` set) together indicate a **React + Vite + Tailwind CSS** site using a **shadcn/ui-style** theming convention. The file exports a plain object (`shopConfig`) plus a derived type (`export type ShopConfig = typeof shopConfig`), so the rest of the codebase presumably consumes this object in a type-safe way.

**Structural map** — the config's 25 top-level keys, grouped by function:

| Group | Keys |
|---|---|
| Brand identity | `name`, `fullName`, `logo`, `city`, `established`, `activity`, `author` |
| SEO / social sharing | `meta` |
| Navigation & homepage copy | `nav`, `hero`, `sections` |
| Catalog / content data | `services`, `team`, `testimonials`, `gallery`, `piercings`, `disegni`, `discount` |
| Business operations | `contact`, `hours`, `social` |
| Legal & compliance | `footer`, `legal` |
| Design system | `theme` |
| Internal/technical | `cookieConsentKey` |

**Scope and limits of this document:** this is a snapshot of one static configuration file. It contains no live data — no appointment calendar, no real-time availability, no order or inventory status, and no analytics. It also doesn't capture anything that might live elsewhere in the site's codebase (for example, blog articles, if the site publishes any — see the `author` field in Section 4, which exists for that purpose but has no associated content in this file).

---

## 2. Quick Facts

| Field | Value |
|---|---|
| Brand name (short) | TRIBAL TATTOO |
| Full name | TRIBAL TATTOO STUDIO |
| Business type | *Studio di Tatuaggi Tribali* (Tribal Tattoo Studio) |
| Founded | 1994 |
| Address | Corso Roma, 51 — 10024 Moncalieri (TO), Italy |
| Master artist | Claudio Ciliberti — Founder & Master Tattoo Artist, 30+ years |
| Phone | +39 350 535 2680 |
| Email | tribaltattoo@tribaltattoo.it |
| Website | https://tribaltattoo.vercel.app |
| Site language | Italian only (`locale: it_IT`) |
| Core offerings | Custom tribal / Polynesian / Maori tattoos (quote-based); piercings (quote-based); pre-made "flash" design prints (fixed price, bulk discount available) |
| Hours | Mon–Fri and Sat, split shift (closed midday); closed all day Sunday |

---

## 3. Guidance for the AI Assistant

These rules translate the raw configuration data into safe behavior for a customer-facing assistant:

- **Language:** all source content is Italian. Mirror the customer's language, but keep service names, design titles, and other proper nouns in their original Italian form (e.g., "Tribale Freehand," not an invented translation) so they match what's shown on the site.
- **Never invent a specific tattoo or piercing price.** Almost every service is `"Su Preventivo"` (quoted only after a free, in-person consultation). The only fixed-cost customer-facing items are the initial consultation (free), aftercare (included), and the flash designs (see below). "Wild Tattoo" pricing is fully bespoke, plus travel costs paid by the client.
- **Flash design discount:** if a customer is buying three or more flash designs, mention the automatic 15% discount on the total.
- **No live data:** this document has no booking calendar, appointment availability, or order/inventory status. For anything time-sensitive, point the customer to phone, email, or the studio's social channels.
- **Piercing gallery images are unreliable:** the source explicitly flags all 14 piercing photos as placeholders, and each photo's internal `alt` description doesn't match its displayed `label` (see Section 7.2). Don't tell a customer that a specific photo shows a specific piercing type.
- **Testimonials:** attribute quotes only to the initials given in the source (e.g., "F. T."). Don't invent full names or extra biographical detail about reviewers.
- **This is a snapshot:** it won't reflect changes made to the live site after this document was generated.

---

## 4. The Studio & the Master Artist

- **Activity:** *Studio di Tatuaggi Tribali* — a tribal tattoo studio, established in **1994**.
- **Location tagline:** "Moncalieri, TO" (used in the hero tagline and section subtitles).
- **Content author:** for blog posts and content-authorship metadata, the site attributes authorship to **Claudio Ciliberti**, job title *"Maestro Tatuatore Tribale"* (Master Tribal Tattoo Artist). No blog content itself is defined in this file — this field only sets up the attribution metadata for if/when such content exists.
- **Logo:** a red "fishbone" mark. The active import is `original_logo_no_bg.png`; a commented-out alternative (`logo_coloured__no_bg.svg`) is kept in the code but unused — both are annotated "Fishbone logo (red)."

### Team

The `team` array currently holds **one member** (though it's structured as a list, so it can be extended):

| Field | Value |
|---|---|
| Name | Claudio Ciliberti |
| Role | *Fondatore & Maestro Tatuatore* (Founder & Master Tattoo Artist) |
| Experience | 30+ years |
| Specialty tags | Polinesiano, Maori, Tribale, Freehand, Dot Work, Black Work |
| Portraits | Three images used as a carousel; a single `image` field is also kept "for backward compatibility" alongside the `images` array |

**Bio (as written):** *"Dal 1994 porta nel corpo dei suoi clienti l'essenza delle culture tribali di tutto il mondo. I suoi viaggi in Polinesia, Nuova Zelanda e nei luoghi sacri dell'Asia gli hanno permesso di costruire un rapporto autentico con l'arte tribale originale — non semplici copie, ma magie antiche reinterpretate sull'energia di ogni individuo."*

*(Since 1994 he has carried the essence of tribal cultures from around the world onto his clients' bodies. His travels to Polynesia, New Zealand, and sacred sites in Asia let him build an authentic relationship with original tribal art — not simple copies, but ancient magic reinterpreted through each individual's energy.)*

---

## 5. Services & Pricing

15 services total: 7 tattoo services and 8 piercing services. Each has an `id`, a two-digit `index` (01–15), a `category` (`"tattoo"` or `"piercing"`), a customer-facing `duration` string, a numeric `durationMinutes` baseline, and an optional marketing `badge`.

**On pricing:** all prices except three are `"Su Preventivo"` — *quoted only after a consultation*, since tattoo/piercing work is priced by size, complexity, and placement (this exact rationale is stated in the `services` section footnote — see Section 13). The exceptions are the free consultation, the included aftercare, and the fully-bespoke "Wild Tattoo."

**On duration:** the `durationMinutes` field is a scheduling baseline and doesn't always literally match the customer-facing `duration` text — most notably, "Wild Tattoo" displays as **"Variabile"** (Variable) but carries a 120-minute baseline, and "Cura Post-Tatuaggio" displays as **"inclusa"** (included/bundled, no separate duration) but carries a 30-minute baseline.

### 5.1 Tattoo Services

| ID | Name | Price | Duration | Badge | Description |
|---|---|---|---|---|---|
| `wild-tattoo` | Wild Tattoo | Su Misura Globale *(fully custom, worldwide)* | Variabile *(baseline 120 min)* | Leggendario *(Legendary)* | Chiama da qualsiasi parte del mondo e il maestro raggiungerà il tuo luogo per incidere magie antiche sulla tua pelle. Spese di viaggio a carico del cliente. |
| `consultation` | Consulenza | Gratuita *(Free)* | 30 min | Iniziale *(Initial)* | Un primo incontro per conoscersi, studiare l'anatomia e costruire insieme il progetto tribale ideale per il tuo corpo. |
| `tribal-freehand` | Tribale Freehand | Su Preventivo *(by quote)* | da 1 ora *(baseline 60 min)* | Più richiesto *(Most requested)* | Il design viene disegnato a mano libera direttamente sul corpo con il marcatore rosso, seguendo il flusso dei muscoli. Arte viva, non copiata. |
| `polynesian` | Polinesiano & Maori | Su Preventivo | da 2 ore *(baseline 120 min)* | Specialità *(Specialty)* | Vera arte originale di magie antiche. Motivi polinesiaci e maori studiati nel rispetto delle tradizioni culturali e dell'anatomia del cliente. |
| `dot-work` | Dot Work & Black Work | Su Preventivo | da 1 ora *(baseline 60 min)* | — | Puntinatura di precisione e solido blackwork per chi cerca contrasti netti e una resa visiva potente. |
| `cover-up` | Cover-up & Correzioni | Su Preventivo | da 1 ora *(baseline 60 min)* | — | Trasformiamo vecchi tatuaggi in nuove opere tribali. Studio approfondito per una copertura che rispetta la tua pelle. |
| `aftercare` | Cura Post-Tatuaggio | Inclusa *(Included)* | inclusa *(baseline 30 min)* | Inclusa *(Included)* | Istruzioni dettagliate e assistenza continua per la guarigione del tuo tatuaggio. Il rito non finisce con l'ago. |

### 5.2 Piercing Services

| ID | Name | Price | Duration | Badge | Description |
|---|---|---|---|---|---|
| `piercing-orecchio` | Piercing Orecchio | Su Preventivo | 15 min | Popolare *(Popular)* | Piercing professionali all'orecchio: lobo, helix, tragus, conch, industrial. Sterilità assoluta e gioielli titanio medicale di qualità. |
| `piercing-naso` | Piercing Naso/Septum | Su Preventivo | 20 min | — | Piercing al naso (nostril) e septum. Include gioiello in titanio medicale chirurgico e consulenza per la cura post-piercing. |
| `piercing-labbro` | Piercing Labbro | Su Preventivo | 15 min | — | Piercing al labbro: labret, monroe, medusa, snake bites. Procedura sicura con materiali sterili monouso e gioielli certificati. |
| `piercing-lingua` | Piercing Lingua | Su Preventivo | 20 min | — | Piercing alla lingua eseguito con precisione anatomica. Include barbell in titanio e istruzioni dettagliate per la guarigione. |
| `piercing-ombelico` | Piercing Ombelico | Su Preventivo | 20 min | — | Piercing all'ombelico con studio della conformazione anatomica. Gioielli anallergici in titanio medicale con design eleganti. |
| `piercing-sopracciglio` | Piercing Sopracciglio | Su Preventivo | 15 min | — | Piercing al sopracciglio con posizionamento studiato per valorizzare lo sguardo. Materiali certificati e massima igiene. |
| `piercing-capezzolo` | Piercing Capezzolo | Su Preventivo | 25 min | — | Piercing al capezzolo eseguito con esperienza e professionalità. Procedura delicata con attenzione massima alla sterilità. |
| `piercing-cambio-gioiello` | Cambio Gioiello | Su Preventivo | 10 min | Servizio *(Service)* | Cambio gioiello professionale per qualsiasi tipo di piercing. Verifica dello stato di guarigione e pulizia inclusa. |

---

## 6. Flash Designs Shop — "Disegni"

This is the site's genuine e-commerce component: **43 pre-drawn flash tattoo designs**, sold as ready-made prints rather than custom consultations.

- **Price:** every design is listed at **20** flat (the field is a plain number with no currency symbol in the config; given the studio's Italian locale, this is presumed to be **€20** — flagged here as an inference, not a literal value in the file).
- **Size:** every design is sized **A4 (21 × 29,7 cm)**.
- **Discounts:** `originalPrice` is `null` for all 43 items — no design is individually marked down.
- **Bulk discount (from the `discount` config):**

  | Setting | Value |
  |---|---|
  | Enabled | `true` |
  | Discount | 15% |
  | Minimum items | 3 |
  | Message template | `"Acquista {minItems} o più disegni e ricevi automaticamente il {percentage}% di sconto sul totale!"` |
  | Resolved example | "Acquista 3 o più disegni e ricevi automaticamente il 15% di sconto sul totale!" *(Buy 3 or more designs and automatically get 15% off the total!)* |

- **Categories:** 8 style categories, 43 designs total —

  | Category | Count |
  |---|---|
  | Polinesiano (Polynesian) | 13 |
  | Marino (Marine/nautical) | 8 |
  | Siciliano (Sicilian) | 7 |
  | Black Work | 7 |
  | Geometrico (Geometric) | 3 |
  | Tribale (Tribal) | 2 |
  | Natura (Nature) | 2 |
  | Sardo (Sardinian) | 1 |

### 6.1 Polinesiano (13)

| ID | Name | Badge | Description |
|---|---|---|---|
| `polinesiano-001` | Honu & Tiki Maschera | Popolare | Foglio flash polinesiano-maori: tartaruga honu simmetrica con koru e, sotto, una maschera tiki circondata da onde e uncini. Arte sacra originale. |
| `polinesiano-002` | Bande & Tiki Profile | — | Panel con profilo tiki che scende in triangoli (denti di squalo) e bande verticali: spirali koru, clessidre e zigzag. Ideale per avambraccio o polpaccio. |
| `polinesiano-003` | Tiki Solare & Gecko | — | Semisfera solare con doppia maschera tiki (due paia d'occhi) al centro, raggi dentati e geometria esterna. In basso un gecko interamente decorato in stile tribale. |
| `polinesiano-004` | Grande Tiki & Delfino | Bestseller | Design triangolare per petto o spalla: tiki centrale con occhi ovali e bocca larga, onde simmetriche e bordi frastagliati. Più in basso, delfino decorato con spirali interne. |
| `zodiac-001`* | Zodiac Polinesiano | Popolare | Tutti e 12 i segni zodiacali riletti come creature polinesiane: Toro-squalo, Ariete-medusa, Scorpione-anglerfish, Acquario-razza, Capricorno-nautilus, e così via. Ognuno su misura. |
| `polinesiano-005` | Sleeve Tiki Maestoso | Bestseller | Pezzo verticale per manica o polpaccio: profilo tiki dominante a destra, colonne di bande kurvilinee con weave, triangoli e onde negative a sinistra. Ancoraggio con volti centrali. |
| `polinesiano-006` | Panel Tribale & Delfino | Premium | Imponente panel verticale a tre colonne (curve con volto, loop a C, onde e triangoli a destra) per petto, schiena o coscia. In basso delfino tribale stilizzato rivolto a sinistra. |
| `polinesiano-007` | Sleeve Koru & Tiki Mask | Bestseller | Grande pezzo per manica o gamba: metà sinistra con onde koru e weave interni, metà destra con bande di triangoli. Uccello/manta in picchiata sopra e tiki mask a forma di tartaruga in basso. |
| `polinesiano-008` | Spine Piece: Tartaruga & Frangipani | Premium | Eleganissimo pezzo per la schiena: tartaruga centrale integrata in struttura verticale di spearhead e sunburst. Ai lati, viti di frangipani e due farfalle tribali dettagliate. Per chi cerca il massimo. |
| `polinesiano-009` | Croce Tiki & Armband | — | In alto: emblema a croce con stella centrale e quattro tiki che guardano ai punti cardinali, raggi a spearhead. In basso: band rettangolare con due tiki speculari su base a denti di squalo. |
| `polinesiano-010` | Tartaruga Petto & Addome | Bestseller | Pezzo arcuato per petto/schiena: grande tartaruga tribale le cui pinne si fondono con tiki che guardano a destra e sinistra. Sotto: panel curvo per lombi con ventaglio solare e onde speculari. |
| `polinesiano-012` | Panel Verticale Tribale | — | Composizione mista: piccola banda orizzontale, arco semi-circolare con fiore interno, quadrato diagonale bianco su koru, e lungo panel verticale con onde interlacciate, spearhead e volti astratti. |
| `polinesiano-013` | Sleeve 3D — Matita | Premium | Eccezionale disegno a grafite che simula un tatuaggio sleeve in 3D: strati sovrapposti di weave, bande a denti di squalo, spearhead e un occhio-maschera in cima. Realismo tattile e profondità visiva unici. |

*\* `zodiac-001`'s ID references "zodiac," but its `category` field is `"Polinesiano"` — listed here per that field, per the source of truth.*

### 6.2 Marino / Marine (8)

| ID | Name | Badge | Description |
|---|---|---|---|
| `marino-001` | Squalo, Orca & Capodoglio | Popolare | Foglio marino con tre creature: squalo martello dall'alto (weave e spearhead), orca di profilo con geometria lineare, capodoglio frontale con elementi polinesiani classici. |
| `marino-002` | Creature Marine & Rettili | — | Cinque soggetti tribali su un foglio: gecko dai piedi arricciati, squalo dall'alto, tartaruga circolare, manta ray con tiki incorporato e pesce spada che scende. Classici polinesiani. |
| `marino-003` | Polpo, Tiki & Sicilia | — | Mix di soggetti: polpo con tentacoli avvolgenti e testa-maschera, piccolo tiki rotondo, mappa Sicilia su ventaglio solare, volto in corona d'alloro e due coltelli tribali sovrapposti. |
| `marino-005` | Flash Squali | — | Cinque pesci tribali: piccolo squalo aggressivo, grande squalo bianco pieno di weave, pesce spada, coppia hammerhead+squalo con volto centrale, e cavalluccio marino intrecciato a fishhook. |
| `marino-007` | Tartaruga, Gecko & Delfini | — | Foglio marino: grande tartaruga in alto, due gecko sui lati sinistri, cavalluccio marino a destra e tre delfini stilizzati in picchiata in basso. Tutti riempiti con geometrie polinesiane. |
| `marino-010` | Honu, Gecko & Delfino | Popolare | Foglio flash tribale con quattro creature: tartaruga honu in alto con motivi polinesiani intrecciati, gecko sulla sinistra, delfino saltante al centro decorato con spirali interne, e lucertola in basso a destra. |
| `marino-011` | Tre Balene Tribali Vol.2 | Popolare | Variante fotografica del foglio balene: capodoglio in alto con bocca spalancata e denti, balenottera di profilo al centro con pattern geometrici lineari, megattera in basso con solchi gutturali stilizzati. Tutti in stile maori-polinesiano. |
| `marino-012` | Honu, Delfini & Sole | Nuovo | Foglio marino polinesiano con quattro elementi: grande tartaruga honu in alto con geometrie tribali intrecciate, sole mandala circolare a destra, due delfini stilizzati al centro decorati con weave e spirali, e creatura marina in basso. Classici dell'arte tribale del Pacifico. |

### 6.3 Siciliano / Sicilian (7)

| ID | Name | Badge | Description |
|---|---|---|---|
| `siciliano-001` | Flash Siciliano Vol.1 | Nuovo | Quattro motivi tribali siciliani: Trinacria con Medusa e gambe stilizzate, vaso tradizionale con bande, grande fishhook Hei Matau e cuore con mappa della Sicilia e plumerie. |
| `siciliano-002` | Flash Siciliano Vol.2 | — | Due mappe tribali della Sicilia con weave e volti, serpente intrecciato a pugnale (lettera S), cornicello decorato con geometrie tribali. Arte identitaria siciliana. |
| `siciliano-003` | Flash Siciliano Vol.3 | — | Iconografia siciliana tribale: ruota di carretto con raggi decorati, coppola con intrecci, cuore con ibisco e Sicilia, piccolo carretto, bastone con volto e cavallo bardato. |
| `siciliano-004` | Flash Siciliano Vol.4 | — | Cinque elementi: mappa Sicilia geometrica con scritta, cuore con plumerie tribali, emblema con teste di uccelli gemelle su ruota, Trinacria stilizzata e seconda mappa densa. |
| `siciliano-009` | Coltelli Serramanico Siciliani | Nuovo | Foglio con numerosi coltelli a serramanico siciliani in posizioni variegate (aperti, chiusi, di profilo), ciascuno interamente riempito con geometrie tribali polinesiane — denti di squalo, weave e bande intrecciate. Cornici barocche agli angoli. Il serramanico, simbolo identitario siciliano, reinterpretato in chiave tribale. |
| `siciliano-010` | Flash Siciliano Vol.5 | — | Foglio siciliano con sei motivi tribali: grande ruota di carretto con raggi decorati (in alto a sinistra), ampia forma organica/vaso con intrecci tribali (in alto a destra), piccolo uccello con fiore (centro sinistra), ciondolo ornamentale con pendenti (centro), carretto siciliano in medaglione circolare (basso sinistra) e cavallo bardato con decorazioni tribali (basso destra). |
| `siciliano-008` | Flash Siciliano Vol.3b | — | Vista alternativa del foglio siciliano: ruota di carretto, coppola intrecciata, cuore con mappa e ibisco, piccolo carretto, bastone con volto e cavallo decorato. Variante fotografica del foglio 18. |

### 6.4 Black Work (7)

| ID | Name | Badge | Description |
|---|---|---|---|
| `blackwork-001` | Blackwork Cerchio Sacro | — | Grande blocco rettangolare con cerchio vuoto al centro incorniciato da masse nere simmetriche e bordi a denti di squalo. In basso, frammenti di onde e mezzo mandala. |
| `blackwork-002` | Blackwork Doppio Panel | Premium | Due pesanti panel: rettangolo con ampio cerchio vuoto centrale (sole/vuoto) incorniciato da curve spesse e denti di squalo, e grande V-chest con tiki simmetrico spezzato al centro. |
| `blackwork-003` | Blackwork Doppio Panel Vol.2 | — | Variante fotografica del foglio 19: rettangolo con cerchio solare vuoto e V-chest con tiki speculare. Due grandi pezzi blackwork pesanti per petto, spalle o schiena. |
| `blackwork-004` | Blackwork Chest & Wedge | Premium | Sopra: wedge/spalla con linee massive e spirale koru centrale. Sotto: enorme pezzo petto/schiena con mandala solare e croce interna, circondato da bande di triangoli, archi e geometrie aggressive. |
| `blackwork-005` | Arco Maschera & Panel | — | Sopra: arco curvo sopra un triangolo centrale con linee koru e spearhead — evoca maschera o occhio. Sotto: ampio panel orizzontale con croci sovrapposte, onde speculari e bordo a denti di squalo. |
| `blackwork-006` | Tartaruga Blackwork & Panel | — | Sopra: tartaruga astratta con curve massive e occhi in negativo — pura forza blackwork. Sotto: blocco rettangolare con grande cerchio vuoto al centro, circondato da strati di triangoli, onde e geometria. |
| `blackwork-007` | Scudo Stella 8 Punte | Premium | Design monumentale: singolo scudo semi-circolare altamente simmetrico con stella a 8 punte inscritta in un cerchio al centro. Masse di koru, tagli geometrici e curve aggressive riempiono ogni spazio. |

### 6.5 Geometrico / Geometric (3)

| ID | Name | Badge | Description |
|---|---|---|---|
| `geometrico-001` | Sole, Emblema & Fenice | — | Quattro disegni: sole-croce con core circolare a raggi segmentati, emblema circolare simmetrico, figura otto con maschere, e grande fenice tribale in volo con coda maestosa. |
| `geometrico-002` | Sole Yin-Yang & Fenice | Bestseller | Sole tribale con yin-yang puntinato al centro, bordi a spirale quadrata e raggi di fiamma. Accanto, simbolo meandro angolare. In basso, immensa fenice/araba fenice in pieno volo. |
| `geometrico-003` | Cinque Mandala Tribali | — | Cinque cerchi: onde-uccelli astratti, labirinto con croce in negativo, sole con cuore interno, mandala complesso con raggi e volti, piccolo cerchio con forma geometrica centrale. |

### 6.6 Tribale / Tribal (2)

| ID | Name | Badge | Description |
|---|---|---|---|
| `tribale-001` | Manta & Banda Geometrica | — | Due elementi: creatura manta/pterosauro in volute nere con lancia orizzontale, e ampia banda simmetrica con fiore lotus, koru e triangoli. Versatile. |
| `tribale-004` | Coltelli Serramanico Tribali | Popolare | Foglio con nove coltelli a serramanico in diverse posizioni (aperti, semi-aperti, chiusi), disposti in modo sparso sulla pagina. Ogni lama e manico è interamente riempito di geometrie tribali polinesiane, denti di squalo e weave intrecciati. |

### 6.7 Natura / Nature (2)

| ID | Name | Badge | Description |
|---|---|---|---|
| `natura-001` | Natura Tribale | Popolare | Foglio natura polinesiana: due loti (uno in fiore, uno chiuso), due rondini con ali spiegate, due farfalle, un quadrifoglio e plumerie stellate. Tutto in geometrie tribali fini. |
| `natura-003` | Viti Floreali & Farfalle | Popolare | Linee fluenti per avvolgere gli arti: swoosh decorati con denti di squalo, frangipani e ibisco. Simbolo infinito con fiore incorporato, due farfalle tribali dettagliate e motivo lancia centrale. |

### 6.8 Sardo / Sardinian (1)

| ID | Name | Badge | Description |
|---|---|---|---|
| `sardo-001` | Flash Sardo | Nuovo | Arte identitaria sarda: teschio in alloro, coltello resolza intrecciato, mappa con croce rossa dei Quattro Mori e teste tribali, più seconda mappa interamente riempita di geometrie. |

---

## 7. Galleries

### 7.1 Tattoo Gallery (18 items — 16 photos, 2 videos)

| # | Label | Alt text | Media |
|---|---|---|---|
| 1 | Polinesiano | Tatuaggio polinesiano freehand | Photo |
| 2 | Maori | Tatuaggio maori su braccio | Photo |
| 3 | Dot Work | Dot work tribale geometrico | Photo |
| 4 | Black Work | Black work tribale su schiena | Photo |
| 5 | Lo Studio | Studio | **Video** (`studio.mp4`) |
| 6 | Full Sleeve | Tatuaggio tribale full sleeve | Photo |
| 7 | Freehand | Dettaglio freehand tribale | Photo |
| 8 | Polinesiano | Tatuaggio Polinesiano su petto | Photo |
| 9 | Polinesiano | Tatuaggio polinesiano su spalla | Photo |
| 10 | Maori | Tatuaggio maori su gamba | Photo |
| 11 | Tribale | Tatuaggio tribale geometrico su braccio | Photo |
| 12 | Black Work | Tatuaggio black work tribale su petto | Photo |
| 13 | Freehand | Tatuaggio tribale freehand su schiena | Photo |
| 14 | Face Tattoo | Face Tattoo | Photo |
| 15 | Total Body | Tatuaggio in tutto il corpo - vista frontale | Photo |
| 16 | Total Body | Tatuaggio in tutto il corpo - vista laterale | Photo |
| 17 | Total Body | Tatuaggio in tutto il corpo - vista posteriore | Photo |
| 18 | Il Rito | Video del processo di tatuaggio | **Video** (`Progetto video 3.mp4`) |

*"Il Rito" ("The Ritual") is a video showing the tattooing process itself — useful to mention if a customer asks whether they can see what a session looks like.*

### 7.2 Piercing Gallery (14 photos — explicitly placeholders)

The source code marks this entire array with the comment `// TODO: Replace with real piercing photos`. Additionally, each entry's `label` (shown to visitors) doesn't match its own `alt` text (internal description) — the two consistently name different piercing types or body parts:

| # | Label (shown on site) | Alt text (internal) |
|---|---|---|
| 1 | Ombelico | Piercing orecchio - placeholder |
| 2 | Braccio | Piercing naso - placeholder |
| 3 | Sopracciglio | Piercing sopracciglio - placeholder |
| 4 | Lingua | Piercing labbro - placeholder |
| 5 | Collo | Piercing lingua - placeholder |
| 6 | Orecchio | Piercing ombelico - placeholder |
| 7 | Orecchio | Studio piercing - placeholder |
| 8 | Bocca | Piercing industriale - placeholder |
| 9 | Braccio | Piercing trago - placeholder |
| 10 | Orecchio | Piercing helix - placeholder |
| 11 | Orecchio | Piercing septum - placeholder |
| 12 | Ombelico | Piercing surface - placeholder |
| 13 | Sopracciglio | Piercing surface - placeholder |
| 14 | Capezzolo | Piercing surface - placeholder |

**Do not treat either column as a reliable description of what a given photo actually shows** (see Section 3 and Section 15).

---

## 8. Customer Testimonials

24 testimonials, attributed only by initials. The source carries a developer comment above this list — `// ← Replace / add with real reviews from Google / social` — suggesting it may be extended over time; the specificity of the quotes below (particular piercing experiences, tenure, a mention of a tattooed iris) suggests these are genuine reviews already in place rather than placeholder text.

- **F. T.** — "Centro aperto da 30 anni: igiene, pulizia e professionalità al TOP. Non perdetevi nella jungla dei tatuatori!"
- **A. M.** — "5 anni fa il piercing all'ombelico, soddisfatta al 100%. Oggi ci ho portato mia sorella — sapevo già dove andare: TRIBAL TATTOO! Professionalità e attenzione al cliente GARANTITE. CONSIGLIATISSIMO!"
- **C. L.** — "Uscita soddisfatta e contenta. Professionali, competenti, posto pulito. Vivamente consigliato!"
- **G.** — "Titolare bravissimo e professionale, vere opere d'arte. Ho già 3 tatuaggi stupendi — tornerò sicuramente!"
- **C. S.** — "Simpatici, spiegano tutto e consigliano. Davvero bravi."
- **M. T.** — "Piercing all'ombelico: grande professionalità, pulizia e gentilezza."
- **C. C.** — "Il tempio del tattoo e del piercing, vasta gioielleria da piercing."
- **F. S.** — "Titolare gentile, simpatico e competente. Locale particolare e a tema. Super consigliato."
- **G. T.** — "Accogliente, pulito, personale competente. Buoni prezzi, da consigliare!"
- **A. R.** — "Proprietario gentile, ti spiega tutto nei minimi dettagli. Ho 3 tattoo bellissimi. Luogo accogliente."
- **V. L.** — "Negozio pulito, personale gentile ed esperto, buoni prezzi."
- **M. M.** — "Professionali ed estremamente puliti! Piercing fatto meno di una settimana fa — mi sembra di averlo da una vita. Grandiiiii!"
- **I. M.** — "Piercing ombelico: bravissimo, zero dolore e zero infiammazione. Consigliatissimo!"
- **M. B.** — "Molto bravi. Titolare con iride tatuata — uno dei pochi casi!"
- **P. L.** — "Un professionista raro."
- **S. B.** — "Ottimo lavoro, personale preparato, locale pulito."
- **G. B.** — "Competenti, puliti, tutto alla perfezione. Ottimo!"
- **E. S.** — "Professionalità, gentilezza e pulizia ottima."
- **M. V.** — "Vuoi farti 'dipingere' il corpo? Lui è il migliore. Assolutamente SÌ!"
- **P. R.** — "Carino, pulito, prezzi modici."
- **R. S.** — "Professionale e competente."
- **G. V.** — "Professionalità e igiene assoluta. Consigliatissimo."
- **E. M.** — "Professionalità, igiene e bravura."
- **A. H.** — "Claudio è un grande artista: tatuaggi tribali polinesiani impeccabili e colori fantastici. Ricerca la perfezione in tutto ciò che fa."

**Recurring themes:** hygiene/cleanliness, professionalism, the studio's 30-year tenure, and navel piercings come up especially often.

---

## 9. Location, Hours & Contact

| Field | Value |
|---|---|
| Address | Corso Roma, 51 · 10024 Moncalieri TO |
| Neighborhood/quarter | Moncalieri |
| Country | IT (Italy) |
| Coordinates | 44.9980, 7.6863 |
| Price range indicator | `$$` (moderate — a schema.org-style tag, not an itemized price list) |
| Phone | +39 350 535 2680 (tel link: `tel:+393505352680`) |
| Email | tribaltattoo@tribaltattoo.it |

**Opening hours:**

| Days | Hours |
|---|---|
| Monday – Friday (*Lun – Ven*) | 10:00–12:30 and 15:00–19:30 |
| Saturday (*Sabato*) | 09:30–13:00 and 15:00–19:00 |
| Sunday (*Domenica*) | Closed (*Chiuso*) |

The split into two ranges each open day means the studio **closes for a midday break** (roughly 12:30–15:00 on weekdays, 13:00–15:00 on Saturday).

**Google Maps embed URL** (for embedding or verifying the location):
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819!2d7.6863!3d44.9980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ29yc28gUm9tYSA1MSwgTW9uY2FsaWVyaSBUTw!5e0!3m2!1sit!2sit!4v1700000000000
```

---

## 10. Payments

The config defines a PayPal-based **"Diretto"** (Direct) payment option:

> PayPal.me handle: `tribaltattooit`
> Link pattern: `https://paypal.me/tribaltattooit/AMOUNT`

No other payment methods (cash, card, bank transfer, installment services, etc.) are defined anywhere in this file — don't state that other payment methods are or aren't accepted beyond this PayPal.me option, since the file simply doesn't say.

---

## 11. Social Media

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/tribaltattoo |
| Facebook | https://www.facebook.com/TribaltattooItalia |
| YouTube | https://www.youtube.com/@tribaltattooitalia |
| TikTok | https://www.tiktok.com/@tribaltattooitalia?_r=1&_t=ZN-95azfmUBDRG |

*(The Instagram field alone carries a developer `← update` comment — see Section 15.)*

---

## 12. Legal & Company Information

| Field | Value |
|---|---|
| Legal name | Tribal Tattoo Studio |
| Postal address | Corso Roma, 51 – 10024 – Moncalieri (TO) |
| VAT number (P.IVA) | 07519240019 |
| Privacy contact email | tribaltattoo@tribaltattoo.it |
| PEC (certified email) | tribaltattoo@pec.tribaltattoo.it |

Two additional fields — **REA number** and **share capital** — appear only as *commented-out* lines in the source, each holding bracketed Italian placeholder text (`[Inserire Numero REA]` / `[Inserire Capitale Sociale]`). Because they're commented out, they are **not** part of the live `legal` object; don't state a REA number or share capital, since none is actually configured.

**Footer:**

| Field | Value |
|---|---|
| Copyright year | 2025 *(hardcoded string — see Section 15)* |
| Rights text | "All rights reserved" |
| Legal links | Privacy Policy, Cookie Policy, Cookie Settings |

---

## 13. Website Content Reference

*Technical/editorial reference: the literal navigation, homepage, and SEO copy defined in the file.*

### 13.1 Navigation

CTA button label: **"Prenota"** (Book). Seven links, each mapping 1:1 to the seven keys defined under `sections` (Section 13.3):

| Label | Anchor |
|---|---|
| Servizi | `#services` |
| Maestro | `#team` |
| Tattoo | `#gallery` |
| Disegni | `#disegni` |
| Piercings | `#piercings` |
| Recensioni | `#testimonials` |
| Contatti | `#contact` |

### 13.2 Hero Section

| Field | Value |
|---|---|
| Headline (two lines) | "Tribal" / "Tattoo" |
| Subheadline | "Arte tribale originale dal 1994 — ogni segno disegnato a mano sull'energia del tuo corpo." |
| CTA button | "Prenota" |
| Background | Video (`output_web.mp4`) |
| Marquee tags | Polinesiano, Maori, Tribale, Freehand, Dot Work, Black Work, Geometrico, Su Misura |

### 13.3 Section Headings

| Section key | Label | Heading | Extras |
|---|---|---|---|
| `services` | Servizi | "I Nostri" / "Servizi" | Counter label: "Servizi" / "Personalizzati". Footnote: *"Ogni progetto è un rito unico · I preventivi sono personalizzati in base a dimensione, complessità e posizionamento anatomico · Consulenza gratuita"* |
| `team` | Il Maestro | "Chi è il" / "Maestro" | Counter label: "Anni di" / "Esperienza" |
| `testimonials` | Recensioni | "Dicono di noi" | — |
| `gallery` | Gallery | "I nostri" / "Tattoo" | — |
| `piercings` | Piercings | "I nostri" / "Piercings"¹ | — |
| `disegni` | Disegni | "I nostri" / "Disegni" | — |
| `contact` | Contatti | "Vieni a" / "Trovarci" | Sub-labels: Dove Siamo (location), Orari di apertura (hours), Contatti (contact), Social Networks |

*¹ The source literally stores this fragment with a leading space (`" Piercings"`), a likely unintentional typo — inconsequential for meaning, noted for completeness.*

The **services footnote** above is the file's own stated rationale for quote-based pricing — useful to paraphrase directly to customers who ask why prices aren't listed.

### 13.4 SEO & Social-Sharing Metadata

| Field | Value |
|---|---|
| Site URL | https://tribaltattoo.vercel.app |
| Booking URL | https://tribaltattoo.vercel.app *(identical to the site URL — no distinct booking platform is configured)* |
| Locale | it_IT |
| Page title | "Tatuaggi Tribali Moncalieri Torino \| Arte Originale \| Tribal Tattoo" |
| Meta description | "Tatuaggi tribali a Moncalieri (Torino) dal 1994. Arte polinesiaca, maori e tribale originale — non semplici copie. Design freehand su misura, rispettoso dell'anatomia. Consulenza gratuita." |
| Open Graph title | "Tribal Tattoo – Arte Sacra Tribale a Moncalieri, Torino" |
| Open Graph description | "Vera arte originale di magie antiche. Tatuaggi tribali freehand, polinesiaci e maori. Prenota la tua consultazione con il maestro." |
| Open Graph image | `/og-image.jpg` |
| Google Analytics ID | `G-XXXXXXXXXX` *(placeholder — see Section 15)* |

---

## 14. Visual Design System

*Primarily relevant if the assistant is asked to describe the site's look and feel, or is supporting a developer rather than a customer.*

The theme is named in the source comments **"Ossidiana & Oro Tribale"** (Warm Obsidian & Tribal Gold) — a dark theme.

### 14.1 Core Palette (as documented in the file's header comment)

| Role | Name | Hex | HSL |
|---|---|---|---|
| Background | Ossidiana Calda (Warm Obsidian) | #090805 | 40 10% 4% |
| Primary / CTA | Oro Tribale (Tribal Gold) | #B8870B | 43 87% 38% |
| Text | Pergamena (Parchment) | #F2E8CE | 40 52% 87% |
| Accent / focus ring | Terracotta Scura (Dark Terracotta) | #7A2E1A | 12 62% 29% |
| Card & surfaces | Superficie Calda (Warm Surface) | #130D02 | 40 85% 5%* |

*\* See Section 15 — the implemented `card` token value differs slightly from this documented figure.*

### 14.2 Typography

| Role | Font | Weights loaded |
|---|---|---|
| Heading | Cinzel | 400, 700, 900 |
| Body | Raleway | 300, 400, 500, 700 |

Per the file's own comment, **Cinzel** was chosen to evoke Roman stone inscriptions — "heavy, carved, ancestral" — fitting a tribal brand, while **Raleway** is geometric and warm enough not to clash. Fonts load via:
```
https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Raleway:wght@300;400;500;700&display=swap
```

### 14.3 Other Theme Settings

- **Border radius:** `0px` — sharp corners throughout, described in-file as a deliberate "raw, uncompromising aesthetic."

### 14.4 Full Color Token Table

All values are HSL triplets (hue, saturation, lightness) for use in `hsl(...)` CSS:

| Token | HSL | Token | HSL |
|---|---|---|---|
| `background` | 40 10% 4% | `border` | 40 22% 14% |
| `foreground` | 40 52% 87% | `input` | 40 18% 11% |
| `card` | 40 70% 5% | `ring` | 12 62% 29% |
| `cardForeground` | 40 52% 87% | `gridPattern` | 40 22% 14% |
| `popover` | 40 60% 5% | `primaryGlow` | 43 87% 38% |
| `popoverForeground` | 40 52% 87% | `shadowLight` | 0 0% 0% |
| `primary` | 43 87% 38% | `shadowDark` | 0 0% 0% |
| `primaryForeground` | 40 80% 8% | `sidebarBackground` | 40 60% 5% |
| `secondary` | 40 25% 11% | `sidebarForeground` | 40 52% 87% |
| `secondaryForeground` | 40 52% 87% | `sidebarPrimary` | 43 87% 38% |
| `muted` | 40 18% 10% | `sidebarPrimaryForeground` | 40 80% 8% |
| `mutedForeground` | 40 20% 48% | `sidebarAccent` | 40 18% 10% |
| `accent` | 43 87% 38% | `sidebarAccentForeground` | 40 52% 87% |
| `accentForeground` | 40 80% 8% | `sidebarBorder` | 40 22% 14% |
| | | `sidebarRing` | 43 87% 38% |

---

## 15. Data Quality Notes & Open Items

Observations for whoever maintains this site or this knowledge base — flagged directly from source comments and cross-field comparisons, not speculation:

1. **Google Analytics isn't actually connected.** `meta.googleAnalyticsId` is the literal placeholder `"G-XXXXXXXXXX"`, not a working tracking ID.
2. **Several fields still carry "please update" reminder comments despite already holding values** — worth confirming these are final before treating them as authoritative: `author.name` / `team[0].name` ("← update with CEO's name" — the same real name appears in both places), `contact.email` and `legal.privacyEmail` ("← update with real email"), `legal.legalName` ("← update with legal entity"), `social.paypalMeHandle` ("← update with your PayPal.me handle"), and `social.instagram` ("← update").
3. **`legal.reaNumber` and `legal.shareCapital` are commented out**, each holding bracketed Italian placeholder text ("[Inserire Numero REA]" / "[Inserire Capitale Sociale]"). They are not part of the live configuration.
4. **All 14 piercing gallery photos are explicit placeholders** (`// TODO: Replace with real piercing photos`), and each entry's `label` and `alt` text name different piercing types — see the full comparison table in Section 7.2.
5. **Testimonials carry a "replace/add more" comment**, though their specificity suggests they're real reviews already in use rather than filler (see Section 8).
6. **Theme color mismatch:** the header comment documents the "card & superfici" role as HSL `40 85% 5%`, but the implemented `theme.colors.card` value is `40 70% 5%` — the shipped value doesn't quite match the documented design intent.
7. **Minor typo:** `sections.piercings.heading`'s second text fragment is coded as `" Piercings"` with a leading space.
8. **Copyright year is hardcoded** (`footer.copyrightYear: "2025"`) rather than computed from the current date, so it will need a manual update each year.
9. **An unused alternate logo exists in code:** a commented-out SVG import (`logo_coloured__no_bg.svg`, a colored version) sits alongside the active PNG logo; both are annotated as the "Fishbone logo (red)," confirming the brand mark's motif and color even though only one file is actually in use.
10. **No distinct booking platform:** `meta.bookingSiteUrl` is identical to `meta.siteUrl`.
11. **Currency is never explicitly declared:** the `disegni` `price`/`originalPrice` fields are plain numbers; this document assumes EUR based on the studio's Italian locale, but the config itself never states a currency unit.

---

*End of knowledge base. Sourced exclusively from `shopConfig.ts`; see Section 15 for known gaps before treating any flagged field as final.*
