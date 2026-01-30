import { useState, useEffect } from 'react';
import { Modal, Button } from '../../../components/common';
import CircleFormSection from './sections/CircleFormSection';

const CreateCircleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [memberOption, setMemberOption] = useState("직접입력");
  const [maxMembers, setMaxMembers] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCircleName("");
      setCircleDescription("");
      setIsPublic(true);
      setMemberOption("직접입력");
      setMaxMembers("");
    }
  }, [isOpen]);

  const handleCreate = () => {
    const finalMaxMembers = memberOption === "제한없음" ? null : maxMembers;

    console.log("생성 데이터:", { 
      circleName, 
      circleDescription, 
      isPublic, 
      maxMembers: finalMaxMembers 
    });
    
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
          memberOption={memberOption}
          setMemberOption={setMemberOption}
          maxMembers={maxMembers}
          setMaxMembers={setMaxMembers}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button 
          variant="onPrimary"
          shape="round"
          widthMode="fixed" 
          width="100px"
          disabled={
            !circleName || 
            !circleDescription || 
            (memberOption === "직접입력" && !maxMembers)
          }
          onClick={handleCreate}
        >
          만들기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCircleModal;