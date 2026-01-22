import type { SubmissionCounters } from '../common';

/**
 * 게시물 미리보기 (GET /api/submissions/{submissionId}/preview)
 * URI: /api/submissions/{submissionId}/preview
 */

// Response
// ApiResultSuccessResponse<PreviewCounterSubmissionsResult>
export type PreviewCounterSubmissionsResult = {
    submissionId: string;
    imageUrl: string;
    counters: SubmissionCounters;
};