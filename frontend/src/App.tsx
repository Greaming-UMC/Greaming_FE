import { useState } from 'react';
import Logo from './components/common/Logo';
import AppLayout from './components/layouts/AppLayout';
import PageContainer from './components/layouts/PageContainer';

import mainBackground from './assets/background/main_background.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppLayout>
      <div className="flex flex-col w-full">
        <section
          className="
            relative flex flex-col items-center justify-center
            w-full min-h-screen
            bg-cover bg-center bg-no-repeat
            bg-surface-inverse 
          "
          style={{ backgroundImage: `url(${mainBackground})` }}
        >
          <div className="flex w-full max-w-5xl items-center justify-center gap-8 px-6 pb-20 pt-32">
             <div className="flex min-h-[50vh] flex-col items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-6">
                  <Logo name="favicon" size={100} aria-label="Greaming logo" />
                </div>

                <div className="space-y-2">
                  <h1 className="display-large text-on-primary">Greaming Design System</h1>
                  <p className="body-medium text-on-primary">
                    Vite + React + GDS 프리뷰 화면입니다.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="label-large-emphasized state-layer secondary-opacity-8 rounded-medium bg-secondary px-6 py-3 text-on-secondary"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    Count is {count}
                  </button>
                  <p className="label-medium text-on-inverse">
                    <code className="rounded-small bg-surface-variant-low px-2 py-1 text-on-primary">
                      src/App.tsx
                    </code>
                    를 수정해서 바로 확인하세요.
                  </p>
                </div>
              </div>
          </div>
        </section>

        <section className="w-full bg-surface py-12">
          <PageContainer>
            {/* Header 스크롤 테스트용 더미 컨텐츠 */}
            <div className="space-y-40 py-20">
              <div className="h-[600px] rounded-large bg-surface-variant" />
              <div className="h-[600px] rounded-large bg-surface-variant" />
              <div className="h-[600px] rounded-large bg-surface-variant" />
            </div>
          </PageContainer>
        </section>
      </div>
    </AppLayout>
  );
}

export default App;