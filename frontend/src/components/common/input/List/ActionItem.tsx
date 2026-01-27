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
}

export const ActionItem = ({
  action = "none",
  onAccept,
  onReject,
  onFollow,
  onUnfollow,
  onKick,
  trailing,
  ...rest
}: ActionItemProps) => {
  const actionHandlers = {
    accept: onAccept,
    reject: onReject,
    follow: onFollow,
    unfollow: onUnfollow,
    kick: onKick,
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
                onClick={actionHandlers[config.key]}
                textClassName="label-large-emphasized"
              >
                {config.label}
              </Button>
            ))}
          </div>
        );

  return <ListBase {...rest} trailing={trailingNode} />;
};
