import { UploadView } from "./UploadView";
import { UploadHeader } from "./components/UploadHeader";

export default function DailyUploadPage() {
  return (
    <UploadView
      mode="daily"
      header={({ uploadButtonNode }) => (
        <UploadHeader mode="daily" actionSlot={uploadButtonNode} />
      )}
    />
  );
}
