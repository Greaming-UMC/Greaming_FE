import { Button } from "../../../../components/common";
import clsx from "clsx";

const PrivacySection = () => {

  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex justify-between items-center pb-2 pt-1">
        <h2 className="main-title-small-emphasized text-on-surface">개인정보</h2>
      </div>

      {/* 2. 데이터 관리 섹션 - 원본 gap-4 유지 */}
      <div className="flex flex-col gap-4 pb-80">

        <h3 className="sub-title-large-emphasized text-on-surface">데이터 관리</h3>
        
        {/* 원본 gap-2 유지 */}
        <div className="flex flex-col gap-2">
          {/* 내 데이터 다운로드 */}
          <Button
            variant="surface"
            widthMode="fill"
            className={clsx(
              "justify-start px-5 py-3 h-auto transition-all rounded-medium shadow-1",
            )}
            onClick={() => console.log("내 데이터 다운로드 클릭됨")}
          >
            <span className="label-large text-on-surface">내 데이터 다운로드</span>
          </Button>

          {/* 활동 기록 삭제 */}
          <Button
            variant="surface"
            widthMode="fill"
            className={clsx(
              "justify-start px-5 py-3 h-auto transition-all rounded-medium shadow-1"
            )}
            onClick={() => console.log("활동 기록 삭제 클릭됨")}
          >
            <span className="label-large text-on-surface">활동 기록 삭제</span>
          </Button>
        </div>
      </div>


      {/* 3. 하단 푸터 링크 - 원본 레이아웃(mt-auto, pt-20, gap-4) 유지 */}
      <div className="mt-auto pt-20 flex justify-center gap-4">
        <button 
          className="label-small text-on-surface-variant-lowest"
          onClick={() => console.log("이용약관 페이지로 이동")}
        >
          이용약관
        </button>
        <span className="label-small text-on-surface-variant-lowest">|</span>
        <button 
          className="label-small text-on-surface-variant-lowest font-bold"
          onClick={() => console.log("개인정보처리방침 페이지로 이동")}
        >
          개인정보처리방침
        </button>
        <span className="label-small text-on-surface-variant-lowest">|</span>
        <button 
          className="label-small text-on-surface-variant-lowest"
          onClick={() => console.log("커뮤니티 가이드라인 페이지로 이동")}
        >
          커뮤니티 가이드라인
        </button>
      </div>
    </section>
  );
};

export default PrivacySection;