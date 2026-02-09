# 레이아웃/네비(Layout) 가이드

**대상 컴포넌트:** AppLayout, Header, TopBar, Tabs, Section 등

## 필수(MUST)

- `children` 기반 조합 구조
- 내부에서 라우팅/데이터 로직 금지
- 공통 간격/여백은 GDS 토큰으로 통일

## 권장(SHOULD)

- 헤더/탭 등은 `aria` 속성 포함
- 반응형 클래스는 최소로 시작

## 권장 패턴

- **Compound** (레이아웃 슬롯 구성)

## Compound 패턴 예시

```tsx
<AppLayout>
  <AppLayout.Header title="Greaming" />
  <AppLayout.Body>{children}</AppLayout.Body>
</AppLayout>
```
