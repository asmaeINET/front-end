import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/sections/Header";
import BookingSection from "@/components/sections/BookingSection";

const TourPackages = () => {
  // Tour packages data
  const tourPackages = [
    {
      id: 1,
      title: "Lucca Bike Tour",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      price: "€35",
      duration: "3 hours",
      groupSize: "Max 8 people",
      rating: 4.8,
      reviews: 124,
      description:
        "Explore the historic city of Lucca on a guided bike tour through ancient streets and beautiful countryside.",
    },
    {
      id: 2,
      title: "Wine Tasting in Tuscany",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
      price: "€75",
      duration: "6 hours",
      groupSize: "Max 12 people",
      rating: 4.9,
      reviews: 89,
      description:
        "Discover the finest wines of Tuscany with visits to local vineyards and traditional wine cellars.",
    },
    {
      id: 3,
      title: "Cinque Terre Tour",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop",
      price: "€95",
      duration: "8 hours",
      groupSize: "Max 15 people",
      rating: 4.7,
      reviews: 156,
      description:
        "Visit the breathtaking coastal villages of Cinque Terre with stunning Mediterranean views.",
    },
    {
      id: 4,
      title: "Siena and Surroundings",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d5b924?w=400&h=300&fit=crop",
      price: "€65",
      duration: "5 hours",
      groupSize: "Max 10 people",
      rating: 4.6,
      reviews: 98,
      description:
        "Explore the medieval city of Siena and discover the beautiful Tuscan countryside.",
    },
    {
      id: 5,
      title: "Pisa & Lucca",
      image:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop",
      price: "€55",
      duration: "4 hours",
      groupSize: "Max 12 people",
      rating: 4.5,
      reviews: 142,
      description:
        "Combined tour of Pisa's famous landmarks and Lucca's charming historic center.",
    },
    {
      id: 6,
      title: "Italy Special Trips",
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
      price: "€120",
      duration: "Full day",
      groupSize: "Max 8 people",
      rating: 4.9,
      reviews: 67,
      description:
        "Customized tours to hidden gems and special locations throughout beautiful Italy.",
    },
    {
      id: 7,
      title: "Florence Day Trip",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
      price: "€85",
      duration: "7 hours",
      groupSize: "Max 15 people",
      rating: 4.8,
      reviews: 203,
      description:
        "Discover the Renaissance capital with visits to famous museums, galleries, and landmarks.",
    },
    {
      id: 8,
      title: "Tuscany Countryside",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      price: "€70",
      duration: "6 hours",
      groupSize: "Max 10 people",
      rating: 4.7,
      reviews: 118,
      description:
        "Experience the rolling hills and picturesque villages of the Tuscan countryside.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      comment:
        "Amazing experience! The bike tour through Lucca was absolutely perfect. Our guide was knowledgeable and friendly.",
    },
    {
      id: 2,
      name: "Marco Rossi",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      comment:
        "The wine tasting tour exceeded all expectations. Great selection of wines and beautiful vineyards.",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      comment:
        "Cinque Terre tour was breathtaking! Perfect organization and stunning views throughout the day.",
    },
  ];

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
            {tourPackages.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
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
                      <span>👥 {tour.groupSize}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tour.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-gray-600">
                          {tour.rating} ({tour.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">
                      {tour.price}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-orange-500 border-orange-500 hover:bg-orange-50"
                    >
                      Read More →
                    </Button>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Happy Customers Says
            </h2>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">Tuscany</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Bike and rickshaw rental
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Guided Tours of Lucca
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Guided Bus Tour of Lucca
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Transportation With Lucca Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Wine Tours In Bus With Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Home</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="/tour-packages" className="hover:text-orange-400">
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="hover:text-orange-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Why Choose Us?
                  </a>
                </li>
                <li>
                  <Link to="/tour-packages" className="hover:text-orange-400">
                    Tour Packages
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacts</h4>
              <p className="text-sm text-gray-300 mb-1">
                Piazza Napoleone, Lucca, Tuscany
              </p>
              <p className="text-sm text-gray-300 mb-1">📞 +39 346 368 5708</p>
              <p className="text-sm text-gray-300 mb-4">
                ✉️ tuscanlucca@gmail.com
              </p>

              <h5 className="font-semibold mb-2">Social Media</h5>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            Copyright © 2024. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourPackages;
