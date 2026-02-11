// src/features/upload/ui/sections/UploadContentSection.tsx

import type { useUploadForm } from "../../config/useUploadForm";

import { WriteBodyField } from "../../../../components/common/post/WriteBodyField";
import { HashtagField } from "../components/HashtagField";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
  pageWidth: number;
};

export function UploadContentSection({ form }: Props) {
  // ✅ 간격을 한 곳에서 통일 관리
  const SECTION_GAP = "gap-[16px]"; // 섹션(제목/설명/해시태그) 간격
  const INNER_GAP = "gap-[10px]";   // 라벨 ↔ 입력 간격 (원래 UI 느낌 유지)
  // 만약 “완전 동일 간격” 원하면 INNER_GAP도 gap-[16px]로 바꾸면 끝.

  const inputRow =
    "w-full box-border flex items-center " +
    "h-[50px] px-[16px] " +
    "bg-surface rounded-small";

  const inputBase =
    "w-full bg-transparent outline-none body-large-emphasized " +
    "placeholder:text-on-surface-variant-lowest";

  return (
    <div
      className={[
        "flex flex-col",
        "w-[1372px] h-[497px]",
        "px-[28px] py-[24px]",
        "rounded-[20px]",
        "bg-surface-variant-high",
        "box-border",
        SECTION_GAP,
        "mt-[16px] mb-[40px]",
      ].join(" ")}
    >
      {/* ✅ 제목 */}
      <div className={["flex flex-col w-full", INNER_GAP].join(" ")}>
        <div className="sub-title-large-emphasized text-on-surface">
          제목<span className="text-error">*</span>
        </div>

        <div className={inputRow}>
          <input
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            placeholder="작성하기"
            className={inputBase}
          />
        </div>
      </div>

      {/* 설명/내용 */}
      <div className={["flex flex-col w-full", INNER_GAP].join(" ")}>
        <div className="sub-title-large-emphasized text-on-surface">설명/내용</div>

        <div className="w-full">
          <WriteBodyField value={form.body} onChange={form.setBody} maxLength={350} />
        </div>
      </div>

      {/* 해시태그 */}
      <div className="w-full">
        <HashtagField
          value={form.hashtagInput}
          onChange={form.setHashtagInput}
          tags={form.hashtags}
          onAddTags={form.commitHashtags}
          onRemoveTag={form.removeHashtag}
        />
      </div>
    </div>
  );
}