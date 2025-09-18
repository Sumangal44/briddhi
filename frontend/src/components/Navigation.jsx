import { Brain, LayoutDashboard, Users, BarChart3, Shield } from "lucide-react";

export function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "citizen", label: "Citizen Portal", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "emergency", label: "Emergency", icon: Shield },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-2 sm:py-0 gap-2 sm:gap-0">
          {/* Logo / Home Button */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity mb-2 sm:mb-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Briddhi 🌱
            </span>
          </button>

          {/* Navigation Items */}
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1 w-full sm:w-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base focus:outline-none ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline-block sm:block">{item.label}</span>
                  </button>
                  {/* Tooltip on hover (for icon-only or always) */}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shadow-lg min-w-max sm:hidden">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
