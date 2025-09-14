import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Car,
  Flame,
  Heart,
  Shield,
  Zap,
  Users,
  Activity,
} from "lucide-react";


// Move static data outside the component for performance
const emergencyServices = [
  {
    name: "Fire Department",
    phone: "101",
    status: "available",
    unitsAvailable: 12,
    averageResponse: "6 min",
    icon: Flame,
    color: "text-red-600",
  },
  {
    name: "Police",
    phone: "100",
    status: "available",
    unitsAvailable: 28,
    averageResponse: "4 min",
    icon: Shield,
    color: "text-blue-600",
  },
  {
    name: "Ambulance",
    phone: "108",
    status: "busy",
    unitsAvailable: 15,
    averageResponse: "8 min",
    icon: Heart,
    color: "text-green-600",
  },
  {
    name: "Traffic Police",
    phone: "103",
    status: "available",
    unitsAvailable: 22,
    averageResponse: "5 min",
    icon: Car,
    color: "text-orange-600",
  },
  {
    name: "Disaster Management",
    phone: "1070",
    status: "available",
    unitsAvailable: 8,
    averageResponse: "15 min",
    icon: Zap,
    color: "text-purple-600",
  },
];

const initialAlerts = [
  {
    id: "1",
    type: "accident",
    title: "Vehicle collision detected",
    location: "Outer Ring Road, KM 15",
    severity: "high",
    status: "dispatched",
    reportedAt: "11:30 AM",
    description:
      "AI cameras detected multi-vehicle collision. Traffic blocked in both directions.",
    responders: ["Traffic Police", "Ambulance"],
    estimatedArrival: "8 minutes",
  },
  {
    id: "2",
    type: "fire",
    title: "Smoke detected in commercial building",
    location: "UB City Mall, Vittal Mallya Road",
    severity: "critical",
    status: "dispatched",
    reportedAt: "10:45 AM",
    description:
      "Fire safety sensors triggered. Building evacuation in progress.",
    responders: ["Fire Department", "Police", "Ambulance"],
    estimatedArrival: "5 minutes",
  },
  {
    id: "3",
    type: "medical",
    title: "Medical emergency reported",
    location: "Cubbon Park Metro Station",
    severity: "medium",
    status: "active",
    reportedAt: "11:50 AM",
    description:
      "Citizen reported person collapsed. CPR in progress by bystanders.",
    responders: ["Ambulance"],
    estimatedArrival: "12 minutes",
  },
  {
    id: "4",
    type: "security",
    title: "Suspicious activity alert",
    location: "Brigade Road Shopping Area",
    severity: "medium",
    status: "resolved",
    reportedAt: "9:15 AM",
    description:
      "CCTV analysis flagged unusual gathering. False alarm - street performance.",
    responders: ["Police"],
  },
];

export function Emergency() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlerts] = useState(initialAlerts);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity = "") => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status = "") => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "dispatched":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type = "") => {
    switch (type) {
      case "fire":
        return Flame;
      case "accident":
        return Car;
      case "medical":
        return Heart;
      case "security":
        return Shield;
      case "disaster":
        return Zap;
      default:
        return AlertTriangle;
    }
  };

  const getServiceStatusColor = (status = "") => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Emergency Command Center
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Emergency Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Active Alerts
              </h3>
              <Activity className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {activeAlerts.filter((a) => a.status !== "resolved").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Responders Active
              </h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">65</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Avg Response Time
              </h3>
              <Clock className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">7.2 min</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Alerts Resolved Today
              </h3>
              <CheckCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {activeAlerts.filter((a) => a.status === "resolved").length}
            </p>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Active Emergency Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeAlerts.map((alert) => {
              const Icon = getTypeIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-2">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                        <h3 className="text-base sm:text-lg font-medium text-gray-900">
                          {alert.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        Reported at {alert.reportedAt}
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity} severity
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Responders
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {alert.responders.map((responder, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {responder}
                        </span>
                      ))}
                    </div>
                    {alert.estimatedArrival && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        ETA: {alert.estimatedArrival}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Services */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Emergency Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {emergencyServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${service.color}`} />
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {service.name}
                    </h3>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      Emergency: {service.phone}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      Units Available: {service.unitsAvailable}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      Avg Response: {service.averageResponse}
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getServiceStatusColor(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


