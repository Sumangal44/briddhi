import { Recycle, MapPin, Truck, BarChart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



export default function WasteManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
          <Recycle className="w-10 h-10 text-green-600" />
          Waste Management
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Smart bin sensors, overflow prediction, and optimized collection
          routes for cleaner, healthier cities.
        </p>
      </motion.div>

      {/* Problem Section */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-red-700 mb-3">The Problem</h2>
        <p className="text-gray-700">
          Traditional waste collection often follows fixed schedules, leading to
          overflowing bins in busy areas and wasted resources in less populated
          ones. This results in unhygienic conditions, bad odors, and higher
          operational costs for municipalities.
        </p>
      </motion.div>

      {/* Solution Section */}
      <motion.div
        className="bg-green-50 shadow-md rounded-2xl p-6 mb-8 border border-green-200"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-3">
          Our Smart Solution
        </h2>
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-green-600" />
            <span>
              <strong>Smart Sensors:</strong> Bins equipped with IoT sensors
              detect fill levels in real time.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <BarChart className="w-6 h-6 text-green-600" />
            <span>
              <strong>Overflow Prediction:</strong> AI algorithms forecast when
              and where bins will overflow.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-green-600" />
            <span>
              <strong>Optimized Routes:</strong> Dynamic route planning ensures
              efficient collection, reducing fuel and costs.
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Impact Section */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-3">
          The Impact
        </h2>
        <p className="text-gray-700">
          Our waste management system helps cities stay clean, lowers
          operational costs, and reduces carbon emissions. By using predictive
          AI and IoT, waste collection becomes smarter, more sustainable, and
          citizen-friendly.
        </p>
      </motion.div>
    </div>
  );
}
