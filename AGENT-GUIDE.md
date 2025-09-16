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

## 📝 커밋 및 PR 작성 규칙 (Base Rule)

### 커밋 메시지 규칙

- **Claude Code 관련 자동 생성 메시지 금지**
  - `🤖 Generated with [Claude Code](https://claude.ai/code)` 형태의 메시지 사용 금지
  - `Co-Authored-By: Claude <noreply@anthropic.com>` 형태의 메시지 사용 금지
  - AI 도구 사용 흔적을 커밋 메시지에 남기지 않음
- **컨벤셔널 커밋**: feat, fix, docs 등 타입 명시
- **명확한 설명**: 변경사항의 목적과 내용을 간결하게 작성

### PR 생성 및 변경사항 측정 규칙

- **정확한 diff line 측정**: `git diff --cached --stat` 명령어로 정확한 변경 라인 수 측정
- **현재 브랜치 전체 변경사항 측정**: `git diff main...HEAD --stat`
- **추가/수정/삭제 라인 수 확인**: `git diff --cached --numstat`

### PR 크기 제한 및 라벨링

- **size/small**: ~100 lines
- **size/medium**: 100-200 lines
- **size/large**: 200+ lines
- **200 라인 초과 시**: 반드시 더 작은 PR로 분할 고려
- **테스트 파일 예외**: 230라인까지 허용 (충분한 테스트 커버리지 확보 목적)

### PR 템플릿 준수

- **템플릿 필수 사용**: `.github/pull_request_template.md` 형식 준수
- **Summary**: 간단한 설명
- **Changes**: 주요 변경사항
- **Test plan**: 테스트 방법
- **메타데이터**: 변경 유형, 규모, 영향 범위 명시

## 🧪 테스트 전략

- **단위 테스트**: Vitest
- **E2E 테스트**: Playwright
- **커버리지**: 핵심 비즈니스 로직 100%

---

📍 각 앱별 기술 가이드는 해당 디렉토리의 AGENT-GUIDE.md를 참조하세요.
