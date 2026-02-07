import { useUserProfile } from "../../../apis/hooks/useUser";
import Header from "../header/Header";
import type { HeaderVariant } from "../header/types";

interface HeaderContainerProps {
  variant: HeaderVariant;
}

const HeaderContainer = ({ variant }: HeaderContainerProps) => {
  const { data } = useUserProfile();
  const userInfo = data?.result?.userInformation;

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