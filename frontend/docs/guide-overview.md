# 공용 컴포넌트 가이드 개요

이 문서는 팀원이 **같은 구조/규칙**으로 공용 컴포넌트를 만들기 위한 공식 가이드입니다.  
기준은 **실무 수준(필수 규칙 우선)**이며, 권장 규칙은 상황에 맞게 적용합니다.

## 적용 범위

- **frontend 레포의 공용 컴포넌트 개발**에 적용

## 규칙 레벨

- **필수(MUST)**: 반드시 지켜야 하는 규칙
- **권장(SHOULD)**: 가능하면 지키는 규칙

## 공통 필수 규칙 (모든 역할 공통)

### 1) 폴더 구조

```
src/components/
  input/
  display/
  feedback/
  layout/
```

### 2) 네이밍/익스포트

- 컴포넌트 이름은 **PascalCase**
- `export const Button` 같은 **named export**만 사용
- 각 역할 폴더의 `index.ts`에서 export

### 3) 스타일링

- 색상/타이포/라운드는 **디자인 토큰 클래스 우선**
- hover는 **state-layer 방식** 사용
  - 예: `state-layer secondary-opacity-8`
- 임의 색상(hex/rgba) 사용 금지

### 4) Props 기본 규칙

- `className?`, `style?`는 기본 허용
- interactive 컴포넌트는 `disabled` 지원
- `<button>`은 기본 `type="button"`

### 5) 접근성

- 아이콘만 있는 버튼은 `aria-label` 필수
- 모달은 `role="dialog"` + `aria-modal="true"`

## 역할별 가이드

- [입력(Input)](./roles/input.md)
- [표시(Display)](./roles/display.md)
- [오버레이/피드백(Feedback)](./roles/feedback.md)
- [레이아웃/네비(Layout)](./roles/layout.md)

## 구조 원칙 (공통)

- **공통 컴포넌트는 껍데기**, 내용은 도메인에서 조합
  - 예: `Modal`은 공통, 내부 리스트/아이템은 도메인
- 비즈니스 로직/라우팅 로직은 공통 컴포넌트에 넣지 않음

## 역할 분담 예시 (5명 기준)

- Input 담당 1명
- Display 담당 1명
- Feedback/Overlay 담당 1명
- Layout/Nav 담당 1명
- 통합/품질 담당 1명 (리뷰/규칙 준수 확인)
