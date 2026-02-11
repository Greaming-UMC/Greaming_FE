import { Outlet } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";
import { HEADER_HEIGHT } from "./layout";
import type { HeaderVariant } from "../header/types";

interface AppLayoutProps {
  variant: HeaderVariant;
}

const AppLayout = ({ variant }: AppLayoutProps) => {
  const currentHeaderHeight =
    variant === "main" || variant === "logo" ? 0 : HEADER_HEIGHT.DEFAULT;

  return (
    <div className="min-h-screen bg-transparent">
      <HeaderContainer variant={variant} />
      <main style={{ paddingTop: currentHeaderHeight }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
