import { UploadView } from "../../features/upload";
import { UploadHeader } from "../../features/upload/ui/components/UploadHeader";

export default function UploadPageRoute() {
  return (
    <UploadView
      mode="free"
      header={({ uploadButtonNode }) => (
        <UploadHeader mode="free" actionSlot={uploadButtonNode} />
      )}
    />
  );
}
