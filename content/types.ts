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
