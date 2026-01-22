/**
 * 게시물 미리보기 (GET /api/submissions/{submissionId}/preview)
 * URI: /api/submissions/{submissionId}/preview
 */

// Response
// ApiResultSuccessResponse<PreviewTagSubmissionsResult>
export type PreviewTagSubmissionsResult = {
    submissionId: string;
    imageUrl: string;
    tags: string[];
};