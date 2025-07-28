import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import tourService, { TourPayload } from "@/services/tourService"; // adapte le chemin

const PopularDestinations = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [destinations, setDestinations] = useState<TourPayload[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const tours = await tourService.getAll();
        // Filtrer seulement les tours actifs (status en minuscules "active")
        const activeTours = tours.filter(
          (tour: TourPayload) => tour.status.toLowerCase() === "active"
        );
        setDestinations(activeTours);
      } catch (error) {
        console.error("Erreur chargement tours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <p>Chargement des destinations...</p>;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Explore Our Popular Destinations
          </h2>
          <div className="flex items-center gap-5">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 bg-gray-200 rounded-full hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-hidden  scrollbar-hide pb-4"
        >
          {destinations.map((destination, index) => (
            <Link
              key={index}
              to={`/tour/${destination.title.toLowerCase().replace(/\s+/g, "-")}`} // slugify simple
              className="w-[330px] flex-shrink-0"
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-none">
                <div className="w-full aspect-[330/404] rounded-3xl overflow-hidden mb-4">
                  <img
                    src={destination.mainImage}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-0 space-y-3">
                  <h3 className="text-lg font-bold text-[#333] group-hover:text-orange-500">
                    {destination.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#333] opacity-80">
                      from
                    </span>
                    <span className="text-lg font-bold text-[#FA8B02]">
                      {destination.price} €
                    </span>
                  </div>
                  <p className="text-sm text-[#333] leading-6 max-w-[320px]">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
