import { Scissors, Sparkles } from "lucide-react";

const services = [
  {
    name: "Signature Haircut",
    price: "$45",
    description: "A tailored cut with consultation, shampoo, and precision styling.",
    icon: Scissors,
  },
  {
    name: "Beard Trim & Shape",
    price: "$30",
    description: "Expert sculpting and lineup to define your facial features.",
    icon: Scissors,
  },
  {
    name: "Hot Towel Shave",
    price: "$40",
    description: "A luxurious straight-razor shave with warm lather and hot towels.",
    icon: Sparkles,
  },
  {
    name: "Haircut + Beard Combo",
    price: "$65",
    description: "Our signature cut paired with a full beard grooming session.",
    icon: Scissors,
  },
  {
    name: "The Deluxe Experience",
    price: "$95",
    description: "Haircut, shave, facial treatment, and scalp massage — the full works.",
    icon: Sparkles,
  },
  {
    name: "Kids Cut (Under 12)",
    price: "$25",
    description: "A fun, patient cut for the little gentlemen in the making.",
    icon: Scissors,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-sm tracking-[0.3em] text-primary uppercase">
            What We Offer
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase text-foreground md:text-5xl">
            Services & Pricing
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="group glass rounded-lg p-8 transition-all duration-300 hover:scale-[1.03] hover:gold-glow cursor-default"
            >
              <div className="mb-4 flex items-center justify-between">
                <service.icon className="h-6 w-6 text-primary" />
                <span className="font-heading text-2xl font-bold text-primary">
                  {service.price}
                </span>
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold uppercase text-foreground">
                {service.name}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
