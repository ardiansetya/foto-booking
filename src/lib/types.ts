export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "personal" | "couple" | "bestfriend" | "group" | "family";
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
  price: number;
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
