import { Outlet, useLocation } from 'react-router-dom';
import HeaderContainer from '../layouts/HeaderContainer';

const HEADER_HEIGHT = {
  main: 82,
  default: 62,
  logo: 62,
} as const;

const AppLayout = () => {
  const { pathname } = useLocation();

  const variant =
    pathname === '/'
      ? 'main'
      : 'default';

  return (
    <div className="min-h-screen bg-transparent">
      <HeaderContainer variant={variant} />
     <main
        style={{
          paddingTop: variant === 'main' ? 0 : HEADER_HEIGHT[variant],
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
