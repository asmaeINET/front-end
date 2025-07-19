import React, { useState } from "react";
import { Calendar, Clock, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const searchSchema = z.object({
  tourType: z.enum(["public", "private"]),
  numberOfPeople: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  tour: z.string().min(1, "Please select a tour"),
  transportation: z.string().min(1, "Please select transportation/type"),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchWidgetProps {
  className?: string;
  onSearch?: (data: SearchFormData) => void;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ className, onSearch }) => {
  const [activeTab, setActiveTab] = useState<"public" | "private">("public");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      tourType: "public",
      numberOfPeople: "",
      date: "",
      time: "",
      tour: "",
      transportation: "",
    },
  });

  // Dropdown states
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTourDropdown, setShowTourDropdown] = useState(false);
  const [showTransportationDropdown, setShowTransportationDropdown] =
    useState(false);
  const [showNumberOfPeopleDropdown, setShowNumberOfPeopleDropdown] =
    useState(false);

  // Update tour type when tab changes
  const handleTabChange = (tab: "public" | "private") => {
    setActiveTab(tab);
    form.setValue("tourType", tab);
    // Reset transportation when switching tabs
    form.setValue("transportation", "");
    setShowTransportationDropdown(false);
  };

  const tours = [
    "Lucca Bike Tour",
    "Book a bike",
    "Tour in the outside of Lucca",
    "Wine Tasting in Tuscany",
    "Cinque Terre Tour",
    "Siena and Surroundings",
    "Pisa & Lucca",
    "Italy Special Trips",
    "Florence",
  ];

  const times = ["1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am"];

  const transportations = [
    "Minivan and Bus",
    "Transfers & NCC",
    "Luxury Experience",
  ];

  const numberOfPeopleOptions = [
    "1 Person",
    "2 People",
    "3 People",
    "4 People",
    "5+ People",
  ];

  const closeAllDropdowns = () => {
    setShowNumberOfPeopleDropdown(false);
    setShowDateDropdown(false);
    setShowTimeDropdown(false);
    setShowTourDropdown(false);
    setShowTransportationDropdown(false);
  };

  const onSubmit = (data: SearchFormData) => {
    onSearch?.(data);
    console.log("Search data:", data);
    // Navigate to search results page
    navigate("/search-results");
  };

  return (
    <div className={cn("relative max-w-6xl mx-auto", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
            {/* Tour Type Tabs */}
            <div className="flex mb-0 -mb-px relative">
              <button
                type="button"
                onClick={() => handleTabChange("public")}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-t-xl transition-colors",
                  activeTab === "public"
                    ? "bg-white text-orange-500"
                    : "bg-white/40 text-white",
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
                    fill={activeTab === "public" ? "#FA8B02" : "white"}
                  />
                </svg>
                <span className="font-open-sans text-lg font-semibold">
                  {t("search.publicTours")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("private")}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-tr-xl transition-colors",
                  activeTab === "private"
                    ? "bg-white text-orange-500"
                    : "bg-white/40 text-white",
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_201_1670)">
                    <path
                      d="M8.42817 7.73357C9.12437 5.29287 10.5301 4.07252 12.56 4.09253C14.5246 4.11253 15.9277 5.36356 16.5705 7.7389C16.6559 7.49483 16.7119 7.32545 16.7732 7.1574C17.252 5.86637 18.179 5.09681 19.542 4.98478C20.7957 4.88342 21.8093 5.43424 22.4415 6.52256C23.1257 7.69356 23.0484 8.87523 22.2401 9.96087C21.96 10.3356 21.9827 10.437 22.3988 10.6477C23.7966 11.3519 24.4821 12.5269 24.4968 14.0887C24.5154 16.0039 24.5141 16.0053 22.6656 16.6134C22.1827 16.7846 21.6821 16.9004 21.1732 16.9589C20.8677 16.9869 20.625 16.8869 20.577 16.5681C20.529 16.2493 20.7317 16.068 21.0304 16.0186C21.7556 15.91 22.4627 15.7036 23.1324 15.4051C23.3098 15.3237 23.5325 15.2717 23.5325 15.0117C23.5325 14.2808 23.6259 13.5366 23.2924 12.847C22.8803 11.9948 22.2321 11.408 21.2705 11.2933C20.2753 11.1886 19.2721 11.1859 18.2763 11.2853C18.0118 11.317 17.7544 11.3927 17.5148 11.5093C16.7346 11.8628 16.7252 11.9815 17.3134 12.6003C18.1173 13.417 18.5896 14.5029 18.6391 15.6478C18.6631 16.1813 18.5831 16.7228 18.6604 17.2483C18.7938 18.1192 18.3804 18.502 17.6255 18.8194C14.0138 20.3372 10.4581 20.2718 6.91841 18.5967C6.49562 18.3966 6.31423 18.1446 6.34758 17.6738C6.38492 17.1403 6.36225 16.6068 6.34758 16.0733C6.32357 14.6062 6.82638 13.3685 7.91603 12.3989C8.2788 12.0761 8.16143 11.9321 7.85468 11.716C6.84505 11.0038 3.58679 11.0198 2.58917 11.7521C1.68891 12.4176 1.16743 13.9834 1.47151 15.0557C1.54087 15.2957 1.73826 15.3438 1.90764 15.4211C2.5365 15.7034 3.2011 15.8982 3.88287 15.9999C4.19763 16.0466 4.46704 16.1827 4.42303 16.5454C4.37368 16.9455 4.06026 16.9962 3.71749 16.9455C2.69586 16.7948 1.74493 16.4307 0.821995 15.9826C0.737409 15.9512 0.663762 15.896 0.610012 15.8235C0.556263 15.751 0.524727 15.6645 0.519241 15.5745C0.531245 14.5369 0.367198 13.4859 0.821995 12.4869C1.19136 11.6433 1.86045 10.9666 2.69987 10.5877C2.96661 10.4637 3.09998 10.397 2.85724 10.0836C1.96365 8.95525 1.84629 7.72423 2.5905 6.48254C3.23602 5.40624 4.25364 4.86341 5.50734 4.99145C6.98909 5.14216 7.91869 6.02108 8.31881 7.45482C8.33615 7.51751 8.36949 7.57619 8.42817 7.73357ZM12.504 12.1282C11.9705 12.1282 11.437 12.1095 10.9035 12.1282C9.96236 12.1733 9.07244 12.5703 8.41 13.2404C7.74755 13.9105 7.36087 14.8049 7.32652 15.7465C7.31185 16.1907 7.35587 16.6388 7.30785 17.0802C7.25184 17.5937 7.48124 17.8285 7.9307 18.0138C10.8155 19.1902 13.715 19.2542 16.6385 18.1819C17.6935 17.7938 17.6895 17.7818 17.6882 16.6868C17.6882 16.376 17.6882 16.0653 17.6802 15.7532C17.6465 14.8112 17.2604 13.9161 16.5981 13.2453C15.9359 12.5744 15.046 12.1767 14.1045 12.1308C13.571 12.1082 13.0375 12.1282 12.504 12.1282ZM15.5542 8.08034C15.5494 7.27102 15.2234 6.49674 14.6477 5.92784C14.0721 5.35895 13.294 5.04203 12.4847 5.0468C11.6753 5.05158 10.9011 5.37766 10.3322 5.95331C9.76328 6.52896 9.44636 7.30703 9.45113 8.11635C9.4618 9.76082 10.8862 11.1746 12.5213 11.1612C14.1565 11.1479 15.5716 9.72481 15.5542 8.08034ZM5.2766 10.2516C5.84942 10.2439 6.39579 10.0093 6.79584 9.59921C7.19589 9.18916 7.41696 8.63717 7.41055 8.06433C7.39054 6.89333 6.37692 5.89838 5.21659 5.91972C4.05625 5.94106 3.0493 6.97469 3.0693 8.12435C3.0867 8.6969 3.32734 9.23995 3.73979 9.63745C4.15224 10.0349 4.7038 10.2554 5.2766 10.2516ZM19.7541 10.2516C20.3266 10.2479 20.875 10.0208 21.2826 9.61877C21.6901 9.2167 21.9246 8.6714 21.936 8.09901C21.9216 7.52668 21.6886 6.98161 21.2847 6.5758C20.8809 6.16999 20.337 5.93426 19.7648 5.91705C19.1913 5.92769 18.6444 6.1606 18.2393 6.56665C17.8343 6.97271 17.6027 7.5202 17.5935 8.09367C17.5949 8.66615 17.823 9.21475 18.2279 9.61943C18.6329 10.0241 19.1816 10.2519 19.7541 10.253V10.2516ZM9.96995 11.2039C9.12479 10.468 8.58493 9.44297 8.45618 8.32974C8.30947 8.76853 8.25346 9.03394 8.13609 9.26334C7.9427 9.64879 7.46923 10.0902 7.55726 10.3703C7.65462 10.6877 8.30014 10.7958 8.60022 11.0999C9.01901 11.528 9.40312 11.5893 9.96995 11.2039ZM14.974 11.2773C15.4529 11.3373 15.7423 11.712 16.101 11.3519C16.4425 11.0026 16.8507 10.7255 17.3014 10.537C17.5001 10.4557 17.6201 10.361 17.4227 10.1596C16.968 9.6968 16.7852 9.09263 16.5345 8.33107C16.3878 9.58343 15.8476 10.4557 14.9727 11.2773H14.974Z"
                      fill={activeTab === "private" ? "#FA8B02" : "white"}
                      stroke={activeTab === "private" ? "#FA8B02" : "white"}
                      strokeWidth="0.3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_1670">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-open-sans text-lg font-semibold">
                  {t("search.privateTours")}
                </span>
              </button>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-b-xl rounded-tr-xl p-3 relative">
              <div className="flex flex-col lg:flex-row items-stretch gap-3">
                {/* Number of People - Only for Public Tours */}
                {activeTab === "public" && (
                  <>
                    <FormField
                      control={form.control}
                      name="numberOfPeople"
                      render={({ field }) => (
                        <FormItem className="relative flex-1 w-full lg:w-auto">
                          <FormControl>
                            <button
                              type="button"
                              onClick={() => {
                                closeAllDropdowns();
                                setShowNumberOfPeopleDropdown(
                                  !showNumberOfPeopleDropdown,
                                );
                              }}
                              className="w-full flex items-center gap-2 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-600 flex-shrink-0"
                              >
                                <path
                                  d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4ZM8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6ZM8 13C11.315 13 12 15.685 12 17V20H4V17C4 15.685 4.685 13 8 13ZM16 13C19.315 13 20 15.685 20 17V20H13V17.715C13 16.645 12.695 15.52 12.225 14.52C13.095 13.555 14.395 13 16 13Z"
                                  fill="#333333"
                                />
                              </svg>
                              <div className="flex flex-col items-start min-w-0">
                                <span className="font-open-sans text-lg font-semibold text-gray-800">
                                  {t("search.people")}
                                </span>
                                <div className="flex items-center gap-5 opacity-70">
                                  <span className="font-open-sans text-lg text-gray-800 opacity-80">
                                    {field.value || t("search.selectPeople")}
                                  </span>
                                  <ChevronDown className="w-5 h-5 text-gray-600 opacity-60" />
                                </div>
                              </div>
                            </button>
                          </FormControl>
                          {showNumberOfPeopleDropdown && (
                            <div className="absolute top-full left-0 z-50 w-52 bg-white rounded-b-xl shadow-lg border border-gray-200">
                              {numberOfPeopleOptions.map((people, index) => (
                                <button
                                  key={people}
                                  type="button"
                                  onClick={() => {
                                    field.onChange(people);
                                    setShowNumberOfPeopleDropdown(false);
                                  }}
                                  className={cn(
                                    "w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 font-open-sans text-lg text-gray-800 opacity-80",
                                    index < numberOfPeopleOptions.length - 1 &&
                                      "border-b border-gray-200",
                                    index ===
                                      numberOfPeopleOptions.length - 1 &&
                                      "rounded-b-xl",
                                  )}
                                >
                                  {people}
                                </button>
                              ))}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-px h-12 bg-gray-300 opacity-20 hidden lg:block"></div>
                  </>
                )}

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="relative flex-1 w-full lg:w-auto">
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => {
                            closeAllDropdowns();
                            setShowDateDropdown(!showDateDropdown);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <Calendar className="w-6 h-6 text-gray-600 flex-shrink-0" />
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-open-sans text-lg font-semibold text-gray-800">
                              {t("search.date")}
                            </span>
                            <div className="flex items-center gap-5 opacity-70">
                              <span className="font-open-sans text-lg text-gray-800 opacity-80">
                                {field.value || t("search.chooseDate")}
                              </span>
                              <ChevronDown className="w-5 h-5 text-gray-600 opacity-60" />
                            </div>
                          </div>
                        </button>
                      </FormControl>
                      {showDateDropdown && (
                        <div className="absolute top-full left-0 z-50 w-64 bg-white rounded-b-xl shadow-lg border border-gray-200">
                          <div className="p-4">
                            <div className="flex justify-center items-center gap-16 mb-4">
                              <span className="font-open-sans text-lg font-semibold text-gray-800">
                                October 2022
                              </span>
                              <div className="flex gap-4 opacity-40">
                                <ChevronDown className="w-3 h-3 text-gray-800 rotate-90" />
                                <ChevronDown className="w-3 h-3 text-gray-800 -rotate-90" />
                              </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center">
                              {["M", "T", "W", "T", "F", "S", "S"].map(
                                (day, i) => (
                                  <div
                                    key={i}
                                    className="text-xs font-medium text-gray-600 py-1"
                                  >
                                    {day}
                                  </div>
                                ),
                              )}
                              {Array.from({ length: 31 }, (_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    const date = `October ${i + 1}, 2022`;
                                    field.onChange(date);
                                    setShowDateDropdown(false);
                                  }}
                                  className={cn(
                                    "text-xs py-1 rounded-full hover:bg-orange-100",
                                    i === 1 && "bg-orange-500 text-white",
                                  )}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-px h-12 bg-gray-300 opacity-20 hidden lg:block"></div>

                {/* Time */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="relative flex-1 w-full lg:w-auto">
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => {
                            closeAllDropdowns();
                            setShowTimeDropdown(!showTimeDropdown);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <Clock className="w-6 h-6 text-gray-600 flex-shrink-0" />
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-open-sans text-lg font-semibold text-gray-800">
                              {t("search.time")}
                            </span>
                            <div className="flex items-center gap-5 opacity-70">
                              <span className="font-open-sans text-lg text-gray-800 opacity-80">
                                {field.value || t("search.chooseTime")}
                              </span>
                              <ChevronDown className="w-5 h-5 text-gray-600 opacity-60" />
                            </div>
                          </div>
                        </button>
                      </FormControl>
                      {showTimeDropdown && (
                        <div className="absolute top-full left-0 z-50 w-52 bg-white rounded-b-xl shadow-lg border border-gray-200">
                          {times.map((time, index) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => {
                                field.onChange(time);
                                setShowTimeDropdown(false);
                              }}
                              className={cn(
                                "w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 font-open-sans text-lg text-gray-800 opacity-80",
                                index < times.length - 1 &&
                                  "border-b border-gray-200",
                                index === times.length - 1 && "rounded-b-xl",
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-px h-12 bg-gray-300 opacity-20 hidden lg:block"></div>

                {/* Tour */}
                <FormField
                  control={form.control}
                  name="tour"
                  render={({ field }) => (
                    <FormItem className="relative flex-1 w-full lg:w-auto">
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => {
                            closeAllDropdowns();
                            setShowTourDropdown(!showTourDropdown);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-600 flex-shrink-0"
                          >
                            <path
                              d="M7.01465 2.9502C7.24095 2.94773 7.45788 3.02444 7.61426 3.15723C7.77118 3.29055 7.86811 3.48143 7.84766 3.7041C7.8225 3.97108 7.88165 4.17304 7.99023 4.34668C8.10015 4.52241 8.26173 4.67098 8.44434 4.83008L8.69531 5.03516C9.9666 6.00415 11.4343 6.14549 12.999 5.95996C13.9397 5.85163 14.8863 5.68848 15.8447 5.68848C17.5934 5.6885 19.0336 6.36642 20.209 7.63867C20.2623 7.69647 20.3241 7.7627 20.3564 7.83691C20.3732 7.87534 20.3833 7.91717 20.3799 7.96289C20.3765 8.00855 20.3608 8.05507 20.3311 8.10254C20.2717 8.19735 20.1944 8.24579 20.1064 8.25488C20.0219 8.26354 19.9341 8.23513 19.8525 8.19434C18.8688 7.69862 17.8916 7.829 16.9092 8.23438C16.8633 8.25295 16.8169 8.27187 16.7715 8.29199C16.5982 8.36906 16.4316 8.46086 16.2734 8.56543C15.503 9.07267 14.4778 9.78023 13.4414 10.4316C12.4052 11.0829 11.3519 11.6819 10.5244 11.9707C9.72066 12.2517 8.90592 12.3312 8.07812 12.0723C8.02896 12.0568 7.98954 12.0476 7.95898 12.0449C7.92853 12.0422 7.91139 12.0458 7.90137 12.0518C7.89246 12.057 7.88278 12.068 7.875 12.0938C7.86693 12.1206 7.86215 12.1603 7.86328 12.2168C7.87268 12.7393 7.87111 13.2618 7.86328 13.7832C7.86335 13.8666 7.87529 13.9107 7.89844 13.9385C7.92174 13.9663 7.96535 13.9886 8.05664 14.0049C8.48335 14.0807 8.79165 14.2266 8.99219 14.4697C9.19252 14.7126 9.27923 15.0443 9.2793 15.4775L9.29004 16.7305C9.29258 17.1487 9.29011 17.5672 9.27051 17.9844C9.23014 18.8424 9.35376 19.6521 9.71973 20.4258C9.76884 20.5308 9.8013 20.6215 9.8125 20.6992C9.82374 20.7775 9.81464 20.8478 9.77539 20.9043C9.73648 20.9602 9.67385 20.9949 9.59668 21.0156C9.51954 21.0363 9.42233 21.0449 9.30664 21.0449V21.0439C8.4182 21.0494 7.53331 21.0373 6.64648 21.0498C6.48329 21.0518 6.34394 21.0213 6.25293 20.9385C6.1589 20.8528 6.1286 20.7229 6.15723 20.5566C6.23189 20.1251 6.17656 19.7611 6.02051 19.4453C5.90316 19.2079 5.72757 18.9955 5.50391 18.8008L5.26465 18.6113C4.77988 18.2622 4.57561 17.77 4.62695 17.1689C4.63964 17.0182 4.63926 16.8659 4.63672 16.7119C4.63419 16.5587 4.62927 16.4024 4.63281 16.2471V16.2461C4.64516 15.9103 4.78178 15.5909 5.0166 15.3506C5.25148 15.1103 5.5679 14.9663 5.90332 14.9463L5.99316 14.9346C6.07067 14.9192 6.11244 14.8926 6.1377 14.8584C6.17382 14.8095 6.18651 14.7317 6.18652 14.5996C6.18105 11.9392 6.18164 9.27854 6.18164 6.61816V6.26465C6.18008 5.42205 6.17409 3.94664 6.1875 3.70996C6.21264 3.25392 6.5608 2.95519 7.01465 2.9502Z"
                              fill="#333333"
                              stroke="#333333"
                              strokeWidth="0.1"
                            />
                          </svg>
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-open-sans text-lg font-semibold text-gray-800">
                              {t("search.tour")}
                            </span>
                            <div className="flex items-center gap-5 opacity-70">
                              <span className="font-open-sans text-lg text-gray-800 opacity-80">
                                {field.value || t("search.selectTour")}
                              </span>
                              <ChevronDown className="w-5 h-5 text-gray-600 opacity-60" />
                            </div>
                          </div>
                        </button>
                      </FormControl>
                      {showTourDropdown && (
                        <div className="absolute top-full left-0 z-50 w-52 bg-white rounded-b-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                          {tours.map((tour, index) => (
                            <button
                              key={tour}
                              type="button"
                              onClick={() => {
                                field.onChange(tour);
                                setShowTourDropdown(false);
                              }}
                              className={cn(
                                "w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 font-open-sans text-lg text-gray-800 opacity-80 border-b border-gray-200",
                                index === tours.length - 1 &&
                                  "rounded-b-xl border-b-0",
                              )}
                            >
                              {tour}
                            </button>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-px h-12 bg-gray-300 opacity-20 hidden lg:block"></div>

                {/* Types/Transportation */}
                <FormField
                  control={form.control}
                  name="transportation"
                  render={({ field }) => (
                    <FormItem className="relative flex-1 w-full lg:w-auto">
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => {
                            closeAllDropdowns();
                            setShowTransportationDropdown(
                              !showTransportationDropdown,
                            );
                          }}
                          className="w-full flex items-center gap-2 px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-600 flex-shrink-0"
                          >
                            <path
                              d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v4l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2c0 1.1.9 2 2 2s2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2zM7 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm10 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM8 6h8v4H8V6z"
                              fill="#333333"
                            />
                          </svg>
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-open-sans text-lg font-semibold text-gray-800">
                              {activeTab === "public"
                                ? t("search.transportation")
                                : t("search.types")}
                            </span>
                            <div className="flex items-center gap-5 opacity-70">
                              <span className="font-open-sans text-lg text-gray-800 opacity-80">
                                {field.value ||
                                  (activeTab === "public"
                                    ? t("search.selectTransportation")
                                    : t("search.selectTypes"))}
                              </span>
                              <ChevronDown className="w-5 h-5 text-gray-600 opacity-60" />
                            </div>
                          </div>
                        </button>
                      </FormControl>
                      {showTransportationDropdown && (
                        <div className="absolute top-full left-0 z-50 w-64 bg-white rounded-b-xl shadow-lg border border-gray-200">
                          {transportations.map((transport, index) => (
                            <button
                              key={transport}
                              type="button"
                              onClick={() => {
                                field.onChange(transport);
                                setShowTransportationDropdown(false);
                              }}
                              className={cn(
                                "w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 font-open-sans text-lg text-gray-800 opacity-80",
                                index < transportations.length - 1 &&
                                  "border-b border-gray-200",
                                index === transportations.length - 1 &&
                                  "rounded-b-xl",
                              )}
                            >
                              {transport}
                            </button>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 rounded-xl p-6 flex items-center justify-center transition-colors lg:flex-shrink-0 mt-3 lg:mt-0"
                >
                  <Search className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchWidget;
