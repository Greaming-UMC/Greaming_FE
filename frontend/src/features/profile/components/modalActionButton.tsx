import { useState } from "react";
import { Button, ListBase } from "../../../components/common/input"
import { Modal } from "../../../components/common/feedback"

interface ModalActionButtonProps {
  onEdit?: () => void | Promise<void>;
}

const ModalActionButton = ({ onEdit }: ModalActionButtonProps) => {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Button
          variant="text"
          size="none"
          shape="round"
          widthMode="fixed"
          width="40px"
          icon="dots"
          iconPosition="leading"
          aria-label="more actions"
          onClick={() => setOpen(true)}
        />
  
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Body>
            <ListBase
                variant="modal"
                size="md"
                radius="sm"
                leadingIcon="edit"
                title="수정하기"
                widthMode="fill"
                onClick={() => setOpen(false)}
            />
          </Modal.Body>
        </Modal>
      </>
    );
}; export default ModalActionButton;


  