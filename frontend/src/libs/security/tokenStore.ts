let accessToken: string | null = null;

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
