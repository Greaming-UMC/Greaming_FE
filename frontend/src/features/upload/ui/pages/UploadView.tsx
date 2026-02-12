import type React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../../../../components/common";
import { useToast } from "../../../../components/common/feedback/Toast/ToastProvider";
import { useUploadForm } from "../../config/useUploadForm";

import { UploadImagesSection } from "../sections/UploadImagesSection";
import { UploadOptionsSection } from "../sections/UploadOptionsSection";
import { UploadContentSection } from "../sections/UploadContentSection";
import { UploadActionsSection } from "../sections/UploadActionsSection";

export type UploadHeaderRender = (ctx: {
  uploadButtonNode: React.ReactNode;
}) => React.ReactNode;

// circle 제외
export type UploadMode = "free" | "daily" | "weekly" | "circle";

export type UploadViewProps = {
  mode?: UploadMode;
  header?: React.ReactNode | UploadHeaderRender;
};

export function UploadView({ mode = "free", header }: UploadViewProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const PAGE_WIDTH = 1372;

  const form = useUploadForm();

  // 오버레이 표시 여부
  const [isUploading, setIsUploading] = useState(false);

  const field = useMemo(() => {
    if (mode === "daily") return "DAILY" as const;
    if (mode === "weekly") return "WEEKLY" as const;
    return "FREE" as const;
  }, [mode]);

  const canUpload = form.canUpload;

  const onSubmit = async () => {
    if (!canUpload || isUploading) return;

    setIsUploading(true);

    try {
      // 업로드(= presigned 발급 -> S3 PUT -> submissions 생성) 완료
      await form.submit(field);
      showToast("업로드가 완료되었습니다.", "success");
      setIsUploading(false);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("업로드에 실패했습니다. 잠시 후 다시 시도해주세요.", "error");
      setIsUploading(false);
    }
  };

  const uploadButtonNode = (
    <UploadActionsSection
      canUpload={canUpload}
      isUploading={isUploading}
      onSubmit={onSubmit}
    />
  );

  return (
    <div className="flex w-full flex-col items-center duration-600 ease-in-out">
      <div className="mt-10 max-w-[92vw] flex flex-col w-340">
        {header ? (
          <div className="mb-[12px]">
            {typeof header === "function"
              ? header({ uploadButtonNode })
              : header}
          </div>
        ) : (
          <div className="flex items-center justify-between mb-[12px]">
            <div className="sub-title-large-emphasized text-on-surface">
              그림 업로드
            </div>
            {uploadButtonNode}
          </div>
        )}

        <UploadImagesSection form={form} pageWidth={PAGE_WIDTH} />
        <UploadOptionsSection form={form} />
        <UploadContentSection form={form} pageWidth={PAGE_WIDTH} />
      </div>

      {isUploading ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-60" />
          <div className="relative text-white">
            <LoadingSpinner size={120} durationMs={1400} iterations="infinite" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
