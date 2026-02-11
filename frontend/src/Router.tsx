import AppLayout from "./components/common/layouts/AppLayout";
import JourneyPage from "./pages/JourneyPage";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import DetailPage from "./pages/DetailPage";
import ModalPracticePage from "./pages/ModalPracticePage";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ExamplePage from "./pages/ExamplePage";

import { WelcomeScreen } from "./features/onboarding/ui/WelcomeScreen";
import { OnboardingSteps } from "./features/onboarding/ui/OnboardingSteps";

import { getAccessToken } from "./libs/security/tokenStore"; // ✅ 경로 확인!

/* ----------------------------- Guards ----------------------------- */

function RequireAuth() {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RequireOnboarding() {
  const done = localStorage.getItem("onboardingDone") === "1";
  if (!done) return <Navigate to="/onboarding" replace />;
  return <Outlet />;
}

/* ----------------------------- Router ----------------------------- */

const router = createBrowserRouter([
  /** main layout (탭/메인 UI) */
  {
    path: "/",
    element: <AppLayout variant="main" />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      // 홈: 로그인 + 온보딩 완료 필요
      {
        element: <RequireAuth />,
        children: [
          {
            element: <RequireOnboarding />,
            children: [
              { path: "home", element: <HomePage /> },
              { path: "journey", element: <JourneyPage /> },
              {
                path: "profile",
                children: [
                  { index: true, element: <Navigate to="self" replace /> },
                  { path: "self", element: <ProfilePage mode="self" /> },
                  { path: "user/:userId", element: <ProfilePage mode="user" /> },
                  { path: "circle/:circleId", element: <ProfilePage mode="circle" /> },
                ],
              },
            ],
          },
        ],
      },

      // (선택) example은 로그인 없이도 보이게 할지 결정
      { path: "example", element: <ExamplePage /> },
    ],
  },

  /**  default layout (온보딩/설정/디테일 등) */
  {
    path: "/",
    element: <AppLayout variant="default" />,
    errorElement: <ErrorPage />,
    children: [
      // 온보딩 시작 화면: 로그인 전/후 상관없이 접근 가능하게 두는 걸 추천
      { path: "onboardingstart", element: <WelcomeScreen /> },

      // 온보딩 Step1~4: 로그인은 필요 (토큰 없으면 login으로)
      {
        element: <RequireAuth />,
        children: [{ path: "onboarding", element: <OnboardingSteps /> }],
      },

      // 설정/디테일 등은 정책에 따라 auth 묶어도 됨
      { path: "setting", element: <SettingPage /> },
      { path: "setting/:tab", element: <SettingPage /> },
      { path: "detail/:postId", element: <DetailPage /> },
      { path: "modal-practice", element: <ModalPracticePage /> },
    ],
  },

  /** auth */
  { path: "/login", element: <LoginPage /> },
  { path: "/auth/callback", element: <AuthCallbackPage /> },

  /** fallback */
  { path: "*", element: <ErrorPage /> },

  {
  path: "/onboarding/step1",
  element: <Navigate to="/onboarding" replace />,
},

]);

export default router;
