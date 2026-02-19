import { useEffect, useState } from "react";
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

const normalizeFollowState = (
  state?: FollowState | string | null,
): FollowState | null => {
  if (typeof state !== "string") return null;

  const normalized = state.trim().toUpperCase();
  if (normalized === "REQUESTED") return "REQUESTED";
  if (normalized === "COMPLETED") return "COMPLETED";
  if (normalized === "FOLLOWING" || normalized === "FOLLOWED") return "COMPLETED";
  if (normalized === "PENDING" || normalized === "REQUEST") return "REQUESTED";

  return null;
};

const SocialButton = ({
  targetId,
  followState,
  className,
}: SocialButtonProps) => {
  const [localState, setLocalState] = useState<FollowState | null | undefined>(
    normalizeFollowState(followState),
  );
  const { mutate, isPending } = useFollowRequest();

  useEffect(() => {
    setLocalState(normalizeFollowState(followState));
  }, [followState]);

  const label = getLabel(localState);
  const variant = getVariant(localState);
  const isDisabled = localState === "REQUESTED";

  const handleClick = () => {
    mutate(targetId, {
      onSuccess: (data) => {
        if (typeof data.result?.isFollowing === "boolean") {
          setLocalState(data.result.isFollowing ? "COMPLETED" : null);
          return;
        }
        setLocalState((prev) => (prev === "COMPLETED" ? null : "COMPLETED"));
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
