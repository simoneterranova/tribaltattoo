import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael T.",
    text: "Best barbershop in the city, hands down. Marcus always nails my fade and the atmosphere is unmatched.",
  },
  {
    name: "David L.",
    text: "The Deluxe Experience is worth every penny. I walked out feeling like a new man. Already booked my next visit.",
  },
  {
    name: "Chris P.",
    text: "Clean shop, skilled barbers, and they actually listen to what you want. I've been coming here for two years now.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-sm tracking-[0.3em] text-primary uppercase">
            What They Say
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase text-foreground md:text-5xl">
            Testimonials
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-lg p-8 flex flex-col">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 flex-1 font-body text-sm leading-relaxed text-secondary-foreground italic">
                "{t.text}"
              </p>
              <p className="font-heading text-sm font-semibold uppercase text-foreground">
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
