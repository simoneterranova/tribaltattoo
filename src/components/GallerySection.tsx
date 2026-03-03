import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Barbershop interior", tall: true },
  { src: gallery2, alt: "Fresh fade haircut" },
  { src: gallery3, alt: "Barber tools" },
  { src: gallery4, alt: "Hot towel shave", tall: true },
  { src: gallery5, alt: "Beard grooming" },
  { src: gallery6, alt: "Shop exterior" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-sm tracking-[0.3em] text-primary uppercase">
            Our Work
          </p>
          <h2 className="font-heading text-4xl font-bold uppercase text-foreground md:text-5xl">
            Gallery
          </h2>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
