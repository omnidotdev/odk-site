/**
 * Environment variables.
 */
// Build-time vars take precedence to prevent SSR hydration mismatch
const env =
  typeof window === "undefined"
    ? { ...process.env, ...import.meta.env }
    : import.meta.env;

export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  // authorization (consumed by warden client)
  AUTHZ_ENABLED,
  AUTHZ_API_URL,
} = env;

// environment helpers
export const isDevEnv = import.meta.env.DEV;
