import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  // used for proper management of Thornberry components, see https://knip.dev/reference/configuration#ignoreexportsusedinfile
  ignoreExportsUsedInFile: true,
  ignore: [
    "**/generated/**",
    "src/test/**",
    "**/*.test.{ts,tsx}",
    // Reference patterns - unused in template but available for adoption
    "src/lib/config/env.config.ts",
    "src/lib/providers/**",
  ],
  ignoreDependencies: [
    "@faker-js/faker",
    "@happy-dom/global-registrator",
    "@testing-library/jest-dom",
    "@testing-library/dom",
    "@testing-library/react",
    "happy-dom",
  ],
};

export default knipConfig;
