import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import CitizenPortal from "./components/CitizenPortal";
import Analytics from "./components/Analytics";
import Emergency from "./components/Emergency";
import TrafficPage from "./pages/TrafficPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import WasteManagement from "./pages/WasteManagement";
import CitizenEngagement from "./pages/CitizenEngagement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const location = useLocation();

  // Check auth on mount
  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleLogin = (data) => {
    setIsAuthenticated(true);
    setUserRole(data.user?.role || data.role);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  // Show Navigation except on login/signup
  const hideNavRoutes = ["/login", "/signup"];

  return (
    <>
      {!hideNavRoutes.includes(location.pathname) && <Navigation onLogout={handleLogout} />}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated && userRole === "admin" ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/citizen"
            element={
              isAuthenticated && userRole === "citizen" ? (
                <CitizenPortal onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/waste" element={<WasteManagement />} />
          <Route path="/engagement" element={<CitizenEngagement />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
