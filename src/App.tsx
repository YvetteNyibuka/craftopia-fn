import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./components/Home/Home";
import LoginPage from "./components/Home/LoginPage";
import SignupPage from "./components/Home/SignupPage";
import Layout from "./Layouts/Layout/Layout";
import DashLayout from "./Layouts/Dashboard/DashLayout";
import DashboardContent from "./Layouts/Dashboard/DashboardContent";
import { Suspense } from "react";
import ManageDecorsFixed from "./Layouts/Dashboard/ManageDecorsFixed"; // ✅ Use the FIXED version

// Loading component for suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-craft-600"></div>
  </div>
);

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin" && user?.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects authenticated users appropriately)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Redirect based on user role
  const redirectPath =
    user?.role === "admin" || user?.role === "super_admin" ? "/dashboard" : "/";
  return <Navigate to={redirectPath} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>

            {/* Auth routes - redirect to dashboard if already logged in */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />

            {/* Protected admin routes */}
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashLayout />
                </AdminRoute>
              }
            >
              <Route index element={<DashboardContent />} />
              <Route path="decors" element={<ManageDecorsFixed />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
