export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  pitch: string;
  location: string;
  email: string;
  socials: SocialLink[];
  bio: string[];
  /** Public path to a headshot, e.g. "/profile.jpg". Empty = monogram placeholder. */
  photo?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  relationship: string;
  href?: string;
}

export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  arrangement: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
}
