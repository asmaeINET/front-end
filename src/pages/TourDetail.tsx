import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Globe,
  Ticket,
  Bus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/sections/Header";
import { Button } from "@/components/ui/button";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FooterSection from "@/components/sections/FooterSection";

// Tour data matching the Figma designs
const tourData = {
  "lucca-bike-tour": {
    title: "Lucca Bike Tour",
    price: "34 €",
    description:
      "A tour of the city and its surroundings led by a professional guide. Experience the beauty of Lucca from a unique perspective as you cycle through historic streets and scenic countryside.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e649aa3470f40e4fc3ad4108bc8f0e32f7738d84?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1544191696-15693072b5a8?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "3-10",
      duration: "4 hours",
      location: "Lucca",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bicycle",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1544191696-15693072b5a8?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544378156-207b5ac50748?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "wine-tasting-tuscany": {
    title: "Wine tasting In Tuscany",
    price: "34 €",
    description:
      "The real magic is here where you can enjoy the best Tuscan wine and eat traditional local food. Experience the finest wines from local vineyards in the heart of Tuscany.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/68ff1ed6c96f21fd0cfc7c092f07678e106a61ae?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1567111278842-e546dd3c69b1?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1558346648-9757f999aba8?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "10-30",
      duration: "6 hours",
      location: "Tuscany",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1567111278842-e546dd3c69b1?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1558346648-9757f999aba8?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "cinque-terre-tour": {
    title: "Cinque Terre Tour",
    price: "34 €",
    description:
      "Visiting the 5 Terre is a must, and you can never go there enough. Discover the stunning coastal villages and breathtaking landscapes of this UNESCO World Heritage site.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551376347-075b0121a65b?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "10-50",
      duration: "15 hours and 45 minutes",
      location: "Cinque Terre",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551376347-075b0121a65b?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "siena-surroundings": {
    title: "Siena and Surroundings",
    price: "34 €",
    description:
      "Visit the beautiful Siena and the cities that surround it to experience authentic Tuscan culture and medieval architecture in its finest form.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a77e402c8a702f4b15cc1474039e41539823dfb2?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1593786275148-2d39a511e9bd?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1591797442444-039f23ddcc14?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1559113315-6e4e3c58d48f?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "5-10",
      duration: "8 hours",
      location: "Siena",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1593786275148-2d39a511e9bd?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1591797442444-039f23ddcc14?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1559113315-6e4e3c58d48f?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592926471399-c7d7c55f45df?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "tour-lucca-hills": {
    title: "Tour of the Lucca Hills",
    price: "34 €",
    description:
      "Visit with us the beautiful hills of Lucca, with a guide who will make you discover hidden gems and panoramic viewpoints in the Tuscan countryside.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/26860b3914eb8c32a4215496857371a56fd8ac2f?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544378156-207b5ac50748?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541892395-1bb2470a2e6b?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "5-12",
      duration: "6 hours",
      location: "Lucca Hills",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544378156-207b5ac50748?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541892395-1bb2470a2e6b?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544191696-15693072b5a8?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "gardaland-verona": {
    title: "Gardaland, Verona",
    price: "34 €",
    description:
      "Visit the largest and most fun park in Italy suitable for all ages. Experience thrilling rides and attractions in this world-class amusement park.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6f77270fd39b3d7a49c1a62f8f487b2c3591cb6b?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1509207039741-94d4ac1da6b4?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "10-50",
      duration: "Full day",
      location: "Verona",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1509207039741-94d4ac1da6b4?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1605538883669-825200433431?w=340&h=242&fit=crop&crop=center",
    ],
  },
  "pisa-lucca": {
    title: "Pisa & Lucca",
    price: "34 €",
    description:
      "Discover two of Tuscany's most iconic cities in one unforgettable tour. From the famous Leaning Tower to the medieval walls of Lucca.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/55587f715aed85c3394a2517b88d6af020d04bd6?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1564073308089-62ad19ba2d0c?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1543572326-24fad7e4b5e0?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "10-50",
      duration: "10 hours",
      location: "Pisa & Lucca",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1564073308089-62ad19ba2d0c?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1543572326-24fad7e4b5e0?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1580041078462-f2e70bb0f6b9?w=340&h=242&fit=crop&crop=center",
    ],
  },
  florence: {
    title: "Florence",
    price: "34 €",
    description:
      "Explore the cradle of the Renaissance. Visit world-famous museums, see masterpieces by Michelangelo and discover the beauty of this historic city.",
    mainImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/07ef39d71d6015d02ef7c5849bcfc9231d35ecfa?width=1400",
    thumbnails: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1569330330706-ef3ea9ea0b82?w=220&h=141&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570969790411-6ad46e0e0fb6?w=220&h=141&fit=crop&crop=center",
    ],
    details: {
      groupSize: "5-10",
      duration: "8 hours",
      location: "Florence",
      guideService: "Included",
      language: "English, Italian",
      entryFees: "Museum fees not included",
      transportation: "Bus",
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=700&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1569330330706-ef3ea9ea0b82?w=340&h=242&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570969790411-6ad46e0e0fb6?w=340&h=506&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1589721931527-87f68d2b80cc?w=340&h=242&fit=crop&crop=center",
    ],
  },
};

const TourDetail = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const tour = tourData[tourId as keyof typeof tourData];

  useEffect(() => {
    if (!tour) {
      navigate("/404");
    }
  }, [tour, navigate]);

  if (!tour) {
    return null;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <div className="pt-[170px] px-4 lg:px-16 xl:px-[250px] pb-16 max-w-[1920px] mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center gap-3 mb-[75px] opacity-40 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
          <span className="text-lg font-semibold text-gray-800">Back</span>
        </button>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px] mb-[100px]">
          {/* Left - Main Image & Thumbnails */}
          <div className="flex-1 lg:max-w-[700px] space-y-5">
            <img
              src={
                mainImageIndex === 0
                  ? tour.mainImage
                  : tour.thumbnails[mainImageIndex - 1]
              }
              alt={tour.title}
              className="w-full h-[400px] lg:h-[600px] object-cover rounded-xl"
            />
            {/* Thumbnail Images */}
            <div className="flex gap-3 lg:gap-5 overflow-x-auto">
              {/* Main image thumbnail */}
              <img
                src={tour.mainImage}
                alt={`${tour.title} main`}
                className={`flex-shrink-0 w-[120px] h-[80px] sm:w-[140px] sm:h-[90px] lg:w-[220px] lg:h-[141px] object-cover rounded-xl cursor-pointer transition-all ${
                  mainImageIndex === 0
                    ? "opacity-100 ring-2 ring-orange-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setMainImageIndex(0)}
              />
              {tour.thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`${tour.title} thumbnail ${index + 1}`}
                  className={`flex-shrink-0 w-[120px] h-[80px] sm:w-[140px] sm:h-[90px] lg:w-[220px] lg:h-[141px] object-cover rounded-xl cursor-pointer transition-all ${
                    mainImageIndex === index + 1
                      ? "opacity-100 ring-2 ring-orange-500"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setMainImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Right - Tour Info & Booking */}
          <div className="flex-1 space-y-8">
            {/* Tour Title & Price */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-[48px] font-bold text-gray-800 leading-[1.2]">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-xl lg:text-2xl font-semibold text-gray-800 opacity-80">
                  from
                </span>
                <span className="text-3xl lg:text-[32px] font-bold text-orange-500">
                  {tour.price}
                </span>
              </div>
              <p className="text-lg text-gray-800 opacity-60 leading-[26px]">
                {tour.description}
              </p>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Select a date
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl p-[30px] max-w-[302px]">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-semibold text-gray-800">
                      December
                    </span>
                    <span className="text-base font-semibold text-gray-800">
                      2022
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <button className="w-5 h-5 flex items-center justify-center">
                      <ChevronLeft className="w-4 h-4 text-gray-800" />
                    </button>
                    <button className="w-5 h-5 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-gray-800" />
                    </button>
                  </div>
                </div>

                {/* Calendar */}
                <div className="space-y-1">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-0 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="py-2 text-xs text-gray-800 font-normal"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0 text-center">
                    {/* Days array for December 2022 */}
                    {[
                      "",
                      "",
                      "",
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                      21,
                      22,
                      23,
                      24,
                      25,
                      26,
                      27,
                      28,
                      29,
                      30,
                      31,
                    ].map((day, index) => (
                      <div
                        key={index}
                        className="h-8 flex items-center justify-center"
                      >
                        {day ? (
                          <button
                            className={`h-8 w-8 flex items-center justify-center text-base rounded-lg ${
                              day === 23
                                ? "bg-orange-500 text-white"
                                : "text-gray-800 opacity-70 hover:bg-gray-100"
                            }`}
                          >
                            {day}
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Time Picker */}
            <div className="space-y-2 max-w-[302px]">
              <h3 className="text-lg font-semibold text-gray-800">Time</h3>
              <div className="flex items-center gap-3 px-6 py-[14px] border border-gray-200 rounded-lg bg-white">
                <span className="text-base text-gray-800 opacity-50 flex-1">
                  Select the time
                </span>
                <Clock className="w-6 h-6 text-gray-800 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="flex justify-center lg:justify-end mb-[100px]">
          <Button
            onClick={() => {
              const params = new URLSearchParams({
                tour: tour.title,
                date: "FRI, 23 DEC 2022",
                time: "15:00",
                adults: "2",
                children: "1",
                infants: "1",
              });
              navigate(`/booking-details?${params.toString()}`);
            }}
            className="w-full max-w-[302px] h-[47px] bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold rounded-full shadow-lg"
          >
            Buy Now
          </Button>
        </div>

        {/* Details Section */}
        <div className="mb-[100px]">
          <h2 className="text-2xl lg:text-[32px] font-bold text-gray-800 mb-[58px]">
            Details
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px]">
            {/* Left - Description */}
            <div className="flex-1 lg:max-w-[700px]">
              <p className="text-lg text-black leading-[30px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            {/* Right - Tour Details */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Number of group:</span>{" "}
                  {tour.details.groupSize}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Duration:</span>{" "}
                  {tour.details.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">
                    Departuring and arriving areas:
                  </span>{" "}
                  {tour.details.location}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-orange-500 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.18362 12.8597C7.46652 12.2085 7.40701 11.909 6.91116 11.454C6.29463 10.9073 5.85156 10.1923 5.63657 9.39698C5.57306 9.09612 5.39675 8.83099 5.14385 8.656C4.22105 7.99852 4.0154 6.85993 4.60833 5.88414C4.70333 5.72656 4.76492 5.59611 4.71272 5.40512C4.22731 3.67688 5.2044 1.66687 7.29323 0.842408C8.49934 0.374994 9.79813 0.196291 11.0857 0.320597C11.855 0.387389 12.4918 0.691083 12.7935 1.48424C12.9346 1.82299 13.1819 2.10681 13.4981 2.29304C14.7445 3.10811 14.9742 3.79064 14.5243 5.21518C14.4731 5.37694 14.4136 5.50531 14.5483 5.69107C15.279 6.69921 15.065 8.01313 14.043 8.7468C13.8733 8.86393 13.7517 9.03853 13.7007 9.23835C13.4435 10.167 12.9129 10.9968 12.1776 11.6199C11.8644 11.8902 11.8415 12.8232 12.1202 13.1154C12.2611 13.2626 12.3561 13.1331 12.4146 13.0528C12.996 12.2586 13.803 12.365 14.5942 12.531C16.7864 13.0048 18.3418 14.2446 19.0109 16.4289C19.6853 18.632 19.7417 20.9165 19.7594 23.1957C19.7594 23.6654 19.4744 23.7176 19.1018 23.7176C15.6054 23.712 12.1087 23.712 8.61167 23.7176C5.98523 23.7176 3.35844 23.7176 0.731311 23.7176C0.0444291 23.7176 -0.00672176 23.6675 0.000585497 22.9661C0.0183317 21.0135 0.122721 19.0703 0.541323 17.1573C1.14783 14.3813 3.25545 12.5654 5.96957 12.436C6.49987 12.411 6.49987 12.411 7.18362 12.8597Z" />
                  </svg>
                </div>
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Guide service:</span>{" "}
                  {tour.details.guideService}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Language:</span>{" "}
                  {tour.details.language}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-orange-500 opacity-80 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Entry Fees:</span>{" "}
                  {tour.details.entryFees}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Bus className="w-6 h-6 text-orange-500 opacity-80 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Transportation:</span>{" "}
                  {tour.details.transportation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-[100px]">
          <div className="flex items-center justify-between mb-[50px]">
            <h2 className="text-2xl lg:text-[32px] font-bold text-gray-800">
              Gallery
            </h2>
            <div className="flex items-center gap-5">
              <Button
                variant="outline"
                size="icon"
                className="w-[50px] h-[50px] rounded-full border-gray-300 bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800 opacity-60" />
              </Button>
              <Button className="w-[50px] h-[50px] rounded-full bg-orange-500 hover:bg-orange-600">
                <ChevronRight className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-5">
            {/* Large Image */}
            <div className="lg:row-span-2">
              <img
                src={tour.galleryImages[0]}
                alt="Gallery main image"
                className="w-full h-[300px] lg:h-[506px] object-cover rounded-xl"
              />
            </div>

            {/* Top Right Image */}
            <div>
              <img
                src={tour.galleryImages[1]}
                alt="Gallery image 2"
                className="w-full h-[180px] lg:h-[242px] object-cover rounded-xl"
              />
            </div>

            {/* Far Right Image - Full Height */}
            <div className="lg:row-span-2">
              <img
                src={tour.galleryImages[2]}
                alt="Gallery image 3"
                className="w-full h-[300px] lg:h-[506px] object-cover rounded-xl"
              />
            </div>

            {/* Bottom Right Image */}
            <div>
              <img
                src={tour.galleryImages[3]}
                alt="Gallery image 4"
                className="w-full h-[180px] lg:h-[242px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default TourDetail;
