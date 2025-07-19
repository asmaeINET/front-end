import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

const PasswordResetSuccess = ({ onModalTypeChange }: any) => (
  <div className="w-full max-w-[486px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
    <div className="flex flex-col items-center gap-6">
      <div className="w-[50px] h-[50px] relative">
        <div className="w-[50px] h-[50px] rounded-full bg-[#FA8B02] opacity-30 absolute"></div>
        <Check
          className="w-6 h-6 text-[#FA8B02] absolute top-[13px] left-[13px]"
          strokeWidth={3}
        />
      </div>
      <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
        Password Reset
      </h2>
      <p className="font-open-sans text-base text-[#333] text-center w-[368px]">
        Your password has been successfully reset. Click below to login in
        magically.
      </p>
      <Button
        onClick={() => onModalTypeChange("login")}
        className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full"
      >
        Continue
      </Button>
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

export default PasswordResetSuccess;
