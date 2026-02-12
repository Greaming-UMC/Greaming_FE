import { useEffect, useMemo } from "react";
import axios from "axios";
import { useUserProfile } from "../../../apis/hooks/useUser";
import { useLogout } from "../../../apis/hooks/useAuth";
import type { CheckMyProfileResult } from "../../../apis/types/user";
import Header from "./Header";
import type { HeaderVariant } from "../config";
import { useAuthStore } from "../../../libs/security/authStore";
import type { UserInfo } from "../config";
import { useNavigate } from "react-router-dom";
import { useHeaderProfileStore } from "../../../stores/useHeaderProfileStore";

interface HeaderContainerProps {
  variant: HeaderVariant;
}

const HeaderContainer = ({ variant }: HeaderContainerProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const profile = useHeaderProfileStore((state) => state.profile);
  const setProfile = useHeaderProfileStore((state) => state.setProfile);
  const clearProfile = useHeaderProfileStore((state) => state.clearProfile);
  const { mutate: triggerLogout } = useLogout();

  const { data, isSuccess, isError, error } = useUserProfile({
    enabled: variant !== "logo" && isLoggedIn,
  });

  const result = data?.result as CheckMyProfileResult | null | undefined;
  const responseProfile = useMemo(() => {
    const resolved =
      result?.user_information ??
      result?.userInformation;

    if (!resolved) return null;

    return {
      nickname: resolved.nickname,
      profileImgUrl: resolved.profileImgUrl,
      level:
        resolved.journeyLevel ??
        (resolved as { usagePurpose?: string }).usagePurpose,
    };
  }, [result]);

  const userInfo: UserInfo | undefined = profile ?? undefined;

  useEffect(() => {
    if (!isSuccess) return;
    setAuthenticated();
  }, [isSuccess, setAuthenticated]);

  useEffect(() => {
    if (!responseProfile) return;
    setProfile(responseProfile);
  }, [responseProfile, setProfile]);

  useEffect(() => {
    if (!isError) return;
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    if (status === 401 || status === 403) {
      setUnauthenticated();
      clearProfile();
    }
  }, [isError, error, setUnauthenticated, clearProfile]);

  useEffect(() => {
    if (isLoggedIn) return;
    clearProfile();
  }, [isLoggedIn, clearProfile]);

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
