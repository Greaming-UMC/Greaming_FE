import { useState, useEffect, useCallback } from "react";
import { BaseField, Button, Modal } from "../../../../components/common";
import clsx from "clsx";
import Icon from "../../../../components/common/Icon";
import { useAccountSetting } from "../hooks/useAccountSetting";
import { useProfileSetting } from "../hooks/useProfileSetting";
import type { VisibilityType } from "../../../../apis/types/common";

const VISIBILITY_OPTIONS: { type: VisibilityType; label: string; desc: string }[] = [
  { type: 'PUBLIC', label: '계정 공개', desc: '' },
  { type: 'PROTECTED', label: '계정 일부 공개', desc: '내가 승인한 팔로워만 볼 수 있습니다.' },
  { type: 'PRIVATE', label: '계정 비공개', desc: '' },
];

const AccountSection = () => {
  const { accountData, updateStatus, removeAccount, isLoading: isAccountLoading, isDeleting } = useAccountSetting();
  const { profileData, updateProfile, isUpdating } = useProfileSetting();

  // --- 상태 관리 ---
  const [visibility, setVisibility] = useState<VisibilityType>('PUBLIC');
  const [password, setPassword] = useState(""); 
  const [isChanged, setIsChanged] = useState(false);

  const [isSuspendedOpen, setIsSuspendedOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 1. 초기 데이터 동기화
  useEffect(() => {
    if (accountData?.visibility) setVisibility(accountData.visibility);
  }, [accountData]);

  // 2. 변경 감지
  useEffect(() => {
    if (!accountData) return;
    setIsChanged(visibility !== accountData.visibility);
  }, [visibility, accountData]);

  // 3. 입력창 핸들러 (메모이제이션으로 리렌더링 최적화)
  const handlePasswordChange = useCallback((val: string) => {
    setPassword(val);
  }, []);

  // --- 핸들러 ---

  const handleSave = () => {
    if (!isChanged || isUpdating) return;
    updateProfile({
      ...profileData,
      visibility: visibility,
    } as any);
  };

  const handleSuspendAccount = () => {
    if (!password) return; // 알럿 대신 버튼 disabled 처리 권장
    updateStatus({ 
      status: 'SUSPENDED', 
      password: password,
      reason: "사용자 요청",
      duration: 30 
    });
    setIsSuspendedOpen(false);
    setPassword("");
  };

  const handleDeleteAccount = () => {
    removeAccount({ agreed: true });
    setIsDeleteOpen(false);
  };

  if (isAccountLoading) return <div className="w-full py-20 text-center">계정 정보를 불러오는 중...</div>;

  return (
    <section className="flex flex-col gap-11">
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
          <span className="label-xlarge-emphasized text-on-surface">{accountData?.email}</span>
          <div className="flex items-center gap-3">
            <Icon name={accountData?.loginType?.toLowerCase() as any || 'google'} size={24}/>
            <span className="label-small text-secondary-fixed bg-secondary-fixed-dim px-2 py-0.5 rounded-md">연동됨</span>
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

      {/* 위험 구역 */}
      <article className="flex flex-col gap-3 mb-20">
        <Button variant="surface" widthMode="fill" className="shadow-1 py-6 rounded-medium" onClick={() => setIsSuspendedOpen(true)}>
          계정 일시정지
        </Button>
        <Button variant="surface" widthMode="fill" className="shadow-1 py-6 rounded-medium" textClassName="!text-error" onClick={() => setIsDeleteOpen(true)}>
          계정 삭제
        </Button>
      </article>

      {/* 1. 일시정지 모달 */}
      <Modal variant="confirm" open={isSuspendedOpen} onClose={() => { setIsSuspendedOpen(false); setPassword(""); }}>
        <Modal.Header title="계정 일시정지" />
        <Modal.Body>
          <div className="flex flex-col gap-6 py-4">
            <div className="text-center">
              <p className="body-large text-on-surface mb-1">정말로 계정을 일시정지하시겠습니까?</p>
              <p className="label-medium text-on-surface-variant opacity-70">안전을 위해 비밀번호를 입력해주세요.</p>
            </div>
            <BaseField 
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
              widthMode="fill"
              autoFocus // 모달 열리자마자 바로 입력 가능하게
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="secondary" className="flex-1" onClick={handleSuspendAccount} disabled={!password}>
              일시정지
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => setIsSuspendedOpen(false)}>
              취소
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* 2. 삭제 모달 */}
      <Modal variant="confirm" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Header title="계정 삭제" />
        <Modal.Body>
          <p className="text-center py-8 body-large !text-error font-bold">
            정말로 삭제하시겠습니까?<br />
            삭제된 데이터는 절대 복구되지 않습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="secondary" className="flex-1" onClick={handleDeleteAccount} disabled={isDeleting}>
              {isDeleting ? "삭제 중..." : "삭제하기"}
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => setIsDeleteOpen(false)}>
              취소
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default AccountSection; 