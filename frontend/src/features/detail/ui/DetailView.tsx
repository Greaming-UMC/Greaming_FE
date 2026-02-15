import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import type {
  CommentDetail,
  WorkDetail,
} from "../../../apis/types/submission/checkSubmissionDetails";
import type { CreateCommentResult } from "../../../apis/types/submission/createComment";
import ArtistArtwork from "./ArtistArtwork";
import DetailPost from "./DetailPost";
import ActionSideBar from "./section/ActionSideBar";
import RecommendedGrid from "./section/RecommendedGrid";
import { toggleSubmissionLike } from "../api/api";
import { useSubmissionDetail } from "../hooks/queries/useSubmissionDetail";
import { useMyProfile } from "../hooks/queries/useMyProfile";
import { useIsMe } from "../hooks/queries/useIsMe";
import { useUserSubmissions } from "../hooks/queries/useUserSubmissions";
import { useRecommendedSubmissions } from "../hooks/queries/useRecommendedSubmissions";

const DetailView = () => {
  const params = useParams<{ id?: string; submissionId?: string; postId?: string }>();
  const id = params.id || params.submissionId || params.postId;
  const submissionId = id ? parseInt(id, 10) : null;

  // TanStack Query hooks - 모든 API 병렬 실행
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

  // 로컬 상태 (카운트는 여전히 로컬 관리 - 좋아요/댓글 추가 시 즉시 업데이트용)
  const [counts, setCounts] = useState({
    likes: 0,
    comments: 0,
    scraps: 0,
    liked: false,
  });
  const [comments, setComments] = useState<CommentDetail[]>([]);

  // 초기 데이터 설정 (submissionData가 로드되면 한 번만 실행)
  useEffect(() => {
    if (submissionData?.result) {
      const apiSubmission = submissionData.result.submission;
      setCounts({
        likes: apiSubmission.likesCount,
        comments: apiSubmission.commentCount,
        scraps: apiSubmission.bookmarkCount,
        liked: apiSubmission.liked,
      });
      setComments(submissionData.result.commentPage.comments);
    }
  }, [submissionData]);

  // 데이터 변환 - useMemo로 최적화
  const submission = useMemo(() => {
    if (!submissionData?.result) return null;

    const apiSubmission = submissionData.result.submission;
    const transformedSubmission: WorkDetail = {
      nickname: apiSubmission.nickname,
      profileImageUrl: apiSubmission.profileImageUrl ?? "",
      level: apiSubmission.level,
      image_list: apiSubmission.imageList,
      title: apiSubmission.title,
      caption: apiSubmission.caption,
      tags: apiSubmission.tags.map((tag: { tagName: string }) => tag.tagName),
      upload_at: apiSubmission.uploadAt,
      likes_count: apiSubmission.likesCount,
      comment_count: apiSubmission.commentCount,
      bookmark_count: apiSubmission.bookmarkCount,
    };

    return transformedSubmission;
  }, [submissionData]);

  // 현재 사용자 프로필 이미지
  const currentUserProfileImg = useMemo(() => {
    if (!profileData?.result) return null;
    const userInfo = profileData.result.userInformation || profileData.result.user_information;
    return userInfo?.profileImgUrl || null;
  }, [profileData]);

  // 본인 여부
  const isMe = isMeData?.result?.isMe ?? false;

  // 추천 게시물
  const recommendedSubmissions = recommendedData?.result?.submissions ?? [];

  // 작가의 다른 작품
  const userSubmissions = userWorksData?.result?.submissions ?? [];

  // 댓글 생성 핸들러
  const handleCommentCreated = useCallback(
    (newApiComment: CreateCommentResult) => {
      const newComment = {
        ...newApiComment,
      } as CommentDetail & { commentId: number };

      setComments((prevComments) => [...prevComments, newComment]);
      setCounts((prev) => ({ ...prev, comments: prev.comments + 1 }));
    },
    [],
  );

  // 좋아요 토글 핸들러
  const handleToggleLike = useCallback(async () => {
    if (submissionId === null) return;

    try {
      const response = await toggleSubmissionLike(submissionId);
      if (response.isSuccess && response.result) {
        const likeResult = response.result;
        setCounts((prev) => ({
          ...prev,
          likes: likeResult.likeCount,
          liked: likeResult.isLiked,
        }));
      } else {
        alert(`좋아요 처리 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      alert("좋아요를 처리하는 동안 오류가 발생했습니다.");
    }
  }, [submissionId]);

  // 에러 처리
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
          submissionId={submissionId}
          onCommentCreated={handleCommentCreated}
          isMe={isMe}
          currentUserProfileImg={currentUserProfileImg}
        />
      </div>
      <div className="shrink-0  w-full">
        <ArtistArtwork artworks={userSubmissions} />
      </div>
      <div className="w-full shrink-0">
        <RecommendedGrid artworks={recommendedSubmissions} />
      </div>
    </div>
  );
};

export default DetailView;
