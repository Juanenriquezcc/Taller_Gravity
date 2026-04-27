import { useMemo } from 'react';
import { Search, Filter, Star, Heart, Plus, Clock3, ShieldCheck, Truck, BadgePercent } from 'lucide-react';
import { categories, foodItems } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const navigate = useNavigate();
  const {
    cartCount,
    addToCart,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    toggleFavorite,
    isFavorite,
  } = useCart();

  const visibleItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return foodItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || String(item.categoryId) === selectedCategory;
      const matchesQuery = !normalizedQuery || [item.name, item.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const allCategories = [{ id: 'all', name: 'All' }, ...categories];
  const quickHighlights = [
    { icon: Truck, title: 'Fast delivery', description: 'Average arrival in under 30 min' },
    { icon: ShieldCheck, title: 'Trusted kitchens', description: 'Rated 4.6+ by real customers' },
    { icon: BadgePercent, title: 'Fresh deals', description: 'Limited offers updated daily' },
  ];

  const featuredItems = visibleItems.slice(0, 2);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8e0dc_0%,#fcf7f6_24%,#fbf9f9_52%,#f7f4f3_100%)] pb-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,#f3b9ae_0%,rgba(243,185,174,0.12)_45%,transparent_75%)] pointer-events-none" />

      {/* Header */}
      <div className="relative p-page pt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-body-md text-on-surface-variant mb-1">Good Morning 👋</p>
            <h1 className="text-headline-md text-on-surface mb-1">What would you like to eat?</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative w-12 h-12 rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex items-center justify-center text-on-surface"
          >
            <span className="text-sm font-bold">{cartCount}</span>
            <span className="sr-only">Go to cart</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-section">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <Search className="text-on-surface-variant mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search for food..." 
              className="bg-transparent border-none outline-none flex-1 text-body-md"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-primary text-white p-3 rounded-full shadow-sm flex items-center justify-center w-12 h-12"
          >
            <Filter size={20} />
          </button>
        </div>

        <section className="mb-section">
          <div className="bg-[linear-gradient(135deg,#1d1716_0%,#3d2521_38%,#e95e50_100%)] text-white rounded-[32px] p-5 shadow-[0_18px_40px_rgba(233,94,80,0.22)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="max-w-[65%]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70 mb-2">Today&apos;s offer</p>
                <h2 className="text-headline-sm mb-2 text-white">Free delivery on selected meals</h2>
                <p className="text-body-sm text-white/80 mb-4">Save time with quick delivery and curated dishes near you.</p>
                <button type="button" className="bg-white text-on-surface px-4 py-3 rounded-full font-headline font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
                  Explore deals
                </button>
              </div>
              <div className="w-24 h-24 rounded-[28px] bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                <Clock3 size={36} className="text-white" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-section grid grid-cols-3 gap-3">
          {quickHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="bg-white rounded-3xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] border border-white/70">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-on-surface mb-1 leading-tight">{item.title}</h3>
                <p className="text-[11px] leading-4 text-on-surface-variant">{item.description}</p>
              </div>
            );
          })}
        </section>

        {/* Categories */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-headline-sm">Categories</h2>
          <span className="text-xs text-on-surface-variant">{allCategories.length} options</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-page px-page scrollbar-hide mb-section">
          {allCategories.map((cat) => {
            const isActive = selectedCategory === String(cat.id);

            return (
              <button 
                key={cat.id} 
                type="button"
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                  isActive ? 'bg-primary text-white shadow-[0_10px_20px_rgba(233,94,80,0.22)] border-primary/30' : 'bg-white text-on-surface shadow-[0_2px_8px_rgba(0,0,0,0.02)] border-transparent'
                }`}
              >
                <span className="text-sm font-medium font-headline">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Popular Food */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-headline-sm">Popular Now</h2>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-primary text-sm font-medium font-headline"
          >
            See All
          </button>
        </div>

        <section className="mb-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-sm">Featured picks</h2>
            <span className="text-xs text-on-surface-variant">Handpicked for today</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featuredItems.map((item) => (
              <button
                key={`featured-${item.id}`}
                type="button"
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-[28px] p-3 text-left shadow-[0_6px_18px_rgba(0,0,0,0.04)] border border-white/70"
              >
                <img src={item.image} alt={item.name} className="w-full h-28 rounded-2xl object-cover mb-3" />
                <h3 className="font-headline font-semibold text-sm text-on-surface mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-[11px] text-on-surface-variant mb-2 line-clamp-1">{item.deliveryTime} delivery</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">${item.price.toFixed(2)}</span>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-surface-container-low text-on-surface-variant">Top rated</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        
        <div className="flex flex-col gap-grid">
          {visibleItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              <p className="font-headline font-semibold text-on-surface mb-2">No matches found</p>
              <p className="text-body-sm text-on-surface-variant mb-4">Try a different search or category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-5 py-3 rounded-full font-headline font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : visibleItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`/product/${item.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              className="bg-white rounded-2xl p-3 flex gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-left cursor-pointer"
            >
              <div className="relative shrink-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover ring-1 ring-black/5" />
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isFavorite(item.id) ? 'bg-primary text-white' : 'bg-white text-on-surface'}`}
                  aria-label={`Toggle favorite for ${item.name}`}
                >
                  <Heart size={14} className={isFavorite(item.id) ? 'fill-white' : ''} />
                </button>
              </div>
              <div className="flex-1 py-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">{item.name}</h3>
                <p className="text-body-sm text-on-surface-variant line-clamp-1 mb-2">{item.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-headline font-bold text-primary">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 text-xs font-medium bg-surface-container-low px-2 py-1 rounded-md">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mb-2">
                  <span className="px-2 py-1 rounded-full bg-surface-container-low">{item.deliveryTime}</span>
                  <span className="px-2 py-1 rounded-full bg-surface-container-low">{item.reviews} reviews</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Tap for details</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(item, 1);
                      navigate('/cart');
                    }}
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(233,94,80,0.35)]"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
