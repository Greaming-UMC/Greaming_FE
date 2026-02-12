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
};

// export const getAccessToken = () => accessToken;

export function getAccessToken() {
  return localStorage.getItem("accessToken") ?? import.meta.env.VITE_DEV_ACCESS_TOKEN ?? null;
}

export const clearAccessToken = () => {
  accessToken = null;
};
