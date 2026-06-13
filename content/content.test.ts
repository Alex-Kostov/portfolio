import { describe, it, expect } from "vitest";
import { profile } from "./profile";
import { experience } from "./experience";
import { skills } from "./skills";
import { projects } from "./projects";
import { testimonials } from "./testimonials";

describe("content data", () => {
  it("has a profile with email and at least one social link", () => {
    expect(profile.email).toContain("@");
    expect(profile.socials.length).toBeGreaterThan(0);
    expect(profile.bio.length).toBeGreaterThan(0);
  });

  it("lists experience newest-first with non-empty bullets", () => {
    expect(experience.length).toBeGreaterThanOrEqual(4);
    expect(experience[0].end).toBe("Present");
    for (const role of experience) {
      expect(role.company).not.toBe("");
      expect(role.bullets.length).toBeGreaterThan(0);
    }
  });

  it("has skill groups and at least one project", () => {
    expect(skills.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].links.length).toBeGreaterThan(0);
  });

  it("has at least one testimonial with an author and quote", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    expect(testimonials[0].author).not.toBe("");
    expect(testimonials[0].quote.length).toBeGreaterThan(0);
  });
});
