export function assetUrl(path) {
  if (!path) return "";
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}
