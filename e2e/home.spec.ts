import test, { expect } from "../src/test/e2e/util/test";

test.describe("Home Page", () => {
  test("loads successfully", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveTitle(/ODK/);
  });

  test("renders header", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.getHeader()).toBeVisible();
  });

  test("navigates to pricing", async ({ homePage, pricingPage }) => {
    await homePage.goto();
    await homePage.getPricingLink().click();
    await expect(pricingPage.page).toHaveURL(/\/pricing/);
  });
});
