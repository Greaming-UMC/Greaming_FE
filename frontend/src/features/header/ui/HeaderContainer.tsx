import { useEffect } from "react";
import axios from "axios";
import { useUserProfile } from "../../../apis/hooks/useUser";
import type { CheckMyProfileResult } from "../../../apis/types/user";
import Header from "./Header";
import type { HeaderVariant } from "../config";
import { useAuthStore } from "../../../libs/security/authStore";
import type { UserInfo } from "../config";

interface HeaderContainerProps {
  variant: HeaderVariant;
}

const HeaderContainer = ({ variant }: HeaderContainerProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  const { data, isSuccess, isError, error } = useUserProfile({
    enabled: variant !== "logo" && isLoggedIn,
  });

  const result = data?.result as CheckMyProfileResult | null | undefined;
  const profile =
    result?.user_information ??
    result?.userInformation;

  const userInfo: UserInfo | undefined = profile
    ? {
        nickname: profile.nickname,
        profileImgUrl: profile.profileImgUrl,
        level: profile.level,
      }
    : undefined;

  useEffect(() => {
    if (!isSuccess) return;
    setAuthenticated();
  }, [isSuccess, setAuthenticated]);

  useEffect(() => {
    if (!isError) return;
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    if (status === 401 || status === 403) {
      setUnauthenticated();
    }
  }, [isError, error, setUnauthenticated]);

  const handleLogout = () => {
    console.log('logout');
    // TODO : 실제 로그아웃 로직 추가 필요 (토큰 삭제 등.....)
  };

  return (
    <Header
      variant={variant}
      userInfo={userInfo}
      onLogout={handleLogout}
    />
  );
};

export default HeaderContainer;
