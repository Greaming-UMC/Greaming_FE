import { Link } from "react-router-dom";
import Logo from "../Logo";

const HeaderLogo = () => {
  return (
    <header className="h-[82px] flex items-center px-4 bg-linear-to-b from-primary via-primary/60 to-transparent">
      <Link to="/home" aria-label="홈으로 이동" className="inline-flex">
        <Logo name="mono_white_wordmark" size={100} />
      </Link>
    </header>
  );
};

export default HeaderLogo;
