import { Button, SegmentedButton } from "../../../components/common";

type ChallengeType = "DAILY" | "WEEKLY";

interface Props {
  value: ChallengeType;
  onChange: (value: ChallengeType) => void;
  onMoreClick?: () => void;
}

const HomeChallengeHeader = ({ value, onChange, onMoreClick }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <SegmentedButton
        value={value}
        onChange={(val) => onChange(val as ChallengeType)}
        variant="secondary"
        displayClassName="text-sm font-semibold"
        options={[
          { label: "데일리챌린지", value: "DAILY" },
          { label: "위클리챌린지", value: "WEEKLY" },
        ]}
        className="gap-0"
      />

      <Button
        variant="text"
        size="sm"
        onClick={onMoreClick}
        className="text-on-surface-variant-bright"
      >
        더보기 +
      </Button>
    </div>
  );
};

export default HomeChallengeHeader;
