import { Home, ShoppingBag, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  if (location.pathname === '/' || location.pathname.startsWith('/product/')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/80 backdrop-blur-md border-t border-surface-variant pb-safe pt-2 px-6 flex justify-between items-center z-50 rounded-t-xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-col items-center p-2 transition-all duration-200 rounded-2xl ${
              isActive ? 'text-primary bg-primary/5' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className={`p-2 rounded-full transition-all ${isActive ? 'bg-primary/10' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {item.badge > 0 && (
                <div className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </div>
              )}
            </div>
            <span className={`text-[10px] font-medium mt-1 transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
