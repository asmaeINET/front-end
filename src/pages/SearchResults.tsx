import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import TourCard from "@/components/TourCard";
import FooterSection from "@/components/sections/FooterSection";
import EmptyState from "@/components/EmptyState";
import axios from "axios";

interface TourDetails {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  groupSize: string;
  transportation: string;
  duration: string;
  guideService: string;
  language: string;
  entryFees: string;
  price: string;
}

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<TourDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Exemple de paramètres - à adapter si tu veux les passer via l'URL ou un formulaire
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/tours/search", {
          tour: "",
          location: "",
          transportation: "",
          numberOfPeople: null,
          date: null,
          time: null,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats de recherche :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1420px]">
          <div className="py-8 lg:py-12">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-lg text-gray-600">Chargement des résultats...</p>
              </div>
            ) : (
              <>
                {/* Tours List */}
                <div className="space-y-6">
                  {searchResults.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>

                {/* Empty State */}
                {searchResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucun tour trouvé
                      </h3>
                      <p className="text-gray-600">
                        Aucun résultat ne correspond à vos critères de recherche.
                        Essayez de modifier vos filtres ou votre recherche.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SearchResults;
