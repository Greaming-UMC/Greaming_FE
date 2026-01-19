import type { WorkRequestType, WorkMetadata } from '../common';

/**
 * 내 다음 페이지 작품들 조회 (GET //api/users/me/works)
 * URI: /api/users/me/works
 */

// Request
export interface CheckMyWorksRequest {
    request: WorkRequestType;
}

// Response
export interface CheckMyWorksResult {
    works: WorkMetadata[];
}