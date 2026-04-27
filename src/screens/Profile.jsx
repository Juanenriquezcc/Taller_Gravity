import { User, Settings, Clock, Heart, ChevronRight, LogOut } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { icon: Clock, label: 'Order History' },
    { icon: Heart, label: 'Saved Restaurants' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="pt-16 px-page flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <User size={40} className="text-primary" />
        </div>
        <h1 className="text-headline-md font-bold mb-1">John Doe</h1>
        <p className="text-body-md text-on-surface-variant mb-8">john.doe@example.com</p>

        <div className="w-full bg-white rounded-3xl p-2 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full flex items-center p-4 hover:bg-surface-container-low transition-colors rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface mr-4">
                <item.icon size={20} />
              </div>
              <span className="font-headline font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight size={20} className="text-on-surface-variant" />
            </button>
          ))}
        </div>

        <button className="w-full mt-8 bg-error/10 text-error py-4 rounded-full font-headline font-semibold text-lg flex items-center justify-center gap-2">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}
