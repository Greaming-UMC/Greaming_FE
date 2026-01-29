export interface UserInfo {
  nickname: string;
  profileImgUrl?: string;
  level?: string;
}

export interface HeaderProps {
  variant: 'main' | 'default' | 'logo';
  userInfo?: UserInfo;
  onLogout?: () => void;
}

