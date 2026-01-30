import { useState, useEffect } from "react";
import { BaseField, Button, Modal } from "../../../../components/common";
import clsx from "clsx";

const AccountSection = () => {
  const [visibility, setVisibility] = useState<'public' | 'partial' | 'private'>('public');
  const [initialVisibility] = useState<'public' | 'partial' | 'private'>('public');
  
  const initialEmail = "User@example.com";
  const [email, setEmail] = useState(initialEmail);
  const [tempEmail, setTempEmail] = useState(initialEmail); // 모달용 임시 이메일 상태
  const [isChanged, setIsChanged] = useState(false);

  // 모달 상태 관리
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuspendedOpen, setIsSuspendedOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const hasChanged = email !== initialEmail || visibility !== initialVisibility;
    setIsChanged(hasChanged);
  }, [email, visibility, initialEmail, initialVisibility]);

  // 이메일 변경 확인 핸들러
  const handleEmailConfirm = () => {
    console.log("이메일 변경 확정:", tempEmail);
    setEmail(tempEmail);
    setIsEmailModalOpen(false);
  };

  return (
    <section className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <div className="flex justify-between items-center">
        <h2 className="main-title-small-emphasized text-on-surface">계정</h2>
        <Button 
          variant="primary" 
          shape="round" 
          width="80px" 
          disabled={!isChanged}
          onClick={() => {
            console.log("최종 설정 저장됨");
            setIsChanged(false);
          }}
        >
          저장
        </Button>
      </div>

      {/* 2. 이메일 설정 */}
      <div className="flex flex-col gap-4">
        <h3 className="label-xlarge-emphasized text-on-surface">이메일</h3>
        <div className="flex gap-3 items-center bg-surface-variant-high px-6 h-14 rounded-medium">
          <div className="flex-1">
            <span className="label-large text-on-surface">{email}</span>
          </div>
          <Button 
            variant="surface" 
            size="sm" 
            shape="round" 
            onClick={() => {
              setTempEmail(email); // 현재 이메일을 임시 상태에 복사
              setIsEmailModalOpen(true);
            }}
          >
            변경
          </Button>
        </div>
      </div>

      {/* 3. 프로필 공개 설정 */}
      <div className="flex flex-col gap-4">
        <h3 className="label-xlarge-emphasized text-on-surface">프로필 공개 설정</h3>
        <div className="flex flex-col gap-3">
          {(['public', 'partial', 'private'] as const).map((type) => (
            <Button
              key={type}
              variant={visibility === type ? 'primary' : 'surface'}
              widthMode="fill"
              className={clsx(
                "justify-start px-4 py-6", 
                visibility !== type && "shadow-md shadow-gray-200/50 border border-gray-100"
              )}
              onClick={() => setVisibility(type)}
            >
              <div className="flex items-center gap-2">
                <span className="label-large-emphasized">
                  {type === 'public' ? '계정공개' : type === 'partial' ? '계정 일부 공개' : '계정 비공개'}
                </span>
                {type === 'partial' && (
                  <span className={clsx(
                    "label-medium opacity-70",
                    visibility === 'partial' ? 'text-surface' : 'text-on-surface-variant-lowest'
                  )}>
                    내가 승인한 팔로워만 볼 수 있습니다.
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 4. 계정 관리 액션 */}
      <div className="flex flex-col gap-3 mt-4">
        <Button 
          variant="surface" widthMode="fill" shape="square" 
          className='shadow-md shadow-gray-200/50 border border-gray-300 p-6 label-xlarge'
          onClick={() => setIsSuspendedOpen(true)}
        >
          계정 일시정지
        </Button>
        <Button 
          variant="surface" widthMode="fill" shape="square" textClassName="text-error"
          className='shadow-md shadow-gray-200/50 border border-gray-300 p-6 label-xlarge text-red-500'
          onClick={() => setIsDeleteOpen(true)}
        >
          계정 삭제
        </Button>
      </div>

      {/* 🟢 이메일 변경 모달 */}
      <Modal variant="confirm" open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)}>
        <Modal.Header title="이메일 주소 변경" />
        <Modal.Body>
          <div className="py-6 flex flex-col items-stretch gap-6 w-full px-2">
            <p className="label-xlarge text-on-surface-variant text-center">
              새로운 이메일 주소를 입력해 주세요.
            </p>
              <BaseField
                value={tempEmail}
                onChange={(val) => setTempEmail(val)}
                widthMode="fill"
                tone="surfaceVariantHigh"
                placeholder="이메일을 입력하세요"
                className="label-large"
              />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" shape="square" width="150px" widthMode="fixed" onClick={() => setIsEmailModalOpen(false)}>
              취소
            </Button>
            <Button variant="secondary" shape="square" width="150px" widthMode="fixed" textClassName="label-xlarge-emphasized" onClick={handleEmailConfirm}>
              확인
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* 🟢 계정 일시정지 모달 */}
      <Modal variant="confirm" open={isSuspendedOpen} onClose={() => setIsSuspendedOpen(false)}>
        <Modal.Header title="계정 일시정지" />
        <Modal.Body>
          <p className="text-center py-4">
            계정을 일시정지하시겠습니까?<br />
            정지 기간 동안 프로필이 타인에게 노출되지 않습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" shape="square" width="150px" widthMode="fixed" onClick={() => setIsSuspendedOpen(false)}>
              취소
            </Button>
            <Button variant="secondary" shape="square" width="150px" widthMode="fixed" textClassName="label-xlarge-emphasized" 
                    onClick={() => { console.log("계정 일시정지 실행"); setIsSuspendedOpen(false); }}>
              일시정지
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* 🟢 계정 삭제 모달 */}
      <Modal variant="confirm" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Header title="계정 삭제" />
        <Modal.Body>
          <p className="text-center py-4 text-error">
            정말로 계정을 삭제하시겠습니까?<br />
            삭제된 데이터는 복구할 수 없습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" shape="square" width="150px" widthMode="fixed" onClick={() => setIsDeleteOpen(false)}>
              취소
            </Button>
            <Button variant="secondary" shape="square" width="150px" widthMode="fixed" textClassName="label-xlarge-emphasized" 
                    onClick={() => { console.log("계정 삭제 실행"); setIsDeleteOpen(false); }}>
              삭제하기
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default AccountSection;