import { httpRefresh } from "../http/refreshClient";
import { ENDPOINTS } from "../http/endpoints/endpoints";
import { useAuthStore } from "./authStore";
import {
  extractAccessTokenExpiresAtMsFromReissueResponse,
  extractAccessTokenFromReissueResponse,
} from "./reissueToken";
import { clearAccessToken, getAccessToken, setAccessToken } from "./tokenStore";

const PREEMPTIVE_REFRESH_BUFFER_MS = 60_000;
const MIN_REFRESH_DELAY_MS = 1_000;
const MAX_TIMEOUT_MS = 2_147_483_647;

const isBrowser = typeof window !== "undefined";

type RefreshReason = "preemptive" | "reactive" | "auth-check";

let refreshTimer: number | null = null;
let refreshPromise: Promise<void> | null = null;
let sessionExpiredHandled = false;

const looksLikeJwt = (token: string): boolean => token.split(".").length === 3;

const decodeBase64Url = (value: string): string => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = padded.padEnd(Math.ceil(padded.length / 4) * 4, "=");
  return atob(normalized);
};

const getJwtExpAtMs = (token: string): number | null => {
  if (!looksLikeJwt(token)) return null;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(decodeBase64Url(payload)) as { exp?: unknown };
    if (typeof decoded.exp !== "number" || !Number.isFinite(decoded.exp)) {
      return null;
    }
    return decoded.exp * 1000;
  } catch {
    return null;
  }
};

const getDelayMs = (expiresAtMs: number): number => {
  const rawDelay = expiresAtMs - Date.now() - PREEMPTIVE_REFRESH_BUFFER_MS;
  return Math.min(Math.max(rawDelay, MIN_REFRESH_DELAY_MS), MAX_TIMEOUT_MS);
};

const handleSessionExpired = () => {
  if (!isBrowser || sessionExpiredHandled) return;
  if (window.location.pathname === "/login") return;
  sessionExpiredHandled = true;
  alert("로그인 세션이 만료되었습니다.");
  window.location.href = "/login";
};

export const stopPreemptiveRefresh = () => {
  if (refreshTimer === null || !isBrowser) return;
  window.clearTimeout(refreshTimer);
  refreshTimer = null;
};

export const schedulePreemptiveRefresh = (
  token: string,
  expiresAtMs?: number | null,
) => {
  if (!isBrowser) return;

  stopPreemptiveRefresh();

  const target = expiresAtMs ?? getJwtExpAtMs(token);
  if (!target) return;

  const delay = getDelayMs(target);
  refreshTimer = window.setTimeout(() => {
    void refreshAccessTokenNow("preemptive");
  }, delay);
};

export const initializePreemptiveRefresh = () => {
  const token = getAccessToken();
  if (!token) {
    stopPreemptiveRefresh();
    return;
  }

  schedulePreemptiveRefresh(token);
};

export const refreshAccessTokenNow = async (
  reason: RefreshReason = "reactive",
): Promise<void> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await httpRefresh.post(ENDPOINTS.AUTH.REISSUE_TOKEN);
    const nextToken = extractAccessTokenFromReissueResponse(res);
    if (!nextToken) {
      throw new Error("access token missing from reissue response");
    }

    const expiresAtMs = extractAccessTokenExpiresAtMsFromReissueResponse(res);
    setAccessToken(nextToken);
    schedulePreemptiveRefresh(nextToken, expiresAtMs);
    useAuthStore.getState().setAuthenticated();
    sessionExpiredHandled = false;
  })()
    .catch((error) => {
      stopPreemptiveRefresh();
      clearAccessToken();
      useAuthStore.getState().setUnauthenticated();

      if (reason === "preemptive") {
        handleSessionExpired();
      }

      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};
