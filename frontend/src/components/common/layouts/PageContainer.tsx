interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6">
      {children}
    </div>
  );
};

export default PageContainer;
