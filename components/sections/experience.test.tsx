import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Experience } from "./experience";

describe("Experience", () => {
  it("renders each company", () => {
    render(<Experience />);
    expect(screen.getByText("90K Capital")).toBeInTheDocument();
    expect(screen.getByText("Nexo")).toBeInTheDocument();
    expect(screen.getByText("Pateplay")).toBeInTheDocument();
    expect(screen.getByText("DevriX")).toBeInTheDocument();
  });
});
