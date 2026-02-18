import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { ToastProvider } from './components/common/feedback/Toast/ToastProvider';
import {
  initializePreemptiveRefresh,
  stopPreemptiveRefresh,
} from './libs/security/refreshManeger';

function App() {
  useEffect(() => {
    initializePreemptiveRefresh();
    return () => {
      stopPreemptiveRefresh();
    };
  }, []);

  return (
    <ToastProvider> 
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
