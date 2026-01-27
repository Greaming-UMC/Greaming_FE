// 헤더 nav에서 MyRoom 탭과 연동되는 페이지 컴포넌트입니다.

import PageContainer from "../components/common/layouts/PageContainer";

const MyRoomPage = () => {
  return (
    <div className="pt-[82px]">
      <PageContainer>
        <h1 className="headline-large mb-8">My Room Page</h1>

        {/* 스크롤 테스트용 더미 컨텐츠 */}
        <div className="space-y-40 py-20">
          <div className="h-[600px] rounded-large bg-surface-variant" />
          <div className="h-[600px] rounded-large bg-surface-variant" />
          <div className="h-[600px] rounded-large bg-surface-variant" />
        </div>
      </PageContainer>
    </div>
  );
};

export default MyRoomPage;
