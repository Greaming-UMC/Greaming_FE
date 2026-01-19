# 💳 Card Component

GDS 디자인 시스템을 준수하는 만능 카드 컴포넌트입니다.
**Compound Component Pattern(합성 컴포넌트 패턴)**을 사용하여 자유로운 조립이 가능합니다.

## ✨ Features

- **유연한 구조:** Header, Media, Body, Footer를 자유롭게 배치
- **다양한 스타일:** Elevated, Filled, Outlined 지원
- **인터랙션:** Hover 효과, 클릭 이벤트, 오버레이 자동 지원

## 📦 Subcomponents

| 컴포넌트       | 역할            | 비고                                  |
| :------------- | :-------------- | :------------------------------------ |
| `Card.Root`    | 최상위 컨테이너 | 배경, 그림자, 클릭 이벤트 담당        |
| `Card.Header`  | 상단 영역       | 제목, 아바타, 메뉴 등                 |
| `Card.Media`   | 이미지/비디오   | `aspect-ratio` 지원, 호버 그룹 트리거 |
| `Card.Overlay` | 호버 오버레이   | **Media 내부**에 사용. 호버 시 등장   |
| `Card.Body`    | 본문 영역       | 기본 Padding 포함                     |
| `Card.Footer`  | 하단 영역       | 액션 버튼, 태그 등                    |

## 🚀 Usage Examples

### 1. 기본 텍스트 카드

가장 단순한 형태입니다.

```tsx
<Card.Root variant="elevated">
  <Card.Header>
    <h3 className="label-large">공지사항</h3>
  </Card.Header>
  <Card.Body>카드 내용입니다.</Card.Body>
</Card.Root>
```

### 1. 포스팅 카드

```tsx
<Card.Root className="bg-transparent shadow-none border-none">
  <Card.Media src="image.jpg" aspectRatio="aspect-square">
    {/* items-end: 텍스트 우측 하단 정렬 */}
    <Card.Overlay className="items-end pb-3 pr-3">
      <span className="text-white font-bold">#Hello</span>
    </Card.Overlay>
  </Card.Media>
  <Card.Footer className="px-0">
    <Avatar size="sm" />
    <span>좋아요 10</span>
  </Card.Footer>
</Card.Root>
```

### 3. 인터랙티브 카드 (클릭 가능)

onClick을 넣으면 자동으로 커서가 바뀌고 둥둥 뜨는 효과가 적용됩니다.

```tsx
<Card.Root onClick={() => alert('클릭!') hoverEffect={true}}>
  <Card.Body>나를 클릭해보세요</Card.Body>
</Card.Root>
```

## 🎨 Props (Card.Root)

| Prop          | Type                                   | Default    | Description                                                |
| :------------ | :------------------------------------- | :--------- | :--------------------------------------------------------- |
| `variant`     | `'elevated' \| 'filled' \| 'outlined'` | `'filled'` | 카드의 외형 스타일 (그림자/배경색/테두리)                  |
| `clickable`   | `boolean`                              | `false`    | 클릭 가능 여부 (`onClick`이 있으면 자동으로 `true` 처리됨) |
| `hoverEffect` | `boolean`                              | `false`    | 호버 시 위로 떠오르는 애니메이션 적용 여부                 |
