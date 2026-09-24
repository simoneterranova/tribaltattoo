// Test sugli invarianti del discovery automatico delle convention.
// Valgono per QUALSIASI contenuto di src/assets/convention-photos/:
// se aggiungi copertine, questi controlli continuano a passare.
import { describe, it, expect } from "vitest";
import {
  buildConventionEvents,
  hasConventionPhotos,
  isConventionVideo,
} from "./conventionPhotos";

describe("convention discovery", () => {
  it("ogni evento ha id univoco, src valido e gallery senza copertine", () => {
    const events = buildConventionEvents();
    const ids = events.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of events) {
      expect(e.src.length).toBeGreaterThan(0);
      expect(e.label.length).toBeGreaterThan(0);
      expect(e.gallery.every((g) => !/copertina_/i.test(g))).toBe(true);
      expect(e.gallery).not.toContain(e.src);
    }
  });

  it("rileva la copertina reale di Catanzaro", () => {
    expect(hasConventionPhotos()).toBe(true);
    const events = buildConventionEvents({
      catanzaro_2026: { label: "Catanzaro 2026", city: "Catanzaro" },
    });
    const catanzaro = events.find((e) => e.id === "catanzaro_2026");
    expect(catanzaro).toBeDefined();
    expect(catanzaro!.src).toContain("copertina_catanzaro_2026");
    expect(catanzaro!.label).toBe("Catanzaro 2026");
  });

  it("deriva i testi dallo slug senza override", () => {
    const events = buildConventionEvents();
    const catanzaro = events.find((e) => e.id === "catanzaro_2026");
    expect(catanzaro?.label).toBe("Catanzaro 2026");
    expect(catanzaro?.city).toBe("Catanzaro");
    expect(catanzaro?.date).toBe("Edizione 2026");
  });

  it("isConventionVideo distingue foto e video", () => {
    expect(isConventionVideo("clip.mp4")).toBe(true);
    expect(isConventionVideo("foto.webp")).toBe(false);
  });

  it("gli id evento sono sicuri come slug URL (/convention/:slug)", () => {
    const events = buildConventionEvents();
    for (const e of events) {
      expect(e.id).toMatch(/^[a-z0-9_-]+$/);
    }
  });
});
