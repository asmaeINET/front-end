import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";

const CheckEmail = ({ email, onModalTypeChange }: any) => (
  <div className="w-full max-w-[486px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
    <div className="flex flex-col items-center gap-6">
      <div className="w-[50px] h-[50px] relative">
        <div className="w-[50px] h-[50px] rounded-full bg-[#FA8B02] opacity-30 absolute"></div>
        <Mail className="w-6 h-6 text-[#FA8B02] absolute top-[13px] left-[13px]" />
      </div>
      <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
        Check your email
      </h2>
      <p className="font-open-sans text-base text-[#333] text-center w-[368px]">
        If an account exists with{" "}
        <span className="font-semibold">{email || "example@email.com"}</span>,
        you will receive a link to reset your password.
      </p>

      <Button
        onClick={() => window.open("https://mail.google.com", "_blank")}
        className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full"
      >
        Open email app
      </Button>

      <div className="font-open-sans text-sm text-[#333]">
        Didn't receive the email?{" "}
        <button
          className="text-[#FA8B02] font-semibold hover:underline"
          onClick={() => onModalTypeChange("forgot-password")}
        >
          Click to resend
        </button>
      </div>

      <button
        onClick={() => onModalTypeChange("login")}
        className="flex items-center gap-1 opacity-30 hover:opacity-60 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5 text-[#333]" />
        <span className="font-open-sans text-sm font-semibold text-[#333]">
          Back to Login
        </span>
      </button>
    </div>
  </div>
);

export default CheckEmail;
