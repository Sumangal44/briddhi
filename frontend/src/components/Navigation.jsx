import  { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Navigation = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 gap-3 sm:gap-0 w-full">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Briddhi 🌱
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">"Growing Cities with Care"</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0 relative">
            <button
              onClick={() => navigate("/citizen")}
              className="relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-blue-600 hover:text-amber-50 font-semibold bg-transparent border border-blue-600 transition-all duration-500 group text-xs sm:text-base"
            >
              <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10"> Citizen Portal</span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-[#00A63E] to-[#00A63E] text-white rounded-lg hover:from-[#008c35] hover:to-[#006e29] transition-all transform hover:scale-105 text-xs sm:text-base"
            >
              Admin Dashboard
            </button>
            {token && user ? (
              <>
                <img
                  src={user.avatar || "/vite.svg"}
                  alt="Profile"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border mr-2 sm:mr-3 cursor-pointer object-cover"
                  onClick={() => setShowPopup(!showPopup)}
                  style={{ minWidth: '2rem', minHeight: '2rem' }}
                />
                {showPopup && (
                  <div ref={popupRef} className="absolute right-0 top-12 sm:top-14 bg-white border rounded shadow-lg p-4 z-50 min-w-[120px] flex flex-col items-center">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mb-2"
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                      onClick={() => navigate("/profile")}
                    >
                      View Profile
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs sm:text-base"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation