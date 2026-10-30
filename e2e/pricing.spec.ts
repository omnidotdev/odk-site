import test, { expect } from "../src/test/e2e/util/test";

test.describe("Pricing Page", () => {
  test("loads successfully", async ({ pricingPage }) => {
    await pricingPage.goto();
    await expect(pricingPage.page).toHaveURL(/\/pricing/);
    await expect(pricingPage.getHeading()).toBeVisible();
  });

  test("displays FAQ section", async ({ pricingPage }) => {
    await pricingPage.goto();
    await expect(pricingPage.getFAQSection()).toBeVisible();
  });
});
