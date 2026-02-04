import { useEffect, useState, useRef } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import InviteSection from './sections/InviteSection';
import KickSection from './sections/KickSection';
import type { CircleMember, SocialUser } from '../types';

interface CircleManageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleManageModal = ({ isOpen, onClose }: CircleManageModalProps) => {
  // 1. 상태 관리
  const [activeTab, setActiveTab] = useState<'invite' | 'kick'>('invite');
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CircleMember | null>(null);

  // 2. 검색창 포커스 제어를 위한 Ref
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 3. 목업 데이터 관리 (setMember를 통해 내보내기 기능 구현)
  const [member, setMember] = useState<CircleMember[]>([
    { id: 1, nickname: '그리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 12, nickname: '그리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 14, nickname: '그리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 124, nickname: '그리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 121, nickname: '그리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 16, nickname: '그리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 17, nickname: '그리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 18, nickname: '그리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 1244, nickname: '그리리리리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 1212, nickname: '그리밍리리리1243121', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 162, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 174, nickname: '그리밍235231', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 186, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
  ]);

  const [Allusers] = useState<SocialUser[]>([
    { id: 1, nickname: '아리리리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 12, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 14, nickname: '그리밍리리리1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 124, nickname: '그리리리리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 121, nickname: '그리밍리리리1243121', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 16, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 17, nickname: '그리밍235231', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 18, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 151, nickname: '아리리리밍1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 122, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 141, nickname: '그리밍리리리1', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 1244, nickname: '그리리리리밍12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 1212, nickname: '그리밍리리리1243121', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 162, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 174, nickname: '그리밍235231', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
    { id: 186, nickname: '그리밍리리리12', bio: '# 특기태그 # 특기태그 # 특기태그', isFollowing: false, badgeImage: 'badge_artist' },
  ]);

  // 4. 모달 초기화 로직
  useEffect(() => {
    if (isOpen) {
      setActiveTab('invite');
      setSearchTerm("");
    }
  }, [isOpen]);

  // 5. 탭 전환 시 검색어 초기화 및 포커스 복구
  useEffect(() => {
    setSearchTerm("");
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [activeTab, isOpen]);

  // 6. 필터링 로직
  const filteredAllUsers = Allusers.filter(user => 
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = member.filter(m => 
    m.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 7. 이벤트 핸들러
  const handleKickClick = (id: number) => {
    const target = member.find(m => m.id === id);
    if (target) {
      setSelectedMember(target);
      setIsConfirmOpen(true);
    }
  };

  const confirmKick = () => {
    if (selectedMember) {
      setMember(prev => prev.filter(m => m.id !== selectedMember.id));
      setIsConfirmOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Modal.Header title="써클 관리" />
        
        {/* 탭 메뉴 */}
        <div className="flex border-b border-surface-variant-lowest">
          <button
            onClick={() => setActiveTab('invite')}
            className={`flex-1 py-3 label-large-emphasized transition-colors relative ${
              activeTab === 'invite' ? 'text-on-surface' : 'text-on-surface-variant-lowest'
            }`}
          >
            초대하기
            {activeTab === 'invite' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-on-surface" />}
          </button>
          <button
            onClick={() => setActiveTab('kick')}
            className={`flex-1 py-3 label-large-emphasized transition-colors relative ${
              activeTab === 'kick' ? 'text-on-surface' : 'text-on-surface-variant-lowest'
            }`}
          >
            내보내기
            {activeTab === 'kick' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-on-surface" />}
          </button>
        </div>

        <Modal.Body>
          <div className="my-4 px-2">
            <SearchField 
              ref={searchInputRef}
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="닉네임 검색하기" 
              customSize="large"
              iconPosition="trailing"
            />
          </div>

          {activeTab === 'invite' ? (
            <InviteSection users={filteredAllUsers} onInvite={(id) => console.log(id, '초대하기')} />
          ) : (
            <KickSection users={filteredMembers} onKick={handleKickClick} />
          )}
        </Modal.Body>
      </Modal>

      {/* 🟢 써클 멤버 내보내기 확인 컨펌 모달 */}
      <Modal 
        variant="confirm" 
        open={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
      >
        <Modal.Header title="멤버를 내보내시겠습니까?" />
        <Modal.Body>
          <div className="flex flex-col items-center text-center pt-4">
            이 멤버를 써클에서 내보낼까요?<br/>
            내보낸 후에는 다시 초대해야 참여할 수 있습니다.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button
              variant="secondary"
              shape="square"
              widthMode="fixed"
              width="170px"
              textClassName="label-large-emphasized"
              onClick={confirmKick}
            >
              예
            </Button>
            <Button 
              variant="primary"
              shape="square"
              widthMode="fixed" 
              width="170px"
              textClassName="label-large-emphasized"
              onClick={() => setIsConfirmOpen(false)}
            >
              아니요
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CircleManageModal;