import { Button, Modal } from "../../../../../components/common";


interface SuspendAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SuspendAccountModal = ({ isOpen, onClose, onConfirm }: SuspendAccountModalProps) => {
  return (
    <Modal variant="confirm" open={isOpen} onClose={onClose}>
      {/* 일시정지는 일반 텍스트 색상으로 설정 */}
      <Modal.Header title="계정을 일시정지 하시겠습니까?" />
      <Modal.Body>
        <p className="text-center py-4 text-on-surface-variant">
          계정을 일시정지 하실 건가요?<br />
          정지 기간동안 프로필이 타인에게 노출되지 않아요
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            variant="surfaceVariant" 
            className="flex-1" 
            widthMode="fixed" 
            width="15rem" 
            onClick={onConfirm}
          >
            예
          </Button>
          <Button 
            variant="onPrimary" 
            className="flex-1" 
            onClick={onClose}
          >
            아니요
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SuspendAccountModal;