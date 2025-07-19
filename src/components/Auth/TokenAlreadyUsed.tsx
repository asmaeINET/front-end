import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const TokenAlreadyUsed = ({ onModalTypeChange }: any) => (
  <div className="w-full max-w-[486px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
    <div className="flex flex-col items-center gap-6">
      <div className="w-[50px] h-[50px] relative">
        <div className="w-[50px] h-[50px] rounded-full bg-red-500 opacity-20 absolute"></div>
        <AlertTriangle
          className="w-6 h-6 text-red-500 absolute top-[13px] left-[13px]"
          strokeWidth={3}
        />
      </div>
      <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
        Invalid Link
      </h2>
      <p className="font-open-sans text-base text-[#333] text-center w-[368px]">
        This password reset link has already been used or is no longer valid.
        Please request a new one.
      </p>
      <Button
        onClick={() => onModalTypeChange("login")}
        className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full"
      >
        Back to Login
      </Button>
    </div>
  </div>
);

export default TokenAlreadyUsed;
