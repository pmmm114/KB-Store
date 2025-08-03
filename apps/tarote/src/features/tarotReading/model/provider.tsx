'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';
import {
  createTarotReadingStore,
  type TarotReadingStore,
  type TarotReadingState,
} from './store';

const TarotReadingContext = createContext<TarotReadingStore | null>(null);

interface TarotReadingProviderProps {
  children: ReactNode;
  initialState?: Partial<TarotReadingState>;
}

export const TarotReadingProvider = ({
  children,
  initialState,
}: TarotReadingProviderProps) => {
  const storeRef = useRef<TarotReadingStore>();

  if (!storeRef.current) {
    storeRef.current = createTarotReadingStore(initialState);
  }

  return (
    <TarotReadingContext.Provider value={storeRef.current}>
      {children}
    </TarotReadingContext.Provider>
  );
};

export const useTarotReading = () => {
  const store = useContext(TarotReadingContext);
  if (!store) {
    throw new Error('useTarotReading must be used within TarotReadingProvider');
  }
  return useStore(store);
};
