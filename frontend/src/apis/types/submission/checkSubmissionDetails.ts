/**
 * 댓글 정보
 */
export interface CommentDetail {
  writer_nickname: string;
  writer_profileImgUrl: string;
  content: string;
  /**
   * API 응답에서 `isLike`와 `isLiked`가 혼용되고 있어 `isLike`로 통일합니다.
   * 백엔드와 협의하여 필드명을 하나로 통일하는 것을 권장합니다.
   */
  isLike: boolean;
}

/**
 * 작가의 다른 작품 정보 (썸네일 URL 목록)
 */
export interface OtherWorks {
  artist_works: string[];
  more_works: string[];
}

/**
 * 작품의 상세 정보
 */
export interface WorkDetail {
  nickname: string;
  profileImageUrl: string;
  level: string;
  image_list: string[];
  likes_count: number;
  comment_count: number;
  bookmark_count: number;
  title: string;
  caption: string;
  tags: string[];
  upload_at: string;
}

/**
 * 작품 상세 정보 API의 `result` 필드 타입
 */
export interface SubmissionDetails {
  work: WorkDetail;
  other_works: OtherWorks;
  comment_list: CommentDetail[];
}