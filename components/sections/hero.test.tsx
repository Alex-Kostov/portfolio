import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./hero";
import { profile } from "@/content/profile";

describe("Hero", () => {
  it("shows the name as a heading and a mailto link", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: profile.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
});
