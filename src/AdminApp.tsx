import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TourManagement from "./pages/admin/TourManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SupportManagement from "./pages/admin/SupportManagement";
import TourDetailsEdit from "./pages/admin/TourDetailsEdit";
import AdminProfile from "./pages/admin/AdminProfile";

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tours" element={<TourManagement />} />
        <Route path="/admin/tours/:tourId/edit-details" element={<TourDetailsEdit />} />
        <Route path="/admin/tours/:tourId/gallery" element={<GalleryManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/support" element={<SupportManagement />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* All other routes redirect to dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
