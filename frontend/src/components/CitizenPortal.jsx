import React, { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  X,
  MapPin,
} from "lucide-react";
import api from "../api/axios";

function CitizenPortal() {
  const [activeTab, setActiveTab] = useState("report");
  const [reportType, setReportType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("pending");

  const [userReports, setUserReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [authError, setAuthError] = useState(false);
  const pollingRef = useRef(null);
  const prevReportsRef = useRef([]);

  // Save GPS location
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState("");
  const [humanAddress, setHumanAddress] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchReports = async () => {
      setLoadingReports(true);
      try {
        const res = await api.get("/citizen/my-issues");
        const incoming = res.data.issues || [];

        // If this is the first fetch, avoid highlighting everything
        const hadPrev = prevReportsRef.current && prevReportsRef.current.length > 0;
        const prevById = new Map((prevReportsRef.current || []).map((r) => [r._id || r.id, r]));

        const merged = incoming.map((r) => {
          const id = r._id || r.id;
          const prev = prevById.get(id);
          const shouldHighlight = hadPrev && (!prev || prev.status !== r.status);
          return { ...r, _highlight: shouldHighlight };
        });

        setUserReports(merged);
        prevReportsRef.current = incoming.map((x) => ({ ...x }));

        // Clear highlight after a short delay
        if (merged.some((r) => r._highlight)) {
          setTimeout(() => {
            setUserReports((cur) => cur.map((x) => ({ ...x, _highlight: false })));
          }, 200000);
        }

        setAuthError(false);
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          setAuthError(true);
          if (pollingRef.current) clearInterval(pollingRef.current);
          setLoadingReports(false);
          return;
        }
        console.error("Error fetching reports:", err);
      } finally {
        setLoadingReports(false);
      }
    };

    // initial + polling
    fetchReports();
    intervalId = setInterval(fetchReports, 200000);
    pollingRef.current = intervalId;
    return () => clearInterval(intervalId);
  }, []);

  // Reverse geocoding
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      if (data && data.display_name) setHumanAddress(data.display_name);
      else setHumanAddress("Address not found");
    } catch (err) {
      console.error("Error fetching address:", err);
      setHumanAddress("Error fetching address");
    }
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { type: "Point", coordinates: [pos.coords.longitude, pos.coords.latitude] };
        setLocation(coords);
        setLocError("");
        getAddressFromCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => setLocError("Unable to fetch location: " + err.message)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportType || !title || !description || (!location && !manualAddress)) return;

    setSubmissionStatus("submitting");
    const formData = new FormData();
    formData.append("type", reportType);
    formData.append("title", title);
    formData.append("description", description);

    if (location) {
      formData.append("location", JSON.stringify(location));
      formData.append("address", humanAddress || "");
    } else {
      formData.append("location", manualAddress);
      formData.append("address", manualAddress);
    }

    if (photo) formData.append("images", photo);

    try {
      await api.post("/citizen/submit-issue", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setSubmissionStatus("success");
      // refresh now
      const res = await api.get("/citizen/my-issues");
      setUserReports(res.data.issues || []);
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        setAuthError(true);
        if (pollingRef.current) clearInterval(pollingRef.current);
        return;
      }
      console.error(err);
      setSubmissionStatus("error");
    }

    setTimeout(() => {
      setReportType("");
      setTitle("");
      setDescription("");
      setManualAddress("");
      setLocation(null);
      setPhoto(null);
      setHumanAddress("");
      setSubmissionStatus("pending");
    }, 3000);
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("authToken");
  const isCitizen = user && user.role === "citizen" && !!token;

  if (!isCitizen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign in required</h2>
          <p className="text-gray-600 mb-6">You must be signed in as a citizen to report issues or view your reports.</p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign In</a>
            <a href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Session expired</h2>
          <p className="text-gray-600 mb-6">Your session expired or is invalid. Please sign in again.</p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign In</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Citizen Portal</h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6 justify-center">
          <button onClick={() => setActiveTab("report")} className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === "report" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            Report an Issue
          </button>
          <button onClick={() => setActiveTab("track")} className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === "track" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            Track Reports
          </button>
        </div>

        {/* Report Issue Tab */}
        {activeTab === "report" && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="mt-1 block w-full border rounded-lg p-2" required>
                <option value="">Select type</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="sanitation">Sanitation</option>
                <option value="safety">Safety</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border rounded-lg p-2" placeholder="Enter issue title" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded-lg p-2" placeholder="Describe the issue" rows={4} required></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="flex flex-col gap-2">
                <input type="text" value={manualAddress} onChange={(e) => setManualAddress(e.target.value)} className="mt-1 block w-full border rounded-lg p-2" placeholder="Enter location manually (optional)" />
                <button type="button" onClick={getLiveLocation} className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><MapPin size={16} className="mr-2" /> Use Live Location</button>
                {location && <p className="text-sm text-green-600">📍 {humanAddress || `Lat: ${location.coordinates[1]}, Lng: ${location.coordinates[0]}`}</p>}
                {locError && <p className="text-sm text-red-600">{locError}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Photo (optional)</label>
              <div className="mt-1 flex items-center">
                <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer flex items-center space-x-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100"><Upload size={18} /><span>{photo ? "Change Photo" : "Upload Photo"}</span></label>
                {photo && (<div className="ml-3 flex items-center space-x-2"><span className="text-sm text-gray-600">{photo.name}</span><button type="button" onClick={() => setPhoto(null)} className="text-red-500 hover:text-red-700"><X size={16} /></button></div>)}
              </div>
            </div>

            <button type="submit" disabled={submissionStatus === "submitting"} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{submissionStatus === "submitting" ? "Submitting..." : "Submit Report"}</button>
            {submissionStatus === "success" && <p className="text-green-600 text-sm mt-2">Report submitted successfully!</p>}
            {submissionStatus === "error" && <p className="text-red-600 text-sm mt-2">Failed to submit. Please try again.</p>}
          </form>
        )}

        {/* Track Reports Tab */}
        {activeTab === "track" && (
          <div className="space-y-4 w-full">
            {loadingReports ? (
              <p className="text-center text-gray-600">Loading reports...</p>
            ) : (
              userReports.map((report) => (
                <div key={report._id || report.id} className={`p-4 border rounded-lg bg-gray-50 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${report._highlight ? 'ring-2 ring-yellow-300 animate-pulse' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold break-words">{report.title}</h3>
                    <p className="text-sm text-gray-600 break-words">{report.description}</p>
                    <p className="text-sm text-gray-500 mt-1 break-words">Location: {report.address || "N/A"}</p>
                    <p className="text-xs text-gray-400">Submitted: {(report.submittedAt || report.createdAt) ? new Date(report.submittedAt || report.createdAt).toLocaleString() : ""}</p>
                  </div>
                  <div className="flex flex-col items-end min-w-[120px]">
                    {report.status === "pending" && <span className="flex items-center text-yellow-600"><Clock size={16} className="mr-1" /> Pending</span>}
                    {report.status === "submitted" && <span className="flex items-center text-yellow-600"><Clock size={16} className="mr-1" /> Submitted</span>}
                    {report.status === "in_progress" && <span className="flex items-center text-blue-600"><AlertCircle size={16} className="mr-1" /> In Progress</span>}
                    {report.status === "resolved" && <span className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Resolved</span>}
                  </div>
                  {(report.imageUrl && report.imageUrl !== "null") ? (
                    <img src={report.imageUrl} alt="Issue" className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-40 h-40 object-cover rounded-lg border" />
                  ) : (report.images && report.images.length > 0) ? (
                    <img src={report.images[0].url || report.images[0]} alt="Issue" className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-40 h-40 object-cover rounded-lg border" />
                  ) : (
                    <div className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-40 h-40 flex items-center justify-center bg-gray-100 rounded-lg border text-gray-400">No image</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CitizenPortal;
