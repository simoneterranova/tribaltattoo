// ╔══════════════════════════════════════════════════════════════╗
 // ║     CONVENTION SECTION (HOMEPAGE TEASER)                     ║
 // ║     Pattern: teaser in homepage + pagina dedicata /convention║
 // ║     AUTOMATICO: le card nascono dalle copertine              ║
 // ║     copertina_<slug> in src/assets/convention-photos/        ║
 // ║     (vedi lib/conventionPhotos.ts + shopConfig.convention)   ║
 // ║                                                              ║
 // ║     Layout: UNA SOLA RIGA orizzontale (scroll-snap + frecce  ║
 // ║     + drag + SCROLL AUTOMATICO in loop). Quante convention    ║
 // ║     aggiungi, l'altezza resta invariata.                      ║
 // ╚══════════════════════════════════════════════════════════════╝

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  MapPin,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

const events = shopConfig.convention;

const isVideo = (src: string) =>
  src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");

const ConventionSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll(max > 8);
    setProgress(max > 0 ? Math.min(1, el.scrollLeft / max) : 0);
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  // Rivaluta quando le immagini caricano (cambiano le dimensioni della riga)
  useEffect(() => {
    updateScrollState();
  }, [events.length, updateScrollState]);

  // ── Scroll automatico (come Gallery/Piercings: avanza di una card, in loop) ──
  const AUTOPLAY_MS = 4500;
  const RESUME_MS = 6000;
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    autoTimer.current = setInterval(() => {
      const el = trackRef.current;
      if (!el || document.hidden) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      if (el.scrollLeft >= max - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const first = el.querySelector<HTMLElement>("[data-convention-card]");
        const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);
  }, [stopAuto]);

  // Mette in pausa l'autoplay e lo riattiva dopo un periodo di inattività
  const pokeAuto = useCallback(() => {
    stopAuto();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      startAuto();
    }, RESUME_MS);
  }, [startAuto, stopAuto]);

  useEffect(() => {
    if (events.length > 1 && canScroll) startAuto();
    else stopAuto();
    const onVis = () => {
      if (document.hidden) stopAuto();
      else pokeAuto();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopAuto();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [events.length, canScroll, startAuto, stopAuto, pokeAuto]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-convention-card]");
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Drag-to-scroll (solo mouse desktop; su touch resta lo swipe nativo)
  // Qualsiasi interazione mette in pausa l'autoplay, che riprende da solo.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.scrollSnapType = "none";
      pokeAuto();
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
      pokeAuto();
    };
    const onTouchWheel = () => pokeAuto();

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("touchstart", onTouchWheel, { passive: true });
    el.addEventListener("wheel", onTouchWheel, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("touchstart", onTouchWheel);
      el.removeEventListener("wheel", onTouchWheel);
    };
  }, [pokeAuto]);

  return (
    <section id="convention" className="border-t border-border py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <span className="font-body text-xs tracking-[0.3em] md:tracking-[0.4em] text-accent uppercase">
                {shopConfig.sections.convention.label}
              </span>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl text-foreground mt-2 leading-none">
                {shopConfig.sections.convention.heading[0]}
                <br />
                {shopConfig.sections.convention.heading[1]}
                <span className="text-primary">.</span>
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
                Incontriamoci dal vivo: live freehand, consulenze gratuite e flash
                esclusivi disegnati per ogni evento.
              </p>
            </div>
            <div className="shrink-0">
              <Link to="/convention" title="Scopri tutte le convention">
                <Button variant="hero" size="lg" className="group">
                  Convention
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {events.length === 0 ? (
          <div className="border border-dashed border-border rounded-sm bg-card/50 px-6 py-14 text-center">
            <p className="font-heading text-2xl md:text-3xl text-foreground">
              Stiamo preparando le prossime tappe<span className="text-primary">.</span>
            </p>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
              Le card appariranno qui da sole appena salvi le copertine in{" "}
              <code className="text-primary">src/assets/convention-photos/</code>{" "}
              come <code className="text-primary">copertina_&lt;evento&gt;.webp</code>.
            </p>
          </div>
        ) : (
          <>
            {/* ── Riga singola: tutte le convention scorrono in orizzontale ── */}
            <div
              ref={trackRef}
              onScroll={updateScrollState}
              className="hide-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 md:cursor-grab select-none"
              style={{ touchAction: "pan-x pan-y" }}
            >
              {events.map((event, index) => (
                <motion.article
                  key={event.id}
                  data-convention-card
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: Math.min(index, 3) * 0.08, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-sm bg-card border border-border w-[80vw] sm:w-[340px] lg:w-[380px] shrink-0 snap-start"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {event.src && isVideo(event.src) ? (
                      <video
                        src={event.src}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        draggable={false}
                      />
                    ) : event.src ? (
                      <img
                        src={event.src}
                        alt={event.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-muted/40 text-muted-foreground">
                        <ImageOff className="h-10 w-10 text-primary/60" />
                        <p className="font-body text-xs uppercase tracking-[0.25em]">
                          Foto in arrivo
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-heading text-white text-xl leading-tight">
                        {event.label}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs uppercase tracking-wider text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {event.city}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" />
                        {event.date}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* ── Controlli: frecce + avanzamento (solo se c'è da scorrere) ── */}
            {canScroll && (
              <div className="mt-6 flex items-center gap-4">
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      scrollByCards(-1);
                      pokeAuto();
                    }}
                    disabled={atStart}
                    aria-label="Convention precedenti"
                    className="h-11 w-11 flex items-center justify-center border-2 border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      scrollByCards(1);
                      pokeAuto();
                    }}
                    disabled={atEnd}
                    aria-label="Convention successive"
                    className="h-11 w-11 flex items-center justify-center border-2 border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div
                  className="relative h-[3px] flex-1 bg-border rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Avanzamento scorrimento convention"
                  aria-valuenow={Math.round(progress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full transition-[width] duration-150"
                    style={{ width: `${Math.max(8, progress * 100)}%` }}
                  />
                </div>
                <span className="font-body text-xs text-muted-foreground tracking-widest uppercase hidden sm:block shrink-0">
                  Scorri ←→
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ConventionSection;
