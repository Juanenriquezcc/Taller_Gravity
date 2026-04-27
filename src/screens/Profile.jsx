import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Clock, Heart, ChevronRight, LogOut, RotateCcw } from 'lucide-react';
import { foodItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function Profile() {
  const navigate = useNavigate();
  const { orderHistory, favoriteIds, addToCart } = useCart();
  const [activePanel, setActivePanel] = useState('history');

  const menuItems = [
    { icon: Clock, label: 'Order History', key: 'history' },
    { icon: Heart, label: 'Saved Restaurants', key: 'saved' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const savedItems = useMemo(
    () => foodItems.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds],
  );

  const lastOrder = orderHistory[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8e0dc_0%,#fcf7f6_24%,#fbf9f9_52%,#f7f4f3_100%)] pb-32">
      <div className="pt-16 px-page flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(233,94,80,0.18)]">
          <User size={40} className="text-primary" />
        </div>
        <h1 className="text-headline-md font-bold mb-1">John Doe</h1>
        <p className="text-body-md text-on-surface-variant mb-8">john.doe@example.com</p>

        <div className="w-full bg-white rounded-3xl p-2 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActivePanel(item.key)}
              className={`w-full flex items-center p-4 transition-colors rounded-2xl ${activePanel === item.key ? 'bg-surface-container-low' : 'hover:bg-surface-container-low'}`}
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface mr-4">
                <item.icon size={20} />
              </div>
              <span className="font-headline font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight size={20} className="text-on-surface-variant" />
            </button>
          ))}
        </div>

        <div className="w-full mt-6 bg-white rounded-3xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          {activePanel === 'history' && (
            <div>
              <h2 className="text-headline-sm font-bold mb-3">Recent orders</h2>
              {lastOrder ? (
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="font-semibold text-on-surface mb-1">{lastOrder.items.length} items delivered</p>
                  <p className="text-body-sm text-on-surface-variant mb-3">Total: ${lastOrder.total.toFixed(2)}</p>
                  <button
                    type="button"
                    onClick={() => lastOrder.items.forEach((item) => addToCart(item, item.quantity))}
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-headline font-semibold"
                  >
                    <RotateCcw size={16} />
                    Reorder
                  </button>
                </div>
              ) : (
                <p className="text-body-sm text-on-surface-variant">Your orders will appear here after checkout.</p>
              )}
            </div>
          )}

          {activePanel === 'saved' && (
            <div>
              <h2 className="text-headline-sm font-bold mb-3">Saved items</h2>
              {savedItems.length ? (
                <div className="flex flex-col gap-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-surface-container-low rounded-2xl p-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-on-surface truncate">{item.name}</p>
                        <p className="text-xs text-on-surface-variant">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="text-primary text-sm font-semibold"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-sm text-on-surface-variant">Tap the heart icon on products to save them here.</p>
              )}
            </div>
          )}

          {activePanel === 'settings' && (
            <div>
              <h2 className="text-headline-sm font-bold mb-3">Account settings</h2>
              <div className="space-y-3 text-body-sm text-on-surface-variant">
                <p>Delivery address: Canada</p>
                <p>Payment method: Visa ending in 4281</p>
                <p>Notifications: Enabled for order updates</p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full mt-8 bg-error/10 text-error py-4 rounded-full font-headline font-semibold text-lg flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}
