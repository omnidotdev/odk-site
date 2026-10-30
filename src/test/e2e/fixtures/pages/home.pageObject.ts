import { createPageObject } from "@/test/e2e/util";

import type { PageObjectContext } from "@/test/e2e/util";

/**
 * Home page object.
 */
const createHomePageObject = ({ page, context }: PageObjectContext) =>
  createPageObject({
    page,
    context,
    name: "Home",
    baseUrl: "/",
    // Page-specific helpers
    getPricingLink: () => page.getByRole("link", { name: "Pricing" }),
    getThemeToggle: () => page.getByRole("button").first(),
    getHeader: () => page.locator("header"),
  });

export type HomePageObject = ReturnType<typeof createHomePageObject>;

export default createHomePageObject;
