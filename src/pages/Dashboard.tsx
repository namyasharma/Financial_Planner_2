import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';

function StatCard({ icon: Icon, label, value, trend, trendValue }) {
  const isPositive = trend === 'up';
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        {trendValue && (
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{trendValue}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm">{label}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function Dashboard() {
  // This data will be replaced with actual API data once you provide the backend
  const mockStats = [
    {
      icon: DollarSign,
      label: 'Total Balance',
      value: '$24,500',
      trend: 'up',
      trendValue: '12'
    },
    {
      icon: Activity,
      label: 'Monthly Spending',
      value: '$3,240',
      trend: 'down',
      trendValue: '8'
    },
    {
      icon: TrendingUp,
      label: 'Investments',
      value: '$12,800',
      trend: 'up',
      trendValue: '24'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your financial summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <p className="text-gray-500">Connect your backend API to see your transactions here.</p>
      </div>
    </div>
  );
}

export default Dashboard;