import { useEffect, useState, useMemo } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { CircleItem } from '../types';
import CircleSearchSection from './sections/CircleSearchSection';
import CircleCreateModal from './CircleCreateModal';
import { MOCK_CIRCLE_LIST } from '../testing/mockdata';

interface CircleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleSearchModal = ({ isOpen, onClose }: CircleSearchModalProps) => {
  const [circleList] = useState<CircleItem[]>(MOCK_CIRCLE_LIST);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  const handleJoinCircle = (circleId: number) => {
    console.log(`${circleId}번 써클에 가입 신청/입장 로직 실행`);
  };

  const filteredList = useMemo(() => {
    return circleList.filter((circle) =>
      circle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [circleList, searchTerm]);

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 검색" />
        <Modal.Body>
          <div className="mb-4 px-2 flex items-center gap-2">
            <div className="flex-1">
              <SearchField
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="써클 이름을 입력하세요"
                customSize="large"
                iconPosition="leading"
              />
            </div>
            <Button 
                variant="onPrimary"
                size="xs"
                shape="round"
                widthMode="hug"
                textClassName="label-large-emphasized"
                onClick={() => setIsCreateModalOpen(true)}
            >
              만들기
            </Button>
          </div>

          <CircleSearchSection 
            circles={filteredList} 
            onToggle={handleJoinCircle} 
          />
        </Modal.Body>
      </Modal>

      <CircleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default CircleSearchModal;