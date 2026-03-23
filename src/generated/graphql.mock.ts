// @ts-nocheck
// Stub file - regenerate with `bun graphql:generate` against a running API

import { http, HttpResponse } from "msw";

import type { HttpHandler } from "msw";

export const mockUsersQuery = (
  resolver: () => ReturnType<typeof HttpResponse.json>,
): HttpHandler =>
  http.post("*/graphql", () => {
    return resolver();
  });
