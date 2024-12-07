import { useState, useEffect } from 'react';
import { Product } from '@/types';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(currentWishlist => {
      if (!currentWishlist.some(item => item.id === product.id)) {
        return [...currentWishlist, product];
      }
      return currentWishlist.filter(item => item.id !== product.id);
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(currentWishlist => currentWishlist.filter(item => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some(item => item.id === id);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};