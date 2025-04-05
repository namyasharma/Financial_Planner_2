import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, PieChart, TrendingUp, Settings, Menu } from 'lucide-react';

const menuItems = [
  { icon: Wallet, label: 'Dashboard', path: '/' },
  { icon: PieChart, label: 'Budget', path: '/budget' },
  { icon: TrendingUp, label: 'Investments', path: '/investments' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className={`font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>
          FinanceHub
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;