/**
 * GET /api/users/{targetUserId}/is-me
 * 대상 유저가 본인인지 확인
 */

// Response
export interface CheckIsMeResult {
  isMe: boolean;
}