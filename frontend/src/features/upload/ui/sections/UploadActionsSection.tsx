import clsx from "clsx";

type Props = {
  canUpload: boolean;
  isUploading: boolean;
  onSubmit: () => void;
};

export function UploadActionsSection({ canUpload, isUploading, onSubmit }: Props) {
  const base =
    "w-[142px] h-[44px] rounded-[28px] flex items-center justify-center";

  const enabled = "bg-primary text-on-primary state-layer primary-opacity-10";
  const disabled = "bg-surface-variant-low text-on-surface opacity-40";

  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={!canUpload || isUploading}
      className={clsx(base, canUpload && !isUploading ? enabled : disabled)}
    >
      <span className="label-xxlarge-emphasized">업로드</span>
    </button>
  );
}
