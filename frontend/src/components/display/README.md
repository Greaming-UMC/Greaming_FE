# 🃏 Card

다양한 콘텐츠(이미지, 텍스트, 액션)를 담을 수 있는 유연한 컨테이너 컴포넌트입니다.
**Compound Component 패턴**을 사용하여 내부 구조를 자유롭게 조합할 수 있으며, 디자인 시스템 토큰(GDS)이 적용되어 있습니다.

## ✨ 주요 기능

- Compound Pattern: Header, Media, Body, Footer 등 필요한 요소만 조립하여 사용.
- Badge Mapping: 'weekly', 'daily' 키워드만 입력하면 미리 설정된 SVG 뱃지가 이미지 위에 렌더링됨.
- Interaction: 클릭 가능(clickable), 호버 이펙트(hoverEffect) 등 인터랙티브 옵션 제공.
- Smart Overlay: 미디어 영역에 마우스를 올렸을 때만 나타나는 그라데이션 오버레이 지원.

## 🚀 사용 예시 (Basic Usage)

### 1. 기본형 (이미지 + 텍스트)

```tsx
<Card.Root>
  <Card.Media src="/sample.jpg" alt="샘플 이미지" aspectRatio="aspect-video" />

  <Card.Header>
    <h3 className="text-lg font-bold">카드 제목</h3>
  </Card.Header>

  <Card.Body>
    <p className="text-gray-500">카드 본문 내용입니다.</p>
  </Card.Body>

  <Card.Footer>
    <button>자세히 보기</button>
  </Card.Footer>
</Card.Root>
```

### 2. 뱃지 & 오버레이 (Badge & Overlay)

`badge` 속성을 사용하여 'daily' 또는 'weekly' 아이콘을 표시하고, `Overlay`를 통해 호버 시 정보를 노출합니다.

```tsx
<div className="w-64 h-64">
  <Card.Root className="bg-transparent shadow-none border-none">
    <Card.Media
      src="https://picsum.photos/800/800"
      aspectRatio="aspect-square"
      alt="Random Square Image"
      badge="daily"
    >
      {/* items-end: 텍스트 우측 하단 정렬 */}
      <Card.Overlay className="items-end pb-3 pr-3">
        <span className="text-white font-bold">#Hello</span>
      </Card.Overlay>
    </Card.Media>
  </Card.Root>
</div>
```

---

## 📖 API Documentation

### <Card.Root>

최상위 컨테이너입니다.

| Prop        | Type                                 | Default  | Description                                        |
| ----------- | ------------------------------------ | -------- | -------------------------------------------------- |
| variant     | 'elevated' \| 'filled' \| 'outlined' | 'filled' | 카드의 배경 및 테두리 스타일                       |
| clickable   | boolean                              | false    | true일 경우 커서가 포인터로 변하고 클릭 효과 적용  |
| hoverEffect | boolean                              | false    | true일 경우 호버 시 살짝 떠오르는 애니메이션 적용  |
| onClick     | () => void                           | -        | 클릭 이벤트 핸들러 (설정 시 clickable 자동 활성화) |
| className   | string                               | -        | 추가 스타일                                        |

### <Card.Media>

이미지와 뱃지, 오버레이를 감싸는 영역입니다.

| Prop        | Type   | Default        | Description                                                                    |
| ----------- | ------ | -------------- | ------------------------------------------------------------------------------ |
| src         | string | Required       | 이미지 경로                                                                    |
| alt         | string | Required       | 이미지 대체 텍스트                                                             |
| aspectRatio | string | 'aspect-video' | 이미지 비율 (Tailwind 클래스 사용)                                             |
| badge       | string | -              | 우측 상단에 표시할 뱃지 타입 (SVG 매핑됨), daily weekly 이외 문자는 전부 뱃지x |

> **Note:** `badge` 속성은 내부적으로 `Badge` 컴포넌트의 `imgSrc` 모드를 사용하여, SVG 원본 형태 그대로를 렌더링합니다.

### <Card.Overlay>

`Card.Media` 내부에서 사용하며, 호버 시 나타나는 정보창입니다.

| Prop      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| children  | ReactNode | 오버레이 내부에 표시할 콘텐츠 |
| className | string    | 추가 스타일                   |

> **Note:** 기본적으로 하단에서 시작되는 검정색 그라데이션 배경을 가지고 있으며, `Card.Media` 그룹 호버 시 `opacity: 1`이 됩니다.

### <Card.Header>, <Card.Body>, <Card.Footer>

레이아웃 구성을 위한 시멘틱 컴포넌트입니다.

| Component | 역할                            | 기본 스타일                   |
| --------- | ------------------------------- | ----------------------------- |
| Header    | 제목, 아바타, 메뉴 등 상단 요소 | p-4 pb-2 flex justify-between |
| Body      | 본문 텍스트                     | p-4 flex-1                    |
| Footer    | 버튼, 태그 등 하단 액션         | p-4 pt-0 flex justify-between |

---

## 🎨 Variants (스타일 옵션)

| Variant          | 설명                                          | 용도                                       |
| ---------------- | --------------------------------------------- | ------------------------------------------ |
| filled (Default) | 배경색(surface-container-highest)이 깔린 형태 | 일반적인 정보 카드, 리스트 아이템          |
| elevated         | 흰 배경(surface) + 그림자(shadow-md)          | 강조하고 싶은 카드, 온보딩, 모달 내부      |
| outlined         | 투명 배경 + 테두리(border-outline)            | 서브 정보, 업로드 카드, 선택되지 않은 상태 |
