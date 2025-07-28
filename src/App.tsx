import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import TourPackages from "./pages/TourPackages";
import TourDetail from "./pages/TourDetail";
import ContactUs from "./pages/ContactUs";
import BookingDetails from "./pages/BookingDetails";
import Payment from "./pages/Payment";
import OrderComplete from "./pages/OrderComplete";
import Account from "./pages/Account";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import TourManagement from "./pages/admin/TourManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SupportManagement from "./pages/admin/SupportManagement";

import AdminApp from "./AdminApp";
import AuthModalPage from "./pages/AuthModalPage";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdminRouteHandler />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const AdminRouteHandler = () => {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    return <AdminApp />;
  }


  // Sinon afficher les routes publiques
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/packages" element={<TourPackages />} />
        <Route path="/tour/:tourId" element={<TourDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/search-results" element={<SearchResults />} />
        {/* <Route path="/login" element={<AuthModalPage modalType="login" />} />
        <Route path="/signup" element={<AuthModalPage modalType="signup" />} />
        <Route path="/forgot-password" element={<AuthModalPage modalType="forgot-password" />} />
        <Route path="/check-email" element={<AuthModalPage modalType="check-email" />} /> */}
        <Route path="/reset-password" element={<AuthModalPage />} />
        {/* <Route path="/password-reset-success" element={<AuthModalPage modalType="password-reset-success" />} /> */}

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* Rediriger les routes admin vers la page publique si non admin */}
        <Route path="/admin/*" element={<Index />} />

        {/* Catch-all pour 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
