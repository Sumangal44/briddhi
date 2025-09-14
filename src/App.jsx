import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { CitizenPortal } from "./components/CitizenPortal";
import { Analytics } from "./components/Analytics";
import { Emergency } from "./components/Emergency";
import { Landing } from "./components/Landing";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

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
      {currentPage !== "landing" && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      <main className="flex-1 p-4">{renderPage()}</main>
    </div>
  );
}

export default App;
