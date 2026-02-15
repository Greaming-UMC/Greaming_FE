import { useEffect, useState, useCallback } from "react";
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
import {
  getSubmissionDetails,
  toggleSubmissionLike,
  checkIsMe,
  getRecommendedSubmissions,
  getUserSubmissions,
  getMyProfile,
} from "../api/api";
import type { RecommendedSubmission } from "../../../apis/types/submission/getRecommendedSubmissions";
import type { UserSubmission } from "../../../apis/types/submission/getUserSubmissions";

const DetailView = () => {
  // useParams가 반환하는 전체 파라미터 객체를 확인하여 정확한 키 이름을 찾습니다.
  // 일반적인 키 이름인 'id', 'submissionId', 'postId'를 모두 확인합니다.
  const params = useParams<{ id?: string; submissionId?: string; postId?: string }>();
  const id = params.id || params.submissionId || params.postId;
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  const [submission, setSubmission] = useState<WorkDetail | null>(
    null,
  );
  // 최적화: 동적으로 변하는 카운트(댓글, 좋아요 등)를 submission 객체에서 분리합니다.
  const [counts, setCounts] = useState({
    likes: 0,
    comments: 0,
    scraps: 0,
    liked: false, // '좋아요' 상태 추가
  });
  const [isMe, setIsMe] = useState(false);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  const [recommendedSubmissions, setRecommendedSubmissions] = useState<
    RecommendedSubmission[]
  >([]);
  const [userSubmissions, setUserSubmissions] = useState<
    UserSubmission[]
  >([]);
  const [currentUserProfileImg, setCurrentUserProfileImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("게시물 ID가 제공되지 않았습니다.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
          setError("잘못된 게시물 ID입니다.");
          setLoading(false);
          return;
        }
        setSubmissionId(parsedId);

        const response = await getSubmissionDetails(parsedId);

        // 현재 로그인한 유저의 프로필 정보 조회
        try {
          const myProfileResponse = await getMyProfile();
          if (myProfileResponse.isSuccess && myProfileResponse.result) {
            const userInfo = myProfileResponse.result.userInformation || myProfileResponse.result.user_information;
            if (userInfo?.profileImgUrl) {
              setCurrentUserProfileImg(userInfo.profileImgUrl);
            }
          }
        } catch (profileError) {
          console.error('현재 유저 프로필을 불러오는 데 실패했습니다.', profileError);
        }

        if (response.isSuccess && response.result) {
          const { submission: apiSubmission, commentPage } = response.result;

          // submission 객체는 이제부터 내용이 변하지 않는 "원본 데이터"로 취급합니다.
          const transformedSubmission: WorkDetail = {
            nickname: apiSubmission.nickname,
            profileImageUrl: apiSubmission.profileImageUrl ?? "",
            level: apiSubmission.level,
            image_list: apiSubmission.imageList,
            title: apiSubmission.title,
            caption: apiSubmission.caption,
            tags: apiSubmission.tags.map(
              (tag: { tagName: string }) => tag.tagName,
            ),
            upload_at: apiSubmission.uploadAt,
            // 카운트 정보는 별도 state로 관리하므로 여기서는 제외하거나 초기값으로만 사용합니다.
            likes_count: apiSubmission.likesCount,
            comment_count: apiSubmission.commentCount,
            bookmark_count: apiSubmission.bookmarkCount,
          };

          setSubmission(transformedSubmission);
          setComments(commentPage.comments);
          setCounts({
            likes: apiSubmission.likesCount,
            comments: apiSubmission.commentCount,
            scraps: apiSubmission.bookmarkCount,
            liked: apiSubmission.liked,
          });

          // 본인 여부 확인 API 호출
          if (apiSubmission.userId) {
            const isMeResponse = await checkIsMe(apiSubmission.userId);
            if (isMeResponse.isSuccess && isMeResponse.result) {
              setIsMe(isMeResponse.result.isMe);
            }

            // 작가의 다른 작품 목록 조회
            try {
              const userSubmissionsResponse = await getUserSubmissions(
                apiSubmission.userId,
                { size: 10 }, // 캐러셀에 표시할 개수
              );
              if (
                userSubmissionsResponse.isSuccess &&
                userSubmissionsResponse.result
              ) {
                setUserSubmissions(
                  userSubmissionsResponse.result.submissions,
                );
              }
            } catch (userSubmissionsError) {
              console.error(
                "작가의 다른 작품을 불러오는 데 실패했습니다.",
                userSubmissionsError,
              );
            }
          }

          // 추천 게시물 목록 조회
          try {
            const recommendedResponse = await getRecommendedSubmissions({
              page: 1,
              size: 8, // 그리드에 표시할 개수
              sortBy: "recommend",
            });
            if (recommendedResponse.isSuccess && recommendedResponse.result) {
              setRecommendedSubmissions(
                recommendedResponse.result.submissions,
              );
            }
          } catch (recommendedError) {
            // 추천 게시물 로딩 실패는 전체 페이지 로딩을 막지 않도록 별도로 처리합니다.
            console.error("추천 게시물을 불러오는 데 실패했습니다.", recommendedError);
          }
        } else {
          setError(response.message || "게시물 정보를 불러오는데 실패했습니다.");
        }
      } catch (e) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // 최적화: onCommentCreated 함수가 DetailView 리렌더링 시 재생성되는 것을 방지합니다.
  const handleCommentCreated = useCallback(
    (newApiComment: CreateCommentResult) => {
      // API 응답을 기존 댓글 목록 타입(CommentDetail)에 맞게 변환합니다.
      const newComment = {
        ...newApiComment,
      } as CommentDetail & { commentId: number };

      setComments((prevComments) => [...prevComments, newComment]);

      // submission 객체를 직접 수정하는 대신, 분리된 counts state만 업데이트합니다.
      // 이로 인해 submission prop의 참조 안정성이 유지됩니다.
      setCounts((prev) => ({ ...prev, comments: prev.comments + 1 }));
    },
    [],
  );

  const handleToggleLike = useCallback(async () => {
    if (submissionId === null) return;

    try {
      const response = await toggleSubmissionLike(submissionId);
      if (response.isSuccess && response.result) {
        const likeResult = response.result;
        // API 응답으로 '좋아요' 상태와 개수를 즉시 업데이트
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

  if (loading) {
    return <div>로딩 중...</div>; // TODO: 로딩 스피너 컴포넌트로 교체
  }

  if (error) {
    return <div>오류: {error}</div>; // TODO: 에러 처리 UI 컴포넌트로 교체
  }

  if (!submission || submissionId === null) {
    return <div>게시물을 찾을 수 없습니다.</div>; // TODO: "찾을 수 없음" UI 컴포넌트로 교체
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
