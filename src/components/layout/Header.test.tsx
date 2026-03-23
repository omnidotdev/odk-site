import { describe, expect, mock, test } from "bun:test";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

// Mock useTheme
mock.module("@/providers/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mock(() => {}),
  }),
}));

// Import after mocking
const { default: Header } = await import("./Header");

const createTestRouter = (ui: React.ReactElement) => {
  const rootRoute = createRootRoute({
    component: () => ui,
  });

  return createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
};

const renderWithProviders = async () => {
  cleanup();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const router = createTestRouter(<Header />);

  const result = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  // Wait for router to render content
  await waitFor(() => {
    expect(result.container.querySelector("header")).not.toBeNull();
  });

  return result;
};

describe("Header", () => {
  test("renders header element", async () => {
    await renderWithProviders();

    const header = screen.getByRole("banner");
    expect(header).toBeDefined();
  });

  test("renders pricing link", async () => {
    await renderWithProviders();

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toBeDefined();
  });
});
