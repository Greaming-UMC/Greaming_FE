/*
 * 게시물 미리보기 조회 - 태그 (GET /api/submissions/{submissionsId}/preview)
 * URI: /api/submissions/{submissionsId}/preview
 */

export interface CheckSubmissionPreviewResult {
  submissionId: number;
  thumbnailUrl: string;
  title: string;
  tags: string[];
}
