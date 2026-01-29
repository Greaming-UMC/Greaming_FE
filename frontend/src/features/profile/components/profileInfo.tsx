import { useState } from "react";

import { Avatar, Badge, Chip, Counter, Divider } from "../../../components/common";
import { useMyProfile, useUserProfile, useCircleProfile } from "../hooks";

import type { CheckMyProfileResult, CheckUserProfileResult } from "../../../apis/types/user";
import type { CheckCircleProfileResult } from "../../../apis/types/circle";
import type { ProfileViewerRole, CircleViewerRole } from "../../../types/role";
import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";


type UserProfileInfoProps =
  | { context: { type: "user"; role: "self" }; userId?: number; className?: string;}
  | { context: { type: "user"; role: "other" }; userId: number; className?: string;};


type CircleProfileInfoProps = {
  context: { type: "circle"; role: CircleViewerRole };
  circleId: number;
  className?: string;
};

export type ProfileInformationProps =
  | UserProfileInfoProps
  | CircleProfileInfoProps;


const ProfileInformation = (props: ProfileInformationProps) => {

    const { context, className } = props;
    const userId = "userId" in props ? props.userId : undefined;
    const circleId = "circleId" in props ? props.circleId : undefined;

    const myQuery = useMyProfile();
    const userQuery = useUserProfile(userId);
    const circleQuery = useCircleProfile(circleId);

    const query =
      context.type === "user"
        ? context.role === "self"
          ? myQuery
          : userQuery
        : circleQuery;

    if (query.isPending) return <div className={className}>Loading...</div>;
    if (query.error) return <div className={className}>에러가 발생했어요.</div>;

    const result = query.data?.result;
    if (!result) return null;  

    const info = context.type === "circle"
      ? (result as CheckCircleProfileResult).circle_Information
      : (result as CheckMyProfileResult | CheckUserProfileResult).user_information;
  
  
      const isUserResult = (
        r: CheckMyProfileResult | CheckUserProfileResult | CheckCircleProfileResult
      ): r is CheckMyProfileResult | CheckUserProfileResult =>
        "user_information" in r;
      const specialtyTags = isUserResult(result) ? result.user_information.specialtyTags ?? [] : [];
      const interestTags = isUserResult(result) ? result.user_information.interestTags ?? [] : [];
    

};