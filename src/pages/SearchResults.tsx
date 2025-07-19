import Header from "@/components/sections/Header";
import TourCard from "@/components/TourCard";
import FooterSection from "@/components/sections/FooterSection";

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
  // Tour search results data based on the Figma design
  const searchResults: TourDetails[] = [
    {
      id: 1,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=680&h=530&fit=crop",
      date: "Tuesday, 02 Oct 2022",
      time: "15:00 PM",
      groupSize: "15-30",
      transportation: "Bus",
      duration: "15 hours and 45 minutes",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "lorem ipsum",
      price: "34 €",
    },
    {
      id: 2,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=680&h=530&fit=crop",
      date: "Tuesday, 02 Oct 2022",
      time: "15:00 PM",
      groupSize: "15-30",
      transportation: "Bus",
      duration: "15 hours and 45 minutes",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "lorem ipsum",
      price: "34 €",
    },
    {
      id: 3,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=680&h=530&fit=crop",
      date: "Tuesday, 02 Oct 2022",
      time: "15:00 PM",
      groupSize: "15-30",
      transportation: "Bus",
      duration: "15 hours and 45 minutes",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "lorem ipsum",
      price: "34 €",
    },
    {
      id: 4,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=680&h=530&fit=crop",
      date: "Tuesday, 02 Oct 2022",
      time: "15:00 PM",
      groupSize: "15-30",
      transportation: "Bus",
      duration: "15 hours and 45 minutes",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "lorem ipsum",
      price: "34 €",
    },
    {
      id: 5,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=680&h=530&fit=crop",
      date: "Tuesday, 02 Oct 2022",
      time: "15:00 PM",
      groupSize: "15-30",
      transportation: "Bus",
      duration: "15 hours and 45 minutes",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "lorem ipsum",
      price: "34 €",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1420px]">
          {/* Search Results */}
          <div className="py-8 lg:py-12">
            {searchResults.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SearchResults;
