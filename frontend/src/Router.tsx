import AppLayout from './components/common/layouts/AppLayout';
import JourneyPage from './pages/JourneyPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import DetailPage from './pages/DetailPage';
import ModalPracticePage from './pages/ModalPracticePage';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';

/* TODO
라우터 설정은 추후 변경해야 합니다. 또한, 나중에 API 연동할 때 로그인 여부 등.. 다시 리팩토링해야합니당
지금은 정말 기초적인 라우팅만 설정해둔 상태이고, 각 상세 페이지 구현 여부 확인할 때 라우팅 추가하셔서 사용하시면 될 것 같습니다. */

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'profile',
        children: [
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
      {
        path: 'onboarding',
        element: <WelcomeScreen />,
      },
      {
        path: 'onboarding/step1',
        element: <OnboardingSteps />,
      },
      {
        path: 'setting',
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
]);

export default router;
