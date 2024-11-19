import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, ClipboardList, CreditCard, LayoutDashboard, Settings } from 'lucide-react';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Briefcase, label: 'STOCK', path: '/stock' },
    { icon: ClipboardList, label: 'CONSIGNE', path: '/consignment' },
    { icon: CreditCard, label: 'VENTES', path: '/sales' },
    { icon: LayoutDashboard, label: 'DASHBOARD', path: '/dashboard' },
    { icon: Settings, label: 'RÉGLAGES', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                isActive(path) ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;