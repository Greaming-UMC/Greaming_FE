import { UploadView } from "./UploadView";
import { UploadHeader } from "../components/UploadHeader";

export default function CircleUploadPage() {
  return (
    <UploadView
      mode="circle"
      header={({ uploadButtonNode }) => (
        <UploadHeader
          mode="circle"
          topicText="'써클이름'에 그림 업로드"
          actionSlot={uploadButtonNode}
        />
      )}
    />
  );
}
