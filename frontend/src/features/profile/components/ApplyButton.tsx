import { useState } from "react";
import { Button } from "../../../components/common/input";
import type { FollowState, VisibilityType } from "../../../apis/types/common";
import { useFollowRequest } from "../hooks/useFollowRequest";

type ApplyButtonProps = {
  targetId: number;
  visibility?: VisibilityType;
  joinState?: FollowState | null;
  className?: string;
};

const getLabel = (state?: FollowState | null) => {
  if (state === "REQUESTED") return "요청됨";
  if (state === "COMPLETED") return "가입됨";
  return "가입하기";
};

const ApplyButton = ({
  targetId,
  joinState,
  className,
}: ApplyButtonProps) => {
  const [localState, setLocalState] = useState<FollowState | null | undefined>(
    joinState,
  );
  const { mutate, isPending } = useFollowRequest();

  const label = getLabel(localState);
  const isDisabled = localState === "REQUESTED" || localState === "COMPLETED";

  const handleClick = () => {
    mutate(targetId, {
      onSuccess: (data) => {
        if (typeof data.result?.isFollowing === "boolean") {
          setLocalState(data.result.isFollowing ? "COMPLETED" : null);
          return;
        }
        setLocalState(localState);
      },
    });
  };

  return (
    <Button
      variant="onPrimary"
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

export default ApplyButton;
