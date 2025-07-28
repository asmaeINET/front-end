import { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import TourCard from "@/components/TourCard";
import FooterSection from "@/components/sections/FooterSection";
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
              <p>Chargement des résultats...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              <p>Aucun tour trouvé.</p>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SearchResults;
