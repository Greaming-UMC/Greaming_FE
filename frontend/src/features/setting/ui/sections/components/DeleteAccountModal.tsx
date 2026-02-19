import { Button, Modal } from "../../../../../components/common";


interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, isDeleting }: DeleteAccountModalProps) => {
  return (
    <Modal variant="confirm" open={isOpen} onClose={onClose}>
      <Modal.Header title="계정을 삭제하시겠습니까?" titleClassName="text-error" />
      <Modal.Body>
        <p className="text-center py-4">
          정말로 계정을 삭제하실 건가요?<br />
          삭제된 데이터는 복구할 수 없어요
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
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중..." : "예"}
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

export default DeleteAccountModal;