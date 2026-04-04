import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import shopConfig from "@/config/shopConfig";

const team = shopConfig.team;

type TeamMember = (typeof team)[number];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 md:py-40 border-t-2 border-accent/20 overflow-hidden cyber-razor-top cyber-razor-bottom relative">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: "linear-gradient(hsl(127 14% 36% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(127 14% 36% / 0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
           
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div>
              <span className="font-body text-xs tracking-[0.4em] text-accent uppercase neon-glow">
                {shopConfig.sections.team.label}
              </span>
              <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none cyber-glitch-2" style={{ '--og-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } as React.CSSProperties}>
                {shopConfig.sections.team.heading[0]}
                <br />
                {shopConfig.sections.team.heading[1]}<span className="text-primary neon-glow-red cyber-glitch-4">.</span>
                {/* Hidden SEO text with location keywords */}
                <span className="sr-only"> - {shopConfig.team[0].role} a {shopConfig.city.split(",")[0].trim()}</span>
              </h2>
            </div>
            <div className="pb-1 cyber-clip-corner border-2 border-accent/30 p-4 bg-card/50">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-2 neon-glow">
                {shopConfig.city}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-accent/60 shadow-[0_0_8px_rgba(0,255,210,0.6)]" />
                <span className="font-heading text-5xl text-accent leading-none neon-glow cyber-glitch-3">{team[0]?.years || team.length}</span>
                <div className="font-body text-xs text-muted-foreground leading-tight">
                  <p>{shopConfig.sections.team.counterLabel[0]}</p>
                  <p>{shopConfig.sections.team.counterLabel[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-b-2 border-accent/20 relative z-10">
        {team.map((member, i) => (
          <TeamRow key={member.name} member={member} rowIndex={i} />
        ))}
      </div>
    </section>
  );
};

function TeamRow({ member, rowIndex }: { member: TeamMember; rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = rowIndex % 2 === 0;
  const isVideo = member.image.includes('.mp4') || member.image.includes('.webm') || member.image.includes('.mov');
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);

  const handleVideoMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setIsVerticalVideo(videoHeight > videoWidth);
    }
  };

  return (
    <div ref={ref} className="border-t-2 border-accent/20 group relative cyber-razor-top">
      {/* Hover accent line that slides down with neon glow */}
      <div
        className={`absolute ${isEven ? "left-0" : "right-0"} top-0 w-[2px] h-full bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out z-10 pointer-events-none shadow-[0_0_10px_rgba(0,255,210,0.8)]`}
      />

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* === Image/Video Pane === */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className={`relative overflow-hidden md:max-h-[600px] ${
            isVideo && isVerticalVideo 
              ? 'aspect-[9/16] md:aspect-auto md:w-auto md:max-w-[400px] mx-auto' 
              : isVideo 
                ? 'aspect-[4/3] md:aspect-auto md:w-2/5' 
                : 'aspect-[4/3] md:aspect-auto md:w-1/2'
          }`}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={member.image}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              onLoadedMetadata={handleVideoMetadata}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: isVerticalVideo ? 'cover' : 'contain', 
                objectPosition: 'center' 
              }}
              className="scale-100 group-hover:scale-[1.03] transition-all duration-700 ease-out bg-card"
            />
          ) : (
            <img
              src={member.image}
              alt={member.name}
              width="800"
              height="600"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
            />
          )}
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
          className={`relative flex flex-col justify-end overflow-hidden bg-card px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-20 min-h-[300px] md:min-h-0 ${
            isVideo && isVerticalVideo 
              ? 'md:flex-1' 
              : isVideo 
                ? 'md:w-3/5' 
                : 'md:w-1/2'
          }`}
        >
          {/* Inner content wrapper for vertical video layout */}
          <div className={isVideo && isVerticalVideo ? 'md:max-w-2xl md:mx-auto' : ''}>
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
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TeamSection;
