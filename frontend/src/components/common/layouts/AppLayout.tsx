import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen bg-transparent">
      <Header variant={isHome ? 'home' : 'default'} />
      <main
        className={
          isHome
            ? '' // 홈 : 헤더 겹침
            : 'pt-[62px]' // 나머지 : 고정 헤더 높이만큼 패딩 추가
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
