import { useEffect } from "react";
import { LoadingSpinner } from "../../../components/common/feedback/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../../libs/security/authStore";
import axios from "axios";
import { checkAuthTest } from "../../../apis/types/auth";
import { getMyProfileHeader } from "../../../apis/types/user";

const TRUE_SET = new Set(["true", "1", "yes", "y"]);
const FALSE_SET = new Set(["false", "0", "no", "n"]);
const DEFAULT_REDIRECT_PATH = "/home";

const isSafeInternalPath = (value: string | null) => {
  if (!value) return false;
  if (!value.startsWith("/") || value.startsWith("//")) return false;
  if (value.startsWith("/auth/callback")) return false;
  return true;
};

const AuthCallbackView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  useEffect(() => {
    let canceled = false;

    const error = searchParams.get("error");
    const isNewUserRaw =
      searchParams.get("is_new_user") ?? searchParams.get("isNewUser");
    const normalized = (isNewUserRaw ?? "").toLowerCase();
    const redirectPathRaw = searchParams.get("redirect");
    const redirectPath = isSafeInternalPath(redirectPathRaw)
      ? redirectPathRaw
      : DEFAULT_REDIRECT_PATH;

    const redirectToLogin = () => {
      if (canceled) return;
      setUnauthenticated();
      if (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
        return;
      }
      navigate("/login", { replace: true });
    };

    const run = async () => {
      if (error) {
        redirectToLogin();
        return;
      }

      try {
        await checkAuthTest();
        if (canceled) return;
        setAuthenticated();
      } catch {
        redirectToLogin();
        return;
      }

      if (TRUE_SET.has(normalized)) {
        if (!canceled) {
          navigate("/onboarding/step1", { replace: true });
        }
        return;
      }

      if (FALSE_SET.has(normalized)) {
        if (!canceled) {
          navigate(redirectPath, { replace: true });
        }
        return;
      }

      try {
        await getMyProfileHeader();
        if (!canceled) {
          navigate(redirectPath, { replace: true });
        }
      } catch (profileError) {
        const status = axios.isAxiosError(profileError)
          ? profileError.response?.status
          : undefined;

        if (status === 404) {
          if (!canceled) {
            navigate("/onboarding/step1", { replace: true });
          }
          return;
        }

        if (status === 401 || status === 403) {
          redirectToLogin();
          return;
        }

        if (!canceled) {
          navigate("/login", { replace: true });
        }
      }
    };

    run();

    return () => {
      canceled = true;
    };
  }, [navigate, searchParams, setAuthenticated, setUnauthenticated]);

  return (
    <div className="relative min-h-dvh w-full bg-auth-onboarding">
      <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
          <LoadingSpinner size={128} className="text-on-primary"/>
          <p className="sub-title-medium text-on-primary">로그인 처리 중...</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackView;
