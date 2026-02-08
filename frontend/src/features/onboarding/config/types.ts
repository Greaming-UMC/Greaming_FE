export type Step = 1 | 2 | 3 | 4;

export type Purpose = "Sketcher" | "Painter" | "Artist" | "Master";

export type Hashtag =
  | "일러스트" | "풍경화" | "인물화" | "웹툰" | "수채화" | "유화"
  | "캐릭터" | "배경" | "드로잉" | "연필" | "크로키" | "디지털"
  | "귀여운" | "화려" | "깔끔" | "몽환" | "따뜻한" | "차가운";

export interface OnboardingDraft {
  nickname: string;
  tags: Hashtag[];        // 분야/스타일 전부 합쳐서 선택
  purpose: Purpose | null;
  weeklyGoal: number | null; // 10~100
}
