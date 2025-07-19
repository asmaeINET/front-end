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
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);
  

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("auth/public/signin", { email, password });
      const { jwtToken } = response.data; // <-- ici, extraire jwtToken
      localStorage.setItem("JWT_TOKEN", jwtToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      
      await fetchUser();
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
      throw new Error("Login failed");
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
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("CSRF_TOKEN");
    setUser(null);
    toast.success("Logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
