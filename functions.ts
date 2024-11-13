import { BaseProduct, CartItem } from './types';

// Функція для пошуку товару за id
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find(product => product.id === id);
};

// Функція для фільтрації товарів за ціною
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter(product => product.price <= maxPrice);
};

// Функція для додавання товару в кошик
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  return cart;
};

// Функція для підрахунку загальної вартості кошика
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
