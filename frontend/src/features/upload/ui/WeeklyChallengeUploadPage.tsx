import { UploadView } from "./UploadView";
import { UploadHeader } from "./components/UploadHeader";

export default function WeeklyChallengeUploadPage() {
  return (
    <UploadView
      mode="weekly"
      header={({ uploadButtonNode }) => (
        <UploadHeader mode="weekly" actionSlot={uploadButtonNode} />
      )}
    />
  );
}
