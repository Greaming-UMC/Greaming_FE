import { useEffect, useState } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { Circle } from '../types';
import CircleSearchSection from './sections/CircleSearchSection';
import CircleCreateModal from './CircleCreateModal'; // 🟢 생성 모달 임포트

interface CircleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleSearchModal = ({ isOpen, onClose }: CircleSearchModalProps) => {
  // 1. 써클 목업 데이터
  const [circleList, setCircleList] = useState<Circle[]>([
    { id: 1, name: '그리밍 공식', description: '함께', isPublic: true, memberCount: 30, maxMembers: 'unlimited', CircleIcon: 'char_imoge'},
    { id: 2, name: '밍밍 공식 써클', description: '함께 그림 그려요', isPublic: true, memberCount: 10, maxMembers: 20 },
    { id: 3, name: '그리기 공식 써클', description: '함께 그림 그려요', isPublic: true, memberCount: 13, maxMembers: 15 },
    { id: 4, name: '하하하 공식 써클', description: '함께 그림 그려요', isPublic: true, memberCount: 49, maxMembers: 50 },
    { id: 5, name: '그리밍 써클', description: '함께 그림 그려요', isPublic: true, memberCount: 50, maxMembers: 60 },
    { id: 6, name: '그려그려', description: '함께 그림 그려요', isPublic: true, memberCount: 50, maxMembers: 'unlimited' },
    { id: 7, name: '뭘그려', description: '함께 그림 그려요', isPublic: true, memberCount: 50, maxMembers: 'unlimited' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 🟢 생성 모달 열림 상태

  // 검색 모달이 열릴 때 검색어 초기화
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleJoinCircle = (id: number) => {
    console.log(`${id}번 써클에 가입 신청/입장 로직 실행`);
  };

  // 검색 필터링
  const filteredList = circleList.filter((circle) =>
    circle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 써클 검색 모달 본체 */}
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 검색" />
        <Modal.Body>
          {/* 상단 검색바 + 만들기 버튼 영역 */}
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

          {/* 결과 리스트 섹션 */}
          <CircleSearchSection 
            circles={filteredList} 
            onToggle={handleJoinCircle} 
          />
        </Modal.Body>
      </Modal>

      {/* 🟢 써클 만들기 모달 (검색 모달 위 레이어) */}
      <CircleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default CircleSearchModal;