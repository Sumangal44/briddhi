
import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { CitizenPortal } from "./components/CitizenPortal";
import { Analytics } from "./components/Analytics";
import { Emergency } from "./components/Emergency";
import  {Landing}  from "./components/Landing";
import TrafficPage from "./pages/TrafficPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import WasteManagement from "./pages/WasteManagement";
import CitizenEngagement from "./pages/CitizenEngagement";
// import AuthPage from "./components/Auth";



function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // userType state removed (handled in AuthPageWrapper)

  // Handler for successful login from AuthPage
  const handleLogin = (type) => {
    setIsAuthenticated(true);
    // After login, redirect to the correct page
    if (type === "admin") {
      setCurrentPage("dashboard");
    } else {
      setCurrentPage("citizen");
    }
  };

  // Handler for logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("landing");
  };

  // Render logic for protected pages
  const renderPage = () => {
    if ((currentPage === "dashboard" || currentPage === "citizen") && !isAuthenticated) {
      // Show AuthPage, pass login handler and userType setter
      return (
        <AuthPageWrapper
          onLogin={handleLogin}
          initialPage={currentPage}
        />
      );
    }
    // Render actual pages
    switch (currentPage) {
      case "landing":
        return <Landing onNavigate={setCurrentPage} />;
      case "dashboard":
        return <Dashboard onLogout={handleLogout} />;
      case "citizen":
        return <CitizenPortal onLogout={handleLogout} />;
      case "analytics":
        return <Analytics />;
      case "emergency":
        return <Emergency />;
      case "traffic":
        return <TrafficPage />;
      case "infrastructure":
        return <InfrastructurePage />;
      case "waste":
        return <WasteManagement />;
      case "engagement":
        return <CitizenEngagement />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header: Navigation always visible except on landing */}
      {currentPage !== "landing" && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      <main className="flex-1 p-4">{renderPage()}</main>
      {/* Footer always visible */}
      <Footer />
    </div>
  );
}

// Wrapper for AuthPage to allow role selection and login callback
function AuthPageWrapper({ onLogin, initialPage }) {
  // initialPage: 'dashboard' or 'citizen' (to preselect role)
  const [mode, setMode] = useState("login");
  const [userType, setUserType] = useState(initialPage === "dashboard" ? "admin" : "citizen");

  // Simulate login/signup
  const handleLogin = () => {
    onLogin(userType);
  };
  const handleSignup = () => {
    setMode("login");
  };

  return (
    <div>
      <div className="flex justify-center mt-8 mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold border transition-all ${userType === "citizen" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
          onClick={() => setUserType("citizen")}
        >
          Citizen
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border transition-all ${userType === "admin" ? "bg-green-600 text-white" : "bg-white text-green-600 border-green-600"}`}
          onClick={() => setUserType("admin")}
        >
          Admin
        </button>
      </div>
      {mode === "login" ? (
        <AuthPageLogin userType={userType} onLogin={handleLogin} onSwitch={setMode} />
      ) : (
        <AuthPageSignup userType={userType} onSignup={handleSignup} onSwitch={setMode} />
      )}
    </div>
  );
}

// Extracted Login/Signup from AuthPage for reuse
function AuthPageLogin({ userType, onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    onLogin && onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {userType === "admin" ? "Admin Login" : "Citizen Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onSwitch && onSwitch("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function AuthPageSignup({ userType, onSignup, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    onSignup && onSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {userType === "admin" ? "Admin Sign Up" : "Citizen Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onSwitch && onSwitch("login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
