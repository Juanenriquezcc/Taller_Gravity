import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="max-w-md mx-auto min-h-screen bg-background relative shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
