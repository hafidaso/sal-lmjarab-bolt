import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Users, Brain, AlertTriangle, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { predictiveAnalytics } from '../../services/predictiveAnalytics';

interface InsightCardProps {
  title: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ReactNode;
  color: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, trend, description, icon, color }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const PredictiveInsights: React.FC = () => {
  const [insights, setInsights] = useState<any>(null);
  const [capacityPredictions, setCapacityPredictions] = useState<any[]>([]);
  const [demandForecasts, setDemandForecasts] = useState<any[]>([]);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictiveInsights();
  }, []);

  const loadPredictiveInsights = async () => {
    try {
      setLoading(true);
      
      // Load real-time insights
      const realTimeInsights = predictiveAnalytics.getRealTimeInsights();
      setInsights(realTimeInsights);
      
      // Load capacity predictions for sample facilities
      const facilityIds = ['facility_1', 'facility_2', 'facility_3'];
      const capacityPromises = facilityIds.map(id => 
        predictiveAnalytics.predictFacilityCapacity(id, '2h')
      );
      const capacityResults = await Promise.all(capacityPromises);
      setCapacityPredictions(capacityResults);
      
      // Load demand forecasts for popular specialties
      const specialties = ['Cardiology', 'Dermatology', 'General Medicine'];
      const demandPromises = specialties.map(specialty => 
        predictiveAnalytics.forecastDemand(specialty, 'Casablanca', '7d')
      );
      const demandResults = await Promise.all(demandPromises);
      setDemandForecasts(demandResults);
      
      // Load personalized recommendations (mock user)
      const mockUserProfile = {
        age: 35,
        location: { city: 'Casablanca', coordinates: { lat: 33.5731, lng: -7.5898 } },
        insurance: ['CNSS'],
        chronicConditions: [],
        lastVisits: []
      };
      const recommendations = await predictiveAnalytics.generatePersonalizedRecommendations('user_123', mockUserProfile);
      setPersonalizedRecommendations(recommendations);
      
    } catch (error) {
      console.error('Failed to load predictive insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-8 h-8 text-primary-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Predictive Healthcare Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analytics and forecasting for better healthcare decisions
          </p>
        </div>
      </div>

      {/* Real-time System Insights */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InsightCard
            title="System Load"
            value={`${insights.systemLoad}%`}
            trend={insights.systemLoad > 70 ? 'up' : insights.systemLoad < 40 ? 'down' : 'stable'}
            description="Current healthcare system capacity utilization"
            icon={<Users className="w-6 h-6 text-blue-500" />}
            color="border-blue-500"
          />
          
          <InsightCard
            title="Capacity Trend"
            value={insights.trends?.capacity || 'Stable'}
            trend={insights.trends?.capacity === 'increasing' ? 'up' : insights.trends?.capacity === 'decreasing' ? 'down' : 'stable'}
            description="Predicted capacity changes over next 24 hours"
            icon={<TrendingUp className="w-6 h-6 text-green-500" />}
            color="border-green-500"
          />
          
          <InsightCard
            title="Booking Trend"
            value={insights.trends?.bookings || 'Stable'}
            trend={insights.trends?.bookings === 'increasing' ? 'up' : insights.trends?.bookings === 'decreasing' ? 'down' : 'stable'}
            description="Appointment booking patterns and trends"
            icon={<Calendar className="w-6 h-6 text-purple-500" />}
            color="border-purple-500"
          />
          
          <InsightCard
            title="Active Alerts"
            value={insights.alerts?.length || 0}
            trend={insights.alerts?.length > 3 ? 'up' : 'stable'}
            description="Current system alerts and notifications"
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
            color="border-red-500"
          />
        </div>
      )}

      {/* Capacity Predictions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary-600" />
          <span>Facility Capacity Predictions (Next 2 Hours)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {capacityPredictions.map((prediction, index) => (
            <div key={prediction.facilityId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Facility {index + 1}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  prediction.predictedCapacity > 80 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    : prediction.predictedCapacity > 60
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {prediction.predictedCapacity}% capacity
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                  <span className="font-medium">{(prediction.confidence * 100).toFixed(0)}%</span>
                </div>
                
                {prediction.factors.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key factors:</p>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.slice(0, 2).map((factor: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demand Forecasts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <span>Specialty Demand Forecasts (Next 7 Days)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {demandForecasts.map((forecast, index) => (
            <div key={forecast.specialty} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {forecast.specialty}
                </h4>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{forecast.location}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Predicted Demand:</span>
                  
                  <span className="font-medium">{forecast.predictedDemand} appointments</span>
                </div>
                
                {forecast.seasonalTrends.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Seasonal factors:</p>
                    <div className="space-y-1">
                      {forecast.seasonalTrends.slice(0, 2).map((trend: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span>{trend.month}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{trend.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {forecast.recommendedActions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Recommendations:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {forecast.recommendedActions.slice(0, 2).map((action: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <span>•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Recommendations */}
      {personalizedRecommendations && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary-600" />
            <span>Personalized Health Recommendations</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalizedRecommendations.recommendations.map((rec: any, index: number) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {rec.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {rec.description}
                </p>
                
                {rec.reasoning.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Why this matters:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {rec.reasoning.map((reason: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <span>•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary-600" />
          <span>AI Model Performance</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {predictiveAnalytics.getModelStatus().map((model: any, index: number) => (
            <div key={model.type} className="text-center">
              <div className="mb-2">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  model.accuracy > 0.8 ? 'bg-green-100 text-green-600' : 
                  model.accuracy > 0.7 ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-red-100 text-red-600'
                }`}>
                  <span className="text-lg font-bold">
                    {(model.accuracy * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                {model.type}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                v{model.version}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Updated {new Date(model.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;