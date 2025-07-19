import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/sections/Header";
import FooterSection from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Check } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tourName = searchParams.get("tour") || "Wine tasting In Tuscany";
  const tourDate = searchParams.get("date") || "FRI, 23 DEC 2022";
  const tourTime = searchParams.get("time") || "15:00";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "1");
  const infants = parseInt(searchParams.get("infants") || "1");
  const totalPrice = parseFloat(searchParams.get("total") || "86.00");

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardData, setCardData] = useState({
    number: "1234 5678 9101 3456",
    expiry: "",
    cvv: "***",
  });

  const adultPrice = 32.0;
  const childPrice = 22.0;
  const infantPrice = 0.0;

  const handleCompletePayment = () => {
    // Simulate payment processing
    navigate("/order-complete");
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-44 pb-20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16 max-w-[1920px]">
          {/* Progress Bar */}
          <div className="flex justify-center mb-12 lg:mb-20">
            <div className="flex items-center gap-4 lg:gap-8 max-w-3xl overflow-x-auto px-4">
              {/* Step 1 - Completed */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-open-sans font-bold text-xl">
                    1
                  </span>
                </div>
                <span className="text-orange-500 font-open-sans font-bold text-xl">
                  Booking Details
                </span>
              </div>

              {/* Progress Line 1 */}
              <div className="w-72 h-1 bg-orange-500"></div>

              {/* Step 2 - Completed */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-open-sans font-bold text-xl">
                    2
                  </span>
                </div>
                <span className="text-orange-500 font-open-sans font-bold text-xl">
                  Your Details
                </span>
              </div>

              {/* Progress Line 2 */}
              <div className="w-80 h-1 bg-orange-500"></div>

              {/* Step 3 - Active */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-open-sans font-bold text-xl">
                    3
                  </span>
                </div>
                <span className="text-orange-500 font-open-sans font-bold text-xl">
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-20 max-w-7xl mx-auto">
            {/* Left Side - Payment Methods */}
            <div className="flex-1">
              <h1 className="text-2xl font-open-sans font-bold text-gray-900 mb-12">
                Select a payment method
              </h1>

              {/* PayPal Option */}
              <div className="border border-gray-300 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="paypal"
                    className="text-lg font-open-sans font-bold text-gray-900"
                  >
                    PayPal
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-open-sans text-gray-900 flex-1">
                    You will be redirected to the PayPal website after
                    submitting your order
                  </p>
                  <div className="border border-gray-400 rounded-lg p-2">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MyAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MS41IiBoZWlnaHQ9IjI5IiByeD0iMy41IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjQjJCQ0NBIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTguMjY3OCAyMy4wNjA2TDE4LjU0MzcgMjEuMjQ5Mkw xNy45MjkxIDIxLjIzNDRIMTQuOTk0MUwxNy4wMzM4IDcuODY3MzdDMTcuMDQwMiA3LjgyNjg5IDE3LjA2MDcgNy43ODkzMSAxNy4wOTA3IDcuNzYyNThDMTcuMTIwOCA3LjczNTg1IDE3LjE1OTMgNy43MjExOSAxNy4xOTk1IDcuNzIxMTlIMjIuMTQ4MkMyMy43OTEyIDcuNzIxMTkgMjQuOTI1IDguMDc0NDkgMjUuNTE2OSA4Ljc3MTkxQzI1Ljc5NDQgOS4wOTkwOSAyNS45NzExIDkuNDQxMDggMjYuMDU2NyA5LjgxNzI5QzI2LjE0NjQgMTAuMjEyMSAyNi4xNDc5IDEwLjY4MzggMjYuMDYwNCAxMS4yNTkyTDI2LjA1NCAxMS4zMDFWMTEuNjY5OEwyNi4zMzE2IDExLjgzMjNDMjYuNTY1MiAxMS45NjA0IDI2Ljc1MSAxMi4xMDcxIDI2Ljg5MzQgMTIuMjc0OUMyNy4xMzA4IDEyLjU1NDggMjcuMjg0MyAxMi45MTAzIDI3LjM0OTIgMTMuMzMxOEMyNy40MTYzIDEzLjc2NTIgMjcuMzk0MSAxNC4yODEyIDI3LjI4NDMgMTQuODY1M0MyNy4xNTc3IDE1LjUzNzEgMjYuOTUzIDE2LjEyMjIgMjYuNjc2NSAxNi42MDA5QzI2LjQyMjMgMTcuMDQyMSAyNi4wOTg0IDE3LjQwOCAyNS43MTM3IDE3LjY5MTVDMjUuMzQ2NSAxNy45NjEgMjQuOTEwMiAxOC4xNjU1IDI0LjQxNjkgMTguMjk2NEMyMy45Mzg5IDE4LjQyNSAyMy4zOTM4IDE4LjQ4OTkgMjIuNzk2MSAxOC40ODk5SDIyLjQxMDlDMjIuMTM1NiAxOC40ODk5IDIxLjg2ODIgMTguNTkyNCAyMS42NTgyIDE4Ljc3NjFDMjEuNDQ3NiAxOC45NjM3IDIxLjMwODQgMTkuMjIgMjEuMjY1NiAxOS41MDAzTDIxLjIzNjUgMTkuNjYzNEwyMC43NDkgMjIuODU2MkwyMC43MjcgMjIuOTczNEMyMC43MjExIDIzLjAxMDUgMjAuNzExIDIzLjAyOSAyMC42OTYzIDIzLjA0MTVDMjAuNjgzMSAyMy4wNTMgMjAuNjY0MiAyMy4wNjA2IDIwLjY0NTcgMjMuMDYwNkgxOC4yNjc4WiIgZmlsbD0iIzI4MzU2QSIvPgo8L3N2Zz4K"
                      alt="PayPal"
                      className="w-10 h-7"
                    />
                  </div>
                </div>
              </div>

              {/* Credit Card Option */}
              <div className="border-2 border-yellow-400 rounded-xl p-6 bg-yellow-50">
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="credit-card"
                    className="text-lg font-open-sans font-bold text-gray-900"
                  >
                    Pay with Credit Card
                  </label>
                </div>

                {/* Credit Card Form */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Card Number */}
                  <div className="col-span-1">
                    <div className="relative">
                      <Label className="absolute -top-2 left-2 bg-yellow-50 px-2 text-sm text-gray-600">
                        Card number
                      </Label>
                      <div className="relative border-2 border-orange-500 rounded-lg h-12 flex items-center px-4 bg-yellow-50">
                        <span className="text-base font-open-sans font-bold text-gray-900">
                          {cardData.number}
                        </span>
                        <Check className="w-4 h-4 text-orange-500 absolute right-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div className="col-span-1">
                    <div className="relative">
                      <Label className="absolute -top-2 left-2 bg-yellow-50 px-2 text-sm text-gray-600">
                        Expiration Date
                      </Label>
                      <Input
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData((prev) => ({
                            ...prev,
                            expiry: e.target.value,
                          }))
                        }
                        className="h-12 border border-gray-300 rounded-lg bg-yellow-50"
                      />
                    </div>
                  </div>
                </div>

                {/* CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Label className="absolute -top-2 left-2 bg-yellow-50 px-2 text-sm text-gray-600">
                      Card Security Code
                    </Label>
                    <Input
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData((prev) => ({
                          ...prev,
                          cvv: e.target.value,
                        }))
                      }
                      className="h-12 border border-gray-300 rounded-lg bg-yellow-50"
                    />
                  </div>
                  <div className="flex items-end">
                    <button className="text-orange-500 text-sm font-open-sans underline">
                      What is this?
                    </button>
                  </div>
                </div>

                {/* Card Brand Icons */}
                <div className="flex justify-end gap-2 mt-4">
                  <div className="w-10 h-7 border border-gray-300 rounded bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-900">
                      VISA
                    </span>
                  </div>
                  <div className="w-10 h-7 border border-gray-300 rounded bg-white flex items-center justify-center">
                    <div className="flex">
                      <div className="w-2 h-4 bg-red-500 rounded-l"></div>
                      <div className="w-2 h-4 bg-yellow-500 rounded-r"></div>
                    </div>
                  </div>
                  <div className="w-10 h-7 border border-gray-300 rounded bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">MC</span>
                  </div>
                  <div className="w-10 h-7 border border-gray-300 rounded bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-500">
                      DISC
                    </span>
                  </div>
                </div>
              </div>
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

                {/* Complete Payment Button */}
                <Button
                  onClick={handleCompletePayment}
                  className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-xl font-open-sans font-bold rounded-full"
                >
                  Go to the Next Step
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

export default Payment;
