import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-open-sans">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to home page with login modal if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/?login=true" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
