import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Eye, EyeOff, ArrowLeft, Key, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ResetPassword = ({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onModalTypeChange,
  onClose,
}: any) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Clear token from URL after reset
  const clearUrlToken = () => {
    window.history.replaceState({}, document.title, "/reset-password");
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      toast.error("Missing token in URL");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        `/auth/public/reset-password?token=${token}&newPassword=${password}`
      );

      clearUrlToken();
      setIsResetDone(true);
      toast.success("Password reset successful! You can now log in.");
      onModalTypeChange("password-reset-success");
    } catch (error: any) {
      const apiMessage = error.response?.data?.message;
      clearUrlToken();

      if (apiMessage?.includes("already been used")) {
        toast.error("This reset link has already been used.");
        onModalTypeChange("token-already-used");
        return;
      }

      if (apiMessage?.includes("Invalid")) {
        toast.error("Invalid password reset token");
        onModalTypeChange("token-already-used");
        return;
      }
      if (apiMessage?.includes("expired")) {
        toast.error("This reset link has expired.");
        onModalTypeChange("token-already-used");
        return;
      }

      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#333] opacity-80"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="w-full max-w-[486px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#333] hover:text-[#FA8B02] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-6">
            <div className="w-[50px] h-[50px] relative">
              <div className="w-[50px] h-[50px] rounded-full bg-[#FA8B02] opacity-30 absolute"></div>
              <Key className="w-6 h-6 text-[#FA8B02] absolute top-[13px] left-[13px]" />
            </div>
            <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
              Set New Password
            </h2>
            <p className="font-open-sans text-base text-[#333] text-center w-[368px]">
              Your new password must be different from previously used
              passwords.
            </p>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2.5">
                <label className="font-open-sans text-lg font-semibold text-[#333] opacity-60">
                  New Password
                </label>
                <div className="flex p-[14px_24px] items-start gap-2.5 rounded-lg border border-[rgba(51,51,51,0.2)] bg-white">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-[286px] font-open-sans text-base text-[#333] opacity-50 bg-transparent border-none outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isResetDone}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="opacity-40 hover:opacity-70 transition-opacity"
                    disabled={isResetDone}
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
                    className="w-[286px] font-open-sans text-base text-[#333] opacity-50 bg-transparent border-none outline-none"
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isResetDone}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="opacity-40 hover:opacity-70 transition-opacity"
                    disabled={isResetDone}
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-6 h-6" />
                    ) : (
                      <EyeOff className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <Button
              disabled={loading || isResetDone}
              onClick={handleResetPassword}
              className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full"
            >
              {loading ? "Loading..." : "Reset Password"}
            </Button>
            <button
              type="button"
              onClick={() => onModalTypeChange("login")}
              className="flex items-center gap-1 opacity-30 hover:opacity-60 transition-opacity"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5 text-[#333]" />
              <span className="font-open-sans text-sm font-semibold text-[#333]">
                Back to Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
