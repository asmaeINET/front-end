import { useNavigate } from "react-router-dom";
import Header from "@/components/sections/Header";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderComplete = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-44 pb-20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex flex-col items-center justify-center min-h-[600px] max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white fill-current" />
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-open-sans font-bold text-black mb-4">
                Your Order is complete!
              </h1>
              <p className="text-xl font-open-sans text-gray-900">
                You will be receiving a confirmation email with order details.
              </p>
            </div>

            {/* Go Home Button */}
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 text-xl font-open-sans font-bold rounded-full"
            >
              Go to the Home Page
            </Button>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default OrderComplete;
