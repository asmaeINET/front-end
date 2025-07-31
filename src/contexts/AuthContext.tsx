import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  socialLogin: (
    provider: "google" | "facebook" | "github",
    token: string,
  ) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setIsAdmin: (isAdmin: boolean) => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setToken = (token: string) => {
    localStorage.setItem("JWT_TOKEN", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const setIsAdmin = (isAdmin: boolean) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, role: isAdmin ? "admin" : "user" } : null,
    );
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/user");
      const userData: User = {
        id: data.id,
        name: data.name || data.username || "",
        email: data.email,
        avatar: data.avatar || undefined,
        role: data.roles?.includes("ROLE_ADMIN") ? "admin" : "user",
      };
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
      toast.error("Failed to fetch user");
    } finally {
      setIsLoading(false); // <-- Assure que loading finit même en cas d'erreur
    }
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setToken(token);
      fetchUser();
    } else {
      setIsLoading(false);  // <-- Important, sinon loading ne finit jamais !
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("auth/public/signin", {
        email,
        password,
      });
      const { jwtToken } = response.data;
      setToken(jwtToken);
      await fetchUser();
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);

      // More specific error handling
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message?.toLowerCase() || "";
      const errorDetails = error.message?.toLowerCase() || "";

      // Check if it's likely an email not found error (500 usually means user doesn't exist in this context)
      if (statusCode === 500 ||
          errorMessage.includes("not found") ||
          errorMessage.includes("does not exist") ||
          errorMessage.includes("user not found") ||
          errorDetails.includes("500")) {
        toast.error("Email not found. Please sign up first.");
        throw new Error("EMAIL_NOT_FOUND");
      } else if (statusCode === 401 || statusCode === 403) {
        toast.error("Invalid email or password");
        throw new Error("INVALID_CREDENTIALS");
      } else {
        toast.error("Login failed");
        throw new Error("LOGIN_FAILED");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.post("auth/public/signup", {
        username,
        email,
        password,
        role: ["user"],
      });
      await login(email, password);
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Signup failed");
      console.error(error);
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (
    provider: "google" | "facebook" | "github",
    token: string,
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post(`auth/public/oauth/${provider}`, {
        token,
      });
      const { jwtToken } = response.data;
      setToken(jwtToken);
      await fetchUser();
      toast.success(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful`,
      );
    } catch (error) {
      toast.error(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
      );
      console.error(error);
      throw new Error(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      const response = await api.put("/auth/profile", data);
      const updatedUser = {
        ...user!,
        ...response.data,
      };
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      throw new Error("Profile update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
      throw new Error("Password change failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("CSRF_TOKEN");
    setUser(null);
    toast.success("Logged out");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    logout,
    signup,
    socialLogin,
    updateProfile,
    changePassword,
    setIsAdmin,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
