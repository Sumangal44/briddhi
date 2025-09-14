import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Brain,
  Activity,
  Car,
  Trash2
} from 'lucide-react';

export function Analytics() {
  const [activeMetric, setActiveMetric] = useState('traffic');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for charts
  const trafficData = [
    { name: 'MG Road', value: 85, color: '#EF4444' },
    { name: 'Brigade Road', value: 72, color: '#F59E0B' },
    { name: 'Koramangala', value: 45, color: '#10B981' },
    { name: 'Electronic City', value: 38, color: '#10B981' },
    { name: 'Whitefield', value: 67, color: '#F59E0B' },
  ];

  const wasteData = [
    { name: 'Zone A', value: 92, color: '#10B981' },
    { name: 'Zone B', value: 87, color: '#10B981' },
    { name: 'Zone C', value: 76, color: '#F59E0B' },
    { name: 'Zone D', value: 94, color: '#10B981' },
    { name: 'Zone E', value: 68, color: '#F59E0B' },
  ];

  const infrastructureData = [
    { name: 'Roads', value: 78, color: '#F59E0B' },
    { name: 'Streetlights', value: 95, color: '#10B981' },
    { name: 'Traffic Signals', value: 82, color: '#10B981' },
    { name: 'Bridges', value: 89, color: '#10B981' },
    { name: 'Drainage', value: 65, color: '#F59E0B' },
  ];

  const predictions = [
    {
      area: 'Outer Ring Road',
      type: 'Traffic Congestion',
      probability: 85,
      timeframe: '5-7 PM Today',
      impact: 'high'
    },
    {
      area: 'Electronic City',
      type: 'Streetlight Failure',
      probability: 73,
      timeframe: 'Next 48 Hours',
      impact: 'medium'
    },
    {
      area: 'Indiranagar',
      type: 'Waste Overflow',
      probability: 68,
      timeframe: 'Tomorrow Morning',
      impact: 'medium'
    },
    {
      area: 'HSR Layout',
      type: 'Pothole Formation',
      probability: 54,
      timeframe: 'This Week',
      impact: 'low'
    }
  ];

  const kpis = [
    {
      title: 'Traffic Efficiency',
      value: '73%',
      change: '+5%',
      trend: 'up',
      description: 'Average traffic flow efficiency across the city',
      icon: Car
    },
    {
      title: 'Issue Resolution Time',
      value: '2.3 days',
      change: '-18%',
      trend: 'down',
      description: 'Average time to resolve reported issues',
      icon: Clock
    },
    {
      title: 'Citizen Satisfaction',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      description: 'User satisfaction rating from app feedback',
      icon: Users
    },
    {
      title: 'Predictive Accuracy',
      value: '87%',
      change: '+2%',
      trend: 'up',
      description: 'AI prediction accuracy for city issues',
      icon: Brain
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentData = () => {
    switch (activeMetric) {
      case 'traffic': return trafficData;
      case 'waste': return wasteData;
      case 'infrastructure': return infrastructureData;
      default: return trafficData;
    }
  };

  const getMetricTitle = () => {
    switch (activeMetric) {
      case 'traffic': return 'Traffic Congestion Levels';
      case 'waste': return 'Waste Collection Efficiency';
      case 'infrastructure': return 'Infrastructure Health Score';
      default: return 'Traffic Congestion Levels';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Analytics & Insights</h1>
              <p className="text-gray-600 mt-2">Predictive intelligence for smarter city management</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{kpi.title}</p>
                  <p className="text-xs text-gray-500 mt-2">{kpi.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metric Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">City Performance Metrics</h2>
                <div className="flex space-x-2">
                  {[
                    { id: 'traffic', label: 'Traffic', icon: Car },
                    { id: 'waste', label: 'Waste', icon: Trash2 },
                    { id: 'infrastructure', label: 'Infrastructure', icon: BarChart3 }
                  ].map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <button
                        key={metric.id}
                        onClick={() => setActiveMetric(metric.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          activeMetric === metric.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{metric.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{getMetricTitle()}</h3>
                <div className="space-y-4">
                  {getCurrentData().map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-gray-600 font-medium">{item.name}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${item.value}%`, 
                            backgroundColor: item.color 
                          }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm font-semibold text-gray-900">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Trends</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">+23%</p>
                  <p className="text-sm text-gray-600">Issue Resolution</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">+15%</p>
                  <p className="text-sm text-gray-600">Traffic Flow</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">+31%</p>
                  <p className="text-sm text-gray-600">Citizen Reports</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Predictions Sidebar */}
          <div className="space-y-6">
            {/* AI Predictions */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI Predictions</h3>
              </div>
              
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{prediction.type}</h4>
                        <p className="text-sm text-gray-600 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{prediction.area}</span>
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                        {prediction.impact.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{prediction.probability}%</span> probability
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{prediction.timeframe}</span>
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>Recommended Actions</span>
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-900 text-sm">High Priority</span>
                  </div>
                  <p className="text-sm text-red-800">Deploy traffic officers to MG Road during peak hours</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-900 text-sm">Medium Priority</span>
                  </div>
                  <p className="text-sm text-orange-800">Schedule preventive maintenance for Electronic City streetlights</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900 text-sm">Optimization</span>
                  </div>
                  <p className="text-sm text-blue-800">Adjust waste collection routes in Zone C for better efficiency</p>
                </div>
              </div>
            </div>

            {/* Performance Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overall City Score</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">82</div>
                      <div className="text-xs text-gray-500">out of 100</div>
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-blue-500"
                    style={{
                      borderImage: `conic-gradient(from 0deg, #3B82F6 0deg, #3B82F6 ${82 * 3.6}deg, transparent ${82 * 3.6}deg) 1`
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Good performance with room for improvement in traffic management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
