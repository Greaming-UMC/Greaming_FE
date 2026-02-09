import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { ToastProvider } from './components/common/feedback/Toast/ToastProvider';

function App() {
  return (
    <ToastProvider> 
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
