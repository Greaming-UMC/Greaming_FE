import { UploadView } from "./UploadView";
import { UploadHeader } from "../components/UploadHeader";

export default function DailyUploadPage() {
  return (
    <UploadView
      mode="daily"
      header={({ uploadButtonNode }) => (
        <UploadHeader
          mode="daily"
          participantsText="참여자 n명"
          remainText="남은시간 N시간 N분"
          topicText="'데일리 챌린지 주제'"
          actionSlot={uploadButtonNode}
        />
      )}
    />
  );
}
