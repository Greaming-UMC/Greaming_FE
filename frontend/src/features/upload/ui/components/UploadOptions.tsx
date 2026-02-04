type Props = {
  isPrivate: boolean;
  allowComments: boolean;
  onChangePrivate: (v: boolean) => void;
  onChangeAllowComments: (v: boolean) => void;
};

export function UploadOptions({
  isPrivate,
  allowComments,
  onChangePrivate,
  onChangeAllowComments,
}: Props) {
  return (
    <div className="flex items-center gap-[24px]">
      <label className="inline-flex items-center gap-2 text-sm text-on-surface">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => onChangePrivate(e.target.checked)}
        />
        비공개
      </label>

      <label className="inline-flex items-center gap-2 text-sm text-on-surface">
        <input
          type="checkbox"
          checked={allowComments}
          onChange={(e) => onChangeAllowComments(e.target.checked)}
        />
        댓글 허용
      </label>
    </div>
  );
}
