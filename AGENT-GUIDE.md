# KB-Store Development Guide

## 🛠️ 개발 환경
- **Node.js**: v18+
- **Package Manager**: pnpm
- **Framework**: Next.js 15
- **TypeScript**: Strict mode

## 📐 아키텍처 규칙

### FSD (Feature-Sliced Design)
```
app/     # 앱 레벨 설정
pages/   # 페이지 라우팅
widgets/ # 큰 UI 블록
features/# 비즈니스 기능
entities/# 비즈니스 엔티티
shared/  # 공통 코드
```

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `feature/[app-name].[feature-name]`: 기능 브랜치
- **PR 크기 제한**: 200줄 내외 (맥락을 강제로 끊는 경우 제외)

## 📋 문서화 표준
- **CLAUDE.md**: 비즈니스 명세 (기획자용)
- **AGENT-GUIDE.md**: 기술 구현 가이드 (개발자용)

## 📝 PR 작성 규칙 (Base Rule)
- **템플릿 준수**: `.github/pull_request_template.md` 필수 사용
- **크기 제한**: 200줄 내외 (맥락을 강제로 끊는 경우 제외)
- **체크리스트**: 모든 해당 항목 완료 후 PR 생성

## 🧪 테스트 전략
- **단위 테스트**: Vitest
- **E2E 테스트**: Playwright
- **커버리지**: 핵심 비즈니스 로직 100%

---
📍 각 앱별 기술 가이드는 해당 디렉토리의 AGENT-GUIDE.md를 참조하세요.