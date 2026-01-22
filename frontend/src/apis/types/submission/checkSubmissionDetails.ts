import type { UsagePurpose, SubmissionCounters } from '../common';

/**
 * 게시물 상세 조회 (GET /api/submissions/{submissionId})
 * URI: /api/submissions/{submissionId}
 */
export type commentMetaData = {
    writer_nickname: string;
    writer_profileImgUrl: string;
    content: string;
    isLike: boolean;
};

export type SubmissionDetails = {
    submission: {
        nickname: string;
        profileImageUrl: string;
        level: UsagePurpose;
        image_list: string[];
        counters: SubmissionCounters;
        title: string;
        caption: string;
        tags: string[];
        upload_at: string;
    },
    other_submissions: {
        artist_submissions: string[];
        more_submissions: string[];
    },
    comment_list: commentMetaData[];
};



// Response
// ApiResultSuccessResponse<CheckSubmissionDetailsResult>
export type CheckSubmissionDetailsResult = SubmissionDetails;
