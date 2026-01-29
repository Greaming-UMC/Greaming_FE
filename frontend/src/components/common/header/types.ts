export interface UserInfo {
  nickname: string;
  profileImgUrl?: string;
  level?: string;
}

export interface HeaderProps {
  mode?: 'onboarding' | 'main';
  variant?: 'home' | 'default';
  userInfo?: UserInfo;
  onLogout?: () => void;
}
