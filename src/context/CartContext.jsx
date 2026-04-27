/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFavorite = (productId) => {
    setFavoriteIds(prev => (
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    ));
  };

  const isFavorite = (productId) => favoriteIds.includes(productId);

  const placeOrder = () => {
    if (cartItems.length === 0) {
      return null;
    }

    const order = {
      id: `order-${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString(),
    };

    setOrderHistory(prev => [order, ...prev]);
    clearCart();

    return order;
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      favoriteIds,
      toggleFavorite,
      isFavorite,
      orderHistory,
      placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
};
