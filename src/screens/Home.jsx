import { Search, Filter, Star, Clock } from 'lucide-react';
import { categories, foodItems } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-page pt-12">
        <p className="text-body-md text-on-surface-variant mb-1">Good Morning 👋</p>
        <h1 className="text-headline-md text-on-surface mb-6">What would you like to eat?</h1>

        {/* Search */}
        <div className="flex gap-4 mb-section">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <Search className="text-on-surface-variant mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search for food..." 
              className="bg-transparent border-none outline-none flex-1 text-body-md"
            />
          </div>
          <button className="bg-primary text-white p-3 rounded-full shadow-sm flex items-center justify-center w-12 h-12">
            <Filter size={20} />
          </button>
        </div>

        {/* Categories */}
        <h2 className="text-headline-sm mb-4">Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-page px-page scrollbar-hide mb-section">
          {categories.map((cat, idx) => (
            <button 
              key={cat.id} 
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                idx === 0 ? 'bg-primary text-white shadow-sm' : 'bg-white text-on-surface shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <span className="text-sm font-medium font-headline">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Popular Food */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-headline-sm">Popular Now</h2>
          <button className="text-primary text-sm font-medium font-headline">See All</button>
        </div>
        
        <div className="flex flex-col gap-grid">
          {foodItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/product/${item.id}`)}
              className="bg-white rounded-2xl p-3 flex gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 py-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">{item.name}</h3>
                <p className="text-body-sm text-on-surface-variant line-clamp-1 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-headline font-bold text-primary">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 text-xs font-medium bg-surface-container-low px-2 py-1 rounded-md">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
