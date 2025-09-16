# Tarote 기술 구현 가이드

## 🏗️ 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + CSS Modules
- **State**: Zustand
- **Testing**: Vitest + Playwright

## 📐 아키텍처 패턴
- **FSD 적용**: Feature-Sliced Design
- **타입 안전성**: TypeScript strict mode
- **상태 관리**: 페이지별 독립적 Zustand store

## 🔗 주요 기능
- **tarotReading**: 질문 및 카드 선택
- **tarotResult**: AI 해석 결과 표시

## 📋 개발 규칙
1. **PR 크기**: 200줄 내외
2. **테스트**: 핵심 로직 100% 커버리지
3. **문서화**: Option B 구조 준수
4. **타입**: 모든 API 응답 타입 정의

## 🚀 배포
- **환경**: Vercel
- **도메인**: TBD

---
📍 기능별 세부 가이드는 각 feature 디렉토리의 AGENT-GUIDE.md를 참조하세요.