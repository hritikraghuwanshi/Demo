import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeSync from "./components/ThemeSync";
import PageLoader from "./components/PageLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAuthStore } from "./store/useAuthStore";

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Transactions = lazy(() => import("./pages/dashboard/Transactions"));

const App: React.FC = () => {
  const { isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      login("demo@paypilot.io", "demo");
    }
  }, [isAuthenticated, login]);

  return (
    <>
      <ThemeSync />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <DashboardLayout />
                </Suspense>
              </ErrorBoundary>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/analytics" replace />} />
          <Route
            path="analytics"
            element={
              <Suspense fallback={<PageLoader />}>
                <Analytics />
              </Suspense>
            }
          />
          <Route
            path="transactions"
            element={
              <Suspense fallback={<PageLoader />}>
                <Transactions />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
