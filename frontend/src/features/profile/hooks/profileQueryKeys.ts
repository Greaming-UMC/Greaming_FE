import type {
  CheckSubmissionInterceptor,
} from "../../../apis/types/common";
import type { CheckCircleSubmissionsRequest } from "../../../apis/types/circle";
import type { GetFollowersParams, GetFollowingsParams } from "../../../apis/types/follow";

export const profileQueryKeys = {

  my: ["profile", "my"] as const,

  user: (userId: number) => ["profile", "user", userId] as const,

  circle: (circleId: number) => ["profile", "circle", circleId] as const,

  mySubmissions: (params?: CheckSubmissionInterceptor) =>
    [
      "profile",
      "mySubmissions",
      params?.page ?? null,
      params?.size ?? null,
    ] as const,

  userSubmissions: (userId: number, params?: CheckSubmissionInterceptor) =>
    [
      "profile",
      "userSubmissions",
      userId,
      params?.page ?? null,
      params?.size ?? null,
    ] as const,

  circleSubmissions: (circleId: number, params?: CheckCircleSubmissionsRequest) =>
    [
      "profile",
      "circleSubmissions",
      circleId,
      params?.page ?? null,
      params?.size ?? null,
    ] as const,

  followers: (userId: number, params?: GetFollowersParams) =>
    [
      "profile",
      "followers",
      userId,
      params?.page ?? null,
      params?.size ?? null,
    ] as const,

  followings: (userId: number, params?: GetFollowingsParams) =>
    [
      "profile",
      "followings",
      userId,
      params?.page ?? null,
      params?.size ?? null,
    ] as const,
  
};
