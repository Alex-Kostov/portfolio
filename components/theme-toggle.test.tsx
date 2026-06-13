import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle (theme|dark mode)/i }),
    ).toBeInTheDocument();
  });
});
