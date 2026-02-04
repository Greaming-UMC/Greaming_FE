export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};
export type UploadMode = "daily" | "weekly" | "circle";

export type UploadPageMeta = {
  mode: UploadMode;
  challengeId: number;
  circleId?: number | null;

  headerTitle: string;
  participantsText?: string;
  remainText?: string;
  topicText: string;
};