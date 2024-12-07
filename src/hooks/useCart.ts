import { useState, useEffect } from 'react';
import { CartItem } from '@/types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(
        cartItem => cartItem.id === item.id && cartItem.talla === item.talla && cartItem.color === item.color
      );

      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id && cartItem.talla === item.talla && cartItem.color === item.color
            ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id: number, talla: string, color: string) => {
    setCart(currentCart => currentCart.filter(
      item => !(item.id === id && item.talla === talla && item.color === color)
    ));
  };

  const updateQuantity = (id: number, talla: string, color: string, change: number) => {
    setCart(currentCart => currentCart.map(item => {
      if (item.id === id && item.talla === talla && item.color === color) {
        const newQuantity = item.cantidad + change;
        return newQuantity > 0 ? { ...item, cantidad: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const totalCartAmount = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, totalCartAmount };
};