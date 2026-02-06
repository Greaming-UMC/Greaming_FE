import { useState, useEffect } from 'react';
import { Modal, Button } from '../../../components/common';
import CircleFormSection from './sections/CircleFormSection';
import { useCreateCircle } from '../hooks/useSocial';

const CreateCircleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [memberOption, setMemberOption] = useState("직접입력");
  const [maxMembers, setMaxMembers] = useState("");

  // 🟢 써클 생성 Mutation 훅 사용
  const { mutate: createCircleMutate, isPending } = useCreateCircle();

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
    // 🟢 서버 명세에 맞게 데이터 가공
    const payload = {
      name: circleName,
      description: circleDescription,
      isPublic: isPublic,
      // 숫자로 변환하되, 제한없음이면 null
      capacity: memberOption === "제한없음" ? null : Number(maxMembers)
    };

    // 🟢 실제 API 호출
    createCircleMutate(payload, {
      onSuccess: () => {
        // 성공 시 로직 (알림은 훅에서 처리하거나 여기서 처리)
        onClose();
      }
    });
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
          // 🟢 로딩(isPending) 중일 때도 버튼 비활성화
          disabled={
            isPending ||
            !circleName || 
            !circleDescription || 
            (memberOption === "직접입력" && !maxMembers)
          }
          onClick={handleCreate}
        >
          {isPending ? "생성 중..." : "만들기"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCircleModal;