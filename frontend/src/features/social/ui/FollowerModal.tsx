import { useState } from 'react';
import { Modal, SearchField } from '../../../components/common';
import type { SocialUser } from '../types';
import FollowerListSection from './sections/FollowerListSection'; // 팔로워 섹션 임포트

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowerModal = ({ isOpen, onClose }: FollowerModalProps) => {
  // 1. 팔로워 목업 데이터 (맞팔로우 여부 isFollowing으로 제어)
  const [followerList, setFollowerList] = useState<SocialUser[]>([
    { id: 201, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher' },
    { id: 202, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 203, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false },
    { id: 201, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher' },
    { id: 202, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 203, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false },
    { id: 201, nickname: 'Sketcher_King', bio: 'Art is my life', isFollowing: false, badgeImage: 'badgeSketcher' },
    { id: 202, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, badgeImage: 'badge_master' },
    { id: 203, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false },
  ]);

  // 2. 맞팔로우 토글 로직
  const handleToggleFollow = (id: number) => {
    setFollowerList((prevList) =>
      prevList.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 필터링 로직 (닉네임 기준)
  const filteredList = followerList.filter((user) =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={isOpen} onClose={onClose} variant="default">
      {/* 제목을 '팔로워'로 변경 */}
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
        
        {/* 팔로워 리스트 섹션 사용 */}
        <FollowerListSection 
          users={filteredList} 
          onToggle={handleToggleFollow} 
        />
      </Modal.Body>
    </Modal>
  );
};

export default FollowerModal;