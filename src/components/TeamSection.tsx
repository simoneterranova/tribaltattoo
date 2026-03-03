import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";

const team = [
  { name: "Marcus Cole", role: "Fade Specialist", image: barber1 },
  { name: "Jake Rivera", role: "Beard & Shave Expert", image: barber2 },
  { name: "Dmitri Volkov", role: "Creative Stylist", image: barber3 },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-sm tracking-[0.3em] text-primary uppercase">
            Meet the Crew
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase text-foreground md:text-5xl">
            The Team
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 max-w-4xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-2xl border-2 border-border transition-all duration-300 group-hover:border-primary group-hover:gold-glow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold uppercase text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 font-body text-sm text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
