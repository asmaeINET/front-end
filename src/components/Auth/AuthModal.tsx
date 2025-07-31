import React, { useState, useEffect } from "react";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import CheckEmail from "@/components/Auth/CheckEmail";
import ResetPassword from "@/components/Auth/ResetPassword";
import PasswordResetSuccess from "@/components/Auth/PasswordResetSuccess";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TokenAlreadyUsed from "./TokenAlreadyUsed";

export type AuthModalType =
  | "login"
  | "signup"
  | "forgot-password"
  | "check-email"
  | "reset-password"
  | "password-reset-success"
  | "token-already-used" // <-- AJOUTE ICI
  | null;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: AuthModalType;
  onModalTypeChange: (type: AuthModalType) => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  modalType,
  onModalTypeChange,
}: AuthModalProps) => {
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Shared states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setError("");
  }, [modalType]);

  if (!isOpen || !modalType) return null;

  // Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/account");
      }

      onClose();
    } catch (error: any) {
      console.log("Login error in modal:", error.message);

      if (error.message === "EMAIL_NOT_FOUND") {
        // Show helpful message and redirect to signup
        setError("This email doesn't exist. You'll be redirected to sign up in 3 seconds, or click 'Sign Up' below.");
        setTimeout(() => {
          onModalTypeChange("signup");
          setError(""); // Clear error when switching to signup
          // Email is already preserved in state, no need to reset it
        }, 3000);
      } else if (error.message === "INVALID_CREDENTIALS") {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await signup(fullName, email, password);
      navigate("/account");
      onClose();
    } catch {
      setError("Failed to create account");
    }
  };

  let content = null;
  switch (modalType) {
    case "login":
      content = (
        <Login
          onClose={onClose}
          onModalTypeChange={onModalTypeChange}
          onLogin={handleLogin}
          isLoading={isLoading}
          error={error}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      );
      break;
    case "token-already-used":
      content = <TokenAlreadyUsed onModalTypeChange={onModalTypeChange} />;
      break;

    case "signup":
      content = (
        <Signup
          onClose={onClose}
          onModalTypeChange={onModalTypeChange}
          onSignup={handleSignup}
          isLoading={isLoading}
          error={error}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      );
      break;
    case "forgot-password":
      content = (
        <ForgotPassword
          email={email}
          setEmail={setEmail}
          onModalTypeChange={onModalTypeChange}
        />
      );
      break;
    case "check-email":
      content = (
        <CheckEmail email={email} onModalTypeChange={onModalTypeChange} />
      );
      break;
    case "reset-password":
      content = (
        <ResetPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onModalTypeChange={onModalTypeChange}
          onClose={onClose} // << Add this line here
        />
      );
      break;

    case "password-reset-success":
      content = <PasswordResetSuccess onModalTypeChange={onModalTypeChange} />;
      break;
    default:
      content = null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#333] opacity-80"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg">{content}</div>
    </div>
  );
};

export default AuthModal;
