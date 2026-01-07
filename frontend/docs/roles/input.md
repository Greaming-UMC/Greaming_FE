# 입력(Input) 가이드

**대상 컴포넌트:** Button, TextField, Select, Checkbox/Radio 등

## 필수(MUST)

- `value/onChange`는 **controlled**를 기본으로 설계
- `disabled`, `error`, `helperText` 기본 지원
- 키보드 접근성(탭 이동/엔터 동작) 보장

## 권장(SHOULD)

- 크기(`size`), 상태(`loading`)는 최소 옵션으로 시작
- `onClear` 같은 보조 액션은 필요할 때만 추가

## Button 최소 스펙 (권장 예시)

```ts
type ButtonProps = {
  variant?: "text" | "solid";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};
```

## 간단 예시

```tsx
<Button variant="solid" iconLeft={<Icon name="add" />} onClick={handleSave}>
  저장
</Button>
```
