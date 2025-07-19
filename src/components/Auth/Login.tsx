import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";

const Login = ({
  onClose,
  onModalTypeChange,
  onLogin,
  isLoading,
  error,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: any) => (
  <div className="w-full max-w-[488px] bg-white rounded-3xl shadow-lg p-6 sm:p-[40px_59px] relative">
    <form onSubmit={onLogin} className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-open-sans text-[32px] font-bold text-[#333]">
          Login
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
      <div className="flex flex-col justify-center items-end gap-5 w-full">
        <div className="flex flex-col gap-2.5 w-full">
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
        <div className="flex flex-col gap-2.5 w-full">
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
        <button
          type="button"
          onClick={() => onModalTypeChange("forgot-password")}
          className="font-open-sans text-sm text-[rgba(51,51,51,0.6)] hover:text-[#FA8B02] transition-colors"
        >
          Forgot your password?
        </button>
      </div>
      <div className="flex flex-col items-center gap-1.5 w-full">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#FA8B02] hover:bg-[#e87d02] text-white font-open-sans text-xl font-semibold py-2.5 px-6 rounded-full disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <div className="font-open-sans text-base text-[#333] opacity-40">
          or
        </div>
        <Button
          variant="outline"
          className="w-full border border-[rgba(51,51,51,0.2)] bg-white text-[#333] font-open-sans text-lg font-semibold py-2.5 px-6 rounded-full opacity-40 flex items-center gap-2"
        >
          {/* Google SVG here */}
          Sign In with Google
        </Button>
      </div>
      <div className="font-open-sans text-base text-[#333]">
        Don't have an account ?{" "}
        <button
          type="button"
          onClick={() => onModalTypeChange("signup")}
          className="text-[#FA8B02] font-semibold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
);

export default Login;
