import HeaderDefault from "./HeaderDefault";
import HeaderLogo from "./HeaderLogo";
import HeaderMain from "./HeaderMain";
import type { HeaderProps as SharedHeaderProps } from "./types";

const Header = ({ variant, userInfo, onLogout }: SharedHeaderProps) => {
  switch (variant) {
    case 'logo':
      return <HeaderLogo />;

    case 'main':
      return <HeaderMain userInfo={userInfo} onLogout={onLogout} />;

    case 'default':
      return <HeaderDefault userInfo={userInfo} onLogout={onLogout} />;

    default:
      return null;
  }
};

export default Header;