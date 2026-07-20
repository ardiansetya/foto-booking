import type { StaticImageData } from "next/image";

export interface PortfolioImage {
  id: string;
  src: StaticImageData;
  alt: string;
  category: "personal" | "couple" | "wedding" | "group" | "family";
  featured?: boolean;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  people: string;
  duration: string;
  photos: string;
  includes: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  quote: string;
  package: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
