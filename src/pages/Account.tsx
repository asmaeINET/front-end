import { Link } from "react-router-dom";
import Header from "@/components/sections/Header";
import {
  Calendar,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Account = () => {
  // Mock tickets data - empty for now as per design
  const tickets = [];

  const tourPackages = [
    {
      id: "lucca-bike-tour",
      title: "Lucca Bike Tour",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e705ed27c023b8fa766417b980352370d6de5f86?width=680",
      schedule: "EVERY DAY",
      groupSize: "3-10 PP",
      description:
        "A tour of the city and its surroundings led by a professional guide ...",
    },
    {
      id: "wine-tasting-tuscany",
      title: "Wine tasting In Tuscany",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b0bcf88e34bfe2233fd39bfd4ec632a72eda4372?width=680",
      schedule: "MONDAY",
      groupSize: "10-30 PP",
      description:
        "The real magic is here where you can enjoy the best Tuscan wine and eat ...",
    },
    {
      id: "cinque-terre-tour",
      title: "Cinque Terre Tour",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3b10da1cd2738b0ecd0cca118a6644d0a69a4971?width=680",
      schedule: "TO BE DECIDED",
      groupSize: "10-50 PP",
      description:
        "Visiting the 5 Terre is a must, and you can never go there enough ...",
    },
    {
      id: "siena-surroundings",
      title: "Siena and Surroundings",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/98c292753bf46d37d05f293a2a9305859f721736?width=680",
      schedule: "TO BE DECIDED",
      groupSize: "5-10 PP",
      description:
        "Visit the beautiful Siena and the cities that surround it to experience ...",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-44 pb-20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          {/* My Tickets Section */}
          <section className="mb-20">
            <h1 className="text-3xl font-open-sans font-bold text-gray-900 mb-16">
              My Tickets
            </h1>

            {/* Empty Tickets State */}
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/794e07e283c41717e3388dfee867c636f3ea7ad6?width=694"
                  alt="No tickets"
                  className="w-[347px] h-[347px] object-contain"
                />
              </div>
              <p className="text-xl font-open-sans text-gray-900">
                You don't have any tickets yet. Start planning your next trip!
              </p>
            </div>
          </section>

          {/* Tour Packages Section */}
          <section>
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-3xl font-open-sans font-bold text-gray-900">
                Tour Packages
              </h2>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-5">
                <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Tour Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tourPackages.map((tour) => (
                <div key={tour.id} className="flex flex-col">
                  {/* Tour Image */}
                  <div className="mb-4">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-[404px] object-cover rounded-3xl"
                    />
                  </div>

                  {/* Tour Details */}
                  <div className="flex flex-col gap-5">
                    <div>
                      <h3 className="text-2xl font-open-sans font-bold text-gray-900 mb-3">
                        {tour.title}
                      </h3>

                      {/* Tour Metadata */}
                      <div className="flex items-center gap-8 opacity-60 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-6 h-6 text-orange-500" />
                          <span className="text-base font-open-sans font-bold text-orange-500">
                            {tour.schedule}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-6 h-6 text-orange-500" />
                          <span className="text-base font-open-sans font-bold text-orange-500">
                            {tour.groupSize}
                          </span>
                        </div>
                      </div>

                      <p className="text-lg font-open-sans text-gray-900 leading-relaxed">
                        {tour.description}
                      </p>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/tour/${tour.id}`}
                      className="flex items-center justify-center gap-2 group"
                    >
                      <span className="text-lg font-open-sans font-bold text-orange-500">
                        Read More
                      </span>
                      <ArrowRight className="w-6 h-6 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a98c8a4409f080edce92d0da0a11f962f1f4cd6d?width=266"
                alt="Tuscany Logo"
                className="w-[126px] h-[130px] object-contain mb-8"
              />
            </div>

            {/* Footer Content */}
            <div className="grid grid-cols-4 gap-20">
              {/* Services */}
              <div>
                <h3 className="text-xl font-open-sans font-bold mb-5">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li className="text-lg font-open-sans font-bold">
                    Bike and Rickshaw rental
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Guided Tours of Lucca
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Guided Bike Tour of Lucca
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Trip In The Tuscan Hills
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Transportation With Luxury Cars
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Wine Tours By Bus With Guide
                  </li>
                </ul>
              </div>

              {/* Home */}
              <div>
                <h3 className="text-xl font-open-sans font-bold mb-5">Home</h3>
                <ul className="space-y-2">
                  <li className="text-lg font-open-sans font-bold">Home</li>
                  <li className="text-lg font-open-sans font-bold">About Us</li>
                  <li className="text-lg font-open-sans font-bold">
                    Tour Packages
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h3 className="text-xl font-open-sans font-bold mb-5">Help</h3>
                <ul className="space-y-2">
                  <li className="text-lg font-open-sans font-bold">
                    Terms of Use
                  </li>
                  <li className="text-lg font-open-sans font-bold">
                    Privacy Policy
                  </li>
                </ul>
              </div>

              {/* Contacts */}
              <div>
                <h3 className="text-xl font-open-sans font-bold mb-5">
                  Contacts
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-lg font-open-sans font-bold">
                      Piazza Napoleone, Lucca, Tuscany
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span className="text-lg font-open-sans font-bold">
                      +39 346 368 5708
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="text-lg font-open-sans font-bold">
                      italiainlimo@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h3 className="text-xl font-open-sans font-bold mb-5">
                Social Media
              </h3>
              <div className="flex justify-center gap-5">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">I</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-base font-open-sans">
              Copyright © 2022. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Account;
