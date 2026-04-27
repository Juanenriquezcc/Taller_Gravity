import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, Minus, Plus } from 'lucide-react';
import { foodItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = foodItems.find(item => item.id === id);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Image */}
      <div className="relative h-72 rounded-b-[40px] overflow-hidden shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-page bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-page -mt-6 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-headline-md text-on-surface font-bold leading-tight max-w-[75%]">{product.name}</h1>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg text-primary font-bold text-sm">
              <Star size={14} className="fill-primary" />
              {product.rating}
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <Clock size={16} className="text-primary" />
              {product.deliveryTime}
            </div>
          </div>

          <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-headline-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-surface-container rounded-full p-1">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-on-surface"
              >
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-headline font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center bg-primary rounded-full shadow-sm text-white"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-page border-t border-surface-variant rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-full font-headline font-semibold text-lg shadow-[0_8px_16px_-4px_rgba(233,94,80,0.4)] transition-transform active:scale-[0.98]"
        >
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
