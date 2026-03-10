import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import shopConfig from "@/config/shopConfig";

const team = shopConfig.team;

type TeamMember = (typeof team)[number];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 md:py-40 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div>
              <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                The Crew
              </span>
              <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
                Meet The
                <br />
                Team<span className="text-primary">.</span>
                {/* Hidden SEO text with location keywords */}
                <span className="sr-only"> — Our Expert Barbers in {shopConfig.city}</span>
              </h2>
            </div>
            <div className="pb-1">
              <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                {shopConfig.city}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary/60" />
                <span className="font-heading text-5xl text-foreground leading-none">{team.length}</span>
                <div className="font-body text-xs text-muted-foreground leading-tight">
                  <p>Master</p>
                  <p>Barbers</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-b border-border">
        {team.map((member, i) => (
          <TeamRow key={member.name} member={member} rowIndex={i} />
        ))}
      </div>
    </section>
  );
};

function TeamRow({ member, rowIndex }: { member: TeamMember; rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = rowIndex % 2 === 0;

  return (
    <div ref={ref} className="border-t border-border group relative">
      {/* Hover accent line that slides down */}
      <div
        className={`absolute ${isEven ? "left-0" : "right-0"} top-0 w-[2px] h-full bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out z-10 pointer-events-none`}
      />

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* === Image Pane === */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative aspect-[4/3] md:aspect-auto md:w-1/2 overflow-hidden"
        >
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          />
          {/* Subtle directional vignette */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isEven
                ? "bg-gradient-to-r from-transparent to-background/25"
                : "bg-gradient-to-l from-transparent to-background/25"
            }`}
          />
          {/* Corner index badge */}
          <div
            className={`absolute top-5 ${isEven ? "right-5" : "left-5"} font-body text-[10px] tracking-[0.35em] text-white/50 uppercase`}
          >
            {member.index}
          </div>
        </motion.div>

        {/* === Content Pane === */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 80 : -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative md:w-1/2 flex flex-col justify-end overflow-hidden bg-card px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-20 min-h-[300px] md:min-h-0"
        >
          {/* Giant ghost index watermark */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.35 }}
            className={`absolute font-heading select-none pointer-events-none text-foreground/[0.04] leading-none text-[clamp(7rem,16vw,14rem)] ${
              isEven ? "bottom-0 -right-3" : "bottom-0 -left-3"
            }`}
          >
            {member.index}
          </motion.span>

          <div className="relative z-10">
            {/* Index · Role header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-body text-[10px] tracking-[0.4em] text-primary">
                {member.index}
              </span>
              <span className="block h-px w-8 bg-border flex-shrink-0" />
              <span className="font-body text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                {member.role}
              </span>
            </div>

            {/* Name — each word stacked on its own line for editorial impact */}
            <h3
              className="font-heading leading-[0.9] text-foreground mb-5"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              {member.name.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + wi * 0.12,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>

            {/* Animated primary accent line */}
            <motion.div
              className="h-px bg-primary mb-5"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              style={{ width: "3rem", transformOrigin: "left" }}
            />

            {/* Bio */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-[300px]">
              {member.bio}
            </p>

            {/* Specialty tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {member.tags.map((tag, ti) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + ti * 0.07 }}
                  className="font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Years experience */}
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-primary" />
              <span className="font-body text-[10px] tracking-[0.3em] text-primary uppercase">
                {member.years} years experience
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TeamSection;
