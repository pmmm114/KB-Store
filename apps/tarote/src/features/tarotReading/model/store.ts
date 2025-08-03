import { createStore } from 'zustand/vanilla';

export type TarotStep = 'question' | 'select';

export interface TarotCard {
  id: number;
  name: string;
}

export interface TarotReadingState {
  // 플로우 관리
  currentStep: TarotStep;

  // 데이터
  question: string;
  selectedCards: number[];

  // UI 상태
  isLoading: boolean;
  error: string | null;

  // 액션들
  setStep: (step: TarotStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setQuestion: (question: string) => void;
  setSelectedCards: (cards: number[]) => void;
  resetReading: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export type TarotReadingStore = ReturnType<typeof createTarotReadingStore>;

export const createTarotReadingStore = (
  initState?: Partial<TarotReadingState>,
) => {
  return createStore<TarotReadingState>((set, get) => ({
    // 초기 상태
    currentStep: 'question',
    question: '',
    selectedCards: [],
    isLoading: false,
    error: null,
    ...initState,

    // 액션들
    setStep: (step: TarotStep) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep } = get();
      if (currentStep === 'question') {
        set({ currentStep: 'select' });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      if (currentStep === 'select') {
        set({ currentStep: 'question' });
      }
    },

    setQuestion: (question: string) => set({ question }),
    setSelectedCards: (cards: number[]) => set({ selectedCards: cards }),
    resetReading: () =>
      set({
        currentStep: 'question',
        question: '',
        selectedCards: [],
        isLoading: false,
        error: null,
      }),
    setError: (error: string | null) => set({ error }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
  }));
};
