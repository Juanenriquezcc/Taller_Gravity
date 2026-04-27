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
    { icon: Clock, label: 'Historial', key: 'history' },
    { icon: Heart, label: 'Guardados', key: 'saved' },
    { icon: Settings, label: 'Ajustes', key: 'settings' },
  ];

  const savedItems = useMemo(
    () => foodItems.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds],
  );

  const lastOrder = orderHistory[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8e0dc_0%,#fcf7f6_24%,#fbf9f9_52%,#f7f4f3_100%)] pb-32">
      <div className="pt-16 px-page flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[linear-gradient(135deg,#ffb8a8_0%,#ea5a47_100%)] flex items-center justify-center mb-4 shadow-[0_12px_30px_rgba(233,94,80,0.24)] border-4 border-white/80">
          <User size={40} className="text-white" />
        </div>
        <h1 className="text-headline-md font-bold mb-1">Juan Pérez</h1>
        <p className="text-body-md text-on-surface-variant mb-2">juan.perez@correo.com</p>
        <p className="text-xs text-on-surface-variant mb-8 px-3 py-1 rounded-full bg-white/80 shadow-sm">Miembro premium desde 2026</p>

        <div className="w-full grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-3xl p-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-lg font-bold text-primary">{orderHistory.length}</p>
            <p className="text-[11px] text-on-surface-variant">Pedidos</p>
          </div>
          <div className="bg-white rounded-3xl p-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-lg font-bold text-primary">{favoriteIds.length}</p>
            <p className="text-[11px] text-on-surface-variant">Guardados</p>
          </div>
          <div className="bg-white rounded-3xl p-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-lg font-bold text-primary">4.9</p>
            <p className="text-[11px] text-on-surface-variant">Valoración</p>
          </div>
        </div>

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
              <h2 className="text-headline-sm font-bold mb-3">Pedidos recientes</h2>
              {lastOrder ? (
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="font-semibold text-on-surface mb-1">{lastOrder.items.length} productos entregados</p>
                  <p className="text-body-sm text-on-surface-variant mb-3">Total: ${lastOrder.total.toFixed(2)}</p>
                  <button
                    type="button"
                    onClick={() => lastOrder.items.forEach((item) => addToCart(item, item.quantity))}
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-headline font-semibold"
                  >
                    <RotateCcw size={16} />
                    Repetir pedido
                  </button>
                </div>
              ) : (
                <p className="text-body-sm text-on-surface-variant">Tus pedidos aparecerán aquí después de finalizar una compra.</p>
              )}
            </div>
          )}

          {activePanel === 'saved' && (
            <div>
              <h2 className="text-headline-sm font-bold mb-3">Productos guardados</h2>
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
                        Ver
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-sm text-on-surface-variant">Toca el ícono de corazón en un producto para guardarlo aquí.</p>
              )}
            </div>
          )}

          {activePanel === 'settings' && (
            <div>
              <h2 className="text-headline-sm font-bold mb-3">Configuración de la cuenta</h2>
              <div className="space-y-3 text-body-sm text-on-surface-variant">
                <p>Dirección de entrega: Canadá</p>
                <p>Método de pago: Visa terminada en 4281</p>
                <p>Notificaciones: activadas para actualizaciones de pedidos</p>
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
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
