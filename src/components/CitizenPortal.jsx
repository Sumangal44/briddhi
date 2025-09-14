
import React, { useState } from "react";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  X,
} from "lucide-react";

export function CitizenPortal() {

  const [activeTab, setActiveTab] = useState("report");
  const [reportType, setReportType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const [userReports, setUserReports] = useState([
    {
      id: "1",
      type: "infrastructure",
      title: "Broken Streetlight",
      description: "Streetlight not working near City Park entrance.",
      location: "City Park, Gate 2",
      status: "submitted",
      submittedAt: "2025-09-10 14:30",
    },
    {
      id: "2",
      type: "sanitation",
      title: "Garbage Overflow",
      description: "Dustbin overflowing in Sector 5 market.",
      location: "Sector 5, Main Market",
      status: "in_progress",
      submittedAt: "2025-09-12 09:15",
    },
    {
      id: "3",
      type: "safety",
      title: "Illegal Parking",
      description: "Cars blocking the emergency lane on MG Road.",
      location: "MG Road, Metro Station",
      status: "resolved",
      submittedAt: "2025-09-08 18:45",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportType || !title || !description || !location) return;

    setSubmissionStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newReport = {
      id: Date.now().toString(),
      type: reportType,
      title,
      description,
      location,
      status: "submitted",
      submittedAt: new Date().toLocaleString(),
      photo: photo ? URL.createObjectURL(photo) : undefined,
    };

    setUserReports((prev) => [newReport, ...prev]);
    setSubmissionStatus("success");

    setTimeout(() => {
      setReportType("");
      setTitle("");
      setDescription("");
      setLocation("");
      setPhoto(null);
      setSubmissionStatus("idle");
    }, 3000);
  };

  return (
    <div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Citizen Portal</h1>
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6 justify-center">
          <button
            onClick={() => setActiveTab("report")}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
              activeTab === "report"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Report an Issue
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
              activeTab === "track"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Track Reports
          </button>
        </div>
        {/* Report Issue Tab */}
        {activeTab === "report" && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* ...existing report form code... */}
            {/* (copy the form code from above) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full border rounded-lg p-2"
                required
              >
                <option value="">Select type</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="sanitation">Sanitation</option>
                <option value="safety">Safety</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border rounded-lg p-2"
                placeholder="Enter issue title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border rounded-lg p-2"
                placeholder="Describe the issue"
                rows={4}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full border rounded-lg p-2"
                placeholder="Enter location"
                required
              />
            </div>
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Photo (optional)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex items-center space-x-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  <Upload size={18} />
                  <span>{photo ? "Change Photo" : "Upload Photo"}</span>
                </label>
                {photo && (
                  <div className="ml-3 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={submissionStatus === "submitting"}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submissionStatus === "submitting"
                ? "Submitting..."
                : "Submit Report"}
            </button>
            {submissionStatus === "success" && (
              <p className="text-green-600 text-sm mt-2">
                Report submitted successfully!
              </p>
            )}
          </form>
        )}
        {/* Track Reports Tab */}
        {activeTab === "track" && (
          <div className="space-y-4 w-full">
            {userReports.map((report) => (
              <div
                key={report.id}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold break-words">{report.title}</h3>
                  <p className="text-sm text-gray-600 break-words">{report.description}</p>
                  <p className="text-sm text-gray-500 mt-1 break-words">
                    Location: {report.location}
                  </p>
                  <p className="text-xs text-gray-400">
                    Submitted: {report.submittedAt}
                  </p>
                </div>
                <div className="flex flex-col items-end min-w-[120px]">
                  {report.status === "submitted" && (
                    <span className="flex items-center text-yellow-600">
                      <Clock size={16} className="mr-1" /> Submitted
                    </span>
                  )}
                  {report.status === "in_progress" && (
                    <span className="flex items-center text-blue-600">
                      <AlertCircle size={16} className="mr-1" /> In Progress
                    </span>
                  )}
                  {report.status === "resolved" && (
                    <span className="flex items-center text-green-600">
                      <CheckCircle size={16} className="mr-1" /> Resolved
                    </span>
                  )}
                </div>
                {report.photo && (
                  <img
                    src={report.photo}
                    alt="Issue"
                    className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-40 h-40 object-cover rounded-lg border"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
