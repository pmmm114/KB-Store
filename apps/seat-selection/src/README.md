# FSD 구조

## Layers
최상위 폴더를 지칭
- 📁 app
- 📁 pages
- 📁 shared

## Slices
레이러를 도메인별로 나눈 폴더
- 📁 pages
  - 📁 seat-selection

## Segments
Segment는 기술적 목적 또는 용도 별로 slice 또는 layer를 나눈 폴더
- 📁 pages
  - 📁 seat-selection
    - 📁 components
      - 📁 Personnel
      - 📁 Seat
    - 📁 features
      - 📁 seat-selection
        - 📁 ui
          - 📁 Personnel