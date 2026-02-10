import type { 
  FollowUserInfo, 
  CheckCircleMemberInfo, 
} from "../../../apis/types/common";
import type { 
  CheckFollowersData, 
  CheckFollowingsData 
} from "../../../apis/types/follow";
import type { 
  CheckCircleMembersResult,
  ExploreCircleResult
} from "../../../apis/types/circle";
import type { 
  ApiDataSuccessResponse, 
  ApiResultResponse 
} from "../../../apis/types/common";

/**
 * 1. 팔로우/팔로잉 데이터 (Family A - data 기반)
 */
export const RAW_FOLLOWING_DATA: FollowUserInfo[] = [
  { userId: 101, nickname: 'User_Alpha', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 102, nickname: 'User_Beta', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 103, nickname: 'User_Gamma', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 105, nickname: 'User_Delta', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 106, nickname: 'User_Epsilon', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 107, nickname: 'User_Zeta', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 108, nickname: 'User_Eta', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 109, nickname: 'User_Theta', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 110, nickname: 'User_Iota', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
  { userId: 111, nickname: 'User_Kappa', profileImgUrl: '', isFollowing: true, followState: 'COMPLETED' },
];

// FollowingModal에서 사용할 응답 규격
export const MOCK_FOLLOWING_RESPONSE: ApiDataSuccessResponse<CheckFollowingsData> = {
  isSuccess: true,
  code: "COMMON_200",
  message: "성공",
  data: {
    data: RAW_FOLLOWING_DATA,
    hasNext: false,
    nextCursor: null
  }
};

// FollowerModal에서 사용할 응답 규격
export const MOCK_FOLLOWERS_RESPONSE: ApiDataSuccessResponse<CheckFollowersData> = {
  isSuccess: true,
  code: "COMMON_200",
  message: "성공",
  data: {
    data: RAW_FOLLOWING_DATA.map(user => ({ ...user, isFollowing: false })), // 팔로워는 기본적으로 언팔 상태로 가정
    hasNext: false,
    nextCursor: null
  }
};

/**
 * 2. 써클 탐색 데이터 (Family B - result 기반)
 */
export const MOCK_CIRCLE_EXPLORE_RESPONSE: ApiResultResponse<ExploreCircleResult> = {
  isSuccess: true,
  code: "COMMON_200",
  message: "성공",
  result: {
    circles: [
      { circleId: 1, name: '그리밍 공식 써클', profileUrl: '', memberCount: 30, capacity: 1000, isJoined: true, isFull: false },
      { circleId: 2, name: '밍밍 그림방', profileUrl: '', memberCount: 10, capacity: 20, isJoined: false, isFull: false },
      { circleId: 3, name: '초보 화가 모임', profileUrl: '', memberCount: 15, capacity: 15, isJoined: false, isFull: true },
      { circleId: 4, name: '캐릭터 디자인 빌리지', profileUrl: '', memberCount: 49, capacity: 50, isJoined: false, isFull: false },
      { circleId: 5, name: '풍경화 장인들', profileUrl: '', memberCount: 50, capacity: 60, isJoined: false, isFull: false },
      { circleId: 6, name: '픽셀 아트 연구소', profileUrl: '', memberCount: 12, capacity: 1000, isJoined: false, isFull: false },
      { circleId: 7, name: '일러스트 크루', profileUrl: '', memberCount: 100, capacity: 100, isJoined: false, isFull: true },
      { circleId: 8, name: '야작하는 사람들', profileUrl: '', memberCount: 5, capacity: 10, isJoined: false, isFull: false },
    ],
    totalPage: 1,
    totalElements: 8
  }
};

/**
 * 3. 써클 멤버 데이터 (Family B - result 기반)
 */
const RAW_CIRCLE_MEMBER_DATA: CheckCircleMemberInfo[] = [
  { userId: 102, nickname: 'User_Beta', profileImgUrl: '', level: 'MASTER', tags: ['MASTER', 'LEADER'], isFollowing: true },
  { userId: 101, nickname: 'User_Alpha', profileImgUrl: '', level: 'SKETCHER', tags: ['DAILY', 'PENCIL'], isFollowing: true },
  { userId: 206, nickname: 'Drawing_Hand', profileImgUrl: '', level: 'ARTIST', tags: ['ARTIST', 'COLOR'], isFollowing: false },
  { userId: 210, nickname: 'Blue_Ocean', profileImgUrl: '', level: 'ARTIST', tags: ['LANDSCAPE', 'WATER'], isFollowing: true },
  { userId: 115, nickname: 'Pixel_King', profileImgUrl: '', level: 'ARTIST', tags: ['CHARACTER', 'PIXEL'], isFollowing: true },
  { userId: 225, nickname: 'Fan_Artist', profileImgUrl: '', level: 'PAINTER', tags: ['FAN_ART'], isFollowing: true },
  { userId: 124, nickname: 'Oil_Master', profileImgUrl: '', level: 'MASTER', tags: ['TRADITIONAL'], isFollowing: true },
  { userId: 213, nickname: 'Sad_Panda', profileImgUrl: '', level: 'SKETCHER', tags: ['DAILY'], isFollowing: false },
  { userId: 109, nickname: 'User_Theta', profileImgUrl: '', level: 'ARTIST', tags: ['FANTASY'], isFollowing: true },
];

export const MOCK_CIRCLE_MEMBERS_RESPONSE: ApiResultResponse<CheckCircleMembersResult> = {
  isSuccess: true,
  code: "COMMON_200",
  message: "성공",
  result: {
    isLeader: true,
    members: RAW_CIRCLE_MEMBER_DATA
  }
};

/**
 * 4. 나의 정보 목업
 */
export const MOCK_MY_INFO: FollowUserInfo = {
  userId: 0,
  nickname: '나 (그리밍마스터)',
  profileImgUrl: '',
  isFollowing: false,
  followState: 'COMPLETED'
};

/** * 5. 기타 테스트용 상수
 */
export const MOCK_CURRENT_CIRCLE_ID = 1; // 그리밍 공식 써클 ID를 기본값으로 설정