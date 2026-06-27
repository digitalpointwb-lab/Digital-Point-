import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'INR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (price?: string | number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE_INR_TO_USD = 0.012; // 1 INR = 0.012 USD
const EXCHANGE_RATE_USD_TO_INR = 83.33; // 1 USD = 83.33 INR

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('preferred_currency');
      return (saved === 'USD' || saved === 'INR') ? saved : 'INR';
    } catch (e) {
      return 'INR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('preferred_currency', currency);
    } catch (e) {
      console.warn("localStorage is not available");
    }
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'INR' ? 'USD' : 'INR');
  };

  const formatPrice = (priceInput?: string | number) => {
    if (priceInput === undefined || priceInput === null) return 'Price on Request';
    
    let numericValue: number;
    let originalCurrency: Currency = 'INR';

    if (typeof priceInput === 'number') {
      numericValue = priceInput;
      // Assume number inputs are originally INR for now since calculation uses INR
    } else {
      // Remove non-numeric characters except decimals
      numericValue = parseFloat(priceInput.replace(/[^0-9.]/g, ''));
      if (isNaN(numericValue) || numericValue === 0) return priceInput || 'Price on Request';
      
      originalCurrency = priceInput.includes('$') ? 'USD' : 'INR';
    }
    
    // Convert to target currency
    let targetValue = numericValue;
    if (originalCurrency === 'INR' && currency === 'USD') {
      targetValue = numericValue * EXCHANGE_RATE_INR_TO_USD;
    } else if (originalCurrency === 'USD' && currency === 'INR') {
      targetValue = numericValue * EXCHANGE_RATE_USD_TO_INR;
    }

    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(targetValue);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(targetValue);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
