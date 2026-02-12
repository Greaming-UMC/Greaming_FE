import type { AxiosResponse } from "axios";

const looksLikeJwt = (value: string): boolean => value.split(".").length === 3;

const stripWrappingQuotes = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
};

const normalizeToken = (
  value: unknown,
  options?: { allowPlain?: boolean },
): string | null => {
  if (typeof value !== "string") return null;

  const trimmed = stripWrappingQuotes(value);
  if (!trimmed) return null;

  const bearerMatch = trimmed.match(/^Bearer\s+(.+)$/i);
  if (bearerMatch) {
    const token = stripWrappingQuotes(bearerMatch[1]).split(",")[0]?.trim();
    return token?.length ? token : null;
  }

  if (options?.allowPlain) {
    return trimmed;
  }

  return looksLikeJwt(trimmed) ? trimmed : null;
};

const TOKEN_KEYS = [
  "accessToken",
  "access_token",
  "token",
  "access",
  "x-access-token",
  "xAccessToken",
  "accesstoken",
  "authorization",
  "Authorization",
] as const;

const extractFromHeaders = (headers: AxiosResponse["headers"]): string | null => {
  if (!headers) return null;

  const headerRecord: Record<string, unknown> =
    typeof (headers as { toJSON?: () => unknown }).toJSON === "function"
      ? ((headers as { toJSON: () => unknown }).toJSON() as Record<string, unknown>)
      : (headers as Record<string, unknown>);

  for (const key of TOKEN_KEYS) {
    const direct =
      headerRecord[key] ??
      headerRecord[key.toLowerCase()] ??
      headerRecord[key.toUpperCase()];

    const token = normalizeToken(direct, { allowPlain: true });
    if (token) return token;
  }

  return null;
};

const extractFromBody = (value: unknown, depth = 0): string | null => {
  if (depth > 3 || value == null) return null;

  const direct = normalizeToken(value);
  if (direct) return direct;

  if (typeof value !== "object") return null;

  const record = value as Record<string, unknown>;

  for (const key of TOKEN_KEYS) {
    const token = normalizeToken(record[key], { allowPlain: true });
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
  const headerToken = extractFromHeaders(res.headers);
  if (headerToken) return headerToken;

  return extractFromBody(res.data);
};
