import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
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
