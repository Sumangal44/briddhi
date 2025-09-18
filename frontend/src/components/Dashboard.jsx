import  { useState, useEffect } from "react";
import api from "../api/axios";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Car,
  Trash2,
  Lightbulb,
  Activity,
} from "lucide-react";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeIssues, setActiveIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let intervalId;
    const fetchIssues = async () => {
      try {
        const res = await api.get("/admin/issues");
        console.log("API response for /admin/issues:", res.data);
        // Defensive: handle missing or malformed response
        const issuesArr = Array.isArray(res.data.issues) ? res.data.issues : [];
        if (!Array.isArray(res.data.issues)) {
          setError("API response malformed: issues array missing");
        } else if (issuesArr.length === 0) {
          setError("No issues found. Check backend or database.");
        } else {
          setError("");
        }
        const issues = issuesArr.map((issue) => ({
          id: issue._id,
          type: issue.type || "other",
          title: issue.title || issue.description,
          location: issue.address || issue.location,
          priority: issue.priority || "medium",
          status: issue.status,
          reportedAt: new Date(issue.createdAt).toLocaleTimeString(),
          description: issue.description,
          reportedBy: issue.reportedBy,
        }));
        setActiveIssues(issues);
      } catch (err) {
        setActiveIssues([]);
        setError("Failed to fetch issues: " + (err?.response?.data?.message || err.message));
        console.error("Failed to fetch issues", err);
      }
    };
    fetchIssues();
    intervalId = setInterval(fetchIssues, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const metrics = [
    {
      title: "Active Traffic Alerts",
      value: "23",
      change: "-12%",
      trend: "down",
      icon: Car,
      color: "bg-blue-500",
    },
    {
      title: "Infrastructure Issues",
      value: "7",
      change: "-25%",
      trend: "down",
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      title: "Waste Collection Efficiency",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Trash2,
      color: "bg-green-500",
    },
    {
      title: "Street Light Uptime",
      value: "98.2%",
      change: "+1.2%",
      trend: "up",
      icon: Lightbulb,
      color: "bg-yellow-500",
    },
    {
      title: "Citizen Reports Today",
      value: "142",
      change: "+18%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Emergency Response Time",
      value: "4.2 min",
      change: "-30%",
      trend: "down",
      icon: Activity,
      color: "bg-red-500",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "traffic":
        return Car;
      case "infrastructure":
        return AlertTriangle;
      case "waste":
        return Trash2;
      case "emergency":
        return Activity;
      default:
        return AlertTriangle;
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("authToken");
  const isAdmin = user && user.role === "admin" && !!token;

  // If not admin, redirect to login page using SPA navigation
  if (!isAdmin) {
    window.location.replace("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                City Operations Dashboard
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Real-time monitoring and AI-powered insights
              </p>
              {error && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-lg text-xs">
                  {error}
                </div>
              )}
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-500">Last updated</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${metric.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-xs sm:text-sm ${
                      metric.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${
                        metric.trend === "down" ? "rotate-180" : ""
                      }`}
                    />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {metric.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Live Issues */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Live Issues & Alerts
                  </h2>
                  <span className="text-sm text-gray-500">
                    {activeIssues.length} active
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {activeIssues.map((issue) => {
                  const TypeIcon = getTypeIcon(issue.type);
                  return (
                    <div
                      key={issue.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                {issue.title}
                                <span className="ml-2 px-2 py-1 rounded text-xs bg-gray-200 text-gray-700 font-normal">
                                  {issue.type && issue.type !== "other" ? issue.type.charAt(0).toUpperCase() + issue.type.slice(1) : "Other"}
                                </span>
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 flex items-center flex-wrap gap-x-2 mt-1">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{issue.location}</span>
                                <span className="hidden sm:inline">•</span>
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{issue.reportedAt}</span>
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                {issue.description}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">Reported by: {issue.reportedBy?.name || "Unknown"}</p>
                            </div>
                            <div className="flex flex-row sm:flex-col gap-2 sm:space-y-2 items-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                                  issue.priority
                                )}`}
                              >
                                {issue.priority.toUpperCase()}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  issue.status
                                )}`}
                              >
                                {issue.status.replace("-", " ").toUpperCase()}
                              </span>
                              {/* Status update dropdown */}
                              <select
                                value={issue.status}
                                onChange={async (e) => {
                                  const newStatus = e.target.value;
                                  try {
                                    const token = localStorage.getItem("authToken");
                                    await api.put(`/admin/issues/${issue.id}/status`, 
                                      { status: newStatus },
                                      { headers: { Authorization: `Bearer ${token}` }}
                                    );
                                    setActiveIssues((prev) =>
                                      prev.map((i) =>
                                        i.id === issue.id ? { ...i, status: newStatus } : i
                                      )
                                    );
                                  } catch (err) {
                                    // Optionally show error
                                    console.error("Failed to update status", err);
                                  }
                                }}
                                className="ml-2 px-2 py-1 rounded border text-xs"
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions & AI Insights */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full p-2 sm:p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900 text-xs sm:text-base">
                      Dispatch Emergency Team
                    </span>
                  </div>
                </button>
                <button className="w-full p-2 sm:p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900 text-xs sm:text-base">
                      Mark Issue Resolved
                    </span>
                  </div>
                </button>
                <button className="w-full p-2 sm:p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900 text-xs sm:text-base">
                      Send City Alert
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-purple-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span>AI Insights</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Traffic Prediction
                  </p>
                  <p className="font-medium text-gray-900 text-xs sm:text-base">
                    Heavy congestion expected on Outer Ring Road between 5-7 PM
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Infrastructure Alert
                  </p>
                  <p className="font-medium text-gray-900 text-xs sm:text-base">
                    3 streetlights may fail in Electronic City within 48 hours
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Resource Optimization
                  </p>
                  <p className="font-medium text-gray-900 text-xs sm:text-base">
                    Waste collection route efficiency can improve by 23%
                  </p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                System Status
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    AI Monitoring
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                      Operational
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Traffic Cameras
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                      847/850 Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    IoT Sensors
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-yellow-600 font-medium">
                      1,203/1,250 Active
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Citizen App
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;