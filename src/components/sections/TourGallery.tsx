import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TourGalleryProps {
  images: string[];
}

const TourGallery = ({ images }: TourGalleryProps) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  return (
    <div className="mb-[50px] lg:mb-[98px]">
      {/* Gallery Header */}
      <div className="flex items-center justify-between mb-[30px] lg:mb-[98px]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Gallery
        </h2>
        <div className="flex items-center gap-3 lg:gap-5">
          <Button
            variant="outline"
            size="icon"
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-gray-300 bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800 opacity-60" />
          </Button>
          <Button className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-orange-500 hover:bg-orange-600">
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 lg:gap-5">
        {/* Mobile: Main image + thumbnails */}
        <div className="block lg:hidden space-y-4">
          {/* Main image */}
          <img
            src={images[mainImageIndex]}
            alt="Gallery main image"
            className="w-full h-[300px] object-cover rounded-xl"
          />

          {/* Thumbnail grid */}
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 6).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery thumbnail ${index + 1}`}
                className={`w-full h-[100px] object-cover rounded-xl cursor-pointer transition-opacity ${
                  index === mainImageIndex
                    ? "opacity-100 ring-2 ring-orange-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Complex grid layout */}
        <div className="hidden lg:grid lg:grid-cols-[700px_340px_340px] lg:gap-5">
          {/* Large Image */}
          <div className="lg:row-span-2">
            <img
              src={images[mainImageIndex]}
              alt="Gallery main image"
              className="w-full h-[506px] object-cover rounded-xl"
            />
          </div>

          {/* Top Right Image */}
          <div>
            <img
              src={images[1]}
              alt="Gallery image 2"
              className="w-full h-[242px] object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setMainImageIndex(1)}
            />
          </div>

          {/* Far Right Image - Full Height */}
          <div className="lg:row-span-2">
            <img
              src={images[2]}
              alt="Gallery image 3"
              className="w-full h-[506px] object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setMainImageIndex(2)}
            />
          </div>

          {/* Bottom Right Image */}
          <div>
            <img
              src={images[3]}
              alt="Gallery image 4"
              className="w-full h-[242px] object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setMainImageIndex(3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGallery;
