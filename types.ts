// Основний тип товару
export type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
    // Додаткові базові поля
  };
  
  // Специфічний тип для електроніки
  export type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warranty: string; // гарантія, наприклад, 1 рік
  };
  
  // Специфічний тип для одягу
  export type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
  };
  
  // Специфічний тип для книг
  export type Book = BaseProduct & {
    category: 'book';
    author: string;
    publisher: string;
  };
  
  // Тип для елемента кошика
  export type CartItem<T extends BaseProduct> = {
    product: T;
    quantity: number;
  };
  