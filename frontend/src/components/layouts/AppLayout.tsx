import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
