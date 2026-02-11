import { useEffect } from "react";
import { LoadingSpinner } from "../../../components/common/feedback/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";

const TRUE_SET = new Set(["true", "1", "yes", "y"]);
const FALSE_SET = new Set(["false", "0", "no", "n"]);

const AuthCallbackView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const isNewUserRaw =
      searchParams.get("is_new_user") ?? searchParams.get("isNewUser");
    const normalized = (isNewUserRaw ?? "").toLowerCase();

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    // ✅ NEW USER: 온보딩 시작 화면으로
    if (TRUE_SET.has(normalized)) {
      navigate("/onboardingstart", { replace: true });
      return;
    }

    // ✅ EXISTING USER: 홈으로
    if (FALSE_SET.has(normalized)) {
      navigate("/home", { replace: true });
      return;
    }

    navigate("/login", { replace: true });
  }, [navigate, searchParams]);

  return (
    <div className="bg-auth-onboarding min-h-dvh w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
        <LoadingSpinner size={116} />
        <p className="sub-title-medium text-on-surface">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default AuthCallbackView;
