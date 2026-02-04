import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import InviteSection from './sections/InviteSection';
import KickSection from './sections/KickSection';

// 🟢 목업 데이터 및 타입 임포트
import { 
  MOCK_CIRCLE_MEMBER_LIST, 
  MOCK_FOLLOWING_LIST, 
  MOCK_CURRENT_CIRCLE_ID 
} from '../testing/mockdata';
import type { CircleMemberItem, SocialUserItem } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface CircleManageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleManageModal = ({ isOpen, onClose }: CircleManageModalProps) => {
  const [activeTab, setActiveTab] = useState<'invite' | 'kick'>('invite');
  const [searchTerm, setSearchTerm] = useState("");
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CircleMemberItem | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 1. 내보내기용 상태 (userId 기반)
  const [members, setMembers] = useState<CircleMemberItem[]>(MOCK_CIRCLE_MEMBER_LIST);
  
  // 2. 초대하기용 검색 결과 상태
  const [searchedUsers, setSearchedUsers] = useState<SocialUserItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ==========================================================
  // 🟢 [SECTION 1] 초대하기 검색 로직
  // ==========================================================
  useEffect(() => {
    if (activeTab === 'invite' && debouncedSearchTerm.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // MOCK_FOLLOWING_LIST의 userId가 유니크한지 확인 필요
        const results = MOCK_FOLLOWING_LIST.filter(user =>
          user.nickname.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setSearchedUsers(results);
        setIsSearching(false);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setSearchedUsers([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, activeTab]);

  // ==========================================================
  // 🟢 [SECTION 2] 내보내기 필터링 로직
  // ==========================================================
  const filteredMembers = useMemo(() => {
    if (activeTab !== 'kick') return [];
    return members.filter(m => 
      m.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm, activeTab]);

  // ==========================================================
  // 🟢 [SECTION 3] 이벤트 핸들러
  // ==========================================================
  
  useEffect(() => {
    if (isOpen) {
      setActiveTab('invite');
      setSearchTerm("");
      setMembers(MOCK_CIRCLE_MEMBER_LIST); 
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [activeTab, isOpen]);

  // id -> userId 파라미터명 통일
  const handleKickClick = (userId: number) => {
    const target = members.find(m => m.userId === userId);
    if (target) {
      setSelectedMember(target);
      setIsConfirmOpen(true);
    }
  };

  const confirmKick = () => {
    if (selectedMember) {
      setMembers(prev => prev.filter(m => m.userId !== selectedMember.userId));
      setIsConfirmOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Modal.Header title="써클 관리" />
        
        <div className="flex border-b border-surface-variant-lowest">
          {(['invite', 'kick'] as const).map((tab) => (
            <button
              key={tab} // 고유 키
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 label-large-emphasized transition-colors relative ${
                activeTab === tab ? 'text-on-surface' : 'text-on-surface-variant-lowest'
              }`}
            >
              {tab === 'invite' ? '초대하기' : '내보내기'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-on-surface" />
              )}
            </button>
          ))}
        </div>

        <Modal.Body>
          <div className="my-4 px-2">
            <SearchField 
              ref={searchInputRef}
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder={activeTab === 'invite' ? "초대할 유저 검색" : "내보낼 멤버 검색"} 
              customSize="large"
              iconPosition="trailing"
            />
          </div>

          <div className="max-h-[480px] min-h-[300px] overflow-y-auto custom-scrollbar px-1">
            {activeTab === 'invite' ? (
              <>
                {isSearching ? (
                  <div className="py-20 text-center label-medium text-on-surface-variant-lowest animate-pulse">
                    유저 정보를 찾는 중입니다...
                  </div>
                ) : (
                  <InviteSection 
                    users={debouncedSearchTerm ? searchedUsers : []} 
                    onInvite={(userId) => console.log(`User ${userId} 초대`)} 
                  />
                )}
              </>
            ) : (
              <KickSection 
                users={filteredMembers} 
                onKick={handleKickClick} 
              />
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="멤버를 내보내시겠습니까?" />
        <Modal.Body>
          <div className="flex flex-col items-center text-center pt-4">
            이 멤버를 써클에서 내보낼까요?<br/>
            내보낸 후에는 다시 초대해야 참여할 수 있습니다.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="secondary" shape="square" widthMode="fixed" textClassName="label-xlarge-emphasized" width="150px" onClick={confirmKick}>
              예
            </Button>
            <Button variant="primary" shape="square" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>
              아니요
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CircleManageModal;