import HeaderDefault from "./HeaderDefault";
import HeaderLogo from "./HeaderLogo";
import HeaderMain from "./HeaderMain";

export type HeaderVariant = 'logo' | 'main' | 'default';

interface HeaderProps {
  variant: HeaderVariant;
}

const Header = ({ variant }: HeaderProps) => {
  switch (variant) {
    case 'logo':
      return <HeaderLogo />;

    case 'main':
      return <HeaderMain />;

    case 'default':
      return <HeaderDefault />;

    default:
      return null;
  }
};

export default Header;
