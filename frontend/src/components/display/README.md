# 💳 Card Component

GDS 디자인 시스템을 준수하는 만능 카드 컴포넌트입니다.
**Compound Component Pattern(합성 컴포넌트 패턴)**을 사용하여 자유로운 조립이 가능합니다.

## ✨ Features
- **유연한 구조:** Header, Media, Body, Footer를 자유롭게 배치
- **다양한 스타일:** Elevated, Filled, Outlined 지원
- **인터랙션:** Hover 효과, 클릭 이벤트, 오버레이 자동 지원

## 📦 Subcomponents
| 컴포넌트 | 역할 | 비고 |
| :--- | :--- | :--- |
| `Card.Root` | 최상위 컨테이너 | 배경, 그림자, 클릭 이벤트 담당 |
| `Card.Header` | 상단 영역 | 제목, 아바타, 메뉴 등 |
| `Card.Media` | 이미지/비디오 | `aspect-ratio` 지원, 호버 그룹 트리거 |
| `Card.Overlay` | 호버 오버레이 | **Media 내부**에 사용. 호버 시 등장 |
| `Card.Body` | 본문 영역 | 기본 Padding 포함 |
| `Card.Footer` | 하단 영역 | 액션 버튼, 태그 등 |

## 🚀 Usage Examples

### 1. 기본 텍스트 카드
가장 단순한 형태입니다.

```tsx

<Card.Root variant="elevated">
  <Card.Header>
    <h3 className="label-large">공지사항</h3>
  </Card.Header>
  <Card.Body>
    카드 내용입니다.
  </Card.Body>
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

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'elevated' \| 'filled' \| 'outlined'` | `'filled'` | 카드의 외형 스타일 (그림자/배경색/테두리) |
| `clickable` | `boolean` | `false` | 클릭 가능 여부 (`onClick`이 있으면 자동으로 `true` 처리됨) |
| `hoverEffect` | `boolean` | `false` | 호버 시 위로 떠오르는 애니메이션 적용 여부 |


# 🏷️ Badge Component

상태(Status), 카테고리(Category), 태그(Tag) 등을 표시하기 위한 다목적 뱃지 컴포넌트입니다.
GDS 디자인 토큰을 준수하며, 다양한 크기와 스타일(Variant)을 지원합니다.

## ✨ Features
- **다양한 스타일:** Solid, Outline, Tag(해시태그) 등 7가지 Variant 지원
- **아이콘 지원:** 텍스트 좌/우측에 아이콘 배치 가능
- **자동 레이아웃:** 텍스트 길이에 따른 자동 너비 조절 (lg 사이즈 제외)
- **커스텀 디자인:** Variant별로 다른 Border Radius 적용 (`tag`, `outline`)

## 📦 Usage Examples

### 1. 기본 사용 (Basic)
가장 기본적인 형태입니다.
```tsx

<Badge label="New" />
<Badge label="Update" variant="primary" />
```
### 2. 스타일 변형 (Variants)
용도에 맞춰 다양한 스타일을 적용할 수 있습니다.

```tsx
/* 해시태그 스타일 (둥글기 28px) */
<Badge variant="tag" label="#일상" />

/* 아웃라인 스타일 (둥글기 12px, 테두리 있음) */
<Badge variant="outline" label="#흑백" />

/* 상태 표시 */
<Badge variant="success" label="완료됨" />
<Badge variant="error" label="오류" />
```

### 3. 아이콘 포함 (With Icon)
```tsx
/* 왼쪽 아이콘 */
<Badge label="설정" icon="settings" />

/* 오른쪽 아이콘 (닫기 버튼 등) */
<Badge variant="tag" label="React" icon="close" iconPosition="right" />
```

### 4. 크기 조절 (Sizes)
```tsx
<div className="flex items-center gap-2">
  <Badge size="sm" label="Small" />
  <Badge size="md" label="Medium" />
  
  {/* 104px x 48px 고정 크기 */}
  <Badge size="lg" label="Large" variant="outline" />
</div>
```
## 🎨 Props Definition

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | **Required** | 뱃지에 표시될 텍스트 내용 |
| `variant` | `'neutral' \| 'primary' \| 'secondary' \| 'outline' \| 'tag' \| 'error' \| 'success'` | `'neutral'` | 뱃지의 색상 및 형태 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 뱃지의 크기 (`lg`는 104px 고정 크기) |
| `icon` | `string` | `undefined` | 표시할 아이콘의 이름 (`Icon` 컴포넌트 `name` 기준) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 아이콘의 위치 (텍스트 기준) |
| `className` | `string` | `''` | 추가적인 커스텀 스타일 (Tailwind 클래스) |

<br />

## 📐 Styles & Specs

### Variants Detail (Radius & Style)
각 Variant는 용도에 따라 서로 다른 **Border Radius**와 **Color Token**을 가집니다.

| Variant | Style Description | Border Radius | 비고 |
| :--- | :--- | :--- | :--- |
| `tag` | 연한 배경 + 커서 포인터 | **28px** (완전 둥근 형태) | 클릭 가능한 해시태그용 |
| `outline` | 흰 배경 + 회색 테두리 | **12px** (살짝 둥근 사각형) | 모던한 버튼/태그 느낌 |
| `primary` | 브랜드 컬러 (Filled) | **Full** (원형) | 주요 강조 |
| `neutral` | 회색 배경 (Filled) | **Full** (원형) | 일반 상태/정보 (Default) |

### Size Spec (Height & Layout)
| Size | Height | Padding | Icon Size | 특징 |
| :--- | :--- | :--- | :--- | :--- |
| `sm` | 24px (`h-6`) | `px-2` | 14px | 좁은 공간용 |
| `md` | 32px (`h-8`) | `px-3` | 18px | **Standard (기본값)** |
| `lg` | **48px** (`h-[48px]`) | - | 20px | **너비 104px 고정 (`w-[104px]`)** |


