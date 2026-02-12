import { Link } from "react-router-dom";
import Logo from "../../../components/common/Logo";
import { HEADER_HEIGHT, Z_INDEX } from "../../../components/common/layouts/layout";

const HeaderLogo = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full flex items-center px-8 bg-linear-to-b from-primary via-primary/60 to-transparent"
      style={{ height: HEADER_HEIGHT.LOGO, zIndex: Z_INDEX.HEADER }}
    >
      <Link to="/home" aria-label="홈으로 이동" className="inline-flex">
        <Logo name="mono_white_wordmark" size={100} />
      </Link>
    </header>
  );
};

export default HeaderLogo;
