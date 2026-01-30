
import { useEffect, useState } from 'react';
import { Modal, SearchField, Button } from '../../../components/common';
import type { SocialUser } from '../types';
import FollowerListSection from './sections/FollowerListSection';

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowerModal = ({ isOpen, onClose }: FollowerModalProps) => {
  const [followerList, setFollowerList] = useState<SocialUser[]>([
    { id: 201, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher', profileIcon: 'char_default' },
    { id: 202, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 203, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false, profileIcon: 'char_default' },
    { id: 204, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher' },
    { id: 205, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 206, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false, profileIcon: 'char_default'  },
    { id: 207, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher', profileIcon: 'char_default'  },
    { id: 208, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 209, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 🟢 확인 모달 상태 관리
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SocialUser | null>(null);

  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  // 🟢 팔로우 버튼 클릭 핸들러
  const handleToggleFollow = (id: number) => {
    const targetUser = followerList.find(u => u.id === id);
    if (!targetUser) return;

    if (targetUser.isFollowing) {
      // 이미 맞팔로우 상태라면 해제 확인 모달 오픈
      setSelectedUser(targetUser);
      setIsConfirmOpen(true);
    } else {
      // 팔로우 상태가 아니면 즉시 맞팔로우 처리
      updateFollowStatus(id);
    }
  };

  // 🟢 실제 데이터 업데이트 함수
  const updateFollowStatus = (id: number) => {
    setFollowerList((prevList) =>
      prevList.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
    setIsConfirmOpen(false);
  };

  const filteredList = followerList.filter((user) =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="팔로워" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="검색"
              customSize="large"
              iconPosition="leading"
            />
          </div>
          <FollowerListSection 
            users={filteredList} 
            onToggle={handleToggleFollow} 
          />
        </Modal.Body>
      </Modal>

      {/* 🟢 언팔로우 확인 전용 컨펌 모달 (디자인 요청 반영) */}
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

export default FollowerModal;