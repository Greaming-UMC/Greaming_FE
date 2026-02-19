import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { WorkDetail } from "../../../apis/types/submission/checkSubmissionDetails";
import ArtistArtwork from "./ArtistArtwork";
import DetailPost from "./DetailPost";
import ActionSideBar from "./section/ActionSideBar";
import RecommendedGrid from "./section/RecommendedGrid";
import { useSubmissionDetail } from "../hooks/queries/useSubmissionDetail";
import { useMyProfile } from "../hooks/queries/useMyProfile";
import { useIsMe } from "../hooks/queries/useIsMe";
import { useUserSubmissions } from "../hooks/queries/useUserSubmissions";
import { useRecommendedSubmissions } from "../hooks/queries/useRecommendedSubmissions";
import { useDetailActions } from "../hooks/useDetailActions";

const DetailView = () => {
  const params = useParams<{ id?: string; submissionId?: string; postId?: string }>();
  const id = params.id || params.submissionId || params.postId;
  const submissionId = id ? parseInt(id, 10) : null;

  // TanStack Query로 병렬 API 호출
  const {
    data: submissionData,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useSubmissionDetail(submissionId!);

  const { data: profileData } = useMyProfile();

  const userId = submissionData?.result?.submission.userId;
  const { data: isMeData } = useIsMe(userId);
  const { data: userWorksData } = useUserSubmissions(userId, 10);
  const { data: recommendedData } = useRecommendedSubmissions(1, 8);

  // 액션 핸들러 및 로컬 상태
  const {
    counts,
    comments,
    pageInfo,
    initFromApi,
    handleCommentCreated,
    handleToggleLike,
    handleLoadMoreComments,
  } = useDetailActions({ submissionId });

  // 최초 데이터 로드 시 상태 초기화
  useEffect(() => {
    if (submissionData?.result) {
      const { submission, commentPage } = submissionData.result;
      initFromApi(submission, commentPage.comments, commentPage.pageInfo);
    }
  }, [submissionData, initFromApi]);

  // 데이터 변환
  const submission = useMemo((): WorkDetail | null => {
    if (!submissionData?.result) return null;
    const s = submissionData.result.submission;
    return {
      nickname: s.nickname,
      profileImageUrl: s.profileImageUrl ?? "",
      level: s.level,
      image_list: s.imageList,
      title: s.title,
      caption: s.caption,
      tags: s.tags.map((tag) => tag.tagName),
      upload_at: s.uploadAt,
      userId: s.userId,
      likes_count: s.likesCount,
      comment_count: s.commentCount,
      bookmark_count: s.bookmarkCount,
      field: s.field,
      challengeId: s.challengeId,
      challengeTitle: submissionData.result.challengeTitle,
    };
  }, [submissionData]);

  const currentUserProfileImg = useMemo(() => {
    if (!profileData?.result) return null;
    const userInfo = profileData.result.userInformation || profileData.result.user_information;
    return userInfo?.profileImgUrl ?? null;
  }, [profileData]);

  const isMe = isMeData?.result?.isMe ?? false;
  const recommendedSubmissions = recommendedData?.result?.submissions ?? [];
  const userSubmissions = userWorksData?.result?.submissions ?? [];

  // 에러 / 로딩 처리
  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-error">게시물 ID가 제공되지 않았습니다.</p>
      </div>
    );
  }

  if (isNaN(submissionId!)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-error">잘못된 게시물 ID입니다.</p>
      </div>
    );
  }

  if (isSubmissionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (submissionError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-error">
          {submissionError instanceof Error
            ? submissionError.message
            : "데이터를 불러오는 중 오류가 발생했습니다."}
        </p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-error">게시물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-variant-high relative w-full min-h-screen h-fit flex flex-col items-center gap-12 pb-24 p-10 max-w-[1531px] mx-auto px-40">
      <aside className="absolute left-10 top-0 h-full hidden lg:block pointer-events-none z-10">
        <div className="sticky top-24 pt-[88px] pointer-events-auto">
          <ActionSideBar
            likes={counts.likes}
            comments={counts.comments}
            scraps={counts.scraps}
            liked={counts.liked}
            onToggleLike={handleToggleLike}
          />
        </div>
      </aside>

      <div className="shrink-0 w-full relative">
        <DetailPost
          submission={submission}
          comment_list={comments}
          submissionId={submissionId!}
          onCommentCreated={handleCommentCreated}
          isMe={isMe}
          currentUserProfileImg={currentUserProfileImg}
          onLoadMoreComments={handleLoadMoreComments}
          hasMoreComments={pageInfo ? !pageInfo.isLast : false}
        />
      </div>
      <div className="shrink-0 w-full">
        <ArtistArtwork artworks={userSubmissions} />
      </div>
      <div className="w-full shrink-0">
        <RecommendedGrid artworks={recommendedSubmissions} />
      </div>
    </div>
  );
};

export default DetailView;
