import type React from "react";
import { useMemo, useState } from "react";

import { AnimatedLogoDraw } from "../../../onboarding/ui/AnimatedLogoDraw";
import { useUploadForm } from "../../model/useUploadForm";

import { UploadImagesSection } from "../sections/UploadImagesSection";
import { UploadOptionsSection } from "../sections/UploadOptionsSection";
import { UploadContentSection } from "../sections/UploadContentSection";
import { UploadActions } from "../sections/UploadActions";

export type UploadHeaderRender = (ctx: {
  uploadButtonNode: React.ReactNode;
}) => React.ReactNode;

export type UploadViewProps = {
  header?: React.ReactNode | UploadHeaderRender;
};

export function UploadView({ header }: UploadViewProps) {
  const PAGE_WIDTH = 1372;

  const form = useUploadForm();
  const [isUploading, setIsUploading] = useState(false);

  const canUpload = useMemo(() => {
    const hasImage = form.images.length > 0;
    const hasBody = form.body.trim().length > 0;
    const hasTags = form.hashtags.length > 0;
    return hasImage && hasBody && hasTags;
  }, [form.images.length, form.body, form.hashtags.length]);

  const onSubmit = async () => {
    if (!canUpload || isUploading) return;

    setIsUploading(true);
    try {
      await form.submit();
    } finally {
      setIsUploading(false);
    }
  };

  const uploadButtonNode = (
    <UploadActions
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
          <div className="flex items-center justify-between">
            <div className="sub-title-large-emphasized text-on-surface">
              그림 업로드
            </div>
            {uploadButtonNode}
          </div>
        )}

        <UploadImagesSection form={form} />
        <UploadOptionsSection form={form} />
        <UploadContentSection form={form} />
      </div>

      {isUploading ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-60" />
          <div className="relative text-white">
            <AnimatedLogoDraw size={120} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
