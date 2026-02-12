// src/features/upload/ui/views/UploadView.tsx
import type React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AnimatedLogoDraw } from "../../../onboarding/ui/AnimatedLogoDraw";
import { useUploadForm } from "../../config/useUploadForm";

import { UploadImagesSection } from "../sections/UploadImagesSection";
import { UploadOptionsSection } from "../sections/UploadOptionsSection";
import { UploadContentSection } from "../sections/UploadContentSection";
import { UploadActionsSection } from "../sections/UploadActionsSection";

export type UploadHeaderRender = (ctx: {
  uploadButtonNode: React.ReactNode;
}) => React.ReactNode;

// circle 제외
export type UploadMode = "free" | "daily" | "weekly";

export type UploadViewProps = {
  mode?: UploadMode;
  header?: React.ReactNode | UploadHeaderRender;
};

export function UploadView({ mode = "free", header }: UploadViewProps) {
  const navigate = useNavigate();

  const PAGE_WIDTH = 1372;

  const form = useUploadForm();

  // 오버레이 표시 여부
  const [isUploading, setIsUploading] = useState(false);
  // 업로드 성공 여부 (성공했을 때만 애니메이션 종료 후 이동)
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  const field = useMemo(() => {
    if (mode === "daily") return "DAILY" as const;
    if (mode === "weekly") return "WEEKLY" as const;
    return "FREE" as const;
  }, [mode]);

  const canUpload = form.canUpload;

  const onSubmit = async () => {
    if (!canUpload || isUploading) return;

    // 새 시도 시작
    setUploadSucceeded(false);
    setIsUploading(true);

    try {
      // ✅ 업로드(= presigned 발급 -> S3 PUT -> submissions 생성)까지 성공해야 true
      await form.submit(field);

      // 성공이면 오버레이 유지하고, 로고 애니메이션 끝난 뒤 onComplete에서 이동
      setUploadSucceeded(true);
    } catch (e) {
      // 실패면 즉시 오버레이 닫기
      setIsUploading(false);
      throw e;
    }
  };

  const onLogoComplete = () => {
    // 성공한 경우에만 홈으로 이동
    if (!uploadSucceeded) return;

    setIsUploading(false);
    navigate("/home");
  };

  const uploadButtonNode = (
    <UploadActionsSection
      canUpload={canUpload}
      isUploading={isUploading}
      onSubmit={onSubmit}
    />
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-[120px]" />

      <div className="w-[1372px] max-w-[92vw] flex flex-col">
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
            <AnimatedLogoDraw
              size={120}
              durationMs={1400}
              iterations={1}
              onComplete={onLogoComplete}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
