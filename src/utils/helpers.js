// Utility functions for the dashboard

// Generate random data for charts
export const generateChartData = (timeRange = 'monthly') => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  let labels = months;
  if (timeRange === 'weekly') labels = weeks;
  if (timeRange === 'daily') labels = days;
  
  return labels.map(label => ({
    month: label,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    users: Math.floor(Math.random() * 1000) + 500,
    profit: Math.floor(Math.random() * 3000) + 500
  }));
};

// Generate random user activity
export const generateRandomActivity = () => {
  const users = ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'Robert Wilson'];
  const actions = [
    'subscribed to Pro Plan',
    'upgraded to Enterprise',
    'cancelled subscription',
    'submitted a ticket',
    'made a payment',
    'completed onboarding'
  ];
  const times = ['2 min ago', '15 min ago', '1 hour ago', '2 hours ago', '3 hours ago'];
  
  return {
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    time: times[Math.floor(Math.random() * times.length)]
  };
};

// Update dashboard stats
export const updateStats = (currentStats) => {
  return currentStats.map(stat => ({
    ...stat,
    value: stat.title === 'Revenue' 
      ? `$${(Math.random() * 60 + 40).toFixed(1)}K`
      : stat.title === 'Users'
      ? `${(Math.random() * 4 + 2).toFixed(1)}K`
      : stat.title === 'Orders'
      ? `${Math.floor(Math.random() * 2000) + 1000}`
      : `${(Math.random() * 30 + 15).toFixed(1)}%`,
    change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 15 + 1).toFixed(1)}%`,
    progress: Math.floor(Math.random() * 30) + 60
  }));
};

// Export table data as CSV
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    ).join(',')
  );
  
  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};