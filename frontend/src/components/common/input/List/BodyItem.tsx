import type { ReactNode } from "react";
import clsx from "clsx";
import { Badge, type BadgeProps } from "../../display/Badge";
import {
  LIST_COLOR,
  SIZE_TEXT_CLASS,
  type ListAlign,
  type ListSize,
  type ListSubtitle,
} from "./list.type";

export interface BodyItemProps {
  title: string;
  subtitle?: ListSubtitle;
  badge?: BadgeProps;
  align?: ListAlign;
  size?: ListSize;
  titleClassName?: string;
  subtitleClassName?: string;
}

const renderSubtitle = (value?: ListSubtitle): ReactNode => {
  if (!value) return null;
  if (typeof value === "object" && value !== null && "variant" in value) {
    switch (value.variant) {
      case "text":
        return value.value;
      case "hashtags":
        return value.tags.map((tag) => `#${tag}`).join(" ");
      case "date":
        return value.value;
      case "count":
        return `${value.current} / ${value.max ?? "제한없음"}`;
      default:
        return null;
    }
  }
  return value;
};

export const BodyItem = ({
  title,
  subtitle,
  badge,
  align = "left",
  size = "sm",
  titleClassName,
  subtitleClassName,
}: BodyItemProps) => {
  const textToken = SIZE_TEXT_CLASS[size];
  const titleColorClass = titleClassName ?? LIST_COLOR.title;
  const subtitleColorClass = subtitleClassName ?? LIST_COLOR.subtitle;

  return (
    <div
      className={clsx(
        "flex min-w-0 flex-1 flex-col gap-[4px]",
        align === "center" ? "items-center" : "items-start",
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-2",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <span className={clsx(textToken.title, titleColorClass)}>{title}</span>
        {badge ? <Badge {...badge} /> : null}
      </div>
      {subtitle ? (
        <div className={clsx(textToken.subtitle, subtitleColorClass)}>
          {renderSubtitle(subtitle)}
        </div>
      ) : null}
    </div>
  );
};
