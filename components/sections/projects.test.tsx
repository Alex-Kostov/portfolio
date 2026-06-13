import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Projects } from "./projects";

describe("Projects", () => {
  it("renders the WealthLens project with a GitHub link", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: /wealthlens/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Alex-Kostov/wealthlens",
    );
  });
});
