import type { AxiosResponse } from "axios";

const normalizeBearerToken = (value: unknown): string | null => {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const bearerMatch = trimmed.match(/^Bearer\s+(.+)$/i);
  const token = (bearerMatch?.[1] ?? trimmed).trim();
  return token.length > 0 ? token : null;
};

const TOKEN_KEYS = [
  "accessToken",
  "access_token",
  "token",
  "authorization",
  "Authorization",
] as const;

const extractFromBody = (value: unknown, depth = 0): string | null => {
  if (depth > 3 || value == null) return null;

  const direct = normalizeBearerToken(value);
  if (direct) return direct;

  if (typeof value !== "object") return null;

  const record = value as Record<string, unknown>;

  for (const key of TOKEN_KEYS) {
    const token = normalizeBearerToken(record[key]);
    if (token) return token;
  }

  for (const next of Object.values(record)) {
    const token = extractFromBody(next, depth + 1);
    if (token) return token;
  }

  return null;
};

export const extractAccessTokenFromReissueResponse = (
  res: AxiosResponse<unknown>,
): string | null => {
  const headerToken = normalizeBearerToken(
    res.headers?.authorization ?? res.headers?.Authorization,
  );
  if (headerToken) return headerToken;

  return extractFromBody(res.data);
};
