import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/sections/Header";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  telephone: z.string().min(1, "Telephone is required"),
  email: z.string().email("Please enter a valid email address"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tourName = searchParams.get("tour") || "Wine tasting In Tuscany";
  const tourDate = searchParams.get("date") || "FRI, 23 DEC 2022";
  const tourTime = searchParams.get("time") || "15:00";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "1");
  const infants = parseInt(searchParams.get("infants") || "1");

  const adultPrice = 32.0;
  const childPrice = 22.0;
  const infantPrice = 0.0;

  const totalPrice =
    adults * adultPrice + children * childPrice + infants * infantPrice;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      surname: "",
      telephone: "",
      email: "",
    },
  });

  const onSubmit = (formData: BookingFormData) => {
    // Navigate to payment page with form data
    const params = new URLSearchParams({
      tour: tourName,
      date: tourDate,
      time: tourTime,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      total: totalPrice.toString(),
      ...formData,
    });

    navigate(`/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-44 pb-20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16 max-w-[1920px]">
          {/* Progress Bar */}
          <div className="flex justify-start items-start mb-12 lg:mb-20">
            <div className="flex items-center gap-4 lg:gap-8 max-w-4xl px-4">
              {/* Step 1 - Active */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 lg:w-9 lg:h-9 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-open-sans font-bold text-lg lg:text-xl">
                    1
                  </span>
                </div>
                <span className="text-orange-500 font-open-sans font-bold text-sm lg:text-xl whitespace-nowrap">
                  Booking Details
                </span>
              </div>

              {/* Progress Line 1 */}
              <div className="w-16 lg:w-72 h-1 bg-orange-500 flex-shrink-0"></div>

              {/* Step 2 - Inactive */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 font-open-sans font-bold text-lg lg:text-xl">
                    2
                  </span>
                </div>
                <span className="text-gray-600 font-open-sans font-normal text-sm lg:text-xl opacity-40 whitespace-nowrap">
                  Your Details
                </span>
              </div>

              {/* Progress Line 2 */}
              <div className="w-16 lg:w-80 h-1 bg-gray-300 flex-shrink-0"></div>

              {/* Step 3 - Inactive */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 font-open-sans font-bold text-lg lg:text-xl">
                    3
                  </span>
                </div>
                <span className="text-gray-600 font-open-sans font-normal text-sm lg:text-xl opacity-40 whitespace-nowrap">
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 max-w-7xl mx-auto">
            {/* Left Side - Form */}
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl font-open-sans font-bold text-gray-900 mb-8 lg:mb-12">
                Who shall we send these tickets to?
              </h1>

              <Form {...form}>
                <form
                  id="booking-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-open-sans font-bold text-gray-900">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              className="h-14 text-base border border-gray-300 rounded-lg px-6"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Surname */}
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-open-sans font-bold text-gray-900">
                            Surname
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your surname"
                              className="h-14 text-base border border-gray-300 rounded-lg px-6"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Telephone */}
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-open-sans font-bold text-gray-900">
                            Telephone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your telephone number"
                              className="h-14 text-base border border-gray-300 rounded-lg px-6"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-open-sans font-bold text-gray-900">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="h-14 text-base border border-gray-300 rounded-lg px-6"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-[600px]">
              <div className="border border-gray-300 rounded-3xl p-8 bg-white shadow-lg">
                <h2 className="text-2xl font-open-sans font-bold text-gray-900 mb-8">
                  Your Tickets Overview
                </h2>

                {/* Tour Info */}
                <div className="border-b border-gray-300 pb-6 mb-6">
                  <div className="flex gap-5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd2eb0bef3de7b2d63ebe98b7f9572c4b27816b6?width=320"
                      alt={tourName}
                      className="w-40 h-28 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-open-sans font-bold text-gray-900 mb-4">
                        {tourName}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        <span className="text-lg font-open-sans font-bold text-gray-900">
                          {tourDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-orange-500" />
                        <span className="text-lg font-open-sans font-bold text-gray-900">
                          {tourTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-b border-gray-300 pb-6 mb-6">
                  {adults > 0 && (
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-open-sans font-bold text-xl">
                            {adults}
                          </span>
                        </div>
                        <span className="text-xl font-open-sans text-gray-900 opacity-80">
                          Adult (18+) (€{adultPrice.toFixed(2)})
                        </span>
                      </div>
                      <span className="text-xl font-open-sans font-bold text-gray-900">
                        €{(adults * adultPrice).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {children > 0 && (
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-open-sans font-bold text-xl">
                            {children}
                          </span>
                        </div>
                        <span className="text-xl font-open-sans text-gray-900 opacity-80">
                          Child (6-17)
                        </span>
                      </div>
                      <span className="text-xl font-open-sans font-bold text-gray-900">
                        €{(children * childPrice).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {infants > 0 && (
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-open-sans font-bold text-xl">
                            {infants}
                          </span>
                        </div>
                        <span className="text-xl font-open-sans text-gray-900 opacity-80">
                          Infant (0-5)
                        </span>
                      </div>
                      <span className="text-xl font-open-sans font-bold text-gray-900">
                        €{(infants * infantPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-6 mb-8">
                  <span className="text-2xl font-open-sans font-bold text-gray-900 opacity-80">
                    Total Price
                  </span>
                  <span className="text-2xl font-open-sans font-bold text-orange-500">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Next Step Button */}
                <Button
                  type="submit"
                  form="booking-form"
                  className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-xl font-open-sans font-bold rounded-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : "Go to the Next Step"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BookingDetails;
