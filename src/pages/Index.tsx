import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const location = useLocation();

  // Handle scrolling to hash on mount or when hash changes
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure page has rendered
      setTimeout(() => {
        const sectionId = location.hash.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <GallerySection />
      <FooterSection />
    </motion.div>
  );
};

export default Index;
