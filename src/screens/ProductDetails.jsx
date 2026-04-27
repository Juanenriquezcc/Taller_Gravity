import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, Minus, Plus, Heart } from 'lucide-react';
import { foodItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Mediano');
  
  const product = foodItems.find(item => item.id === id);

  if (!product) return <div>Producto no encontrado</div>;

  const sizeOptions = [
    { label: 'Pequeño', multiplier: 0.9 },
    { label: 'Mediano', multiplier: 1 },
    { label: 'Grande', multiplier: 1.15 },
  ];

  const activeSize = sizeOptions.find(option => option.label === selectedSize) ?? sizeOptions[1];
  const adjustedPrice = product.price * activeSize.multiplier;

  const handleAddToCart = () => {
    addToCart({ ...product, price: adjustedPrice, selectedSize }, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8e0dc_0%,#fcf7f6_24%,#fbf9f9_52%,#f7f4f3_100%)] pb-32">
      {/* Hero Image */}
      <div className="relative h-72 rounded-b-[40px] overflow-hidden shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-page bg-white/90 backdrop-blur-md p-3 rounded-full text-on-surface shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-12 right-page p-3 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${isFavorite(product.id) ? 'bg-primary text-white' : 'bg-white/90 text-on-surface'}`}
          aria-label={`Marcar ${product.name} como favorito`}
        >
          <Heart size={24} className={isFavorite(product.id) ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-page -mt-6 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-white/70">
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

          <div className="mb-6">
            <p className="text-sm font-semibold text-on-surface-variant mb-3">Tamaño</p>
            <div className="flex gap-2">
              {sizeOptions.map((size) => {
                const isActive = selectedSize === size.label;

                return (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setSelectedSize(size.label)}
                    className={`flex-1 py-3 rounded-full font-headline font-semibold transition-colors ${isActive ? 'bg-primary text-white shadow-[0_8px_16px_-4px_rgba(233,94,80,0.32)]' : 'bg-surface-container-low text-on-surface'}`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-sm font-semibold text-on-surface-variant block mb-1">Precio</span>
              <span className="text-headline-lg font-bold text-primary">${adjustedPrice.toFixed(2)}</span>
            </div>
            
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
          Agregar al carrito - ${(adjustedPrice * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
