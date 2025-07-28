import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SocialLoginButtonsProps {
  mode: "login" | "signup";
}

const apiUrl = import.meta.env.VITE_API_URL;

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ mode }) => {
  const { socialLogin } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleFacebookLogin = async () => {
    setIsLoading("facebook");
    try {
      if (typeof window !== "undefined" && window.FB) {
        window.FB.login(
          (response: any) => {
            if (response.authResponse) {
              socialLogin("facebook", response.authResponse.accessToken)
                .catch(console.error)
                .finally(() => setIsLoading(null));
            } else {
              setIsLoading(null);
            }
          },
          { scope: "email" }
        );
      } else {
        loadFacebookSDK().then(() => {
          handleFacebookLogin();
        });
      }
    } catch (error) {
      console.error("Facebook login error:", error);
      setIsLoading(null);
    }
  };

  const loadFacebookSDK = (): Promise<void> => {
    return new Promise((resolve) => {
      if (document.getElementById("facebook-jssdk")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.onload = () => {
        window.FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v18.0",
        });
        resolve();
      };
      document.body.appendChild(script);
    });
  };

  const actionText = mode === "login" ? "Sign In" : "Sign Up";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="font-open-sans text-base text-[#333] opacity-40">or</div>

      {/* Google Login */}
      <Link
        to={`${apiUrl}/oauth2/authorization/google`}
        className="w-full border border-[rgba(51,51,51,0.2)] bg-white text-[#333] font-open-sans text-lg font-semibold py-2.5 px-6 rounded-full hover:bg-gray-50 flex items-center justify-center gap-3"
      >
        <FcGoogle className="text-2xl" />
        {`${actionText} with Google`}
      </Link>

      {/* Facebook Login */}
      <Button
        type="button"
        variant="outline"
        onClick={handleFacebookLogin}
        disabled={isLoading === "facebook"}
        className="w-full border border-[rgba(51,51,51,0.2)] bg-white text-[#333] font-open-sans text-lg font-semibold py-2.5 px-6 rounded-full hover:bg-gray-50 flex items-center justify-center gap-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            fill="#1877F2"
          />
        </svg>
        {isLoading === "facebook"
          ? "Loading..."
          : `${actionText} with Facebook`}
      </Button>

      {/* GitHub Login */}
      <Link
        to={`${apiUrl}/oauth2/authorization/github`}
        className="w-full border border-[rgba(51,51,51,0.2)] bg-white text-[#333] font-open-sans text-lg font-semibold py-2.5 px-6 rounded-full hover:bg-gray-50 flex items-center justify-center gap-3"
      >
        <FaGithub className="text-2xl" />
        {`${actionText} with GitHub`}
      </Link>
    </div>
  );
};

// Extend Window interface for Facebook SDK
declare global {
  interface Window {
    FB: any;
  }
}

export default SocialLoginButtons;
