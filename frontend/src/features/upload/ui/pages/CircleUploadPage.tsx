import { UploadView } from "../view/UploadView";
import { UploadHeader } from "../components/UploadHeader";

export default function CircleUploadPage() {
  return (
    <UploadView
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
