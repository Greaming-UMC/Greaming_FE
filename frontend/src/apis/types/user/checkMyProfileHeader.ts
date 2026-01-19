import type { ProfileHeaderResult } from '../common';

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */


// Response
export interface CheckMyWorksResult {
    profileHeader: ProfileHeaderResult;
}