
import React, { useState } from "react";
import { CitizenPortal } from "./CitizenPortal";
import { Dashboard } from "./Dashboard";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

// Login component
// Login component
function Login({ onLogin, onSwitch, userType }) {
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
    onLogin && onLogin({ email, password, userType });
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

// Signup component
function Signup({ onSignup, onSwitch, userType }) {
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
    onSignup && onSignup({ email, password, userType });
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

// Demo main AuthPage component for switching and role-based view
export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [userType, setUserType] = useState("citizen"); // 'citizen' or 'admin'
  const [loggedIn, setLoggedIn] = useState(false);

  // Simulate login/signup
  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleSignup = () => {
    setMode("login");
  };

  // Show only citizen or admin page after login
  if (loggedIn) {
    return userType === "admin" ? (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation currentPage="dashboard" onNavigate={() => {}} />
        <main className="flex-1 p-4">
          <Dashboard />
        </main>
        <Footer />
      </div>
    ) : (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation currentPage="citizen" onNavigate={() => {}} />
        <main className="flex-1 p-4">
          <CitizenPortal />
        </main>
        <Footer />
      </div>
    );
  }

  // Auth form
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
        <Login userType={userType} onLogin={handleLogin} onSwitch={setMode} />
      ) : (
        <Signup userType={userType} onSignup={handleSignup} onSwitch={setMode} />
      )}
    </div>
  );
}
