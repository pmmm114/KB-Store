# TarotReading Feature 기술 지침

## 🎯 기술 구현 원칙
- **페이지 스코프**: `/reading` 페이지 내부에서만 동작
- **상태 격리**: 독립적인 Zustand store 사용
- **데이터 전달**: URL params로 `/result`에 전달

## 📁 구현 구조
```
src/features/tarotReading/
├── index.ts               # Public API
├── model/
│   ├── store.ts           # Zustand store
│   └── types.ts           # 타입 정의
├── ui/
│   ├── TarotReadingFlow/  # 메인 플로우
│   ├── QuestionStep/      # 질문 입력
│   └── SelectStep/        # 카드 선택
└── lib/
    ├── validation.ts      # 입력값 검증
    └── navigation.ts      # 페이지 이동
```

## 🔧 상태 관리
```typescript
interface TarotReadingState {
  currentStep: 'question' | 'select';
  question: string;
  selectedCards: number[];
  isSubmitting: boolean;
  validationError: string | null;

  // Actions
  setStep: (step) => void;
  nextStep: () => void;
  setQuestion: (question) => void;
  setSelectedCards: (cards) => void;
  submitAndNavigate: () => Promise<void>;
}
```

## 🌐 데이터 전달
URL params 형식:
```
/result?q=encoded_question&cards=1,15,42&ts=timestamp
```