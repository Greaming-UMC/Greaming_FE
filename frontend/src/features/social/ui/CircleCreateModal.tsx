import { useState } from 'react';
import { Modal, Button } from '../../../components/common';
import CircleFormSection from './sections/CircleFormSection';

const CreateCircleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");
  
  // 1. 공개/비공개 상태 추가 (기본값: 공개)
  const [isPublic, setIsPublic] = useState(true);

  const handleCreate = () => {
    console.log("생성 데이터:", { circleName, circleDescription, isPublic });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} variant="default">
      <Modal.Header title="써클 만들기" />
      
      <Modal.Body>
        <CircleFormSection 
          circleName={circleName}
          setCircleName={setCircleName}
          circleDescription={circleDescription}
          setCircleDescription={setCircleDescription}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button 
          widthMode="fill" 
          disabled={!circleName} 
          onClick={handleCreate}
        >
          만들기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCircleModal;