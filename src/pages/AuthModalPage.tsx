import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal, { AuthModalType } from "@/components/Auth/AuthModal";
import Index from "@/pages/Index";

const AuthModalPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [authModalType, setAuthModalType] =
    useState<AuthModalType>("reset-password");

  const handleClose = () => {
    setIsAuthModalOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Index />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleClose}
        modalType={authModalType}
        onModalTypeChange={setAuthModalType}
      />
    </>
  );
};

export default AuthModalPage;
