import type { SubmissionMetadata } from '../common';

/**
 * 일간/주간 챌린지 조회 (GET /api/challenges/{challengeId}/submissions)
 * URI: /api/challenges/{challengeId}/submissions
 */

// Request
export interface CheckChallengeSubmissionsRequest {
    page?: number | null;
    size?: number | null;
};

// Response
export interface CheckChallengeSubmissionsResponse {
    challenge_submission_list : SubmissionMetadata[];
};
