import clsx from "clsx";
import Icon from "../../Icon";
import { Badge } from "../../display/Badge";
import { Avatar } from "../../display/Avatar";
import { Button } from "../Button";

import { ACTION_PRESET, AVATAR_SIZE, LIST_COLOR, SIZE_CLASS, RADIUS_CLASS, type ListProps} from "./list.type";

export const List = ({
    selectable, selected, leadingIcon, avatar, size="sm", radius="none",
    align="left", title, subtitle, badge,
    action = "none", onAccept, onReject, onFollow, onUnfollow, onKick, trailingIcon,
    className, widthMode, variant, ...rest
} : ListProps) => {

    //Leading
    const renderLeading = () => {
        if (selectable) {
            return (
                <span className="w-[40px] h-[40px] inline-flex items-center justify-center shrink-0">
                    {selected ? <Icon name="check" size={24} /> : null}
                </span>
            );
        }
        if (avatar) return <Avatar {...avatar} size={avatar.size ?? AVATAR_SIZE[size]} />;
        if (leadingIcon) return <Icon name={leadingIcon} size={24} />;
        return null;
    }

    //Body
    const renderBody = () => {
        return (
            <div className={clsx( 
                "flex min-w-0 flex-1 flex-col gap-[4px]",
                align === "center" ? "items-center" : "items-start",
            )}>
                
                <div className={clsx( 
                    "flex items-center gap-2",
                    align === "center" ? "justify-center" : "justify-start",
                )}>
                    <span className={clsx("sub-title-large-emphasized", LIST_COLOR.title)}> 
                        {title} 
                    </span>
                    {badge ? <Badge {...badge} /> : null}
                </div>
                
                {subtitle ? (
                    <div className={clsx("label-large", LIST_COLOR.subtitle)}> 
                        {subtitle} 
                    </div>
                ) : null}
    
            </div>
        );
    }

    //Trailing
    const actionHandlers = { accept: onAccept, reject: onReject, follow: onFollow, unfollow: onUnfollow, kick: onKick};
    const actionConfig = ACTION_PRESET[action].map(p => ({
      ...p,
      onClick: actionHandlers[p.key],
    }));
    const actionVariantMap = {
        Primary: "primary",
        onPrimary: "onPrimary",
        secondary: "secondary",
        surface: "surface",
    } as const;
    
    const renderTrailing = () => {

        if (action!== "none") {
            return (
                <div className="flex items-center gap-[4px]">
                    {actionConfig.map((config) => (
                        <Button 
                            key={config.key}
                            size="xs"
                            variant={actionVariantMap[config.variant]}
                            shape="round"
                            widthMode="hug"
                            onClick={config.onClick}
                            textClassName="label-large-emphasized"
                        >
                            {config.label}
                        </Button>
                    ))}
                </div>
            );
        }

        if (trailingIcon) {
            return (
                <Icon
                    name={trailingIcon}
                    size={24}
                    className="shrink-0 fill-current stroke-current"
                    aria-hidden
                />
            );
        }

        return null;
    }
    
    return (
        <div
          className={clsx(
            "flex items-center gap-[16px] px-[20px]",
            LIST_COLOR.container,
            SIZE_CLASS[size],
            RADIUS_CLASS[radius],
            widthMode === "fill" && "w-full",
            align === "center" ? "justify-center text-center" : "justify-start",
            className,
          )}
          data-variant={variant}
        >
          {renderLeading()}
          {renderBody()}
          {renderTrailing()}
        </div>
    );
}