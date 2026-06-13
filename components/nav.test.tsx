import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Nav } from "./nav";

describe("Nav", () => {
  it("renders anchor links to each section", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: /experience/i })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "#contact");
  });
});
