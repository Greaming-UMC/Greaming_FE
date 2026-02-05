export interface UserInfo {
  nickname: string;
  profileImgUrl?: string;
  level?: string;
}

export type HeaderVariant = 'logo' | 'main' | 'default';

export interface HeaderProps {
  variant: HeaderVariant;
  userInfo?: UserInfo;
  onLogout?: () => void;
}