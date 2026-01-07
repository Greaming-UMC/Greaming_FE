import AppLayout from "./components/layouts/AppLayout";
import PageContainer from "./components/layouts/PageContainer";

function App() {
  return (
    <AppLayout>
      <PageContainer>
        <div className="h-[200vh]">레이아웃 테스트용 입니다.</div>
      </PageContainer>
    </AppLayout>
  );
}

export default App;