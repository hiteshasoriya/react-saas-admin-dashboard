import { useState, useEffect } from 'react';
import { generateChartData, generateRandomActivity, updateStats } from '../utils/helpers';

export const useMockData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(generateChartData());
  const [activities, setActivities] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(487);

  // Initialize activities
  useEffect(() => {
    const initialActivities = Array.from({ length: 5 }, generateRandomActivity);
    setActivities(initialActivities);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update online users
      if (Math.random() > 0.7) {
        setOnlineUsers(prev => {
          const change = Math.random() > 0.5 ? 1 : -1;
          return Math.max(0, prev + change);
        });
      }
      
      // Randomly add new activity
      if (Math.random() > 0.8) {
        const newActivity = generateRandomActivity();
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshChartData = (timeRange) => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateChartData(timeRange));
      setIsLoading(false);
    }, 500);
  };

  const refreshActivities = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newActivities = Array.from({ length: 5 }, generateRandomActivity);
      setActivities(newActivities);
      setIsLoading(false);
    }, 500);
  };

  return {
    isLoading,
    chartData,
    activities,
    onlineUsers,
    refreshChartData,
    refreshActivities,
    setChartData,
    setActivities
  };
};