import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, cartTotal } = useCart();
  
  const deliveryFee = cartTotal > 0 ? 2.99 : 0;
  const total = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="pt-12 pb-6 px-page flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full bg-white shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-headline-md font-bold">My Cart</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Cart Items */}
      <div className="px-page flex flex-col gap-4 mb-section">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate('/home')} className="mt-4 text-primary font-bold">Go back to menu</button>
          </div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 py-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1 text-sm">{item.name}</h3>
                <span className="font-headline font-bold text-primary block mb-2">${item.price.toFixed(2)}</span>
                
                <div className="flex items-center gap-4">
                   <div className="flex items-center bg-surface-container rounded-full p-1 max-w-fit">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-on-surface"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-headline font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center bg-primary rounded-full shadow-sm text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="px-page">
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <h3 className="font-headline font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-3 text-on-surface-variant">
              <span>Subtotal</span>
              <span className="text-on-surface font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-on-surface-variant">
              <span>Delivery Fee</span>
              <span className="text-on-surface font-medium">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-surface-variant pt-4 flex justify-between">
              <span className="font-headline font-bold text-lg">Total</span>
              <span className="font-headline font-bold text-lg text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Checkout */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-page border-t border-surface-variant pb-safe pt-4 px-6 z-40 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
          <button className="w-full bg-primary text-white py-4 rounded-full font-headline font-semibold text-lg shadow-[0_8px_16px_-4px_rgba(233,94,80,0.4)] transition-transform active:scale-[0.98]">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
