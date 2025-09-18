import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    api
      .get("/citizen/profile")
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Failed to fetch profile details"
        );
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-md w-full mx-auto mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <div className="text-xs sm:text-sm text-gray-500 break-all">
            <span className="font-semibold">User ID:</span> {user._id || user.id || <span className="text-gray-400">N/A</span>}
          </div>
        </div>
        <img
          src={user.avatar || "/vite.svg"}
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
        />
      </div>
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="font-semibold">Name:</span>
        <span className="text-gray-700">{user.name || <span className="text-gray-400">N/A</span>}</span>
      </div>
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="font-semibold">Email:</span>
        <span className="text-gray-700">{user.email || <span className="text-gray-400">N/A</span>}</span>
      </div>
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="font-semibold">Phone:</span>
        <span className="text-gray-700">{user.phone || <span className="text-gray-400">N/A</span>}</span>
      </div>
      <div className="w-full mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="font-semibold">Role:</span>
        <span className="text-gray-700">{user.role || <span className="text-gray-400">N/A</span>}</span>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 w-full sm:w-auto bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
