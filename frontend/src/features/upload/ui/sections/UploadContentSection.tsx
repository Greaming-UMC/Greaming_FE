import type { useUploadForm } from "../../model/useUploadForm";

import { WriteBodyField } from "../../../../components/common/post/WriteBodyField";
import { HashtagField } from "../components/HashtagField";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
  pageWidth: number; 
};

export function UploadContentSection({ form }: Props) {
  return (
    <div
      className={[
        "flex flex-col",
        "w-[1372px] h-[414px]",            
        "px-[28px] py-[24px]",             
        "rounded-[20px]",                  
        "bg-surface-variant-high",        
        "box-border",                     
        "gap-[16px]",                      
        "mt-[16px] mb-[40px]",             
      ].join(" ")}
    >
      {/* 설명/내용 */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="sub-title-large-emphasized text-on-surface">설명/내용</div>

        <div className="w-full">
          <WriteBodyField
            value={form.body}
            onChange={form.setBody}
            maxLength={350}
          />
        </div>
      </div>

      {/* 해시태그 */}
      <div className="w-full">
        <HashtagField
          value={form.hashtagInput}
          onChange={form.setHashtagInput}
          tags={form.hashtags.map((t) => `#${t}`)} 
          onAddTag={() => form.commitHashtags()}     
          onRemoveTag={(t) => form.removeHashtag(t)} 
        />
      </div>
    </div>
  );
}
