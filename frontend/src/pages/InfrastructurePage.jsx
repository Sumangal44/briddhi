// src/pages/InfrastructurePage.jsx
import {
  Shield,
  Camera,
  AlertTriangle,
  Wrench,
  Lightbulb,
  BarChart3,
} from "lucide-react";

export default function InfrastructurePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4 flex items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-green-500" />
            Infrastructure Monitoring
          </h1>
          <p className="text-lg text-gray-600">
            Real-time detection of potholes, bridge damage, and streetlight
            failures using computer vision.
          </p>
        </div>

        {/* Problem Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            🏗️ The Problem
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Potholes cause accidents and vehicle damage</li>
            <li>Bridge cracks often go undetected until it’s too late</li>
            <li>Streetlight failures reduce road safety at night</li>
            <li>Manual inspections are slow and inefficient</li>
            <li>Authorities lack real-time infrastructure status</li>
          </ul>
        </section>

        {/* Solution Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Our Solution
          </h2>
          <p className="text-gray-700 mb-4">
            We deploy AI-driven computer vision and IoT sensors to monitor
            infrastructure health in real-time and send instant alerts to
            authorities.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Camera,
                title: "Computer Vision",
                desc: "CCTV and drones detect potholes & cracks automatically.",
              },
              {
                icon: AlertTriangle,
                title: "Instant Alerts",
                desc: "Authorities get real-time notifications of damage.",
              },
              {
                icon: Lightbulb,
                title: "Smart Streetlights",
                desc: "Sensors detect and report faulty streetlights instantly.",
              },
              {
                icon: Wrench,
                title: "Maintenance Scheduling",
                desc: "AI suggests priority repairs to reduce accidents.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border"
              >
                <item.icon className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            ⚙️ How It Works
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>📷 Cameras & drones scan roads, bridges, and lights.</li>
            <li>🧠 AI models detect cracks, potholes, or failures instantly.</li>
            <li>📡 Data is sent to a central monitoring system.</li>
            <li>📲 Alerts reach the concerned department automatically.</li>
            <li>🛠️ Maintenance teams get AI-prioritized repair schedules.</li>
            <li>📊 Dashboard shows infrastructure health analytics.</li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-2">
            <BarChart3 className="w-6 h-6" /> Expected Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-green-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">80%</p>
              <p className="text-sm">Faster issue detection</p>
            </div>
            <div className="bg-white text-green-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">60%</p>
              <p className="text-sm">Reduced accidents & failures</p>
            </div>
            <div className="bg-white text-green-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm">Monitoring coverage</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
