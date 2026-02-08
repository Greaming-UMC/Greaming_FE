import type { useUploadForm } from "../../model/useUploadForm";
import { Checkbox } from "../../../../components/common/input/Checkbox/Checkbox";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
  pageWidth: number;
};

export function UploadOptionsSection({ form, pageWidth }: Props) {
  return (
    <div
      className="flex items-center mt-[16px] gap-[11px]"
      style={{ width: pageWidth }}
    >
      <Checkbox checked={form.isPrivate} onChange={form.setIsPrivate}>
        비공개
      </Checkbox>

      <Checkbox checked={form.allowComments} onChange={form.setAllowComments}>
        댓글 허용
      </Checkbox>
    </div>
  );
}
