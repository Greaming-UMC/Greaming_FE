/**
 * 유저 다음 페이지 캘린더 조회 (GET /api/users/{userId}/calendar)
 * URI: /api/users/{userId}/calendar
 */

// Request
export interface CheckUserCalendarRequest {
    year: number;
    month: number;
};

// Response
// ApiResultResponse<CheckUserCalendarResult> 사용
export type CheckUserCalendarResult = {
    challengeCalendar : {
        dailyChallenge : string[];
        weeklyChallenge : string[];
    };
};
