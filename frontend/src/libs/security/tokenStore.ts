// const getDevAccessToken = () => {
//   if (!import.meta.env.DEV) return null;

//   const token = import.meta.env.VITE_DEV_ACCESS_TOKEN;
//   if (typeof token !== "string") return null;

//   const trimmed = token.trim();
//   return trimmed.length > 0 ? trimmed : null;
// };

// let accessToken: string | null = getDevAccessToken();

// export const setAccessToken = (token: string | null) => {
//   accessToken = token;
// };

// export const getAccessToken = () => accessToken;

// export const clearAccessToken = () => {
//   accessToken = null;
// };
// src/libs/security/tokenStore.ts
const STORAGE_KEY = "greaming_access_token";

const getDevAccessToken = () => {
  if (!import.meta.env.DEV) return null;

  const token = import.meta.env.VITE_DEV_ACCESS_TOKEN;
  if (typeof token !== "string") return null;

  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const getStoredToken = () => {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t && t.trim().length > 0 ? t : null;
  } catch {
    return null;
  }
};

let accessToken: string | null = getStoredToken() ?? getDevAccessToken();

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  try {
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => setAccessToken(null);
