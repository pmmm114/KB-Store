# Pull Request

## 📋 변경사항 개요

### 변경 유형 (해당하는 항목에 ✅ 체크)

- [ ] ✨ Feature: 새로운 기능 추가
- [ ] 🐛 Bugfix: 버그 수정
- [ ] 📚 Docs: 문서 업데이트
- [ ] ♻️ Refactor: 코드 리팩토링 (기능 변경 없음)
- [ ] 🎨 Style: 코드 스타일링 (포매팅, 세미콜론 등)
- [ ] 🔥 Perf: 성능 개선
- [ ] 🧪 Test: 테스트 추가 또는 수정
- [ ] 🔧 Chore: 빌드 과정 또는 보조 도구 및 라이브러리 변경

## 🎯 변경 내용

### 주요 변경사항

<!-- 구체적인 변경사항을 설명해주세요 -->

### 변경 이유

<!-- 이 변경이 필요한 이유를 설명해주세요 -->

### 관련 이슈/티켓

<!-- 관련된 GitHub Issue나 티켓 번호가 있다면 링크해주세요 -->

## 🏗️ 아키텍처 준수 체크리스트

<details>
<summary>FSD (Feature-Sliced Design) 아키텍처 (해당하는 경우)</summary>

- [ ] 적절한 레이어에 코드 배치 (app/pages/widgets/features/entities/shared)
- [ ] 레이어 간 의존성 규칙 준수
- [ ] camelCase 폴더 네이밍 컨벤션 준수
- [ ] 컴포넌트 폴더는 UpperCamelCase 사용

</details>

<details>
<summary>NX 워크스페이스 규칙 (해당하는 경우)</summary>

- [ ] 적절한 프로젝트 태그 설정
- [ ] 프로젝트 간 의존성 규칙 준수
- [ ] 공유 라이브러리 사용 적절성

</details>

## ✅ 테스트 체크리스트

<details>
<summary>단위 테스트 (해당하는 경우)</summary>

- [ ] 새로운 컴포넌트/함수에 대한 테스트 작성
- [ ] 기존 테스트 수정/업데이트
- [ ] 모든 테스트 통과 확인

</details>

<details>
<summary>통합/E2E 테스트 (해당하는 경우)</summary>

- [ ] 주요 사용자 플로우 테스트 추가/수정
- [ ] Storybook 스토리 추가/업데이트

</details>

## 🔍 코드 품질 체크리스트

<details>
<summary>코드 스타일</summary>

- [ ] ESLint 규칙 통과
- [ ] Prettier 포매팅 적용
- [ ] TypeScript 타입 안전성 확보

</details>

<details>
<summary>접근성 (a11y) (UI 변경하는 경우)</summary>

- [ ] ARIA 속성 적절히 설정
- [ ] 키보드 네비게이션 지원
- [ ] 색상 대비율 기준 준수

</details>

## 📝 검토자를 위한 참고사항

<!-- 코드 리뷰어가 특별히 확인해야 할 부분이나 주의사항이 있다면 작성해주세요 -->
