/**
 * 메인 화면 상단 조회 (GET /api/home)
 * URI: /api/home
 */
export type ChallengeTitleType = "일간 챌린지" | "주간 챌린지";

// Response
export interface CheckHomeHeaderResult {
    homeBanner : {
        dailyChallenge : {
            challengeId: number;
            title: ChallengeTitleType;
            end_at: string;
            participantCount: number;
        };
        weeklyChallenge : {
            challengeId: number;
            title: ChallengeTitleType;
            end_at: string;
            participantCount: number;
        };
    };
};
