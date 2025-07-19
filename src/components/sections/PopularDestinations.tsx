import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const PopularDestinations = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  const destinations = [
    {
      id: "lucca-bike-tour",
      title: "Lucca Bike Tour",
      price: "34 €",
      schedule: "EVERY DAY",
      people: "3-10 PP",
      description:
        "A tour of the city and its surroundings led by a professional guide ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e649aa3470f40e4fc3ad4108bc8f0e32f7738d84?width=660",
    },
    {
      id: "wine-tasting-tuscany",
      title: "Wine tasting In Tuscany",
      price: "34 €",
      schedule: "MONDAY",
      people: "10-30 PP",
      description:
        "The real magic is here where you can enjoy the best Tuscan wine and eat ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/68ff1ed6c96f21fd0cfc7c092f07678e106a61ae?width=660",
    },
    {
      id: "cinque-terre-tour",
      title: "Cinque Terre Tour",
      price: "34 €",
      schedule: "TO BE DECIDED",
      people: "10-50 PP",
      description:
        "Visiting the 5 Terre is a must, and you can never go there enough ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=660",
    },
    {
      id: "siena-surroundings",
      title: "Siena and Surroundings",
      price: "34 €",
      schedule: "TO BE DECIDED",
      people: "5-10 PP",
      description:
        "Visit the beautiful Siena and the cities that surround it to experience ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a77e402c8a702f4b15cc1474039e41539823dfb2?width=660",
    },
    {
      id: "tour-lucca-hills",
      title: "Tour of the Lucca Hills",
      price: "34 €",
      schedule: "AT YOUR CHOICE",
      people: "5-12 PP",
      description:
        "Visit with us the beautiful hills of Lucca, with a guide who will make ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/26860b3914eb8c32a4215496857371a56fd8ac2f?width=660",
    },
    {
      id: "gardaland-verona",
      title: "Gardaland, Verona",
      price: "34 €",
      schedule: "TO BE DECIDED",
      people: "10-50 PP",
      description:
        "Visit the largest and most fun park in Italy suitable for all ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6f77270fd39b3d7a49c1a62f8f487b2c3591cb6b?width=660",
    },
    {
      id: "pisa-lucca",
      title: "Pisa & Lucca",
      price: "34 €",
      schedule: "TO BE DECIDED",
      people: "10-50 PP",
      description:
        "Visiting the 5 Terre is a must, and you can never go there enough ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/55587f715aed85c3394a2517b88d6af020d04bd6?width=660",
    },
    {
      id: "florence",
      title: "Florence",
      price: "34 €",
      schedule: "TO BE DECIDED",
      people: "5-10 PP",
      description:
        "Visit the beautiful Siena and the cities that surround it to experience ...",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/07ef39d71d6015d02ef7c5849bcfc9231d35ecfa?width=660",
    },
  ];

  const CalendarIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.85742 7.42836H21.1431M5.14314 2.85693H18.8574C19.4636 2.85693 20.045 3.09775 20.4737 3.5264C20.9023 3.95506 21.1431 4.53644 21.1431 5.14265V18.8569C21.1431 19.4631 20.9023 20.0445 20.4737 20.4732C20.045 20.9018 19.4636 21.1426 18.8574 21.1426H5.14314C4.53693 21.1426 3.95555 20.9018 3.52689 20.4732C3.09824 20.0445 2.85742 19.4631 2.85742 18.8569V5.14265C2.85742 4.53644 3.09824 3.95506 3.52689 3.5264C3.95555 3.09775 4.53693 2.85693 5.14314 2.85693V2.85693Z"
        stroke="#FA8B02"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0003 13.1426C12.6315 13.1426 13.1431 12.631 13.1431 11.9998C13.1431 11.3686 12.6315 10.8569 12.0003 10.8569C11.3691 10.8569 10.8574 11.3686 10.8574 11.9998C10.8574 12.631 11.3691 13.1426 12.0003 13.1426Z"
        fill="#FA8B02"
      />
      <path
        d="M7.42899 13.1426C8.06017 13.1426 8.57185 12.631 8.57185 11.9998C8.57185 11.3686 8.06017 10.8569 7.42899 10.8569C6.79781 10.8569 6.28613 11.3686 6.28613 11.9998C6.28613 12.631 6.79781 13.1426 7.42899 13.1426Z"
        fill="#FA8B02"
      />
      <path
        d="M16.5716 13.1426C17.2028 13.1426 17.7144 12.631 17.7144 11.9998C17.7144 11.3686 17.2028 10.8569 16.5716 10.8569C15.9404 10.8569 15.4287 11.3686 15.4287 11.9998C15.4287 12.631 15.9404 13.1426 16.5716 13.1426Z"
        fill="#FA8B02"
      />
      <path
        d="M12.0003 17.7139C12.6315 17.7139 13.1431 17.2023 13.1431 16.5711C13.1431 15.9399 12.6315 15.4282 12.0003 15.4282C11.3691 15.4282 10.8574 15.9399 10.8574 16.5711C10.8574 17.2023 11.3691 17.7139 12.0003 17.7139Z"
        fill="#FA8B02"
      />
      <path
        d="M7.42899 17.7139C8.06017 17.7139 8.57185 17.2023 8.57185 16.5711C8.57185 15.9399 8.06017 15.4282 7.42899 15.4282C6.79781 15.4282 6.28613 15.9399 6.28613 16.5711C6.28613 17.2023 6.79781 17.7139 7.42899 17.7139Z"
        fill="#FA8B02"
      />
      <path
        d="M16.5716 17.7139C17.2028 17.7139 17.7144 17.2023 17.7144 16.5711C17.7144 15.9399 17.2028 15.4282 16.5716 15.4282C15.9404 15.4282 15.4287 15.9399 15.4287 16.5711C15.4287 17.2023 15.9404 17.7139 16.5716 17.7139Z"
        fill="#FA8B02"
      />
    </svg>
  );

  const PeopleIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_201_1769)">
        <path
          d="M7.92817 7.73357C8.62437 5.29287 10.0301 4.07252 12.06 4.09253C14.0246 4.11253 15.4277 5.36356 16.0705 7.7389C16.1559 7.49483 16.2119 7.32545 16.2732 7.1574C16.752 5.86637 17.679 5.09681 19.042 4.98478C20.2957 4.88342 21.3093 5.43424 21.9415 6.52256C22.6257 7.69356 22.5484 8.87523 21.7401 9.96087C21.46 10.3356 21.4827 10.437 21.8988 10.6477C23.2966 11.3519 23.9821 12.5269 23.9968 14.0887C24.0154 16.0039 24.0141 16.0053 22.1656 16.6134C21.6827 16.7846 21.1821 16.9004 20.6732 16.9589C20.3677 16.9869 20.125 16.8869 20.077 16.5681C20.029 16.2493 20.2317 16.068 20.5304 16.0186C21.2556 15.91 21.9627 15.7036 22.6324 15.4051C22.8098 15.3237 23.0325 15.2717 23.0325 15.0117C23.0325 14.2808 23.1259 13.5366 22.7924 12.847C22.3803 11.9948 21.7321 11.408 20.7705 11.2933C19.7753 11.1886 18.7721 11.1859 17.7763 11.2853C17.5118 11.317 17.2544 11.3927 17.0148 11.5093C16.2346 11.8628 16.2252 11.9815 16.8134 12.6003C17.6173 13.417 18.0896 14.5029 18.1391 15.6478C18.1631 16.1813 18.0831 16.7228 18.1604 17.2483C18.2938 18.1192 17.8804 18.502 17.1255 18.8194C13.5138 20.3372 9.95809 20.2718 6.41841 18.5967C5.99562 18.3966 5.81423 18.1446 5.84758 17.6738C5.88492 17.1403 5.86225 16.6068 5.84758 16.0733C5.82357 14.6062 6.32638 13.3685 7.41603 12.3989C7.7788 12.0761 7.66143 11.9321 7.35468 11.716C6.34505 11.0038 3.08679 11.0198 2.08917 11.7521C1.18891 12.4176 0.667427 13.9834 0.971514 15.0557C1.04087 15.2957 1.23826 15.3438 1.40764 15.4211C2.0365 15.7034 2.7011 15.8982 3.38287 15.9999C3.69763 16.0466 3.96704 16.1827 3.92303 16.5454C3.87368 16.9455 3.56026 16.9962 3.21749 16.9455C2.19586 16.7948 1.24493 16.4307 0.321995 15.9826C0.237409 15.9512 0.163762 15.896 0.110012 15.8235C0.0562626 15.751 0.0247269 15.6645 0.0192411 15.5745C0.0312446 14.5369 -0.132802 13.4859 0.321995 12.4869C0.691358 11.6433 1.36045 10.9666 2.19987 10.5877C2.46661 10.4637 2.59998 10.397 2.35724 10.0836C1.46365 8.95525 1.34629 7.72423 2.0905 6.48254C2.73602 5.40624 3.75364 4.86341 5.00734 4.99145C6.48909 5.14216 7.41869 6.02108 7.81881 7.45482C7.83615 7.51751 7.86949 7.57619 7.92817 7.73357ZM12.004 12.1282C11.4705 12.1282 10.937 12.1095 10.4035 12.1282C9.46236 12.1733 8.57244 12.5703 7.91 13.2404C7.24755 13.9105 6.86087 14.8049 6.82652 15.7465C6.81185 16.1907 6.85587 16.6388 6.80785 17.0802C6.75184 17.5937 6.98124 17.8285 7.4307 18.0138C10.3155 19.1902 13.215 19.2542 16.1385 18.1819C17.1935 17.7938 17.1895 17.7818 17.1882 16.6868C17.1882 16.376 17.1882 16.0653 17.1802 15.7532C17.1465 14.8112 16.7604 13.9161 16.0981 13.2453C15.4359 12.5744 14.546 12.1767 13.6045 12.1308C13.071 12.1082 12.5375 12.1282 12.004 12.1282ZM15.0542 8.08034C15.0494 7.27102 14.7234 6.49674 14.1477 5.92784C13.5721 5.35895 12.794 5.04203 11.9847 5.0468C11.1753 5.05158 10.4011 5.37766 9.83218 5.95331C9.26328 6.52896 8.94636 7.30703 8.95113 8.11635C8.9618 9.76082 10.3862 11.1746 12.0213 11.1612C13.6565 11.1479 15.0716 9.72481 15.0542 8.08034ZM4.7766 10.2516C5.34942 10.2439 5.89579 10.0093 6.29584 9.59921C6.69589 9.18916 6.91696 8.63717 6.91055 8.06433C6.89054 6.89333 5.87692 5.89838 4.71659 5.91972C3.55625 5.94106 2.5493 6.97469 2.5693 8.12435C2.5867 8.6969 2.82734 9.23995 3.23979 9.63745C3.65224 10.0349 4.2038 10.2554 4.7766 10.2516ZM19.2541 10.2516C19.8266 10.2479 20.375 10.0208 20.7826 9.61877C21.1901 9.2167 21.4246 8.6714 21.436 8.09901C21.4216 7.52668 21.1886 6.98161 20.7847 6.5758C20.3809 6.16999 19.837 5.93426 19.2648 5.91705C18.6913 5.92769 18.1444 6.1606 17.7393 6.56665C17.3343 6.97271 17.1027 7.5202 17.0935 8.09367C17.0949 8.66615 17.323 9.21475 17.7279 9.61943C18.1329 10.0241 18.6816 10.2519 19.2541 10.253V10.2516ZM9.46995 11.2039C8.62479 10.468 8.08493 9.44297 7.95618 8.32974C7.80947 8.76853 7.75346 9.03394 7.63609 9.26334C7.4427 9.64879 6.96923 10.0902 7.05726 10.3703C7.15462 10.6877 7.80014 10.7958 8.10022 11.0999C8.51901 11.528 8.90312 11.5893 9.46995 11.2039ZM14.474 11.2773C14.9529 11.3373 15.2423 11.712 15.601 11.3519C15.9425 11.0026 16.3507 10.7255 16.8014 10.537C17.0001 10.4557 17.1201 10.361 16.9227 10.1596C16.468 9.6968 16.2852 9.09263 16.0345 8.33107C15.8878 9.58343 15.3476 10.4557 14.4727 11.2773H14.474Z"
          fill="#FA8B02"
          stroke="#FA8B02"
          strokeWidth="0.3"
        />
      </g>
      <defs>
        <clipPath id="clip0_201_1769">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-12 gap-4">
          <h2 className="font-open-sans text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 max-w-lg">
            Explore Our Popular Destinations
          </h2>
          <div className="flex items-center gap-5">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((destination, index) => (
            <Link
              key={index}
              to={`/tour/${destination.id}`}
              className="group block w-[330px] flex-shrink-0"
            >
              <Card className="border-none shadow-none hover:shadow-lg transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="w-full aspect-[330/404] rounded-3xl overflow-hidden mb-4">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-0 space-y-3">
                  <h3 className="font-open-sans text-lg sm:text-xl font-bold text-[#333] group-hover:text-orange-500 transition-colors">
                    {destination.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="font-open-sans text-sm sm:text-base font-semibold text-[#333] opacity-80">
                      from
                    </span>
                    <span className="font-open-sans text-lg sm:text-xl font-bold text-[#FA8B02]">
                      {destination.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full opacity-60">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon />
                      <span className="font-open-sans text-xs sm:text-sm font-semibold text-[#FA8B02]">
                        {destination.schedule}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PeopleIcon />
                      <span className="font-open-sans text-xs sm:text-sm font-semibold text-[#FA8B02]">
                        {destination.people}
                      </span>
                    </div>
                  </div>

                  <p className="font-open-sans text-sm sm:text-base text-[#333] leading-6 max-w-[320px]">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
