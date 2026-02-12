import type { PageInfo } from "../common";

/**
 * 댓글 정보
 */
export interface CommentDetail {
  commentId?: number;
  userId?: number;
  writer_nickname: string;
  writer_profileImgUrl?: string | null;
  content: string;
  createdAt?: string;
  replyCount?: number;
  isWriter?: boolean;
  isLike: boolean;
  likeCount?: number;
}

/**
 * 상세 화면에서 사용하는 작품 표시 타입
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
 * 작품 상세 조회 API - 작품 본문
 */
export interface SubmissionDetail {
  submissionId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  level: string;
  imageList: string[];
  title: string;
  caption: string;
  tags: Array<{ tagName: string }>;
  uploadAt: string;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
  liked: boolean;
}

export interface SubmissionDetailsCommentPage {
  comments: CommentDetail[];
  pageInfo: PageInfo;
}

/**
 * 작품 상세 정보 API의 `result` 필드 타입
 */
export interface SubmissionDetails {
  submission: SubmissionDetail;
  commentPage: SubmissionDetailsCommentPage;
}
