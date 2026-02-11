import { UploadView } from "./UploadView";
import { UploadHeader } from "../components/UploadHeader";

export default function WeeklyChallengeUploadPage() {
  return (
    <UploadView
      header={({ uploadButtonNode }) => (
        <UploadHeader
          mode="weekly"
          participantsText="참여자 n명"
          remainText="남은시간 N시간 N분"
          topicText="'위클리 챌린지 주제'"
          actionSlot={uploadButtonNode}
        />
      )}
    />
  );
}
