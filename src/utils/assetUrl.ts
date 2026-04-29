const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function withBaseUrl(path: string) {
  if (!path || path.startsWith("#") || path.startsWith("mailto:") || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}
