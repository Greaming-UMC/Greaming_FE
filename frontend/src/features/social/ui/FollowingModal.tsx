import { useState } from 'react';
import { Modal, SearchField } from '../../../components/common';
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
    { id: 103, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true },
    { id: 105, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true },
    { id: 106, nickname: 'User_Beta', bio: 'Frontend Developer', isFollowing: true, profileImageUrl: '',badgeImage:'badge_master' },
    { id: 107, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true },
    { id: 108, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true },
    { id: 109, nickname: 'User_Beta', bio: 'Frontend Developer', isFollowing: true, profileImageUrl: '',badgeImage:'badge_master' },
    { id: 112, nickname: 'User_Gamma', bio: 'GDS Study', isFollowing: true },
    { id: 111, nickname: 'User_Delta', bio: 'Testing...', isFollowing: true },
  ]);

  
  // 2. 팔로우/언팔로우 토글 로직 유지
  const handleToggleFollow = (id: number) => {
    setFollowingList((prevList) =>
      prevList.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어에 따른 필터링 로직
  const filteredList = followingList.filter((user) =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={isOpen} onClose={onClose} variant="default">
      <Modal.Header title="팔로잉" />
      <Modal.Body>
        <div className="mb-4 px-2">
          <SearchField
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="검색"
            customSize="large" // 모달 크기에 맞춰 크게 설정
            iconPosition="leading" // 돋보기 아이콘을 왼쪽으로
          />
        </div>
        <FollowingListSection 
          users={filteredList} 
          onToggle={handleToggleFollow} 
        />
      </Modal.Body>
    </Modal>
  );
};

export default FollowingModal;