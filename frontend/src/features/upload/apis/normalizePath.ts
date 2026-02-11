export const normalizeApiPath = (path: string) => {
  // "/api/..." 로 들어오면 "/..." 로 바꿔서 baseURL("/api")와 합쳐도 "/api/..."가 되게
  return path.replace(/^\/api(?=\/)/, "");
};