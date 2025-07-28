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

const TourDetail = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!tourId) {
      navigate("/404");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/tours/slug/${tourId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Tour not found");
        }
        return res.json();
      })
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [tourId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!tour) {
    return null; // ou un message d’erreur personnalisé
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
                  : tour.thumbnails?.[mainImageIndex - 1]
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
              {tour.thumbnails?.map((thumb: string, index: number) => (
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
                  {tour.details?.groupSize}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Duration:</span>{" "}
                  {tour.details?.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">
                    Departuring and arriving areas:
                  </span>{" "}
                  {tour.details?.location}
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
                  {tour.details?.guideService}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Language:</span>{" "}
                  {tour.details?.language}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-orange-500 opacity-80 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Entry Fees:</span>{" "}
                  {tour.details?.entryFees}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Bus className="w-6 h-6 text-orange-500 opacity-80 flex-shrink-0" />
                <span className="text-lg text-gray-800">
                  <span className="font-bold">Transportation:</span>{" "}
                  {tour.details?.transportation}
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
                src={tour.gallery[0]?.imageUrl}
                alt="Gallery main image"
                className="w-full h-[300px] lg:h-[506px] object-cover rounded-xl"
              />
            </div>

            {/* Top Right Image */}
            <div>
              <img
                src={tour.gallery[1]?.imageUrl}
                alt="Gallery image 2"
                className="w-full h-[180px] lg:h-[242px] object-cover rounded-xl"
              />
            </div>

            {/* Far Right Image - Full Height */}
            <div className="lg:row-span-2">
              <img
                src={tour.gallery[2]?.imageUrl}
                alt="Gallery image 3"
                className="w-full h-[300px] lg:h-[506px] object-cover rounded-xl"
              />
            </div>

            {/* Bottom Right Image */}
            <div>
              <img
                src={tour.gallery[3]?.imageUrl}
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
