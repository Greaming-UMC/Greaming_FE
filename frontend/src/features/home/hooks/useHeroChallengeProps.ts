export const useHeroChallengeProps = () => {
  const dailyProps = {
    type: "DAILY" as const,
    title: "Daily Challenge",
    participantText: "참여자 128명 |",
    timeLeftText: "남은시간 03시간 20분",
    topic: "하늘을 나는 자동차",
  };

  const weeklyProps = {
    type: "WEEKLY" as const,
    title: "Weekly Challenge",
    participantText: "참여자 542명 |",
    timeLeftText: "남은시간 3일 12시간",
    topic: "자신 마음속에 있는 괴물",
  };

  return { dailyProps, weeklyProps };
};
