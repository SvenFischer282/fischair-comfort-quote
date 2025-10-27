import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

interface QuoteContextType {
  items: Product[];
  addToQuote: (product: Product) => void;
  removeFromQuote: (productId: string) => void;
  clearQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToQuote = (product: Product) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromQuote = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearQuote = () => {
    setItems([]);
  };

  return (
    <QuoteContext.Provider value={{ items, addToQuote, removeFromQuote, clearQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};
