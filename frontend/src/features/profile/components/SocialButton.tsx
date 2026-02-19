import { useState } from "react";
import { Button } from "../../../components/common/input";
import type { FollowState } from "../../../apis/types/common";
import { useFollowRequest } from "../hooks/useFollowRequest";

type SocialButtonProps = {
  targetId: number;
  followState?: FollowState | null;
  className?: string;
};

const getLabel = (state?: FollowState | null) => {
  if (state === "REQUESTED") return "요청됨";
  if (state === "COMPLETED") return "팔로잉";
  return "팔로우";
};

const getVariant = (state?: FollowState | null) => {
  if (state === "REQUESTED") return "surfaceVariant" as const;
  if (state === "COMPLETED") return "secondary" as const;
  return "onPrimary" as const;
};

const SocialButton = ({
  targetId,
  followState,
  className,
}: SocialButtonProps) => {
  const [localState, setLocalState] = useState<FollowState | null | undefined>(
    followState,
  );
  const { mutate, isPending } = useFollowRequest();

  const label = getLabel(localState);
  const variant = getVariant(localState);
  const isDisabled = localState === "REQUESTED" || localState === "COMPLETED";

  const handleClick = () => {
    mutate(targetId, {
      onSuccess: (data) => {
        setLocalState(data.result?.followState ?? localState);
      },
    });
  };

  return (
    <Button
      variant={variant}
      size="md"
      widthMode="fixed"
      width="170px"
      textClassName="label-xxxlarge-emphasized"
      disabled={isDisabled || isPending}
      onClick={handleClick}
      className={className}
      aria-label={`${label} 버튼`}
    >
      {label}
    </Button>
  );
};

export default SocialButton;
