export function OnboardingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[720px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
      {children}
    </div>
  );
}
