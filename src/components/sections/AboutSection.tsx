const AboutSection = () => {
  const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "100+", label: "Happy Customer" },
    { number: "15+", label: "Choice of Services" },
    { number: "10+", label: "Professional\nGuides" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-60">
        <div className="flex flex-row gap-12 items-center">
          {/* New featured image - now first in layout */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2f96a71af9ed418fa59ddb5806a2dd4d%2Fe868cd38df7f4ecd9aae05ff9986b30c?format=webp&width=800"
            alt="Tourist with phone and map"
            className="w-72 h-auto object-contain"
          />

          {/* Left side - Image Complex */}
          <div className="relative order-1">
            {/* Background decorative shape */}
            <div className="absolute inset-0 w-full h-full">
              <svg
                className="absolute top-12 left-3 w-96 h-96 fill-orange-500 opacity-80"
                viewBox="0 0 377 502"
              />
            </div>

            {/* Main tourist image */}
            <div className="relative z-10 flex justify-center mb-4"></div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="font-open-sans text-base font-semibold text-gray-800 opacity-60 mb-2">
                WELCOME TO OUR SITE!
              </p>
              <h2 className="font-open-sans text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                We are the best company for your visit
              </h2>
            </div>

            <p className="font-open-sans text-lg text-gray-800 leading-8">
              After decades of experience, and a whole life in Lucca, we offer
              you the most complete tourism service in the city. In addition to
              having bikes and rickshaws to have as much fun as you want, you
              have the choice of tour guides with whom to tour and drivers for
              your every need! We offer packages in the way that you get the
              most at the lowest price. Book with us and we will always be
              available for you!
            </p>

            <div className="flex gap-5 justify-center items-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="font-open-sans text-3xl lg:text-4xl font-bold text-orange-500">
                    {stat.number}
                  </div>
                  <div className="font-open-sans text-base text-gray-800 opacity-60 leading-7 whitespace-pre-line">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
