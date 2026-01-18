# 표시(Display) 가이드

**대상 컴포넌트:** Card, Badge, Divider, Avatar, EmptyState 등

## 필수(MUST)

- 데이터 표현만 담당(비즈니스 로직 금지)
- 상태는 상위에서 주입(loading/empty 등)
- GDS 토큰으로 스타일 통일

## 권장(SHOULD)

- 컴포넌트 하나에 역할 하나만 부여
- Empty/Skeleton은 별도 컴포넌트로 분리

## 권장 패턴

- **Flat** (단일 컴포넌트 + props)

## Flat 패턴 예시

```tsx
<Card>
  <h3 className="label-large">작품 제목</h3>
  <p className="body-medium text-on-surface-variant-low">작품 설명</p>
</Card>
```
