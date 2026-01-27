import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import Icon, { type IconName } from "../../Icon";
import type { BadgeProps } from "../../display/Badge";
import { Avatar, type AvatarProps } from "../../display/Avatar";
import { BodyItem } from "./BodyItem";
import {
  AVATAR_SIZE,
  LIST_COLOR,
  RADIUS_CLASS,
  SIZE_CLASS,
  STATE_LAYER_CLASS,
  type ListAlign,
  type ListRadius,
  type ListSize,
  type ListSubtitle,
  type ListVariant,
  type ListWidthMode,
} from "./list.type";

export interface ListBaseProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ListVariant;
  size?: ListSize;
  radius?: ListRadius;
  widthMode?: ListWidthMode;
  align?: ListAlign;
  containerClassName?: string;

  leadingIcon?: IconName;
  trailingIcon?: IconName;
  avatar?: AvatarProps;
  badge?: BadgeProps;

  leading?: ReactNode;
  trailing?: ReactNode;

  title: string;
  subtitle?: ListSubtitle;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const ListBase = ({
  variant,
  size = "sm",
  radius = "none",
  widthMode,
  align = "left",
  containerClassName,
  leadingIcon,
  trailingIcon,
  avatar,
  badge,
  leading,
  trailing,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  className,
  ...rest
}: ListBaseProps) => {
  const baseLeading =
    leading ??
    (avatar ? (
      <Avatar {...avatar} size={avatar.size ?? AVATAR_SIZE[size]} />
    ) : leadingIcon ? (
      <Icon name={leadingIcon} size={24} />
    ) : null);

  const baseTrailing =
    trailing ??
    (trailingIcon ? (
      <Icon
        name={trailingIcon}
        size={24}
        className="shrink-0 fill-current stroke-current"
        aria-hidden
      />
    ) : null);

  const baseBody = (
    <BodyItem
      title={title}
      subtitle={subtitle}
      badge={badge}
      align={align}
      size={size}
      titleClassName={titleClassName}
      subtitleClassName={subtitleClassName}
    />
  );

  return (
    <div
      className={clsx(
        "flex items-center gap-[8px]",
        containerClassName ?? LIST_COLOR.container,
        SIZE_CLASS[size],
        RADIUS_CLASS[radius],
        widthMode === "fill" && "w-full",
        align === "center" ? "justify-center text-center" : "justify-start",
        className,
        STATE_LAYER_CLASS,
      )}
      data-variant={variant}
      {...rest}
    >
      {baseLeading}
      {baseBody}
      {baseTrailing}
    </div>
  );
};
