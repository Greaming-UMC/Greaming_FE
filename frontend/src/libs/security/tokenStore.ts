const getDevAccessToken = () => {
  if (!import.meta.env.DEV) return null;

  const token = import.meta.env.VITE_DEV_ACCESS_TOKEN;
  if (typeof token !== "string") return null;

  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : null;
};

let accessToken: string | null = getDevAccessToken();

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
};

// export const getAccessToken = () => accessToken;

export function getAccessToken() {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return stored ?? accessToken ?? null;
}

export const clearAccessToken = () => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};
