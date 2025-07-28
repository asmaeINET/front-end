import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/sections/Header";
import BookingSection from "@/components/sections/BookingSection";
import tourService, { TourPayload } from "@/services/tourService"; // ton service API
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FooterSection from "@/components/sections/FooterSection";
import { Link, useNavigate } from "react-router-dom";

const TourPackages = () => {
  const [destinations, setDestinations] = useState<TourPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Fonction pour naviguer vers la page détail d’un tour
  const navigateToDetails = (tour: TourPayload) => {
    // Crée un slug simple à partir du titre (ou utilise l’id si tu préfères)
    const slug = tour.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/tour/${slug}`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const tours = await tourService.getAll();
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-24" />

      {/* Page Header */}
      <section className="pt-12 bg-white">
        <div className="container mx-auto px-4 pb-2 max-w-[1920px]">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2">
            Tour Packages
          </h1>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="py-16 bg-gray-50 mx-auto">
        <div className="container mx-auto px-4 max-w-[1920px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigateToDetails(tour)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.mainImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                    from {tour.price}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>⏱️ {tour.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>👥 {tour.capacity}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(4)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-gray-600">
                          {4.5} (96 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">
                      {tour.price} €
                    </span>
                    <Link
        to={`/tour/${tour.title.toLowerCase().replace(/\s+/g, "-")}`}
        className="inline-block"
      >
        <Button
          variant="outline"
          size="sm"
          className="text-orange-500 border-orange-500 hover:bg-orange-50"
        >
          Read More →
        </Button>
      </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection />

      {/* Testimonials */}
      <TestimonialsSection></TestimonialsSection>

      {/* Footer */}
      <FooterSection/> 
    </div>
  );
};

export default TourPackages;
