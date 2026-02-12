import AppLayout from './components/common/layouts/AppLayout';
import JourneyPage from './pages/JourneyPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import DetailPage from './pages/DetailPage';
import ModalPracticePage from './pages/ModalPracticePage';
import { useEffect } from 'react';
import { Navigate, Outlet, createBrowserRouter, useLocation } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ExamplePage from './pages/ExamplePage';
import OnboardingWelcomePage from './pages/OnboardingWelcomePage';
import OnboardingPage from './pages/OnboardingPage';
import UploadPage from './pages/UploadPage';
import DailyUploadPage from './features/upload/ui/pages/DailyUploadPage';
import WeeklyChallengeUploadPage from './features/upload/ui/pages/WeeklyChallengeUploadPage';
import CircleUploadPage from './features/upload/ui/pages/CircleUploadPage';
import { useAuthStore } from './libs/security/authStore';
import { useAuthCheck } from './apis/hooks/useAuth';
import { LoadingSpinner } from './components/common/feedback/LoadingSpinner';

/* TODO
라우터 설정은 추후 변경해야 합니다. 또한, 나중에 API 연동할 때 로그인 여부 등.. 다시 리팩토링해야합니당
지금은 정말 기초적인 라우팅만 설정해둔 상태이고, 각 상세 페이지 구현 여부 확인할 때 라우팅 추가하셔서 사용하시면 될 것 같습니다. */

const RequireAuth = () => {
  const status = useAuthStore((state) => state.status);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const location = useLocation();
  const authCheckQuery = useAuthCheck({
    enabled: !isLoggedIn && status !== "unauthenticated",
  });

  useEffect(() => {
    if (authCheckQuery.isSuccess) {
      setAuthenticated();
      return;
    }

    if (authCheckQuery.isError) {
      setUnauthenticated();
    }
  }, [authCheckQuery.isSuccess, authCheckQuery.isError, setAuthenticated, setUnauthenticated]);

  if (isLoggedIn || authCheckQuery.isSuccess) {
    return <Outlet />;
  }

  if (authCheckQuery.isLoading || (status === "unknown" && authCheckQuery.isFetching)) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface">
        <LoadingSpinner size={72} className="text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout variant="main" />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'example',
        element: <ExamplePage />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout variant="default" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home/:view',
        element: <HomePage />,
      },
      {
        path: 'profile',
        children: [
          {
            index: true,
            element: <Navigate to="self" replace />,
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: 'self',
                element: <ProfilePage mode="self" />,
              },
              {
                path: 'circle/:circleId',
                element: <ProfilePage mode="circle" />,
              },
            ],
          },
          {
            path: 'user/:userId',
            element: <ProfilePage mode="user" />,
          },
        ],
      },
      {
        path: 'journey',
        element: <JourneyPage />,
      },
      {
        path: 'upload',
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <Navigate to="free" replace />,
          },
          {
            path: 'free',
            element: <UploadPage />,
          },
          {
            path: 'daily',
            element: <DailyUploadPage />,
          },
          {
            path: 'weekly',
            element: <WeeklyChallengeUploadPage />,
          },
          {
            path: 'circle/:circleId',
            element: <CircleUploadPage />,
          },
        ],
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'setting/:tab',
        element: <SettingPage />,
      },
      {
        path: 'detail/:postId',
        element: <DetailPage />,
      },
      {
        path: 'modal-practice',
        element: <ModalPracticePage />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout variant="logo" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ]
  },
  {
    path: '/onboarding',
    element: <OnboardingWelcomePage />,
  },
  {
    path: '/onboarding/step/:step',
    element: <OnboardingPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
