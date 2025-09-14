import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { CitizenPortal } from "./components/CitizenPortal";
import { Analytics } from "./components/Analytics";
import { Emergency } from "./components/Emergency";
import { Landing } from "./components/Landing";
import AuthPage from "./components/Auth";

function App() {
  const [auth, setAuth] = useState({ loggedIn: false, userType: null });
  const [currentPage, setCurrentPage] = useState("landing");


  // Role-based access control for protected pages
  const protectedPages = {
    dashboard: "admin",
    citizen: "citizen",
    analytics: "admin",
    emergency: "citizen",
  };

  // If not logged in and trying to access protected page, show AuthPage
  if (!auth.loggedIn && Object.keys(protectedPages).includes(currentPage)) {
    return (
      <AuthPageWrapper
        onAuth={(userType) => {
          setAuth({ loggedIn: true, userType });
          // After login, go to correct page for role
          let nextPage = "landing";
          if (userType === "admin" && ["dashboard", "analytics"].includes(currentPage)) nextPage = currentPage;
          if (userType === "citizen" && ["citizen", "emergency"].includes(currentPage)) nextPage = currentPage;
          setCurrentPage(nextPage);
        }}
        userType={currentPage === "dashboard" || currentPage === "analytics" ? "admin" : "citizen"}
      />
    );
  }

  // If logged in, block access to pages not allowed for role
  if (auth.loggedIn && Object.keys(protectedPages).includes(currentPage)) {
    const allowedRole = protectedPages[currentPage];
    if (auth.userType !== allowedRole) {
      // Redirect to allowed home page for role
      setCurrentPage(auth.userType === "admin" ? "dashboard" : "citizen");
      return null;
    }
  }

  const renderPage = () => {
    const pages = {
      landing: <Landing onNavigate={setCurrentPage} />, 
      dashboard: <Dashboard />, 
      citizen: <CitizenPortal />, 
      analytics: <Analytics />, 
      emergency: <Emergency />,
    };
    return pages[currentPage] || pages["landing"];
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

// Wrapper to use AuthPage and call onAuth(userType) when login is successful
function AuthPageWrapper({ onAuth, userType }) {
  const [mode, setMode] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    onAuth(userType);
    return null;
  }

  return (
    <AuthPage
      mode={mode}
      setMode={setMode}
      userType={userType}
      onLogin={() => setLoggedIn(true)}
      onSignup={() => setMode("login")}
    />
  );
}

export default App;
