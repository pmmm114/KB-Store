# TarotResult Feature 기술 지침

## 🎯 구현 아키텍처
- **페이지 스코프**: `/result` 페이지 전용
- **데이터 입력**: URL params에서 question, selectedCards 수신
- **비동기 처리**: AI 요청 + 폴링 시스템
- **상태 관리**: 독립적인 Zustand store

## 📁 구현 구조
```
src/features/tarotResult/
├── index.ts
├── model/
│   ├── store.ts           # 비동기 상태 관리
│   └── types.ts
├── api/
│   ├── requests.ts        # AI 요청 API
│   └── types.ts
├── ui/
│   ├── TarotResultFlow/   # 메인 플로우
│   ├── LoadingStep/       # 로딩 UI
│   ├── LoginPromptStep/   # 로그인 유도
│   ├── ResultDisplayStep/ # 결과 표시
│   └── ErrorStep/         # 에러 처리
└── lib/
    ├── urlParser.ts       # URL 파싱
    └── polling.ts         # 폴링 로직
```

## 🔧 핵심 구현 요소

### 상태 관리
```typescript
interface TarotResultState {
  // 초기 데이터
  initialData: { question: string; selectedCards: number[] } | null;

  // AI 요청 상태
  requestId: string | null;
  requestStatus: 'idle' | 'creating' | 'pending' | 'completed' | 'access_denied' | 'failed';

  // 결과 데이터
  interpretation: TarotInterpretation | null;

  // 폴링 관리
  pollingInterval: NodeJS.Timeout | null;
}
```

### URL 파싱
```
/result?q=encoded_question&cards=1,15,42&ts=timestamp
```

### API 엔드포인트
- `POST /api/requests`: AI 요청 생성
- `GET /api/requests/:id`: 상태 조회 (2초마다)

## 🔄 폴링 전략
- 간격: 2초
- 최대 시간: 5분
- 에러 시 재시도: 3회