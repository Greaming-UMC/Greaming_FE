import type { HTMLAttributes, ReactNode } from "react";
import { type IconName } from "../../Icon";
import { type BadgeProps } from "../../display/Badge";
import { type AvatarProps } from "../../display/Avatar";

export type ListVariant = "onboarding" | "modal" | "notification" | "circle";
export type ListAction = "none" | "acceptReject" | "follow" | "requested" | "following" | "kick" | "join" | "joined" | "invite";
export type ListSelectedStyle = "check" | "solid";
export type ListSize = "sm" | "md" | "lg" | "xl";
export type ListWidthMode = "fixed" | "fill";
export type ListAlign = "left" | "center";
export type ListRadius = "none" | "sm" | "md" | "lg";
export type ListSubtitle =
    | ReactNode
    | { variant: "text"; value: ReactNode }
    | { variant: "hashtags"; tags: string[] }
    | { variant: "date"; value: string }
    | { variant: "count"; current: number; max?: number };

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
    selectionStyle?: ListSelectedStyle;
    onSelect?: () => void;
  
    onAccept?: () => void;
    onReject?: () => void;
    onFollow?: () => void;
    onUnfollow?: () => void;
    onKick?: () => void;
    onJoin?: () => void;
    onLeave?: () => void;
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
export const SIZE_TEXT_CLASS: Record<
    ListSize,
    { title: string; subtitle: string }
> = {
    sm: { title: "label-xlarge-emphasized", subtitle: "label-medium" },
    md: { title: "label-xlarge-emphasized", subtitle: "label-medium" },
    lg: { title: "sub-title-medium-emphasized", subtitle: "label-large" },
    xl: { title: "sub-title-medium-emphasized", subtitle: "label-large" },
};
export const AVATAR_SIZE: Record<ListSize, AvatarProps["size"]> = {
    sm: "xs",
    md: "sm",
    lg: "md",
    xl: "lg",
};
export const RADIUS_CLASS: Record<ListRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
};


export type ListActionPreset = {
    key: "accept" | "reject" | "follow" | "requested" | "unfollow" | "kick" | "join" | "leave" | "invite";
    label: string;
    variant: "Primary" | "onPrimary" | "secondary" | "surface" | "surfaceVariant";
    disabled?: boolean;
};
export const ACTION_PRESET: Record<ListAction, ListActionPreset[]> = {
    none: [],
    acceptReject: [
      { key: "reject", label: "거절", variant: "Primary" },
      { key: "accept", label: "수락", variant: "secondary" },
    ],
    follow: [{ key: "follow", label: "팔로우", variant: "onPrimary" }],
    requested: [{ key: "requested", label: "요청됨", variant: "surfaceVariant", disabled: true }],
    following: [{ key: "unfollow", label: "팔로잉", variant: "secondary" }],
    kick: [{ key: "kick", label: "내보내기", variant: "onPrimary" }],
    // 🟢 써클 관련 액션 추가
    join: [{ key: "follow", label: "가입하기", variant: "onPrimary" }], // 가입 신청 전
    joined: [{ key: "unfollow", label: "가입완료", variant: "secondary" }], // 가입 완료 상태
    invite: [{ key: "invite", label: "초대하기", variant: "onPrimary" }],
};

export const STATE_LAYER_CLASS = "state-layer surface-container-opacity-16";

export const SELECTION_STYLE_CLASS: Record<ListSelectedStyle, string> = {
    check: "",
    solid: "bg-primary text-secondary",
  };
