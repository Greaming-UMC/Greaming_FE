import { HeaderLogo } from "../components";
import HeaderMain from "./HeaderMain";
import type { HeaderProps } from "../config";

const Header = ({ variant, userInfo, onLogout }: HeaderProps) => {
  switch (variant) {
    case 'logo':
      return <HeaderLogo />;

    case 'main':
      return <HeaderMain userInfo={userInfo} onLogout={onLogout} />;

    case 'default':
      return <HeaderMain userInfo={userInfo} onLogout={onLogout} />;

    default:
      return null;
  }
};

export default Header;
