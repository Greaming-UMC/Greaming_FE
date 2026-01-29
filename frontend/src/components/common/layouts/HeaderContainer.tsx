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

  return (
    <Header
      {...({ variant, userInfo, onLogout: handleLogout } as any)}
    />
  );
};

export default HeaderContainer;
