export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
  extendedDescription: string;
  howWeAct: string[];
}

export interface ClientSector {
  id: string;
  name: string;
  description: string;
  representativeness: string;
  highlights: string[];
  buttonLabel?: string;
  buttonLink?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  position: string;
  company: string;
  text: string;
  isAnonymized: boolean;
}

export interface OfficeAddress {
  city: string;
  state: string;
  street: string;
  suite: string;
  zipCode: string;
  phone: string;
  email: string;
  workingHours: string;
}
