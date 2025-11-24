import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "./components/Home/AboutUsPage.tsx";
import ContactPage from "./components/Home/ContactPage.tsx";
import CraftPage from "./components/Home/CraftPage.tsx";
import LoginPage from "./components/Home/LoginPage.tsx";
import SignupPage from "./components/Home/SignupPage.tsx";
import Layout from "./Layouts/Layout/Layout.tsx";
import DashLayout from "./Layouts/Dashboard/DashLayout.tsx";
import DashboardContent from "./Layouts/Dashboard/DashboardContent.tsx";
import ManageDecors from "./Layouts/Dashboard/ManageDecors.tsx";
import Orders from "./Layouts/Dashboard/Orders.tsx";
import Users from "./Layouts/Dashboard/Users.tsx";
import Analytics from "./Layouts/Dashboard/Analytics.tsx";
import Settings from "./Layouts/Dashboard/Settings.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/craft" element={<CraftPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<DashboardContent />} />
          <Route path="decors" element={<ManageDecors />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
