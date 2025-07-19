import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Bus,
  Hourglass,
  MapPin,
  Globe,
  Ticket,
} from "lucide-react";

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

interface TourCardProps {
  tour: TourDetails;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 py-8 border-b border-gray-200">
      {/* Tour Image */}
      <div className="w-full lg:w-[340px] h-[265px] flex-shrink-0">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Tour Details */}
      <div className="flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 w-full">
        {/* Left Side - Title and Details */}
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
            {tour.title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-24">
            {/* First Column */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Date:</span>{" "}
                  <span className="font-normal">{tour.date}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Time:</span>{" "}
                  <span className="font-normal">{tour.time}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Number of group:</span>{" "}
                  <span className="font-normal">{tour.groupSize}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Bus className="w-6 h-6 text-[#FA8B02] opacity-80" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Transportation:</span>{" "}
                  <span className="font-normal">{tour.transportation}</span>
                </span>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Duration:</span>{" "}
                  <span className="font-normal">{tour.duration}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Guide service:</span>{" "}
                  <span className="font-normal">{tour.guideService}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#FA8B02]" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Language:</span>{" "}
                  <span className="font-normal">{tour.language}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-[#FA8B02] opacity-80" />
                <span className="text-lg text-gray-900">
                  <span className="font-bold">Entry Fees:</span>{" "}
                  <span className="font-normal">{tour.entryFees}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Price and Buttons */}
        <div className="flex flex-col items-end gap-8 lg:gap-9">
          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900 opacity-80">
              from
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {tour.price}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-5">
            <Button
              variant="outline"
              className="w-[164px] h-[50px] rounded-full border-[#FA8B02] text-[#FA8B02] text-xl font-bold hover:bg-[#FA8B02] hover:text-white transition-colors"
            >
              View tour
            </Button>
            <Button className="w-[164px] h-[50px] rounded-full bg-[#FA8B02] text-white text-xl font-bold hover:bg-[#FA8B02]/90 transition-colors">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
