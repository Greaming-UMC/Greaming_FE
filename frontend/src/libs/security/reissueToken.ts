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

const EXPIRES_KEYS = [
  "accessTokenExpiresIn",
  "access_token_expires_in",
  "expiresIn",
  "expires_in",
  "accessTokenExpireAt",
  "access_token_expire_at",
  "expiresAt",
  "expires_at",
  "exp",
] as const;

const normalizeNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
};

const toExpiresAtMs = (raw: number): number | null => {
  const now = Date.now();

  // Unix epoch milliseconds
  if (raw >= 1_000_000_000_000) return raw;
  // Unix epoch seconds
  if (raw >= 1_000_000_000) return raw * 1000;

  // Duration seconds (e.g. 3600)
  if (raw <= 2_592_000) return now + raw * 1000;
  // Duration milliseconds (e.g. 3600000)
  if (raw <= 2_592_000_000) return now + raw;

  return null;
};

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

const extractExpiresRawFromRecord = (record: Record<string, unknown>): number | null => {
  for (const key of EXPIRES_KEYS) {
    const direct =
      record[key] ??
      record[key.toLowerCase()] ??
      record[key.toUpperCase()];

    const parsed = normalizeNumber(direct);
    if (parsed) return parsed;
  }
  return null;
};

const extractExpiresRawFromHeaders = (headers: AxiosResponse["headers"]): number | null => {
  if (!headers) return null;

  const headerRecord: Record<string, unknown> =
    typeof (headers as { toJSON?: () => unknown }).toJSON === "function"
      ? ((headers as { toJSON: () => unknown }).toJSON() as Record<string, unknown>)
      : (headers as Record<string, unknown>);

  return extractExpiresRawFromRecord(headerRecord);
};

const extractExpiresRawFromBody = (value: unknown, depth = 0): number | null => {
  if (depth > 3 || value == null || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  const direct = extractExpiresRawFromRecord(record);
  if (direct) return direct;

  for (const next of Object.values(record)) {
    const parsed = extractExpiresRawFromBody(next, depth + 1);
    if (parsed) return parsed;
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

export const extractAccessTokenExpiresAtMsFromReissueResponse = (
  res: AxiosResponse<unknown>,
): number | null => {
  const headerRaw = extractExpiresRawFromHeaders(res.headers);
  if (headerRaw) {
    const resolved = toExpiresAtMs(headerRaw);
    if (resolved) return resolved;
  }

  const bodyRaw = extractExpiresRawFromBody(res.data);
  if (bodyRaw) {
    const resolved = toExpiresAtMs(bodyRaw);
    if (resolved) return resolved;
  }

  return null;
};
