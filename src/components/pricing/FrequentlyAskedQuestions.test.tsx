import { describe, expect, test } from "bun:test";

import { render, screen } from "@testing-library/react";

import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

describe("FrequentlyAskedQuestions", () => {
  test("renders the FAQ heading", () => {
    render(<FrequentlyAskedQuestions />);

    const heading = screen.getByText("Frequently Asked Questions");
    expect(heading).toBeDefined();
  });

  test("renders all FAQ items", () => {
    render(<FrequentlyAskedQuestions />);

    // Check that the questions are rendered
    expect(screen.getByText("Is ODK really free?")).toBeDefined();
    expect(
      screen.getByText("What can I generate from one schema?"),
    ).toBeDefined();
    expect(screen.getByText("Do I need an account or a server?")).toBeDefined();
    expect(screen.getByText("Where do hosted features fit in?")).toBeDefined();
  });

  test("applies custom className", () => {
    const { container } = render(
      <FrequentlyAskedQuestions className="custom-class" />,
    );

    const wrapper = container.firstChild;
    expect((wrapper as HTMLElement).className).toContain("custom-class");
  });
});
