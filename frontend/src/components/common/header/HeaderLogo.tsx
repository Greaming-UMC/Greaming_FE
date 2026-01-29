import Logo from "../Logo";

const HeaderLogo = () => {
  return (
    <header className="h-[82px] flex items-center px-6 bg-gradient-to-b from-primary via-primary/60 to-transparent">
      <Logo name="mono_white_wordmark" size={100} />
    </header>
  );
};

export default HeaderLogo;
