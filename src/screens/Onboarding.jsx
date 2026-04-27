import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8e0dc_0%,#fcf7f6_44%,#fbf9f9_100%)] flex flex-col items-center justify-between p-page overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,#f3b9ae_0%,rgba(243,185,174,0.18)_42%,transparent_75%)] pointer-events-none" />
      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        <div className="w-full aspect-square rounded-full bg-secondary-container mb-8 overflow-hidden relative shadow-[0_18px_40px_rgba(0,0,0,0.08)] animate-soft-float">
           <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious food" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2 mb-4 text-primary text-sm font-semibold uppercase tracking-[0.22em]">
          <Star size={14} className="fill-primary" />
          Entrega premium
        </div>
        <h1 className="text-headline-lg text-center mb-4 text-on-surface animate-fade-up">
          Comida premium<br />en tu puerta
        </h1>
        <p className="text-body-lg text-on-surface-variant text-center max-w-[280px] animate-fade-up" style={{ animationDelay: '0.08s' }}>
          Descubre platos gourmet de los mejores restaurantes, entregados con rapidez.
        </p>
        <div className="w-full mt-6 grid grid-cols-3 gap-3 max-w-sm animate-fade-up" style={{ animationDelay: '0.14s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <Truck size={18} className="mx-auto mb-2 text-primary" />
            <span className="text-[11px] text-on-surface-variant">Rápido</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <ShieldCheck size={18} className="mx-auto mb-2 text-primary" />
            <span className="text-[11px] text-on-surface-variant">Confiable</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <Star size={18} className="mx-auto mb-2 text-primary fill-primary" />
            <span className="text-[11px] text-on-surface-variant">Mejor valorado</span>
          </div>
        </div>
      </div>
      
      <div className="w-full pb-8">
        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-primary text-white py-4 rounded-full font-headline font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_8px_16px_-4px_rgba(233,94,80,0.4)] transition-all active:scale-[0.98] hover:shadow-[0_12px_24px_-6px_rgba(233,94,80,0.48)]"
        >
          Empezar ahora
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
