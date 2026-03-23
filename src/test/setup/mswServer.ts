import { setupServer } from "msw/node";

import { graphqlHandlers } from "../mocks";

/**
 * MSW server instance with all mock handlers.
 */
export const mswServer = setupServer(...graphqlHandlers);
