// 1. Базова структура для різних типів контенту

// Базовий інтерфейс для всього контенту
interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  }
  
  // Інтерфейс для статей
  interface Article extends BaseContent {
    title: string;
    content: string;
    author: string;
  }
  
  // Інтерфейс для продуктів
  interface Product extends BaseContent {
    name: string;
    price: number;
    description: string;
    stock: number;
  }
  
  // Generic тип для операцій з контентом
  type ContentOperations<T extends BaseContent> = {
    create: (content: T) => T;
    read: (id: string) => T | null;
    update: (id: string, updates: Partial<T>) => T | null;
    delete: (id: string) => boolean;
  };
  

//   2. Система управління правами доступу

  // Визначення базових ролей та прав
type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// Система контролю доступу для різних типів контенту
type AccessControl<T extends BaseContent> = {
  role: Role;
  permissions: Permission;
  canPerform: (action: keyof Permission, content: T) => boolean;
};

// Приклад реалізації
const articleAccessControl: AccessControl<Article> = {
  role: 'editor',
  permissions: {
    create: true,
    read: true,
    update: true,
    delete: false,
  },
  canPerform(action, content) {
    return this.permissions[action];
  },
};


// 3. Система валідації


// Базовий тип для валідатора
type Validator<T> = {
    validate: (data: T) => ValidationResult;
  };
  
  type ValidationResult = {
    isValid: boolean;
    errors?: string[];
  };
  
  // Валідатор для статей
  const articleValidator: Validator<Article> = {
    validate(article) {
      const errors: string[] = [];
      if (!article.title) errors.push('Title is required');
      if (!article.content) errors.push('Content is required');
      return { isValid: errors.length === 0, errors };
    },
  };
  
  // Валідатор для продуктів
  const productValidator: Validator<Product> = {
    validate(product) {
      const errors: string[] = [];
      if (!product.name) errors.push('Name is required');
      if (product.price < 0) errors.push('Price must be positive');
      return { isValid: errors.length === 0, errors };
    },
  };
  

//   4. Система версіонування контенту


  // Тип для версіонування контенту
type Versioned<T extends BaseContent> = T & {
    version: number;
    history: T[];
  };
  
  // Приклад використання
  const versionedArticle: Versioned<Article> = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'First Article',
    content: 'This is the content of the first article',
    author: 'Author Name',
    version: 1,
    history: [],
  };
  
  // Метод для створення нової версії
  function createNewVersion<T extends BaseContent>(content: Versioned<T>, updates: Partial<T>): Versioned<T> {
    const newVersion = { ...content, ...updates, version: content.version + 1 };
    content.history.push({ ...content });
    return newVersion;
  }
  