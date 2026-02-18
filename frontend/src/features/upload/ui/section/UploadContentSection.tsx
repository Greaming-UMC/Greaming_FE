import type { UploadForm } from "../../hooks";

import { WriteBodyField } from "../../../../components/common/post/WriteBodyField";
import { HashtagField } from "../components/HashtagField";

type Props = {
  form: UploadForm;
  pageWidth: number;
};

export function UploadContentSection({ form }: Props) {
  const SECTION_GAP = "gap-[16px]"; 
  const INNER_GAP = "gap-[10px]";   

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
      {/* 제목 */}
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
        <div className="sub-title-large-emphasized text-on-surface">
          설명/내용<span className="text-error">*</span>
        </div>

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
