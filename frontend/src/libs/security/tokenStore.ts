const normalizeToken = (value?: string | null): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const bearerMatch = trimmed.match(/^Bearer\s+(.+)$/i);
  const token = (bearerMatch?.[1] ?? trimmed).trim();
  return token.length > 0 ? token : null;
};

const isJwtLike = (token: string): boolean => token.split(".").length === 3;

const decodeBase64Url = (value: string): string => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = padded.padEnd(Math.ceil(padded.length / 4) * 4, "=");
  return atob(normalized);
};

const getJwtExpSeconds = (token: string): number | null => {
  if (!isJwtLike(token)) return null;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(decodeBase64Url(payload)) as { exp?: unknown };
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch {
    return null;
  }
};

const isTokenExpiredOrExpiringSoon = (
  token: string,
  bufferSeconds = 30,
): boolean => {
  const exp = getJwtExpSeconds(token);
  if (!exp) return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  return exp - nowSeconds <= bufferSeconds;
};

const resolveToken = (raw: string | null): string | null => {
  const normalized = normalizeToken(raw);
  if (!normalized) return null;
  if (isTokenExpiredOrExpiringSoon(normalized)) return null;
  return normalized;
};

const getDevAccessToken = () => {
  if (!import.meta.env.DEV) return null;

  const token = import.meta.env.VITE_DEV_ACCESS_TOKEN;
  if (typeof token !== "string") return null;

  const normalized = normalizeToken(token);
  if (!normalized) return null;

  // 템플릿 문자열/가이드 문구가 그대로 들어간 경우 Authorization 헤더에 실리지 않게 차단합니다.
  if (
    normalized.includes("<your_dev_access_token_here>") ||
    normalized.includes("your_dev_access_token_here")
  ) {
    return null;
  }

  if (!isJwtLike(normalized) || isTokenExpiredOrExpiringSoon(normalized)) {
    return null;
  }

  return normalized;
};

let accessToken: string | null = getDevAccessToken();

export const setAccessToken = (token: string | null) => {
  accessToken = resolveToken(token);
  if (typeof window !== "undefined") {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
};

// export const getAccessToken = () => accessToken;

export function getAccessToken() {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const resolvedStored = resolveToken(stored);
  if (stored && !resolvedStored && typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }

  const resolvedMemory = resolveToken(accessToken);
  if (accessToken && !resolvedMemory) {
    accessToken = null;
  }

  return resolvedStored ?? resolvedMemory ?? null;
}

export const clearAccessToken = () => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};
