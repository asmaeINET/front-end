import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/sections/Header";
import FooterSection from "@/components/sections/FooterSection";
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
const contactSchema = z.object({
  name: z.string().min(1, "Name and surname is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    alert("Thank you for your message! We'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Contact Section */}
      <section
        className="relative min-h-[670px] pb-16 mt-[136px] flex flex-col"
        style={{
          background: "linear-gradient(135deg, #FFE4CC 0%, #FFCD9A 100%)",
        }}
      >
        <div className="max-w-[1920px] mt-16 mx-auto px-4 lg:px-5 lg:pt-5 lg:pl-[250px] lg:pr-[250px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[95px]">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-start">
              <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 mb-6">
                Get In Touch!
              </h1>
              <p className="text-lg font-semibold text-gray-800 mb-12 max-w-[363px]">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-6 h-6 text-orange-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Piazza Napoleone, Lucca, Tuscany
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-orange-500 bg-orange-100/50">
                  <div className="w-6 h-6 text-orange-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    +39 346 368 5708
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-6 h-6 text-orange-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    italiainlimo@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800">
                          Name and Surname
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name and surname"
                            className="bg-white rounded-lg border-0 py-4 px-6 text-base placeholder:text-gray-500 placeholder:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="bg-white rounded-lg border-0 py-4 px-6 text-base placeholder:text-gray-500 placeholder:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-800">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your Message"
                            rows={6}
                            className="bg-white rounded-lg border-0 py-4 px-6 text-base placeholder:text-gray-500 placeholder:opacity-50 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xl px-6 py-3 rounded-full h-auto"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Sending..."
                      : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative">
        <div
          className="w-full h-[693px] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://api.builder.io/api/v1/image/assets/TEMP/586ba609425f6dd9f3c4a7e817a3ea9030e9aa0d?width=3840")',
          }}
        >
          {/* Location Marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-400 opacity-50 rounded-full blur-sm"></div>
              {/* Marker */}
              <div className="w-16 h-20">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1bd2b66cf9873f959c05d3a89d25339d4cd0e399?width=139"
                  alt="Location Marker"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ContactUs;
