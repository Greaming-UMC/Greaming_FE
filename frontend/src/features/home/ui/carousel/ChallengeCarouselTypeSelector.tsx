import { Button, SegmentedButton } from "../../../../components/common";

export type ChallengeCarouselType = "DAILY" | "WEEKLY";
type SelectorMode = "switch" | "single";

interface Props {
  selectedType: ChallengeCarouselType;
  onSelectType?: (value: ChallengeCarouselType) => void;
  onMoreClick?: () => void;
  mode?: SelectorMode;
}

const LABEL: Record<ChallengeCarouselType, string> = {
  DAILY: "데일리챌린지",
  WEEKLY: "위클리챌린지",
};

const ChallengeCarouselTypeSelector = ({
  selectedType,
  onSelectType,
  onMoreClick,
  mode = "switch",
}: Props) => {
  const options =
    mode === "single"
      ? [
          {
            value: selectedType,
            label: <span className="text-secondary">{LABEL[selectedType]}</span>,
          },
        ]
      : (["DAILY", "WEEKLY"] as const).map((value) => {
          const isSelected = selectedType === value;
          return {
            value,
            label: (
              <span className={isSelected ? "text-secondary" : "text-on-surface-variant-lowest"}>
                {LABEL[value]}
              </span>
            ),
          };
        });

  return (
    <div className="flex items-center justify-between">
      <SegmentedButton
        value={selectedType}
        onChange={(val) => onSelectType?.(val as ChallengeCarouselType)}
        variant="secondary"
        options={options}
        className="gap-0"
        displayClassName="text-2xl font-semibold"
      />

      {mode === "switch" && onMoreClick && (
        <Button
          variant="text"
          size="sm"
          onClick={onMoreClick}
          className="text-on-surface-variant-bright hover:bg-transparent hover:text-on-surface-variant-lowest"
        >
          더보기 +
        </Button>
      )}
    </div>
  );
};

export default ChallengeCarouselTypeSelector;
