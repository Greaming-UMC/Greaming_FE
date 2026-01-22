# 🪟 Modal Component
GDS 디자인 시스템을 준수하며, 리액트 포털(Portal)을 통해 레이어 간섭 없이 독립적으로 렌더링되는 모달 컴포넌트입니다. Compound Component Pattern을 사용하여 상황에 맞는 유연한 조립이 가능합니다.

## ✨ Features
- **독립적 렌더링:** createPortal을 사용하여 부모 스타일 탈출 / index.html에서 <div id="modal-root"></div> 필요 
- **스크롤 잠금:** 모달 활성화 시 배경 스크롤 방지
- **키보드 접근성:** ESC 키를 통한 닫기 기능 지원
- **반응형 최적화:** default와 confirm 베리언트에 따른 자동 레이아웃 최적화

## 📦 Subcomponents
| 컴포넌트 | 역할 | 비고 |
| :--- | :--- | :--- |
|`Modal (Root)` | 컨테이너 및 배경	| 상태 공유(Context), 스크롤 잠금, 배경 오버레이 담당
|`Modal.Header` | 상단 제목 영역    | 제목 텍스트 및 닫기(X) 버튼 (Confirm 모드 시 중앙 정렬)
|`Modal.Body`	| 본문 영역	       | 스크롤 지원(max-h-[60vh]), 우측 패딩 최적화
|`Modal.Footer` | 하단 액션 영역	| 버튼 배치용. Confirm 전용 (Default 시 null 반환 가능)

## 🚀 Usage Examples

### 1. 일반형 모달(defult)
상세 정보나 긴 리스트를 보여줄 때 사용합니다. 내부 스크롤이 자동으로 적용됩니다.

```tsx
<Modal open={isOpen} onClose={closeModal} variant="default">
  <Modal.Header title="게시글 상세보기" />
  <Modal.Body>
    내용이 길어지면 오른쪽 끝에 스크롤바가 생기며, 
    패딩 최적화로 인해 개방감 있는 뷰를 제공합니다.
  </Modal.Body>
</Modal>
```

### 2. 확인형 모달(Confirm)

```tsx
<Modal open={isOpen} onClose={closeModal} variant="confirm">
  <Modal.Header title="정말 삭제하시겠습니까?" />
  <Modal.Body>
    삭제된 데이터는 복구할 수 없습니다.
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={closeModal} variant="outlined">취소</Button>
    <Button onClick={handleDelete} variant="filled">삭제</Button>
  </Modal.Footer>
</Modal>
```

### 🛠 주의사항 (Setup)
모달이 정상적으로 렌더링되려면 index.html 내부에 아래와 같은 루트 요소가 포함되어야 합니다.

```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```
