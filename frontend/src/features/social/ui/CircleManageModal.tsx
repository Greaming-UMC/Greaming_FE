import { useEffect, useState, useRef, useMemo } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import InviteSection from './sections/InviteSection';
import KickSection from './sections/KickSection';
import { useDebounce } from '../hooks/useDebounce';

// 🟢 [수정] 훅 이름 일치화 (useCircleMembers)
import { 
  useSearchUsers, 
  useCircleMembers, 
  useKickMember 
} from '../hooks/useSocial';

interface CircleManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: number; 
}

const CircleManageModal = ({ isOpen, onClose, circleId }: CircleManageModalProps) => {
  const [activeTab, setActiveTab] = useState<'invite' | 'kick'>('invite');
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 페칭 (React Query)
  // ==========================================================

  // 1. 초대하기용 유저 검색 (Family B - result 기반)
  const { 
    data: searchData, 
    isLoading: isSearching 
  } = useSearchUsers(circleId, debouncedSearchTerm);

  // 2. 내보내기용 써클 멤버 조회 (Family B - result 기반)
  const { 
    data: memberData, 
    isLoading: isMemberLoading 
  } = useCircleMembers(circleId);

  // 3. 멤버 강퇴 Mutation
  const { mutate: kickMutate } = useKickMember(circleId);

  // ==========================================================
  // 🟢 [SECTION 2] 데이터 가공 (InfiniteData 구조 대응)
  // ==========================================================

  // 초대 리스트 가공 (Family B: result 필드 사용)
  const searchedUsers = useMemo(() => {
    if (!searchData) return [];
    // useInfiniteQuery는 pages 배열을 반환하므로 flatMap으로 합침
    // searchData.pages[i].result 가 검색된 유저 배열인 경우
    return searchData.pages.flatMap((page) => (page as any).result || []);
  }, [searchData]);

  // 내보내기 리스트 가공 (Family B: result.members 필드 사용)
  const filteredMembers = useMemo(() => {
    if (!memberData) return [];
    
    // 첫 번째 페이지의 result 내 members 배열에 접근
    const allMembers = memberData.pages[0]?.result?.members || [];
    
    return allMembers.filter(m => 
      m.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [memberData, searchTerm]);
  
  // ==========================================================
  // 🟢 [SECTION 3] 이벤트 핸들러
  // ==========================================================
  
  useEffect(() => {
    if (isOpen) {
      setActiveTab('invite');
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleKickClick = (userId: number) => {
    setSelectedUserId(userId);
    setIsConfirmOpen(true);
  };

  const confirmKick = () => {
    if (selectedUserId !== null) {
      kickMutate(selectedUserId, {
        onSuccess: () => {
          setIsConfirmOpen(false);
          setSelectedUserId(null);
          // 성공 알림 등을 추가할 수 있습니다.
        }
      });
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Modal.Header title="써클 관리" />
        
        {/* 탭 메뉴 */}
        <div className="flex border-b border-surface-variant-lowest">
          {(['invite', 'kick'] as const).map((tab) => (
            <button
              key={tab}
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
                    onInvite={(userId) => console.log(`User ${userId} 초대 API 필요`)} 
                  />
                )}
              </>
            ) : (
              <>
                {isMemberLoading ? (
                   <div className="py-20 text-center label-medium text-on-surface-variant-lowest animate-pulse">
                    멤버 목록을 불러오는 중입니다...
                  </div>
                ) : (
                  <KickSection 
                    users={filteredMembers} 
                    onKick={handleKickClick} 
                  />
                )}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* 강퇴 확인 모달 (컨펌) */}
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