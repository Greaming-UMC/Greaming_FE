import type { HTMLAttributes, ReactNode } from "react";
import { type IconName } from "../../Icon";
import { type BadgeProps } from "../../display/Badge";
import { type AvatarProps } from "../../display/Avatar";

export type ListVariant = "onboarding" | "modal" | "notification" | "circle";
export type ListAction = "none" | "acceptReject" | "follow" | "following" | "kick";
export type ListSize = "sm" | "md" | "lg" | "xl";
export type ListWidthMode = "fixed" | "fill";
export type ListAlign = "left" | "center";
export type ListRadius = "none" | "sm" | "md" | "lg";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
    variant?: ListVariant;
    action?: ListAction;
    size?: ListSize;
    radius?: ListRadius;
    widthMode?: ListWidthMode;
    align?: ListAlign;
  
    leadingIcon?: IconName;
    trailingIcon?: IconName;
    avatar?: AvatarProps;
    badge?: BadgeProps;
  
    title: string;
    subtitle?: ReactNode;
  
    selectable?: boolean;
    selected?: boolean;
    onSelect?: () => void;
  
    onAccept?: () => void;
    onReject?: () => void;
    onFollow?: () => void;
    onUnfollow?: () => void;
    onKick?: () => void;
};

export const LIST_COLOR = {
    container: "bg-surface",
    title: "text-on-surface",
    subtitle: "text-on-surface-variant-lowest",
  } as const;

export const SIZE_CLASS: Record<ListSize, string> = {
    sm: "h-[32px] px-[8px] py-[4px]",
    md: "h-[48px] px-[16px] py-[12px] ",
    lg: "h-[80px] px-[20px] py-[20px]",
    xl: "h-[90px] px-[20px] py-[20px]",
};  
export const AVATAR_SIZE: Record<ListSize, AvatarProps["size"]> = {
    sm: "xs",
    md: "sm",
    l: "md",
    xl: "lg",
};
export const RADIUS_CLASS: Record<ListRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
};


export type ListActionPreset = {
    key: "accept" | "reject" | "follow" | "unfollow" | "kick";
    label: string;
    variant: "Primary" | "onPrimary" | "secondary" | "surface";
};
export const ACTION_PRESET: Record<ListAction, ListActionPreset[]> = {
    none: [],
    acceptReject: [
      { key: "reject", label: "거절", variant: "Primary" },
      { key: "accept", label: "수락", variant: "secondary" },
    ],
    follow: [{ key: "follow", label: "팔로우", variant: "onPrimary" }],
    following: [{ key: "unfollow", label: "팔로잉", variant: "secondary" }],
    kick: [{ key: "kick", label: "내보내기", variant: "onPrimary" }],
};
