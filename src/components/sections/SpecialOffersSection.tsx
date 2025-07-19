import { Button } from "@/components/ui/button";

const SpecialOffersSection = () => {
  return (
    <div
      className="pt-16 px-4 lg:px-60 mb-16 flex flex-col justify-center items-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/ce268b2ea4246dc0fe03b36f5aaa8d3f9a2b4070?width=3840')`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-5 max-w-[649px]">
          <h2 className="font-open-sans text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
            Get Special Offers for Organizations
          </h2>
          <p className="font-open-sans text-lg text-black leading-7 mb-8 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <div className="flex justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-full py-3 px-6">
              <span className="font-open-sans text-xl font-semibold text-white">
                Contact Us
              </span>
            </Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1c2b05399289962cb3dabf32cc1083b78613458?width=854"
            alt="Tourist with backpack pointing"
            className="w-[427px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersSection;
