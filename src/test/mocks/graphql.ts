import { HttpResponse } from "msw";

import { mockUsersQuery } from "@/generated/graphql.mock";

const TEST_USER_ID = "test-user-id-12345";

/**
 * GraphQL MSW handlers using generated mocks from GraphQL CodeGen.
 */
export const graphqlHandlers = [
  mockUsersQuery(() => {
    return HttpResponse.json({
      data: {
        users: {
          nodes: [
            {
              id: TEST_USER_ID,
              identityProviderId: TEST_USER_ID,
            },
          ],
        },
      },
    });
  }),
];
