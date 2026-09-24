// ╔══════════════════════════════════════════════════════════════╗
 // ║     CONVENTION — DISCOVERY AUTOMATICA DA                     ║
 // ║     src/assets/convention-photos/ (e solo da lì)             ║
 // ║                                                              ║
 // ║  CONVENZIONE NOMI FILE (tutto automatico, senza toccare      ║
 // ║  codice quando aggiungi un evento):                          ║
 // ║                                                              ║
 // ║  1. COPERTINA (obbligatoria — crea la card):                 ║
 // ║       copertina_<slug>.<ext>                                ║
 // ║     es. copertina_catanzaro_2026.webp  →  evento             ║
 // ║         "catanzaro_2026"                                     ║
 // ║                                                              ║
 // ║  2. FOTO GALLERY (opzionali — finiscono nella pagina         ║
 // ║     /convention sotto la card dell'evento):                  ║
 // ║       <slug>_<qualcosa>.<ext>   oppure   <slug>-<...>.<ext>  ║
 // ║     es. catanzaro_2026_01.webp, catanzaro_2026-live.mp4      ║
 // ║     (in alternativa: mettile in una sottocartella            ║
 // ║      convention-photos/<slug>/ con qualsiasi nome)           ║
 // ║                                                              ║
 // ║  3. TESTI (opzionali): label/città/data/descrizione vengono  ║
 // ║     derivati dallo slug ("catanzaro_2026" → "Catanzaro       ║
 // ║     2026"); per testi curati aggiungi un override in         ║
 // ║     shopConfig.conventionMeta con chiave = slug.             ║
 // ║                                                              ║
 // ║  Formati: .webp .jpg .jpeg .png .mp4 .webm .mov              ║
 // ╚══════════════════════════════════════════════════════════════╝

export interface ConventionMeta {
  label?: string;
  city?: string;
  date?: string;
  description?: string;
  alt?: string;
}

export interface ConventionEvent {
  id: string;
  src: string;
  alt: string;
  label: string;
  city: string;
  date: string;
  description: string;
  gallery: string[];
}

// Vite: importa EAGER tutti i file della cartella (anche sottocartelle).
// Nota: il glob deve restare un literal statico (non variabile).
const conventionModules = import.meta.glob(
  "../assets/convention-photos/**/*.{webp,jpg,jpeg,png,mp4,webm,mov}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

interface DiscoveredFile {
  url: string;
  fileName: string; // es. "copertina_catanzaro_2026.webp"
  dirName: string; // es. "catanzaro_2026" se in sottocartella, altrimenti ""
}

const discovered: DiscoveredFile[] = Object.entries(conventionModules).map(
  ([path, url]) => {
    const parts = path.split("/");
    const fileName = parts.pop() ?? path;
    const dirName = parts.length > 0 ? parts[parts.length - 1] : "";
    return { url, fileName, dirName };
  }
);

const COVER_RE = /^copertina_(.+)\.(webp|jpe?g|png|mp4|webm|mov)$/i;
const YEAR_RE = /^(19|20)\d{2}$/;

/** Normalizza per i confronti: minuscole, trattini/underscore unificati. */
function norm(s: string): string {
  return s.toLowerCase().replace(/[-_]+/g, "_");
}

function humanizeToken(token: string): string {
  return token
    .split(/[-_]+/)
    .filter(Boolean)
    .map(
      (w) => w.charAt(0).toLocaleUpperCase("it-IT") + w.slice(1).toLocaleLowerCase("it-IT")
    )
    .join(" ");
}

function eventYear(slug: string): number | null {
  for (const token of slug.split(/[-_]+/)) {
    if (YEAR_RE.test(token)) return parseInt(token, 10);
  }
  return null;
}

/**
 * Costruisce la lista eventi: un evento per ogni copertina trovata.
 * Deduplica per slug (stesso evento in root e sottocartella → una sola
 * card, preferendo la copertina dentro la cartella omonima).
 * @param meta override testuali opzionali (chiave = slug), da shopConfig.
 */
export function buildConventionEvents(
  meta: Record<string, ConventionMeta> = {}
): ConventionEvent[] {
  // Raggruppa le copertine per slug normalizzato.
  const coversBySlug = new Map<string, DiscoveredFile[]>();
  for (const file of discovered) {
    const match = file.fileName.match(COVER_RE);
    if (!match) continue;
    const key = norm(match[1]);
    if (!coversBySlug.has(key)) coversBySlug.set(key, []);
    coversBySlug.get(key)!.push(file);
  }

  const events: ConventionEvent[] = [];

  for (const [key, covers] of coversBySlug) {
    // Preferisci la copertina dentro la cartella omonima (es. catanzaro-2026/),
    // altrimenti la prima trovata. Lo slug resta quello del nome file.
    const cover =
      covers.find((c) => norm(c.dirName) === key) ?? covers[0];
    const slug = cover.fileName.match(COVER_RE)![1].toLowerCase();
    const override = meta[slug] ?? meta[key] ?? {};
    const year = eventYear(slug);

    // Gallery: file con prefisso "<slug>_" / "<slug>-" (separatore
    // indifferente) oppure dentro la cartella omonima. Mai la copertina.
    const gallerySet = new Set<string>();
    for (const f of discovered) {
      if (covers.some((c) => c.url === f.url)) continue;
      const name = norm(f.fileName);
      if (name.startsWith(`${key}_`) || name.startsWith(`${key}-`)) {
        gallerySet.add(f.url);
        continue;
      }
      if (norm(f.dirName) === key && !COVER_RE.test(f.fileName)) {
        gallerySet.add(f.url);
      }
    }
    const gallery = [...gallerySet].sort((a, b) =>
      a.localeCompare(b, "it", { numeric: true })
    );

    const label = override.label ?? humanizeToken(slug);
    const cityTokens = slug.split(/[-_]+/).filter((t) => !YEAR_RE.test(t));
    const city = override.city ?? humanizeToken(cityTokens.join("_") || slug);

    events.push({
      id: slug,
      src: cover.url,
      alt: override.alt ?? `Copertina — ${label}`,
      label,
      city,
      date: override.date ?? (year ? `Edizione ${year}` : "Date da annunciare"),
      description:
        override.description ??
        "Sessione live, consulenze gratuite e flash esclusivi disegnati per l'evento. Vieni a conoscerci dal vivo.",
      gallery,
    });
  }

  // Più recenti prima (anno desc), poi alfabetico.
  events.sort((a, b) => {
    const ya = eventYear(a.id);
    const yb = eventYear(b.id);
    if (ya !== null || yb !== null) return (yb ?? -1) - (ya ?? -1);
    return a.label.localeCompare(b.label, "it");
  });

  return events;
}

/**
 * Risolve un singolo nome file in URL (retro-compatibilità).
 * @returns URL se il file esiste in convention-photos, altrimenti "".
 */
export function conventionPhoto(fileName: string): string {
  const found = discovered.find(
    (f) => f.fileName.toLowerCase() === fileName.toLowerCase()
  );
  return found?.url ?? "";
}

/** True se la cartella contiene almeno una copertina (quindi un evento). */
export function hasConventionPhotos(): boolean {
  return discovered.some((f) => COVER_RE.test(f.fileName));
}

/** True se il src è un video. */
export function isConventionVideo(src: string): boolean {
  const s = src.toLowerCase();
  return s.endsWith(".mp4") || s.endsWith(".webm") || s.endsWith(".mov");
}
