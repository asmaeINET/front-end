import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

interface DecodedToken {
  sub: string;
  roles: string; // roles en string séparé par des virgules, ex: "ADMIN,USER"
  exp?: number;
  iat?: number;
  [key: string]: any; // Pour d'autres champs possibles
}

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setIsAdmin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("OAuth2RedirectHandler: Params:", params.toString());
    console.log("OAuth2RedirectHandler: Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("Decoded Token:", decodedToken);

        localStorage.setItem("JWT_TOKEN", token);

        const user = {
          username: decodedToken.sub,
          roles: decodedToken.roles.split(","),
        };
        console.log("User Object:", user);

        localStorage.setItem("USER", JSON.stringify(user));

        // Mise à jour du contexte
        setToken(token);
        setIsAdmin(user.roles.includes("ADMIN"));

        // Navigation après un petit délai
        setTimeout(() => {
          console.log("Navigating to /");
          navigate("/");
        }, 100);
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate("/login");
      }
    } else {
      console.log("Token not found in URL, redirecting to login");
      navigate("/login");
    }
  }, [location, navigate, setToken, setIsAdmin]);

  return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;
