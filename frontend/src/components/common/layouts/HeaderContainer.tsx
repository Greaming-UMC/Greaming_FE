import { useUserProfile } from "../../../apis/hooks/useUser";
import Header from "../header/Header";

interface HeaderContainerProps {
  variant: 'main' | 'default' | 'logo';
}

const HeaderContainer = ({ variant }: HeaderContainerProps) => {
  const shouldFetchUser = variant !== 'logo';

  const { data } = useUserProfile();

  const userInfo = data?.result?.userInformation;

  const handleLogout = () => {
    console.log('logout');
  };

  // 스웨거 나오면 API관련해서 리팩토링 할 예정입니다....!
  return (
    <Header
      {...({ variant, userInfo, onLogout: handleLogout } as any)}
    />
  );
};

export default HeaderContainer;
