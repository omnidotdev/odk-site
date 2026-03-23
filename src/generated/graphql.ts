// @ts-nocheck
// Stub file - regenerate with `bun graphql:generate` against a running API

/* eslint-disable @typescript-eslint/no-explicit-any */

export type UsersQueryVariables = Record<string, any>;

export const useUsersQuery: {
  getKey: (variables?: UsersQueryVariables) => readonly unknown[];
  fetcher: (variables?: UsersQueryVariables) => () => Promise<any>;
} = {
  getKey: (_variables?: UsersQueryVariables) => ["Users"] as const,
  fetcher:
    (_variables?: UsersQueryVariables) => async () => ({
      users: { nodes: [], totalCount: 0 },
    }),
};
