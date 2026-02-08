import { Navigate, useSearchParams } from "react-router-dom";

const TRUE_SET = new Set(["true", "1", "yes", "y"]);
const FALSE_SET = new Set(["false", "0", "no", "n"]);

const AuthCallbackView = () => {
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");
  const isNewUserRaw =
    searchParams.get("is_new_user") ?? searchParams.get("isNewUser");
  const normalized = (isNewUserRaw ?? "").toLowerCase();

  if (error) {
    return <Navigate to={`/login?error=${encodeURIComponent(error)}`} replace />;
  }

  if (TRUE_SET.has(normalized)) {
    return <Navigate to="/onboarding/step1" replace />;
  }

  if (FALSE_SET.has(normalized)) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default AuthCallbackView;
