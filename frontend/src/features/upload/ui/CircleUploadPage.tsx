import { UploadView } from "./UploadView";
import { UploadHeader } from "./components/UploadHeader";

export default function CircleUploadPage() {
  return (
    <UploadView
      mode="circle"
      header={({ uploadButtonNode }) => (
        <UploadHeader mode="circle" actionSlot={uploadButtonNode} />
      )}
    />
  );
}
