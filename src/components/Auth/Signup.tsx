import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SocialLoginButtons from "./SocialLoginButtons";

const Signup = ({
  onClose,
  onModalTypeChange,
  onSignup,
  isLoading,
  error,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: any) => {
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  return (
    <div className="w-full max-w-[488px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
      <form onSubmit={onSignup} className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
            Create Account
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="opacity-40 hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6 text-[#333]" />
          </button>
        </div>

        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-open-sans">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2.5">
            <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
              First Name
            </label>
            <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
              <input
                type="text"
                required
                className="w-[320px] font-open-sans text-base text-[#333] bg-transparent border-none outline-none"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
              Last Name
            </label>
            <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
              <input
                type="text"
                required
                className="w-[320px] font-open-sans text-base text-[#333] bg-transparent border-none outline-none"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
              Email Address
            </label>
            <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
              <input
                type="email"
                required
                className="w-[320px] font-open-sans text-base text-[#333] bg-transparent border-none outline-none"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
              Password
            </label>
            <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-[286px] font-open-sans text-base text-[#333] bg-transparent border-none outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="opacity-40 hover:opacity-70 transition-opacity"
              >
                {showPassword ? (
                  <Eye className="w-6 h-6" />
                ) : (
                  <EyeOff className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
              Confirm Password
            </label>
            <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-[286px] font-open-sans text-base text-[#333] bg-transparent border-none outline-none"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="opacity-40 hover:opacity-70 transition-opacity"
              >
                {showConfirmPassword ? (
                  <Eye className="w-6 h-6" />
                ) : (
                  <EyeOff className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-[18px] h-[18px] mt-0.5">
              <Checkbox
                checked={isAgreeChecked}
                onCheckedChange={(checked) => setIsAgreeChecked(!!checked)}
              />
            </div>
            <div className="font-open-sans text-sm text-[rgba(51,51,51,0.6)]">
              I agree with <span className="text-[#FA8B02]">Terms</span> and{" "}
              <span className="text-[#FA8B02]">Privacy</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 w-full">
          <Button
            type="submit"
            disabled={isLoading || !isAgreeChecked}
            className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <SocialLoginButtons mode="signup" />
        </div>

        <div className="font-open-sans text-base text-[#333]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onModalTypeChange("login")}
            className="text-[#FA8B02] font-semibold hover:underline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
