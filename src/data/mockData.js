export const categories = [
  { id: 1, name: 'Pizza', icon: 'Pizza' },
  { id: 2, name: 'Burger', icon: 'Sandwich' },
  { id: 3, name: 'Sushi', icon: 'Fish' },
  { id: 4, name: 'Salad', icon: 'Leaf' },
  { id: 5, name: 'Dessert', icon: 'Cake' },
];

export const foodItems = [
  {
    id: 'biryani',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken pieces, blended with authentic spices and herbs.',
    price: 15.99,
    rating: 4.8,
    reviews: 245,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop',
    categoryId: 1,
  },
  {
    id: 'pizza-margherita',
    name: 'Classic Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil on a crispy crust.',
    price: 12.50,
    rating: 4.5,
    reviews: 180,
    deliveryTime: '30-40 min',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1974&auto=format&fit=crop',
    categoryId: 1,
  },
  {
    id: 'cheeseburger',
    name: 'Double Smash Cheeseburger',
    description: 'Two smashed beef patties, cheddar cheese, pickles, and our signature sauce.',
    price: 10.99,
    rating: 4.9,
    reviews: 530,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
    categoryId: 2,
  },
];
