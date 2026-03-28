# !!!📋 DEPLOYMENT FOR EACH NEW BARBERSHOP CLIENT 📋!!!!

## 1. shopConfig.ts ⭐ **MAIN FILE**
```typescript
// Update ALL sections for each client:
- name, fullName, city, established
- meta.siteUrl ← CRITICAL (e.g., "https://clientdomain.com")
- meta.locale (e.g., "en_US", "it_IT")
- meta.title, description, ogTitle, ogDescription
- contact.countryCode ← CRITICAL (e.g., "US", "IT", "GB")
- contact.priceRange ← CRITICAL (e.g., "$$")
- contact.geo (optional lat/lng)
- contact.addressLines, quarter, phone, email
- contact.googleMapsEmbedUrl
- services[] array
- team[] array
- testimonials[] array
- hours[] array
- social links
- legal info (if Italian company)
- theme.colors.primary (if custom brand color)
- theme.fonts (if custom fonts)
```

## 2. Replace Images in assets
```
hero-bg.jpg       ← Client's hero background
barber-1.jpg      ← Team member photos
barber-2.jpg
barber-3.jpg
gallery-1.jpg     ← Shop/work photos
gallery-2.jpg
gallery-3.jpg
gallery-4.jpg
gallery-5.jpg
gallery-6.jpg
```

## 3. Add to public
```
og-image.jpg      ← Social sharing image (1200x630px)
```

## 4. Update Static Files (manual)
```
public/sitemap.xml    ← Replace all "thegentry.com" with client domain
public/sitemap.xml    ← Update lastmod dates
public/robots.txt     ← Update Sitemap URL
```

## 5. Update .env
```bash
VITE_SUPABASE_URL=client_supabase_url
VITE_SUPABASE_ANON_KEY=client_supabase_key
```

## 6. Set Up Supabase Database
Run all migrations in supabase folder in order.

## 7. SEO & Visibility Setup

### 7.1 Google Search Console
1. Go to https://search.google.com/search-console
2. Click "Add property" → choose "URL prefix"
3. Enter the client's domain (e.g., `https://www.clientdomain.it`)
4. Copy the `<meta name="google-site-verification" content="XXXXXXX" />` tag
5. Paste it in `SeoHead.tsx` inside `<Helmet>`, right after `<title>`
6. Deploy to Vercel/Netlify
7. Click "Verify" in Search Console
8. Go to Sitemaps → submit `sitemap.xml`
9. Wait 24–48h for Google to crawl the site

### 7.2 Google Business Profile ⭐ HIGHEST IMPACT FOR LOCAL SEO
1. Go to https://business.google.com
2. Create or claim the business profile
3. Set category: "Barbiere" (or "Barber Shop")
4. Add exact address, phone, hours — must match `shopConfig` exactly (NAP consistency)
5. Upload at least 10 photos (interior, exterior, team, work)
6. Add all services with prices
7. Enable booking link if available
8. Ask first customers for Google reviews immediately after launch


### 7.3 Google Analytics 4
1. Go to https://analytics.google.com
2. Create a new GA4 property for the client
3. Copy the Measurement ID (e.g., `G-XXXXXXXXXX`)
4. Open `src/main.tsx` and update the `GA_MEASUREMENT_ID` placeholder in the `loadGA4()` function with the real value:
  ```ts
  // src/main.tsx
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ← Replace with real ID
  ```
5. **Do NOT** add GA4 scripts to `index.html` — the codebase loads GA4 dynamically **only if the user accepts analytics cookies** (privacy compliant).
6. GA4 will be loaded automatically after consent, or on first load if consent is already given.
7. Link GA4 to Search Console:
  GA4 → Admin → Search Console Links → Add

### 7.4 Validation & Testing
Run all of these before going live:

| Tool | URL | What to check |
|------|-----|---------------|
| Google Rich Results | https://search.google.com/test/rich-results | JSON-LD schemas valid |
| Schema Validator | https://validator.schema.org | No errors on LocalBusiness |
| Facebook Debugger | https://developers.facebook.com/tools/debug | og:image renders correctly |
| PageSpeed Insights | https://pagespeed.web.dev | Score > 90 mobile |
| Mobile-Friendly Test | https://search.google.com/test/mobile-friendly | No issues |

### 7.5 Italian Directory Citations (🇮🇹 Italy only)
Submit the business NAP (Name, Address, Phone) to:
- **Pagine Gialle** — https://www.paginegialle.it
- **TripAdvisor** — https://www.tripadvisor.it
- **Apple Maps** — https://mapsconnect.apple.com
- **Bing Places** — https://www.bingplaces.com
- **Yelp Italy** — https://www.yelp.it
- **Foursquare** — https://foursquare.com

⚠️ NAP must be identical across all platforms and `shopConfig.contact`

### 7.6 Post-Launch Checklist
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Google Business Profile live with photos
- [ ] GA4 tracking active
- [ ] Rich Results Test — no errors
- [ ] Schema Validator — no errors
- [ ] Facebook Debugger — og:image renders correctly
- [ ] PageSpeed mobile score > 90
- [ ] Google Maps embed working
- [ ] Cookie consent banner working
- [ ] Booking flow tested end-to-end
- [ ] hreflang correct in Search Console
- [ ] First 5 Google reviews requested from real customers

## 8. Post-Launch Checklist
- [ ] Testa su mobile (PageSpeed Insights)
- [ ] Verifica hreflang con Google Search Console
- [ ] Controlla che JSON-LD sia valido (Schema Validator)
- [ ] Verifica og:image con Facebook Debugger
- [ ] Testa il form di prenotazione
- [ ] Verifica Google Maps embed funzionante
- [ ] Cookie consent funzionante