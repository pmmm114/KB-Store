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
- **Label 필수 지정**: 변경 범위 + 작업 특성 Label 조합

### 📏 정확한 변경사항 측정 규칙 (Base Rule)
**diff line 수 측정 방법**
```bash
# PR 생성 전 변경사항 측정 (staged files)
git diff --cached --stat

# 현재 브랜치의 모든 변경사항 측정
git diff main...HEAD --stat

# 추가/수정/삭제 라인 수 확인
git diff --cached --numstat
```

**PR 변경용량 제한 엄격 준수**
- **MUST**: `git diff --cached --stat` 결과로 라인 수 확정
- **MUST**: 200줄 초과시 반드시 여러 PR로 분할
- **MUST**: 각 PR 생성 시 정확한 size 라벨 적용
- **EXCEPTION**: 맥락 단절 시에만 200줄 초과 허용 (명시적 사유 필요)

### 📍 Label 지정 규칙
**변경 범위 Label (필수)**
- `size/small`: 100줄 미만
- `size/medium`: 100-200줄
- `size/large`: 200줄 초과 (맥락 단절 시에만 허용)

**작업 특성 Label (필수, 중복 가능)**
- `type/feature`: 새로운 기능 추가
- `type/bugfix`: 버그 수정
- `type/docs`: 문서 업데이트
- `type/refactor`: 코드 리팩토링
- `type/test`: 테스트 추가/수정
- `type/chore`: 빌드/도구 관련
- `type/style`: 코드 스타일링
- `type/perf`: 성능 개선

**영역 Label (선택)**
- `area/frontend`: 프론트엔드 관련
- `area/backend`: 백엔드 관련
- `area/infra`: 인프라/배포 관련
- `area/docs`: 문서 관련

## 🧪 테스트 전략
- **단위 테스트**: Vitest
- **E2E 테스트**: Playwright
- **커버리지**: 핵심 비즈니스 로직 100%

---
📍 각 앱별 기술 가이드는 해당 디렉토리의 AGENT-GUIDE.md를 참조하세요.