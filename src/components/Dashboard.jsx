import React, { useState, useEffect } from "react";
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

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeIssues, setActiveIssues] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time issues
    const issues = [
      {
        id: "1",
        type: "traffic",
        title: "Heavy congestion detected",
        location: "MG Road Junction",
        priority: "high",
        status: "in-progress",
        reportedAt: "10:30 AM",
        description: "AI detected 40% increase in traffic density",
      },
      {
        id: "2",
        type: "infrastructure",
        title: "Pothole identified",
        location: "Brigade Road, KM 2.3",
        priority: "medium",
        status: "pending",
        reportedAt: "9:15 AM",
        description: "Computer vision detected road damage",
      },
      {
        id: "3",
        type: "waste",
        title: "Bin overflow alert",
        location: "Cubbon Park Gate",
        priority: "medium",
        status: "pending",
        reportedAt: "11:45 AM",
        description: "Sensor indicates 95% capacity reached",
      },
      {
        id: "4",
        type: "emergency",
        title: "Minor accident reported",
        location: "Koramangala 5th Block",
        priority: "high",
        status: "resolved",
        reportedAt: "8:20 AM",
        description: "Emergency services dispatched and resolved",
      },
    ];
    setActiveIssues(issues);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                City Operations Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time monitoring and AI-powered insights
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
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
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Issues */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
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
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {issue.title}
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span>{issue.location}</span>
                                <span>•</span>
                                <Clock className="w-4 h-4" />
                                <span>{issue.reportedAt}</span>
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                {issue.description}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-2">
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
                                {issue.status
                                  .replace("-", " ")
                                  .toUpperCase()}
                              </span>
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
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Dispatch Emergency Team
                    </span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">
                      Mark Issue Resolved
                    </span>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">
                      Send City Alert
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span>AI Insights</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Traffic Prediction</p>
                  <p className="font-medium text-gray-900">
                    Heavy congestion expected on Outer Ring Road between 5-7 PM
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Infrastructure Alert</p>
                  <p className="font-medium text-gray-900">
                    3 streetlights may fail in Electronic City within 48 hours
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Resource Optimization</p>
                  <p className="font-medium text-gray-900">
                    Waste collection route efficiency can improve by 23%
                  </p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Monitoring</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      Operational
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Traffic Cameras</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      847/850 Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">IoT Sensors</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600 font-medium">
                      1,203/1,250 Active
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Citizen App</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
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
