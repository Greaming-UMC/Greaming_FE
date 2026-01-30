import { useEffect, useState } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { SocialUser } from '../types';
import FollowingListSection from './sections/FollowingListSection';

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowingModal = ({ isOpen, onClose }: FollowingModalProps) => {
  // 1. 목업 데이터 상태 유지
  const [followingList, setFollowingList] = useState<SocialUser[]>([
    { id: 101, nickname: 'User_Alpha', bio: 'Hello, World!', isFollowing: true, profileImageUrl: '', badgeImage:'badgeSketcher' },
    { id: 102, nickname: 'User_Beta', bio: 'Frontend Developer', isFollowing: true, profileImageUrl: '',badgeImage:'badge_master' },
    { id: 103, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true , profileIcon: 'char_sad'  },
    { id: 105, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true , profileIcon: 'char_sad'},
    { id: 106, nickname: 'User_Beta', bio: 'Frontend Developer', isFollowing: true, profileImageUrl: '',badgeImage:'badge_master', profileIcon: 'char_sad' },
    { id: 107, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true, profileIcon: 'char_sad' },
    { id: 108, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true, profileIcon: 'char_sad' },
    { id: 109, nickname: 'User_Beta', bio: 'Frontend Developer', isFollowing: true, profileImageUrl: '',badgeImage:'badge_master' },
    { id: 112, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true },
    { id: 111, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true },
  ]);

  
// 🟢 확인 모달 관련 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SocialUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  // 🟢 리스트에서 버튼 클릭 시 실행
  const handleToggleFollow = (id: number) => {
    const targetUser = followingList.find(u => u.id === id);
    if (!targetUser) return;

    if (targetUser.isFollowing) {
      // 1. 이미 팔로잉 중이면 확인 모달 오픈
      setSelectedUser(targetUser);
      setIsConfirmOpen(true);
    } else {
      // 2. 팔로우 상태가 아니면 즉시 팔로우 처리
      updateFollowStatus(id);
    }
  };

  // 🟢 실제 상태를 변경하는 함수
  const updateFollowStatus = (id: number) => {
    setFollowingList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isFollowing: !u.isFollowing } : u))
    );
    setIsConfirmOpen(false); // 확인 모달 닫기
  };

  const filteredList = followingList.filter((user) =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="팔로잉" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="검색" customSize="large" iconPosition="leading" />
          </div>
          <FollowingListSection users={filteredList} onToggle={handleToggleFollow} />
        </Modal.Body>
      </Modal>

      {/* 🟢 언팔로우 확인 전용 컨펌 모달 */}
      <Modal 
        variant="confirm" 
        open={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
      >
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4">
            {selectedUser?.nickname}님을 팔로우 해제 하시겠습니까?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
    
            <Button
              variant="primary"
              shape="square"
              widthMode="fixed" 
              width="150px"
              onClick={() => setIsConfirmOpen(false)}
            >
              취소
            </Button>

            <Button 
              variant="secondary"
              shape="square"
              widthMode="fixed" 
              width="150px"
              textClassName="label-xlarge-emphasized"
              onClick={() => selectedUser && updateFollowStatus(selectedUser.id)}
            >
              팔로우 해제
            </Button>

          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowingModal;