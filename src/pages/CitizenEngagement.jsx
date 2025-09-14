import { Users, MessageCircle, ClipboardList, CheckCircle } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line

export default function CitizenEngagement() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-sky-800 mb-4 flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-sky-600" />
          Citizen Engagement
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Easy issue reporting, transparent tracking, and inclusive
          participation in city planning.
        </p>
      </motion.div>

      {/* Problem Section */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-sky-700 mb-3">The Problem</h2>
        <p className="text-gray-700">
          In many cities, citizens face difficulties in reporting local issues,
          lack visibility on the progress of their complaints, and have limited
          participation in city decision-making. This creates frustration and a
          disconnect between people and local authorities.
        </p>
      </motion.div>

      {/* Solution Section */}
      <motion.div
        className="bg-sky-50 shadow-md rounded-2xl p-6 mb-8 border border-sky-200"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-sky-800 mb-3">
          Our Smart Solution
        </h2>
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-sky-600" />
            <span>
              <strong>Easy Reporting:</strong> Citizens can report potholes,
              streetlight failures, and other issues via a mobile/web app.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-sky-600" />
            <span>
              <strong>Transparent Tracking:</strong> Every report has a status
              update system so citizens know what’s happening.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-sky-600" />
            <span>
              <strong>Participatory Planning:</strong> Polls and surveys allow
              citizens to contribute ideas for urban projects.
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
        <h2 className="text-2xl font-semibold text-sky-800 mb-3">The Impact</h2>
        <p className="text-gray-700">
          Citizen engagement bridges the gap between communities and
          governments. With easy reporting, transparent processes, and inclusive
          decision-making, cities become more democratic, responsive, and
          citizen-friendly.
        </p>
      </motion.div>
    </div>
  );
}
