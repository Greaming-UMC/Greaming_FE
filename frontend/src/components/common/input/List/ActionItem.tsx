import { Button } from "../Button";
import { ListBase, type ListBaseProps } from "./ListBase";
import { ACTION_PRESET, type ListAction } from "./list.type";

export interface ActionItemProps extends ListBaseProps {
  action?: ListAction;
  onAccept?: () => void;
  onReject?: () => void;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onKick?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
  onInvite?: () => void;
}

export const ActionItem = ({
  action = "none",
  onAccept,
  onReject,
  onFollow,
  onUnfollow,
  onKick,
  onJoin,  
  onLeave,  
  onInvite,
  trailing,
  ...rest
}: ActionItemProps) => {
  const actionHandlers = {
    accept: onAccept,
    reject: onReject,
    follow: onFollow,
    unfollow: onUnfollow,
    kick: onKick,
    join: onJoin,
    leave: onLeave,
    invite: onInvite,
  };

  const actionVariantMap = {
    Primary: "primary",
    onPrimary: "onPrimary",
    secondary: "secondary",
    surface: "surface",
  } as const;

  const trailingNode =
    action === "none"
      ? trailing
      : (
          <div className="flex items-center gap-[4px]">
            {ACTION_PRESET[action].map((config) => (
              <Button
                key={config.key}
                size="xs"
                variant={actionVariantMap[config.variant]}
                shape="round"
                widthMode="hug"
                onClick={(e) => {
                  e.stopPropagation();
                  actionHandlers[config.key as keyof typeof actionHandlers]?.();
                }}
                textClassName="label-large-emphasized"
              >
                {config.label}
              </Button>
            ))}
          </div>
        );

  return <ListBase {...rest} trailing={trailingNode} />;
};
