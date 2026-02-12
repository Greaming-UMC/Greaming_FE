import type {
  CheckUserSubmissionsRequest,
  CheckUserSubmissionsResult,
  UserSubmissionItem,
  UserSubmissionPageInfo,
} from "./checkUserSubmissions";

/**
 * 통일 타입 alias
 * - self/other 모두 /api/submissions/user/{userId} 기반으로 조회
 */
export type CheckMySubmissionsRequest = CheckUserSubmissionsRequest;
export type CheckMySubmissionsResult = CheckUserSubmissionsResult;
export type MySubmissionItem = UserSubmissionItem;
export type MySubmissionPageInfo = UserSubmissionPageInfo;
