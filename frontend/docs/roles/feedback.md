# 오버레이/피드백(Feedback) 가이드

**대상 컴포넌트:** Modal, Toast, Tooltip, Spinner, Skeleton 등

## 필수(MUST)

- `open/onClose`로 제어
- ESC/바깥 클릭 닫기 지원(가능한 경우)
- 모달은 `role="dialog"` + `aria-modal="true"`

## 권장(SHOULD)

- Portal 사용(레이어 충돌 방지)
- z-index는 팀 공통 기준 사용
- Toast/Tooltip은 자동 닫힘 시간 옵션 제공

## 권장 패턴

- **Compound** (부모 + 하위 컴포넌트 조합)

## Compound 패턴 예시

```tsx
<Modal open={isOpen} onClose={handleClose}>
  <Modal.Header title="확인" />
  <Modal.Body>정말 삭제할까요?</Modal.Body>
  <Modal.Footer>
    <Button variant="text" onClick={handleClose}>취소</Button>
    <Button variant="solid" onClick={handleConfirm}>확인</Button>
  </Modal.Footer>
</Modal>
```
