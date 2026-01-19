export function shouldRedirect(isAuthenticated: boolean, isLoading: boolean) {
  return !isLoading && !isAuthenticated;
}

export function shouldShowLoader(isLoading: boolean, initializing: boolean) {
  return isLoading || initializing;
}

export function getLoginRedirectURL(currentPath: string) {
  const url = new URL("/login", "http://localhost");
  const target = currentPath || "/dashboard";
  url.searchParams.set("redirect", target);
  return url.pathname + url.search;
}
