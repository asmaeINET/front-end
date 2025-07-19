const ServicesSection = () => {
  const services = [
    {
      title: "Bike and rickshaw rental",
      description: "Book your quality vehicle quickly for an hour or all day!",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/78ad29afa77a3a6cdd5d77a9fcb59f6c0cf1793b?width=660",
    },
    {
      title: "Guided tour of the countryside",
      description:
        "Live the real Lucchese experience by visiting the suburbs by bike!",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8befa8a09a1f632842a5cbf8ebde936a0f7fc7ab?width=660",
    },
    {
      title: "Taxi and NCC service",
      description:
        "Do you need not only a bike but also a driver? Then you have found the right place!",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8450636106a4a303ec451d552269acfb5c88c557?width=660",
    },
    {
      title: "Bus Package",
      description:
        "Do you need not only a bike but also a driver? Then you have found the right place!",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fde2f8196d07038e552a0722df366391550602e3?width=660",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-5 group cursor-pointer"
            >
              {/* Service Image */}
              <div className="w-full max-w-[330px] h-72 rounded-3xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Service Content */}
              <div className="flex flex-col gap-3 text-center max-w-[330px]">
                <h3 className="font-open-sans text-xl lg:text-2xl font-bold text-gray-800 leading-8">
                  {service.title}
                </h3>
                <p className="font-open-sans text-base lg:text-lg text-gray-800 leading-7">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
