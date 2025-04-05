import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PieChart, TrendingUp, Shield } from 'lucide-react';

function Feature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-blue-600" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Wallet className="text-blue-600" size={32} />
              <span className="ml-2 text-xl font-bold">FinanceHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Take Control of Your
              <span className="text-blue-600"> Financial Future</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Track your spending, manage investments, and achieve your financial goals with our comprehensive personal finance platform.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to manage your finances
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={Wallet}
              title="Budget Tracking"
              description="Set and monitor budgets across different categories to keep your spending in check."
            />
            <Feature
              icon={PieChart}
              title="Expense Analysis"
              description="Visualize your spending patterns and identify areas for improvement."
            />
            <Feature
              icon={TrendingUp}
              title="Investment Management"
              description="Track your investments and monitor their performance over time."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;