import Logo from "../common/Logo";

const Header = () => {
  return (
    <header className="h-14 flex items-center px-6 bg-surface border-b border-outline">
      <div className="flex items-center gap-2">
        <Logo
          name="primary"
          size={24}
          aria-label="Greaming logo"
        />
        <h1 className="title-medium-emphasized">Greaming</h1>
      </div>
    </header>
  );
};

export default Header;
