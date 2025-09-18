
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">🌱</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Briddhi
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
  );
}