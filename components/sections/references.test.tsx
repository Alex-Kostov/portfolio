import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { References } from "./references";

describe("References", () => {
  it("renders the recommendation author and quote", () => {
    render(<References />);
    expect(screen.getByText(/Antoan Popov/)).toBeInTheDocument();
    expect(screen.getByText(/that's not my job/i)).toBeInTheDocument();
  });
});
