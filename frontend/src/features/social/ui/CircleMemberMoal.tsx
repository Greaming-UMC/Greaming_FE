import { useEffect, useState } from 'react';
import { Modal, SearchField } from '../../../components/common';
import type { CircleMember } from '../types';
import CircleMemberListSection from './sections/CircleMemberListSection';

interface CircleMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleMemberModal = ({ isOpen, onClose }: CircleMemberModalProps) => {
  // 1. 목업 데이터 한 줄 정리 (디자인 가이드 반영)
  const [memberList, setMemberList] = useState<CircleMember[]>([
    { id: 1, nickname: 'Sketcher_King', bio: '# 드로잉 # 일러스트 # 캐릭터', isFollowing: false, badgeImage: 'badge_artist', profileIcon:'char_sad' },
    { id: 2, nickname: 'Master_Dev', bio: '# 코딩 # 리액트 # 타입스크립트', isFollowing: true, badgeImage: 'badge_master' },
    { id: 3, nickname: 'Greaming_Fan', bio: '# 그리밍 # 팬아트 # 수채화', isFollowing: false, profileIcon: 'char_profile_blue' },
    { id: 4, nickname: 'Art_Lover', bio: '# 전시회 # 풍경화 # 오일파스텔', isFollowing: true, badgeImage: 'badge_artist' },
    { id: 5, nickname: 'Sketcher_King', bio: '# 드로잉 # 일러스트 # 캐릭터', isFollowing: false, badgeImage: 'badge_artist', profileIcon:'char_sad' },
    { id: 6, nickname: 'Master_Dev', bio: '# 코딩 # 리액트 # 타입스크립트', isFollowing: true, badgeImage: 'badge_master' },
    { id: 7, nickname: 'Greaming_Fan', bio: '# 그리밍 # 팬아트 # 수채화', isFollowing: false, profileIcon: 'char_profile_blue' },
    { id: 8, nickname: 'Art_Lover', bio: '# 전시회 # 풍경화 # 오일파스텔', isFollowing: true, badgeImage: 'badge_artist' },
    { id: 9, nickname: 'Sketcher_King', bio: '# 드로잉 # 일러스트 # 캐릭터', isFollowing: false, badgeImage: 'badge_artist', profileIcon:'char_sad' },
    { id: 11, nickname: 'Master_Dev', bio: '# 코딩 # 리액트 # 타입스크립트', isFollowing: true, badgeImage: 'badge_master' },
    { id: 12, nickname: 'Greaming_Fan', bio: '# 그리밍 # 팬아트 # 수채화', isFollowing: false, profileIcon: 'char_profile_blue'},
    { id: 41, nickname: 'Art_Lover', bio: '# 전시회 # 풍경화 # 오일파스텔', isFollowing: true, badgeImage: 'badge_artist' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // 모달 열릴 때 검색어 초기화
  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  // 팔로우 토글 로직
  const handleToggleFollow = (id: number) => {
    setMemberList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFollowing: !m.isFollowing } : m))
    );
  };

  // 필터링 로직 (닉네임 기준)
  const filteredList = memberList.filter((member) =>
    member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={isOpen} onClose={onClose} variant="default">
      <Modal.Header title="써클 멤버" />
      <Modal.Body>
        {/* 검색 필드 */}
        <div className="mb-4 px-2">
          <SearchField
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="멤버 닉네임 검색"
            customSize="large"
            iconPosition="leading"
          />
        </div>
        
        {/* 멤버 리스트 섹션 (EmptyState는 섹션 내부에서 처리됨) */}
        <CircleMemberListSection 
          members={filteredList} 
          onToggleFollow={handleToggleFollow} 
        />
      </Modal.Body>
    </Modal>
  );
};

export default CircleMemberModal;