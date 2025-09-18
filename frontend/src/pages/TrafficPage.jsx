// src/pages/TrafficPage.jsx
import { MapPin, Brain, TrafficCone, Activity, Siren, BarChart3 } from "lucide-react";
import HumanCounter from "../components/carCounter";
// import PotholeAndCrackDetector from "../components/PotholeAndCrackDetector";

export default function TrafficPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 flex items-center justify-center gap-2">
            <MapPin className="w-8 h-8 text-blue-500" />
            Smart Traffic Management
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered congestion prediction, adaptive signals, and route
            optimization for smoother urban mobility.
          </p>
        </div>

        {/* Problem Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            🚦 The Problem
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Severe congestion during peak hours</li>
            <li>Long waiting times at traffic signals</li>
            <li>Emergency vehicles delayed in traffic</li>
            <li>Inefficient manual traffic management</li>
            <li>Pollution from idling vehicles</li>
          </ul>
        </section>
        <HumanCounter />
       

        {/* Solution Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Our Solution
          </h2>
          <p className="text-gray-700 mb-4">
            We use an AI-powered traffic system that predicts congestion,
            adapts signals in real-time, optimizes routes, and prioritizes
            emergency response.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Predictions",
                desc: "Machine learning forecasts congestion 15–30 minutes ahead."
              },
              {
                icon: TrafficCone,
                title: "Adaptive Signals",
                desc: "Traffic lights adjust dynamically to vehicle density."
              },
              {
                icon: Siren,
                title: "Emergency Priority",
                desc: "Ambulances & fire trucks get green-light corridors."
              },
              {
                icon: Activity,
                title: "Route Optimization",
                desc: "Navigation apps suggest alternate routes in real-time."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border"
              >
                <item.icon className="w-6 h-6 text-blue-600 mt-1" />
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
            <li>📡 Collects live data from sensors, cameras, and GPS.</li>
            <li>🧠 AI models analyze and predict traffic patterns.</li>
            <li>🚦 Signals adapt dynamically to reduce waiting time.</li>
            <li>🚑 Emergency vehicles get automated signal priority.</li>
            <li>🗺️ Drivers receive alternate routes via navigation apps.</li>
            <li>📊 Dashboards provide insights to city authorities.</li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-2">
            <BarChart3 className="w-6 h-6" /> Expected Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-blue-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">30%</p>
              <p className="text-sm">Less waiting time</p>
            </div>
            <div className="bg-white text-blue-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">25%</p>
              <p className="text-sm">Faster emergency response</p>
            </div>
            <div className="bg-white text-blue-600 rounded-lg p-4 shadow">
              <p className="text-3xl font-bold">↓</p>
              <p className="text-sm">Reduced pollution & fuel waste</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}