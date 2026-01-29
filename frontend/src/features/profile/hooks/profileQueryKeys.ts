import type {
  CheckMySubmissionsRequest,
  CheckUserSubmissionsRequest,
} from "../../../apis/types/userSubmissions";
import type { CheckCircleSubmissionsRequest } from "../../../apis/types/circle";

export const profileQueryKeys = {

  my: ["profile", "my"] as const,

  user: (userId: number) => ["profile", "user", userId] as const,

  circle: (circleId: number) => ["profile", "circle", circleId] as const,

  mySubmissions: (params?: CheckMySubmissionsRequest) =>
    ["profile", "mySubmissions", params ?? {}] as const,

  userSubmissions: (userId: number, params?: CheckUserSubmissionsRequest) =>
    ["profile", "userSubmissions", userId, params ?? {}] as const,

  circleSubmissions: (circleId: number, params?: CheckCircleSubmissionsRequest) =>
    ["profile", "circleSubmissions", circleId, params ?? {}] as const,
  
};
