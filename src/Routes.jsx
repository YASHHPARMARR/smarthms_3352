import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRoleSelection from "pages/login-role-selection";
import AdminDashboard from "pages/admin-dashboard";
import MaintenanceTaskManagement from "pages/maintenance-task-management";
import RoomManagement from "pages/room-management";
import RoomServiceManagement from "pages/room-service-management";
import GuestBookingCheckIn from "pages/guest-booking-check-in";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginRoleSelection />} />
        <Route path="/login-role-selection" element={<LoginRoleSelection />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/maintenance-task-management" element={<MaintenanceTaskManagement />} />
        <Route path="/room-management" element={<RoomManagement />} />
        <Route path="/room-service-management" element={<RoomServiceManagement />} />
        <Route path="/guest-booking-check-in" element={<GuestBookingCheckIn />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;