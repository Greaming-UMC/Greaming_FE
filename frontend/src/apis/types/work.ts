/**
 * 유저 작품 목록 조회 API 요청 바디
 */
export interface GetUserWorksRequest {
  type: "ALL" | "SAVED";
  page: number;
  size: number;
}

/**
 * 유저 작품 정보
 */
export interface UserWork {
  workId: number;
  thumbnail_url: string;
  likes_count: number;
  comment_count: number;
  bookmark_count: number;
  is_liked: boolean;
}

/**
 * 유저 작품 목록 조회 API 응답 결과
 */
export interface GetUserWorksResult {
  work_list: UserWork[];
}