import { useState, useEffect } from "react";
import { Button} from "../../../../components/common";
import clsx from "clsx";
import Icon from "../../../../components/common/Icon";
import { useAccountSetting } from "../hooks/useAccountSetting";
import { useProfileSetting } from "../hooks/useProfileSetting";
import type { VisibilityType } from "../../../../apis/types/common";
import DeleteAccountModal from "./components/DeleteAccountModal";
import SuspendAccountModal from "./components/SuspendAccountModal";

const VISIBILITY_OPTIONS: { type: VisibilityType; label: string; desc: string }[] = [
  { type: 'PUBLIC', label: '계정 공개', desc: '' },
  { type: 'PROTECTED', label: '계정 일부 공개', desc: '내가 승인한 팔로워만 볼 수 있습니다.' },
  { type: 'PRIVATE', label: '계정 비공개', desc: '' },
];

const AccountSection = () => {
  const { accountData, removeAccount, isLoading: isAccountLoading, isDeleting, updateStatus } = useAccountSetting();
  const { isUpdating } = useProfileSetting();

  const [visibility, setVisibility] = useState<VisibilityType>('PUBLIC');
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuspendedOpen, setIsSuspendedOpen] = useState(false);

  // 1. 초기 데이터 동기화
  useEffect(() => {
    if (accountData?.visibility) setVisibility(accountData.visibility as VisibilityType);
  }, [accountData]);

  // 2. 변경 감지
  useEffect(() => {
    if (!accountData) return;
    setIsChanged(visibility !== accountData.visibility);
  }, [visibility, accountData]);

  // --- 핸들러 ---

  const handleSave = () => {
    if (!isChanged || isUpdating) return;
    alert("공개 범위 설정 API는 현재 준비 중입니다.");
  };

  const handleDeleteAccount = () => {
    removeAccount({ agreed: true } as any);
    setIsDeleteOpen(false);
  };

  const handleSuspendAccount = () => {
    updateStatus({ status: 'SUSPENDED' } as any); 
    setIsSuspendedOpen(false);
  };

  if (isAccountLoading) return <div className="w-full py-20 text-center">계정 정보를 불러오는 중...</div>;

  return (
    <section className="flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <h2 className="main-title-small-emphasized text-on-surface">계정</h2>
        <Button 
          variant={isChanged ? "primary" : "surfaceVariant"} 
          shape="round" widthMode="fixed" width="130px" 
          disabled={!isChanged || isUpdating} 
          onClick={handleSave}
        >
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </header>

      {/* 연동 이메일 */}
      <article className="flex flex-col gap-2">
        <h3 className="sub-title-large-emphasized text-on-surface mb-2">연동된 이메일</h3>
        <div className="bg-surface-variant-high px-6 py-4 rounded-xl flex items-center justify-between">
          <span className="label-xlarge-emphasized text-on-surface">
            {accountData?.email || ""} 
          </span>
          <div className="flex items-center gap-3">
            {accountData?.email && (
              <>
                <Icon name={(accountData?.loginType?.toLowerCase() as any) || 'google'} size={24}/>
                <span className="label-small text-secondary-fixed bg-secondary-fixed-dim px-2 py-0.5 rounded-md">연동됨</span>
              </>
            )}
          </div>
        </div>
      </article>

      {/* 공개 설정 */}
      <article className="flex flex-col gap-3">
        <h3 className="sub-title-large-emphasized text-on-surface">프로필 공개 설정</h3>
        <div className="flex flex-col gap-3">
          {VISIBILITY_OPTIONS.map((option) => (
            <Button
              key={option.type}
              variant={visibility === option.type ? 'primary' : 'surface'}
              widthMode="fill" size="xl"
              className={clsx("justify-start px-5!", visibility === option.type ? "border border-primary" : "shadow-1")}
              onClick={() => setVisibility(option.type)}
            >
              <div className="flex items-center gap-2 text-left">
                <span className="body-large-emphasized">{option.label}</span>
                {option.desc && <span className="label-medium opacity-70">{option.desc}</span>}
              </div>
            </Button>
          ))}
        </div>
      </article>

      {/* 위험 구역: 삭제 버튼만 유지 */}
      <article className="flex flex-col gap-3 mb-20">
        <Button 
          variant="surface"
          className="shadow-1 py-6 rounded-medium" 
          textClassName="label-xlarge text-on-surface"
          onClick={() => setIsSuspendedOpen(true)}
        >
          계정 일시정지
        </Button>

        <Button 
          variant="surface" 
          widthMode="fill" 
          className="shadow-1 py-6 rounded-medium" 
          textClassName="!text-error" 
          onClick={() => setIsDeleteOpen(true)}
        >
          계정 삭제
        </Button>
      </article>

      <SuspendAccountModal 
        isOpen={isSuspendedOpen} 
        onClose={() => setIsSuspendedOpen(false)} 
        onConfirm={handleSuspendAccount} 
      />

      {/* 삭제 확인 모달 */}
      <DeleteAccountModal
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDeleteAccount} 
        isDeleting={isDeleting} 
      />
    </section>
  );
};

export default AccountSection;