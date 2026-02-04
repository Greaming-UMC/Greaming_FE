/**
 * 추천 작품 아이템 요약 정보
 * (기존 useRecommendedArts.ts의 RecommendArt 타입과 동일)
 */
export interface RecommendedArt {
  id: number;
  title: string;
  src: string;
  likes_count: number;    // likes -> likes_count
  comment_count: number;  // comments -> comment_count
  bookmark_count: number; // 새로 추가
}

/**
 * 추천 작품 목록 조회 API 요청 파라미터
 */
export interface GetRecommendedArtsRequest {
  page: number;
  size: number;
}

/**
 * 추천 작품 목록 조회 API 응답 결과 (data.result)
 * useInfiniteQuery와 함께 사용하기 위해 nextPage, isLast를 포함합니다.
 */
export interface GetRecommendedArtsResult {
  items: RecommendedArt[];
  nextPage: number | undefined;
  isLast:boolean;
}