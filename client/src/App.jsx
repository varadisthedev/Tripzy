import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MyBookingsPage from "./pages/Bookings/MyBookingsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import "./styles/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bookings" element={<MyBookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

