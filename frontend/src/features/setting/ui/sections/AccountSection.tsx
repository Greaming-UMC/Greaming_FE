import { useState, useEffect } from "react";
import { BaseField, Button, Modal } from "../../../../components/common";
import clsx from "clsx";
import Icon from "../../../../components/common/Icon";

const AccountSection = () => {
  // --- 1. 상태 및 상수 관리 ---
  const initialEmail = "User@example.com";
  const [email, setEmail] = useState(initialEmail);
  const [visibility, setVisibility] = useState<'public' | 'partial' | 'private'>('public');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [isSuspendedOpen, setIsSuspendedOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🎨 테두리 스타일 (그림자 25%, 테두리 없음)
  const testCardStyle = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)] border-none";


  useEffect(() => {
    setIsChanged(email !== initialEmail || visibility !== 'public');
  }, [email, visibility]);

  
  return (
    <section className="flex flex-col gap-11">
      
      {/* --- 섹션 1: 헤더 --- */}
      <header className="flex justify-between">
        <h2 className="main-title-small-emphasized text-on-surface">계정</h2>
        <Button variant={isChanged ? "primary" : "surfaceVariant"} shape="round" widthMode="fixed" width="130px" disabled={!isChanged} onClick={() => setIsChanged(false)}>저장</Button>
      </header>

      {/* --- 섹션 2: 이메일 설정 --- */}
      <article className="flex flex-col gap-2">
        <h3 className="sub-title-large-emphasized text-on-surface mb-2">
          연동된 이메일
        </h3>
        <div className="flex flex-col gap-3">

          <div className="flex items-center justify-between w-full bg-surface-variant-high px-6 py-4 rounded-xl">
            <span className="label-xlarge-emphasized text-on-surface">
              {email}
            </span>
            <div className="flex items-center gap-3">
              <Icon name="google_simbol" size={24}/>
              <span className="label-small text-secondary-fixed bg-secondary-fixed-dim px-2 py-0.5 rounded-md border border-outline-variant">
                연동됨
              </span>
            </div>
          </div>


          <div className="flex items-center justify-between w-full bg-surface-variant-high px-6 py-4 rounded-xl">
            <span className="label-xlarge-emphasized text-on-surface">
              {email}
            </span>
            <div className="flex items-center gap-3">
              <Icon name="kakaotalk_simbol" size={24}/>
              <span className="label-small text-secondary-fixed bg-secondary-fixed-dim px-2 py-0.5 rounded-md border border-outline-variant">
                연동됨
              </span>
            </div>
          </div>

        </div>
      </article>

      {/* --- 섹션 3: 프로필 공개 설정 --- */}
      <article className="flex flex-col gap-3">
        <h3 className="sub-title-large-emphasized text-on-surface">프로필 공개 설정</h3>
        <div className="flex flex-col gap-3">
          {(['public', 'partial', 'private'] as const).map((type) => (
            <Button
              key={type}
              variant={visibility === type ? 'primary' : 'surface'}
              widthMode="fill"
              size="xl"
              className={clsx(
                "justify-start transition-all rounded-medium px-5!", 
                visibility !== type ? testCardStyle : "border border-primary"
              )}
              onClick={() => setVisibility(type)}
            >
              <div className="flex items-center gap-2 text-left">
                <span className="body-large-emphasized">
                  {type === 'public' ? '계정공개' : type === 'partial' ? '계정 일부 공개' : '계정 비공개'}
                </span>
                {type === 'partial' && (
                  <span className={clsx(
                    "label-medium",
                    visibility === 'partial' ? 'text-on-primary opacity-70' : 'text-on-surface-variant-lowest'
                  )}>
                    내가 승인한 팔로워만 볼 수 있습니다.
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </article>

      {/* --- 섹션 4: 위험 구역 (계정 관리) --- */}
      <article className="flex flex-col gap-3 mb-200">
        <Button 
          variant="surface" widthMode="fill" shape="square" 
          className={clsx("justify-center px-4 py-6 transition-all rounded-medium", testCardStyle)}
          textClassName="label-xlarge text-on-surface"
          onClick={() => setIsSuspendedOpen(true)}
        >
          계정 일시정지
        </Button>
        <Button 
          variant="surface" widthMode="fill" shape="square" 
          className={clsx("justify-center px-4 py-6 transition-all rounded-medium", testCardStyle)}
          textClassName="label-xlarge !text-error"
          onClick={() => setIsDeleteOpen(true)}
        >
          계정 삭제
        </Button>
      </article>

      {/* --- 모달 영역 (일시정지 / 삭제) --- */}
      {/* 1. 일시정지 모달 */}

      <Modal variant="confirm" open={isSuspendedOpen} onClose={() => setIsSuspendedOpen(false)}>
        <Modal.Header title="계정 일시정지" />
        <Modal.Body>
          <p className="text-center py-4 body-large text-on-surface">
            계정을 일시정지하시겠습니까?<br />
            정지 기간 동안 프로필이 타인에게 노출되지 않습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="secondary" shape="square" className="flex-1" textClassName="label-xlarge-emphasized" onClick={() => setIsSuspendedOpen(false)}>일시정지</Button>
            <Button variant="primary" shape="square" className="flex-1" onClick={() => setIsSuspendedOpen(false)}>취소</Button>
          </div>
        </Modal.Footer>
      </Modal>


      {/* 2. 삭제 모달 */}
      <Modal variant="confirm" open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <Modal.Header title="계정 삭제" />
        <Modal.Body>
          <p className="text-center py-4 body-large !text-error">
            정말로 계정을 삭제하시겠습니까?<br />
            삭제된 데이터는 복구할 수 없습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="secondary" shape="square" className="flex-1" textClassName="label-xlarge-emphasized" onClick={() => setIsDeleteOpen(false)}>삭제하기</Button>
            <Button variant="primary" shape="square" className="flex-1" onClick={() => setIsDeleteOpen(false)}>취소</Button>

          </div>
        </Modal.Footer>
      </Modal>

    </section>
  );
};

export default AccountSection;