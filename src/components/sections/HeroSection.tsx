import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Users, Car, Clock, MapPin } from "lucide-react";
import SearchWidget from "@/components/SearchWidget";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/e81fcf5b20c62c7764370d4be21f299dad072dba?width=3840')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 pb-16"></div>

      <div className="relative w-full pt-40 px-4 sm:px-6 lg:px-16 pb-16">
        {/* Hero Content */}
        <div className="flex flex-col items-center gap-12 lg:gap-15 max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center text-white mb-8 lg:mb-15">
            <h1 className="font-podcast text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-normal mb-4 leading-tight">
              Enjoy in the best way!
            </h1>
            <p className="font-open-sans text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold">
              Enjoy our services for your trip anytime
            </p>
          </div>

          {/* Search Widget */}
          <SearchWidget />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
