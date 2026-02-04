import type { CircleItem, CircleMemberItem, SocialUserItem } from "../types";
import { getBadgeByLevel } from "../utils/badgeImage";

// 🟢 최상단 고정용 '나'의 정보
export const MOCK_MY_INFO: SocialUserItem = {
  userId: 0,
  nickname: '나 (그리밍마스터)',
  bio: '그림 그리는 마스터입니다.',
  isFollowing: false,
  profileImgUrl: '',
  followState: 'COMPLETED',
  badgeImage: 'badge_master'
};

const RAW_FOLLOWING_DATA: Omit<SocialUserItem, 'badgeImage'>[] = [
  { userId: 101, nickname: 'User_Alpha', bio: '그림 그리는 알파입니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_red' },
  { userId: 102, nickname: 'User_Beta', bio: 'Frontend Developer | React Love', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_blue' },
  { userId: 103, nickname: 'User_Gamma', bio: 'GDS 스터디 중입니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', profileIcon: 'char_sad', level: 'PAINTER' },
  { userId: 105, nickname: 'User_Delta', bio: '새로운 스타일 도전 중!', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', profileIcon: 'char_profile_green', level: 'ARTIST' },
  { userId: 106, nickname: 'User_Epsilon', bio: '매일매일 드로잉', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 107, nickname: 'User_Zeta', bio: '포트폴리오 준비생', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', profileIcon: 'char_sad', level: 'SKETCHER' },
  { userId: 108, nickname: 'User_Eta', bio: 'Testing for UI components', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', profileIcon: 'char_profile_blue', level: 'PAINTER' },
  { userId: 109, nickname: 'User_Theta', bio: '디지털 아트의 세계', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_green' },
  { userId: 112, nickname: 'User_Iota', bio: '반가워요!', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_red' },
  { userId: 111, nickname: 'User_Kappa', bio: '일러스트레이터 지망생', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_blue' },
  { userId: 113, nickname: 'Sketch_Lover', bio: '연필 크로키 위주로 올려요.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_green' },
  { userId: 114, nickname: 'Art_Monitor', bio: '전시회 정보 공유', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 115, nickname: 'Pixel_King', bio: '도트 그래픽 장인입니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_blue' },
  { userId: 116, nickname: 'Color_Full', bio: '수채화 느낌이 좋아요.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_green' },
  { userId: 117, nickname: 'Design_Tester', bio: 'UI/UX 디자인 공부 중', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 118, nickname: 'Blue_Sky', bio: '풍경화를 주로 그립니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_blue' },
  { userId: 119, nickname: 'Red_Apple', bio: '정물화 연습생', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_red' },
  { userId: 120, nickname: 'Char_Designer', bio: '캐릭터 시트 작업 중', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_green' },
  { userId: 121, nickname: 'Doodle_Doo', bio: '낙서장입니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_blue' },
  { userId: 122, nickname: 'Line_Art', bio: '깔끔한 선화가 최고', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_red' },
  { userId: 123, nickname: 'Fantasy_World', bio: '판타지 배경 일러스트', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_green' },
  { userId: 124, nickname: 'Oil_Master', bio: '유화의 질감을 사랑합니다.', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_sad' },
  { userId: 125, nickname: 'Night_View', bio: '야경 전문 그림러', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_blue' },
  { userId: 126, nickname: 'Daily_Sketch', bio: '365일 챌린지 중', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_red' },
  { userId: 127, nickname: 'GDS_Fan', bio: 'GDS 최고!', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_green' },
];

/** 🟢 맵핑을 통해 badgeImage를 자동으로 채워넣은 최종 목록 */
export const MOCK_FOLLOWING_LIST: SocialUserItem[] = RAW_FOLLOWING_DATA.map(user => ({
  ...user,
  badgeImage: getBadgeByLevel(user.level ?? 'SKETCHER')
}));

const RAW_FOLLOWER_DATA: Omit<SocialUserItem, 'badgeImage'>[] = [
  { userId: 201, nickname: 'User_Alpha', bio: '그림 그리는 알파입니다', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 202, nickname: 'Master_Dev', bio: 'Coding everyday', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 203, nickname: 'Greaming_Fan', bio: 'I love GREAMING', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_blue' },
  { userId: 204, nickname: 'Art_Lover', bio: 'Looking for inspiration', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_green' },
  { userId: 205, nickname: 'Design_Hunter', bio: 'UI/UX Designer', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 206, nickname: 'Drawing_Hand', bio: 'Daily drawing', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_blue' },
  { userId: 207, nickname: 'Pixel_Art_Fan', bio: 'Retro style is best', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_green' },
  { userId: 208, nickname: 'Color_Master', bio: 'Exploring new palettes', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_sad' },
  { userId: 209, nickname: 'Doodle_Bug', bio: 'Simple line arts', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_profile_red' },
  { userId: 210, nickname: 'Blue_Ocean', bio: 'Ocean scenery expert', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_blue' },
  { userId: 211, nickname: 'Green_Forest', bio: 'Nature is my canvas', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_green' },
  { userId: 212, nickname: 'Red_Apple', bio: 'Still life drawing', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 213, nickname: 'Sad_Panda', bio: 'Sad but drawing', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 214, nickname: 'Night_Artist', bio: 'I work at 3 AM', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_blue' },
  { userId: 215, nickname: 'Character_God', bio: 'OC is my love', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 216, nickname: 'Watercolor_Girl', bio: 'Soft colors only', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_green' },
  { userId: 217, nickname: 'Pencil_Guy', bio: 'Graphite master', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_blue' },
  { userId: 218, nickname: 'Concept_King', bio: 'Storyboarding', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 219, nickname: 'Anime_Fanatic', bio: 'Manga style expert', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_green' },
  { userId: 220, nickname: 'Sketch_Note', bio: 'Visual thinking', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 221, nickname: 'Digital_Nomad', bio: 'iPad drawing', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_blue' },
  { userId: 222, nickname: 'Oil_Painter', bio: 'Classic vibes', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'ARTIST', profileIcon: 'char_profile_green' },
  { userId: 223, nickname: 'Ink_Master', bio: 'Black and white', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'MASTER', profileIcon: 'char_profile_red' },
  { userId: 224, nickname: 'Cute_Doodle', bio: 'Kawaii characters', isFollowing: false, profileImgUrl: '', followState: 'COMPLETED', level: 'SKETCHER', profileIcon: 'char_sad' },
  { userId: 225, nickname: 'Fan_Artist', bio: 'Drawing my idols', isFollowing: true, profileImgUrl: '', followState: 'COMPLETED', level: 'PAINTER', profileIcon: 'char_profile_blue' },
];
export const MOCK_FOLLOWER_LIST: SocialUserItem[] = RAW_FOLLOWER_DATA.map(user => ({
  ...user,
  badgeImage: getBadgeByLevel(user.level ?? 'SKETCHER')
}));

export const MOCK_CIRCLE_LIST: CircleItem[] = [
  // 🟢 가입된 써클 (딱 하나만 유지)
  { circleId: 1, name: '그리밍 공식 써클', description: '함께 그려요', isJoined: true, isFull: false, memberCount: 30, capacity: 1000, profileUrl: '' },
  
  // 🔴 가입되지 않은 써클들 (다양한 상태)
  { circleId: 2, name: '밍밍 그림방', description: '자유로운 드로잉', isJoined: false, isFull: false, memberCount: 10, capacity: 20, profileUrl: '' },
  { circleId: 3, name: '초보 화가 모임', description: '기초부터 차근차근', isJoined: false, isFull: true, memberCount: 15, capacity: 15, profileUrl: '' },
  { circleId: 4, name: '캐릭터 디자인 빌리지', description: '나만의 캐릭터 만들기', isJoined: false, isFull: false, memberCount: 49, capacity: 50, profileUrl: '' },
  { circleId: 5, name: '풍경화 장인들', description: '자연을 담는 시간', isJoined: false, isFull: false, memberCount: 50, capacity: 60, profileUrl: '' },
  { circleId: 6, name: '픽셀 아트 연구소', description: '점 찍는 즐거움', isJoined: false, isFull: false, memberCount: 12, capacity: 1000, profileUrl: '' },
  { circleId: 7, name: '일러스트 크루', description: '연구하고 공유해요', isJoined: false, isFull: true, memberCount: 100, capacity: 100, profileUrl: '' },
  { circleId: 8, name: '야작하는 사람들', description: '밤샘 드로잉 메이트', isJoined: false, isFull: false, memberCount: 5, capacity: 10, profileUrl: '' },
  { circleId: 9, name: '수채화 갬성', description: '물맛 나는 그림', isJoined: false, isFull: false, memberCount: 22, capacity: 30, profileUrl: '' },
  { circleId: 10, name: '크로키 10분 완성', description: '빠르게 관찰하기', isJoined: false, isFull: false, memberCount: 8, capacity: 1000, profileUrl: '' },
  { circleId: 11, name: '오일 파스텔 클래스', description: '꾸덕한 질감 표현', isJoined: false, isFull: true, memberCount: 12, capacity: 12, profileUrl: '' },
  { circleId: 12, name: '웹툰 지망생 모임', description: '데뷔까지 달립니다', isJoined: false, isFull: false, memberCount: 88, capacity: 200, profileUrl: '' },
  { circleId: 13, name: '배경 투시 연구', description: '투시도 정복하기', isJoined: false, isFull: false, memberCount: 14, capacity: 20, profileUrl: '' },
  { circleId: 14, name: '색채학 마스터', description: '컬러의 모든 것', isJoined: false, isFull: false, memberCount: 3, capacity: 1000, profileUrl: '' },
  { circleId: 15, name: '3D 렌더링 스터디', description: '블렌더 정복기', isJoined: false, isFull: true, memberCount: 30, capacity: 30, profileUrl: '' },
  { circleId: 16, name: '아이패드 드로잉', description: '디지털 캔버스 활용', isJoined: false, isFull: false, memberCount: 150, capacity: 500, profileUrl: '' },
  { circleId: 17, name: '드로잉 기초 101', description: '선 긋기부터 시작', isJoined: false, isFull: false, memberCount: 45, capacity: 60, profileUrl: '' },
  { circleId: 18, name: '판타지 세계관 설정', description: '컨셉 아트의 기초', isJoined: false, isFull: false, memberCount: 9, capacity: 15, profileUrl: '' },
  { circleId: 19, name: '애니메이션 원화팀', description: '움직임을 그립니다', isJoined: false, isFull: true, memberCount: 8, capacity: 8, profileUrl: '' },
  { circleId: 20, name: '포토샵 고수들', description: '편집과 보정의 끝', isJoined: false, isFull: false, memberCount: 1, capacity: 1000, profileUrl: '' },
];
/** 🟢 써클 멤버용 로우 데이터 (badgeImage 제외) */
const RAW_CIRCLE_MEMBER_DATA: Omit<CircleMemberItem, 'badgeImage'>[] = [
  { userId: 102, nickname: 'User_Beta', introduction: '써클 방장입니다. 환영해요!', isFollowing: true, profileImgUrl: '', level: 'MASTER', profileIcon: 'char_profile_blue', role: 'owner', tags: ['MASTER', 'LEADER'] },
  { userId: 101, nickname: 'User_Alpha', introduction: '열심히 그려봐요.', isFollowing: true, profileImgUrl: '', level: 'SKETCHER', profileIcon: 'char_profile_red', role: 'member', tags: ['DAILY', 'PENCIL'] },
  { userId: 206, nickname: 'Drawing_Hand', introduction: '매일 드로잉 챌린지 중', isFollowing: false, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['ARTIST', 'COLOR'] },
  { userId: 210, nickname: 'Blue_Ocean', introduction: '바다 풍경 전문입니다.', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['LANDSCAPE', 'WATERCOLOR'] },
  { userId: 115, nickname: 'Pixel_King', introduction: '도트 찍는게 취미예요.', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['CHARACTER', 'SIMPLE'] },
  { userId: 225, nickname: 'Fan_Artist', introduction: '아이돌 팬아트 위주!', isFollowing: true, profileImgUrl: '', level: 'PAINTER', profileIcon: 'char_profile_blue', role: 'member', tags: ['FAN_ART', 'COLOR'] },
  { userId: 124, nickname: 'Oil_Master', introduction: '클래식한 유화 느낌.', isFollowing: true, profileImgUrl: '', level: 'MASTER', profileIcon: 'char_sad', role: 'member', tags: ['TRADITIONAL', 'DETAILED'] },
  { userId: 213, nickname: 'Sad_Panda', introduction: '슬프지만 그립니다...', isFollowing: false, profileImgUrl: '', level: 'SKETCHER', profileIcon: 'char_sad', role: 'member', tags: ['DAILY', 'CROQUIS'] },
  { userId: 109, nickname: 'User_Theta', introduction: '디지털 아트 입문자', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_green', role: 'member', tags: ['FANTASY', 'ANIMATION'] },
  { userId: 162, nickname: 'User_Beta', introduction: '써클 방장입니다. 환영해요!', isFollowing: true, profileImgUrl: '', level: 'MASTER', profileIcon: 'char_profile_blue', role: 'owner', tags: ['MASTER', 'LEADER'] },
  { userId: 401, nickname: 'User_Alpha', introduction: '열심히 그려봐요.', isFollowing: true, profileImgUrl: '', level: 'SKETCHER', profileIcon: 'char_profile_red', role: 'member', tags: ['DAILY', 'PENCIL'] },
  { userId: 406, nickname: 'Drawing_Hand', introduction: '매일 드로잉 챌린지 중', isFollowing: false, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['ARTIST', 'COLOR'] },
  { userId: 410, nickname: 'Blue_Ocean', introduction: '바다 풍경 전문입니다.', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['LANDSCAPE', 'WATERCOLOR'] },
  { userId: 415, nickname: 'Pixel_King', introduction: '도트 찍는게 취미예요.', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_blue', role: 'member', tags: ['CHARACTER', 'SIMPLE'] },
  { userId: 425, nickname: 'Fan_Artist', introduction: '아이돌 팬아트 위주!', isFollowing: true, profileImgUrl: '', level: 'PAINTER', profileIcon: 'char_profile_blue', role: 'member', tags: ['FAN_ART', 'COLOR'] },
  { userId: 424, nickname: 'Oil_Master', introduction: '클래식한 유화 느낌.', isFollowing: true, profileImgUrl: '', level: 'MASTER', profileIcon: 'char_sad', role: 'member', tags: ['TRADITIONAL', 'DETAILED'] },
  { userId: 413, nickname: 'Sad_Panda', introduction: '슬프지만 그립니다...', isFollowing: false, profileImgUrl: '', level: 'SKETCHER', profileIcon: 'char_sad', role: 'member', tags: ['DAILY', 'CROQUIS'] },
  { userId: 409, nickname: 'User_Theta', introduction: '디지털 아트 입문자', isFollowing: true, profileImgUrl: '', level: 'ARTIST', profileIcon: 'char_profile_green', role: 'member', tags: ['FANTASY', 'ANIMATION'] },
  { userId: 240, nickname: 'Sketch_Note', introduction: '비주얼 씽킹 공부 중', isFollowing: false, profileImgUrl: '', level: 'SKETCHER', profileIcon: 'char_sad', role: 'member', tags: ['SIMPLE', 'PENCIL'] },
];

/** 🟢 맵핑을 통해 badgeImage를 자동으로 채워넣은 최종 써클 멤버 목록 */
export const MOCK_CIRCLE_MEMBER_LIST: CircleMemberItem[] = RAW_CIRCLE_MEMBER_DATA.map(member => ({
  ...member,
  badgeImage: getBadgeByLevel(member.level ?? 'SKETCHER')
}));

/** 🟢 특정 써클 정보를 포함한 멤버 응답 목업 (Family A 구조) */
export const MOCK_GET_CIRCLE_MEMBERS_RESPONSE = {
  isSuccess: true,
  code: "COMMON_200",
  message: "성공적으로 조회되었습니다.",
  data: {
    isLeader: true, // 현재 접속자가 방장인지 여부
    members: MOCK_CIRCLE_MEMBER_LIST
  }
};

export const MOCK_CURRENT_CIRCLE_ID = 1; // 그리밍 공식 써클 ID