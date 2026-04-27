import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-page">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full aspect-square rounded-full bg-secondary-container mb-8 overflow-hidden relative shadow-sm">
           <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious food" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-headline-lg text-center mb-4 text-on-surface">
          Premium Food<br />at Your Doorstep
        </h1>
        <p className="text-body-lg text-on-surface-variant text-center max-w-[280px]">
          Discover the best gourmet meals from top restaurants, delivered fast.
        </p>
      </div>
      
      <div className="w-full pb-8">
        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-primary text-white py-4 rounded-full font-headline font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_8px_16px_-4px_rgba(233,94,80,0.4)] transition-transform active:scale-[0.98]"
        >
          Get Started
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
