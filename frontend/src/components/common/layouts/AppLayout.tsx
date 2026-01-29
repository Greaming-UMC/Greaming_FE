import { Outlet, useLocation } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import { HEADER_HEIGHT } from './layout';

const AppLayout = () => {
  const { pathname } = useLocation();
  const variant = pathname === '/' ? 'main' : 'default';
  const currentHeaderHeight = variant === 'main' 
    ? 0
    : HEADER_HEIGHT.DEFAULT;

  return (
    <div className="min-h-screen bg-transparent">
      <HeaderContainer variant={variant} />
      <main
        style={{
          paddingTop: currentHeaderHeight,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
