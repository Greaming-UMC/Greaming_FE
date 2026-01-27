import clsx from "clsx";
import Icon from "../../Icon";
import { ListBase, type ListBaseProps } from "./ListBase";
import {
  SELECTION_STYLE_CLASS,
  type ListSelectedStyle,
} from "./list.type";

export interface SelectItemProps extends ListBaseProps {
  selected?: boolean;
  selectionStyle?: ListSelectedStyle;
}

export const SelectItem = ({
  selected,
  selectionStyle = "check",
  leading,
  className,
  ...rest
}: SelectItemProps) => {
  const showCheck = selectionStyle === "check";
  const isSolidSelected = selectionStyle === "solid" && selected;
  const leadingNode = showCheck ? (
    <span className="w-[32px] h-[32px] inline-flex items-center justify-center shrink-0">
      {selected ? <Icon name="check" size={18} /> : null}
    </span>
  ) : (
    leading
  );

  const selectionClass = selected
    ? SELECTION_STYLE_CLASS[selectionStyle]
    : "";

  return (
    <ListBase
      {...rest}
      leading={leadingNode}
      containerClassName={isSolidSelected ? "bg-primary" : undefined}
      titleClassName={isSolidSelected ? "text-secondary" : undefined}
      subtitleClassName={
        isSolidSelected ? "text-on-surface-variant-low" : undefined
      }
      className={clsx(selectionClass, className)}
    />
  );
};
