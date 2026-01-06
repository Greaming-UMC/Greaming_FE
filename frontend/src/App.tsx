import { useState } from 'react'
import Logo from './components/common/Logo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="flex items-center gap-6">
          <Logo name="favicon" size={96} aria-label="Greaming primary logo" />
        </div>

        <div className="space-y-2">
          <h1 className="display-large">Greaming Design System</h1>
          <p className="body-medium text-on-surface-variant-low">
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
          <p className="label-medium text-on-surface-variant-low">
            <code className="rounded-small bg-surface-variant-low px-2 py-1">src/App.tsx</code>
            를 수정해서 바로 확인하세요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
