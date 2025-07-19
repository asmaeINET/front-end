import { Button } from "@/components/ui/button";
import { ArrowLeft, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useState } from "react";

const ForgotPassword = ({ onModalTypeChange, setEmail }: any) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const onPasswordForgotHandler = async (data: { email: string }) => {
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", data.email);

      await api.post("/auth/public/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("If this email exists, a reset link has been sent.");
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.success("If this email exists, a reset link has been sent.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setEmail(data.email);
      onModalTypeChange("check-email");
      reset();
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onPasswordForgotHandler)}
      className="w-full max-w-[486px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-[50px] h-[50px] relative">
          <div className="w-[50px] h-[50px] rounded-full bg-[#FA8B02] opacity-30 absolute"></div>
          <Key className="w-6 h-6 text-[#FA8B02] absolute top-[13px] left-[13px]" />
        </div>
        <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
          Forgot Password
        </h2>
        <p className="font-open-sans text-base text-[#333] text-center w-[368px]">
          No worries, we'll send you reset instructions.
        </p>
        <div className="flex flex-col gap-2.5 w-full">
          <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
            Email Address
          </label>
          <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
            <input
              type="email"
              className="w-[320px] font-open-sans text-base text-[#333] opacity-50 bg-transparent border-none outline-none"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button
          disabled={loading}
          className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full disabled:opacity-50"
        >
          {loading ? "Loading..." : "Reset Password"}
        </Button>
        <button
          type="button"
          onClick={() => onModalTypeChange("login")}
          className="flex items-center gap-1 opacity-30 hover:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5 text-[#333]" />
          <span className="font-open-sans text-sm font-semibold text-[#333]">
            Back to Login
          </span>
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
