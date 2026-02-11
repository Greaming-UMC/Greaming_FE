export function normalizeApiPath(path: string) {
  const purePath = path.startsWith("/") ? path : `/${path}`;
  // 앞에 도메인과 https를 명시적으로 붙여줍니다.
  return `https://api.greaming.com${purePath}`;
}