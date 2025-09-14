import React from 'react';
import { 
  Brain, 
  MapPin, 
  Shield, 
  Recycle, 
  Users, 
  ChevronRight,
  CheckCircle,
  BarChart3,
  Camera,
  Bell
} from 'lucide-react';

export function Landing({ onNavigate }) {
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Briddhi 🌱
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">"hello world"</p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
              <button
                onClick={() => onNavigate('citizen')}
                className="px-3 sm:px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
              >
                Citizen Portal
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            AI-Powered Smart City
            <span className="block text-2xl sm:text-4xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mt-1 sm:mt-2">
              Management Platform
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform Indian cities with intelligent traffic management, predictive infrastructure monitoring, 
            and citizen-centered urban planning. Built for sustainable, inclusive, and smart urban growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center space-x-2 text-base sm:text-lg font-semibold"
            >
              <span>Explore Dashboard</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('citizen')}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center space-x-2 text-base sm:text-lg font-semibold"
            >
              <Users className="w-5 h-5" />
              <span>Citizen Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Comprehensive City Management Solutions
            </h3>
            <p className="text-base sm:text-lg text-gray-600">
              Everything cities need for intelligent, sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                icon: MapPin,
                title: "Smart Traffic Management",
                description: "AI-powered congestion prediction, adaptive signals, and route optimization for smoother urban mobility.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Infrastructure Monitoring",
                description: "Real-time detection of potholes, bridge damage, and streetlight failures using computer vision.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Recycle,
                title: "Waste Management",
                description: "Smart bin sensors, overflow prediction, and optimized collection routes for cleaner cities.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Bell,
                title: "Emergency Response",
                description: "Instant accident detection, disaster alerts, and automated emergency service coordination.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: BarChart3,
                title: "Predictive Analytics",
                description: "AI-driven insights for urban planning, resource allocation, and sustainable city development.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Citizen Engagement",
                description: "Easy issue reporting, transparent tracking, and inclusive participation in city planning.",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">The Urban Challenge</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Traffic congestion costs Indian cities ₹1.47 lakh crore annually",
                "70% of urban infrastructure issues are detected reactively",
                "Poor waste management affects 62% of urban populations",
                "Citizens lack channels for meaningful city planning participation",
                "Emergency response times average 15+ minutes in congested areas"
              ].map((problem, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-blue-50 text-xs sm:text-base">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Briddhi's Solution</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Reduce traffic delays by 30% with predictive management",
                "Detect infrastructure issues 80% faster with AI monitoring",
                "Optimize waste collection, reducing overflows by 60%",
                "Enable direct citizen reporting and transparent tracking",
                "Cut emergency response times by 40% with smart routing"
              ].map((solution, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-xs sm:text-base">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Transform Your City?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-10">
            Join the smart city revolution with Briddhi's AI-powered platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-4 sm:p-6 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Admin Dashboard</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Monitor city-wide metrics and manage operations</p>
            </button>
            
            <button
              onClick={() => onNavigate('citizen')}
              className="p-4 sm:p-6 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group"
            >
              <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Report Issues</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Citizens can report problems and track solutions</p>
            </button>
            
            <button
              onClick={() => onNavigate('analytics')}
              className="p-4 sm:p-6 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group"
            >
              <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">AI Insights</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Predictive analytics for smart planning</p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Briddhi 🌱
            </h1>
          </div>
          <p className="text-gray-400 mb-2 sm:mb-4 text-xs sm:text-base">
            Making cities smarter, safer, and more inclusive through AI-powered urban management
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 Briddhi Platform. Built for sustainable urban growth in India.
          </p>
        </div>
      </footer>
    </div>
  );
}
