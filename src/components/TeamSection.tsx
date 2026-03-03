import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";

const team = [
  { name: "Marcus Cole", role: "Fade Specialist", image: barber1 },
  { name: "Jake Rivera", role: "Beard & Shave Expert", image: barber2 },
  { name: "Dmitri Volkov", role: "Creative Stylist", image: barber3 },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 md:py-40 border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="mb-16">
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              The Crew
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              Meet The<br />Team<span className="text-primary">.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-3xl text-foreground">{member.name}</h3>
                <p className="font-body text-xs tracking-[0.2em] text-primary uppercase mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
