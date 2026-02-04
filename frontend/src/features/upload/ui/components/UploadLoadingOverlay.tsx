import { AnimatedLogoDraw } from "../../../onboarding/ui/AnimatedLogoDraw";

type Props = {
  open: boolean;
};

export function UploadLoadingOverlay({ open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* 반투명 배경 */}
      <div className="absolute inset-0 bg-black/55" />

      {/* 중앙 로고 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedLogoDraw size={120} />
      </div>
    </div>
  );
}
