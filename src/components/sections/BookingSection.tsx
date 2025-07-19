import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const bookingSchema = z.object({
  nameAndSurname: z.string().min(1, "Name and surname are required"),
  email: z.string().email("Please enter a valid email address"),
  telephone: z.string().min(1, "Telephone number is required"),
  serviceType: z.string().min(1, "Please select a service type"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingSection = () => {
  const { t } = useTranslation();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nameAndSurname: "",
      email: "",
      telephone: "",
      serviceType: "",
      date: "",
      time: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking form submitted:", data);
    alert("Booking request submitted! We'll contact you soon.");
    form.reset();
  };

  return (
    <section
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/9701f738601250e882ef75d8404d249ce9f4f55a?width=3840')`,
      }}
    >
      <div className="container mx-auto px-4 lg:px-[90px] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[622px] lg:h-[622px] py-8 lg:py-0 mx-auto gap-8 lg:gap-0">
          {/* Left side - Booking Form */}
          <div className="order-2 lg:order-1 flex flex-col">
            <h2 className="font-open-sans text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
              {t("booking.title")}
            </h2>

            <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <FormField
                      control={form.control}
                      name="nameAndSurname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.nameAndSurname")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mario Rossi"
                              className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.emailAddress")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="mario.rossi@email.com"
                              className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.telephoneNumber")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+39 333 333 3333"
                              className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.serviceType")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="inline-block border-gray-300 rounded border w-full mt-2 p-2">
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bike-rental">
                                {t("booking.bikeRental")}
                              </SelectItem>
                              <SelectItem value="guided-tour">
                                {t("booking.guidedTour")}
                              </SelectItem>
                              <SelectItem value="transport">
                                {t("booking.transport")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.date")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium leading-5">
                            {t("booking.time")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Book Button */}
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 rounded-full py-3 px-6"
                    disabled={form.formState.isSubmitting}
                  >
                    <span className="font-open-sans text-lg sm:text-xl font-semibold text-white">
                      {form.formState.isSubmitting
                        ? "Booking..."
                        : t("booking.bookNow")}
                    </span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Right side - Bike Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/29ca68ca847b2df9ffe2d964ca0dd25a8f3b64df?width=1448"
              alt="Bike rental"
              className="w-full max-w-[1279px] h-auto lg:h-[566px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
