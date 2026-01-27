import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
