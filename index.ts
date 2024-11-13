import { BaseProduct, Electronics, Clothing, Book, CartItem } from './types';
import { findProduct, filterByPrice, addToCart, calculateTotal } from './functions';

// Тестові дані для товарів
const electronics: Electronics[] = [
  { id: 1, name: "Телефон", price: 10000, category: 'electronics', brand: 'BrandA', warranty: '1 year' }
];
const clothing: Clothing[] = [
  { id: 2, name: "Куртка", price: 2000, category: 'clothing', size: 'L', material: 'Cotton' }
];
const books: Book[] = [
  { id: 3, name: "Книга", price: 300, category: 'book', author: 'AuthorA', publisher: 'PublisherA' }
];

// Приклад використання функцій
const foundPhone = findProduct(electronics, 1);
console.log("Знайдений товар:", foundPhone);

const filteredClothing = filterByPrice(clothing, 2500);
console.log("Товари до 2500 грн:", filteredClothing);

let cart: CartItem<BaseProduct>[] = [];
cart = addToCart(cart, electronics[0], 1);
cart = addToCart(cart, books[0], 2);

const total = calculateTotal(cart);
console.log("Загальна вартість кошика:", total);