import { useState } from "react";
import { Button } from "../../../../components/common";

const ProfileSection = () => {
  const [visibility, setVisibility] = useState<'public' | 'partial' | 'private'>('public');
  
    return (
      <section className="flex flex-col gap-10">
        {/* 1. 헤더 영역 */}
        <div className="flex justify-between items-center pb-4">
          <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
          <Button variant="primary" shape="round" width="80px">저장</Button>
        </div>
  
        {/* 2. 이메일 설정 */}
        <div className="flex flex-col gap-4">
          <h3 className="label-large-emphasized text-on-surface">이메일</h3>
          <div className="flex gap-3 items-center bg-surface-variant-lowest p-4 rounded-medium border border-outline-variant">
            <span className="flex-1 label-large text-on-surface-variant">User@example.com</span>
            <Button variant="surface" size="sm" shape="round">변경</Button>
          </div>
        </div>
  
        {/* 3. 프로필 공개 설정 */}
        <div className="flex flex-col gap-4">
          <h3 className="label-large-emphasized text-on-surface">프로필 공개 설정</h3>
          <div className="flex flex-col gap-2">
            {/* 계정 공개 */}
            <button 
              onClick={() => setVisibility('public')}
              className={`flex items-center p-4 rounded-medium border transition-colors ${
                visibility === 'public' ? 'bg-on-surface text-surface border-on-surface' : 'bg-surface text-on-surface border-outline-variant'
              }`}
            >
              <span className="label-large-emphasized">계정공개</span>
            </button>
  
            {/* 계정 일부 공개 */}
            <button 
              onClick={() => setVisibility('partial')}
              className={`flex items-center gap-2 p-4 rounded-medium border transition-colors ${
                visibility === 'partial' ? 'bg-on-surface text-surface border-on-surface' : 'bg-surface text-on-surface border-outline-variant'
              }`}
            >
              <span className="label-large-emphasized">계정 일부 공개</span>
              <span className="label-medium opacity-70 text-on-surface-variant-lowest">내가 승인한 팔로워만 볼 수 있습니다.</span>
            </button>
  
            {/* 계정 비공개 */}
            <button 
              onClick={() => setVisibility('private')}
              className={`flex items-center p-4 rounded-medium border transition-colors ${
                visibility === 'private' ? 'bg-on-surface text-surface border-on-surface' : 'bg-surface text-on-surface border-outline-variant'
              }`}
            >
              <span className="label-large-emphasized">계정 비공개</span>
            </button>
          </div>
        </div>
  
        {/* 4. 계정 관리 액션 */}
        <div className="flex flex-col gap-3 mt-4">
          <Button variant="surface" widthMode="fill" shape="round">계정 일시정지</Button>
          <Button variant="surface" widthMode="fill" shape="round" textClassName="text-error">계정 삭제</Button>
        </div>
      </section>
    );
};

export default ProfileSection;
