import { createPageObject } from "@/test/e2e/util";

import type { PageObjectContext } from "@/test/e2e/util";

/**
 * Pricing page object.
 */
const createPricingPageObject = ({ page, context }: PageObjectContext) =>
  createPageObject({
    page,
    context,
    name: "Pricing",
    baseUrl: "/pricing",
    // Page-specific helpers
    getHeading: () =>
      page.getByRole("heading", { name: /free and open source/i }),
    getFAQSection: () =>
      page.getByRole("heading", { name: "Frequently Asked Questions" }),
    getManifoldLink: () => page.getByRole("link", { name: /manifold/i }),
  });

export type PricingPageObject = ReturnType<typeof createPricingPageObject>;

export default createPricingPageObject;
