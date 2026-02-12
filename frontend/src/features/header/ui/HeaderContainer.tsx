import { useEffect } from "react";
import axios from "axios";
import { useUserProfile } from "../../../apis/hooks/useUser";
import { useLogout } from "../../../apis/hooks/useAuth";
import type { CheckMyProfileResult } from "../../../apis/types/user";
import Header from "./Header";
import type { HeaderVariant } from "../config";
import { useAuthStore } from "../../../libs/security/authStore";
import type { UserInfo } from "../config";
import { useNavigate } from "react-router-dom";

interface HeaderContainerProps {
  variant: HeaderVariant;
}

const HeaderContainer = ({ variant }: HeaderContainerProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const { mutate: triggerLogout } = useLogout();

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
        level: profile.usagePurpose,
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
    triggerLogout(undefined, {
      onSettled: () => {
        navigate("/login", { replace: true });
      },
    });
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
