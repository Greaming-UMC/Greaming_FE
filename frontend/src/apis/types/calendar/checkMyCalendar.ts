/**
 * 내 다음 페이지 캘린더 조회 (GET /api/users/me/calendar)
 * URI: /api/users/me/calendar
 */

// Request
export interface CheckMyCalendarRequest {
    year: number;
    month: number;
};

// Response
// ApiResultResponse<CheckMyCalendarResult> 사용
export type CheckMyCalendarResult = {
    challengeCalendar : {
        dailyChallenge : string[];
        weeklyChallenge : string[];
    };
};
