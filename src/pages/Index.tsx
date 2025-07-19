import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import PopularDestinations from "@/components/sections/PopularDestinations";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BookingSection from "@/components/sections/BookingSection";
import PopularPackages from "@/components/sections/PopularPackages";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SpecialOffersSection from "@/components/sections/SpecialOffersSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <PopularDestinations />
      <AboutSection />
      <SpecialOffersSection />
      <ServicesSection />
      <BookingSection />
      <PopularPackages />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
