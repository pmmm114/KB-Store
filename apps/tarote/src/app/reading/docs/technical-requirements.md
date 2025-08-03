# Reading - 기술적 요구사항

## FSD 아키텍처 구조

```
src/
├── app/reading/               # App layer
├── pages/TarotReadingPage/    # Pages layer
├── widgets/TarotReadingFlow/  # Widgets layer
├── features/tarot-reading/    # Features layer
├── entities/                  # Entities layer
│   ├── tarot-card/
│   └── question/
└── shared/                    # Shared layer
```

## 상태 관리

### Zustand Store 구조

```typescript
interface TarotReadingState {
  // 플로우 관리
  currentStep: 'question' | 'select' | 'result';

  // 데이터
  question: string;
  selectedCards: Card[];
  result: TarotResult | null;

  // UI 상태
  isLoading: boolean;
  error: string | null;

  // 액션들
  setStep: (step: Step) => void;
  nextStep: () => void;
  prevStep: () => void;
  setQuestion: (question: string) => void;
  setSelectedCards: (cards: Card[]) => void;
  setResult: (result: TarotResult) => void;
  resetReading: () => void;
}
```

### 데이터 지속성

- **localStorage**: Zustand Persist 미들웨어 사용
- **세션 관리**: 브라우저 새로고침 시에도 상태 유지
- **만료 처리**: 24시간 후 자동 세션 만료

## 컴포넌트 구조

### Widget Layer

- **TarotReadingFlow**: 전체 플로우 관리 및 단계별 렌더링

### Feature Layer

- **QuestionStep**: 질문 입력 기능
- **SelectStep**: 카드 선택 기능
- **ResultStep**: 결과 표시 기능

### Entity Layer

- **Question**: 질문 엔티티 및 유효성 검사
- **TarotCard**: 카드 엔티티 및 속성 관리

### Shared Layer

- **StepManager**: 단계 전환 로직
- **Button, Input**: 공통 UI 컴포넌트

## API 연동

### AI 해석 API

```typescript
interface TarotAnalysisRequest {
  question: string;
  selectedCards: Card[];
}

interface TarotAnalysisResponse {
  interpretation: string;
  cardMeanings: string[];
  advice: string;
}
```
