import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../../../components/common";
import { useToast } from "../../../components/common/feedback/Toast/ToastProvider";
import { useUploadForm } from "../hooks";
import { useUIStore } from "../../../stores/useUIStore";

import { UploadImagesSection } from "./section/UploadImagesSection";
import { UploadOptionsSection } from "./section/UploadOptionsSection";
import { UploadContentSection } from "./section/UploadContentSection";
import { UploadActionsSection } from "./section/UploadActionsSection";

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
  const dailyChallengeInfo = useUIStore((state) => state.dailyChallengeInfo);
  const weeklyChallengeInfo = useUIStore((state) => state.weeklyChallengeInfo);

  // 오버레이 표시 여부
  const [isUploading, setIsUploading] = useState(false);

  const submitMeta = useMemo(() => {
    if (mode === "daily") {
      return {
        field: "DAILY" as const,
        challengeId: dailyChallengeInfo?.challengeId ?? null,
        visibility: "PUBLIC" as const,
      };
    }

    if (mode === "weekly") {
      return {
        field: "WEEKLY" as const,
        challengeId: weeklyChallengeInfo?.challengeId ?? null,
        visibility: "PUBLIC" as const,
      };
    }

    if (mode === "circle") {
      return {
        field: "FREE" as const,
        challengeId: null,
        visibility: "CIRCLE" as const,
      };
    }

    return {
      field: "FREE" as const,
      challengeId: null,
      visibility: "PUBLIC" as const,
    };
  }, [mode, dailyChallengeInfo?.challengeId, weeklyChallengeInfo?.challengeId]);

  const canUpload = form.canUpload;

  const onSubmit = useCallback(async () => {
    if (!canUpload || isUploading) return;

    setIsUploading(true);

    try {
      // 업로드(= presigned 발급 -> S3 PUT -> submissions 생성) 완료
      await form.submit(submitMeta);
      showToast("업로드가 완료되었습니다.", "success");
      setIsUploading(false);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("업로드에 실패했습니다. 잠시 후 다시 시도해주세요.", "error");
      setIsUploading(false);
    }
  }, [canUpload, isUploading, form, submitMeta, showToast, navigate]);

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
