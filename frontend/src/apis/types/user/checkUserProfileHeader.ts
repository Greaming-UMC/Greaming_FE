import type { ProfileHeaderResult } from '../common';

/**
 * 유저 프로필정보 (GET /api/users/{userId})
 * URI: /api/users/{userId}
 */


// Response
export interface CheckUserWorksResult {
    profileHeader: ProfileHeaderResult;
}