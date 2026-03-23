import { describe, expect, test } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import type { Price } from "@/lib/providers/billing";

// Import after mocking
const { default: PriceCard } = await import("./PriceCard");

const mockPrice: Price = {
  id: "price_123",
  active: true,
  currency: "usd",
  unit_amount: 2999,
  metadata: {},
  product: {
    id: "prod_123",
    name: "Pro",
    description: "Perfect for growing teams",
    marketing_features: [
      { name: "Unlimited projects" },
      { name: "Priority support" },
      { name: "Advanced analytics" },
    ],
  },
  recurring: {
    interval: "month",
    interval_count: 1,
    trial_period_days: null,
    usage_type: "licensed",
    meter: null,
  },
};

const renderPriceCard = (price: Price, disableAction = false) => {
  cleanup();

  return render(<PriceCard price={price} disableAction={disableAction} />);
};

describe("PriceCard", () => {
  test("renders price card with product name", () => {
    renderPriceCard(mockPrice);

    expect(screen.getByText("Pro")).toBeDefined();
  });

  test("renders product description", () => {
    renderPriceCard(mockPrice);

    expect(screen.getByText("Perfect for growing teams")).toBeDefined();
  });

  test("renders recurring interval", () => {
    renderPriceCard(mockPrice);

    expect(screen.getByText("/month")).toBeDefined();
  });

  test("renders marketing features", () => {
    renderPriceCard(mockPrice);

    expect(screen.getByText("Unlimited projects")).toBeDefined();
    expect(screen.getByText("Priority support")).toBeDefined();
    expect(screen.getByText("Advanced analytics")).toBeDefined();
  });

  test("renders Get Started link", () => {
    renderPriceCard(mockPrice);

    const link = screen.getByText("Get Started");
    expect(link).toBeDefined();
  });

  test("handles one-time payment (no recurring)", () => {
    const oneTimePrice: Price = {
      ...mockPrice,
      recurring: null,
    };

    renderPriceCard(oneTimePrice);

    expect(screen.getByText("/forever")).toBeDefined();
  });
});
