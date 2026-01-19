import type { WorkRequestType, WorkMetadata } from '../common';

/**
 * 유저 다음 페이지 작품들 조회 (GET /api/users/{userId}/works)
 * URI: /api/users/{userId}/works
 */

// Request
export interface CheckUserWorksRequest {
    request: WorkRequestType;
}

// Response
export interface CheckUserWorksResult {
    works: WorkMetadata[];
}