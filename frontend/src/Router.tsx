import AppLayout from './components/common/layouts/AppLayout';
import MyRoomPage from './pages/MyRoomPage';
import JourneyPage from './pages/JourneyPage';
import HomePage from './pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import OnboardingWelcomePage from './pages/OnboardingWelcomePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import UploadPageRoute from './pages/UploadPage';
import WeeklyChallengeUploadPage from './features/upload/ui/pages/WeeklyChallengeUploadPage';
import CircleUploadPage from './features/upload/ui/pages/CircleUploadPage';
import DailyUploadPage from './features/upload/ui/pages/DailyUploadPage';

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
        index: true,
        element: <HomePage />,
      },
      {
        path: 'my-room',
        element: <MyRoomPage />,
      },
      {
        path: 'journey',
        element: <JourneyPage />,
      },
      {
        path: '/onboardingstart',
        element: <OnboardingWelcomePage />,
      },
      {
        path:'/onboarding',
        element:<OnboardingPage/>,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/upload',
        element: <UploadPageRoute />,
      },
      
      {
        path: "/upload/weekly",
        element: <WeeklyChallengeUploadPage />,
      },
      {
        path: "/upload/circle",
        element: <CircleUploadPage />,
      },
      {
        path:"/upload/daily",
        element:<DailyUploadPage />
      }

      
    ],
  },
]);

export default router;