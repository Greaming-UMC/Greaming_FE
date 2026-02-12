import AppLayout from './components/common/layouts/AppLayout';
import JourneyPage from './pages/JourneyPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import DetailPage from './pages/DetailPage';
import ModalPracticePage from './pages/ModalPracticePage';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ExamplePage from './pages/ExamplePage';
import OnboardingWelcomePage from './pages/OnboardingWelcomePage';
import OnboardingPage from './pages/OnboardingPage';
import { UploadView } from './features/upload';
import WeeklyChallengeUploadPage from './features/upload/ui/pages/WeeklyChallengeUploadPage';
import DailyUploadPage from './features/upload/ui/pages/DailyUploadPage';

/* TODO
라우터 설정은 추후 변경해야 합니다. 또한, 나중에 API 연동할 때 로그인 여부 등.. 다시 리팩토링해야합니당
지금은 정말 기초적인 라우팅만 설정해둔 상태이고, 각 상세 페이지 구현 여부 확인할 때 라우팅 추가하셔서 사용하시면 될 것 같습니다. */

const router = createBrowserRouter([
  {
    path: '/',
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
      {
        path: 'profile',
        children: [
          {
            index: true,
            element: <Navigate to="self" replace />,
          },
          {
            path: 'self',
            element: <ProfilePage mode="self" />,
          },
          {
            path: 'user/:userId',
            element: <ProfilePage mode="user" />,
          },
          {
            path: 'circle/:circleId',
            element: <ProfilePage mode="circle" />,
          },
        ],
      },
      {
        path: 'journey',
        element: <JourneyPage />,
      },
    ],
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
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
    path: '/onboarding',
    element: <OnboardingWelcomePage />,
  },
  {
    path: '/onboarding/step1',
    element: <OnboardingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/callback',
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path:'upload',
    element:<UploadView/>
  },
  {
    path:'upload/weekly',
    element:<WeeklyChallengeUploadPage/>
  },
  {
    path:'upload/daily',
    element:<DailyUploadPage/>
  }
]);

export default router;
