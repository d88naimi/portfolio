// src/data/testimonials.ts
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "David is an approachable and thoughtful engineer who's always pushing himself to keep learning and sharpening his skills. He consistently asks insightful questions and brings thoughtful suggestions to improve our team's workflow. Any team would be lucky to have him.",
    author: "Jessica Davilla",
    role: "Senior Software Engineer, Method",
  },
  {
    quote:
      "Patient, communicative, and respected. David excelled as a student in our bootcamp and transitioned into a reliable, knowledgeable teaching assistant. He exudes confidence and is always willing to go the extra mile.",
    author: "Eric Johnson",
    role: "Program Manager, UCSD Extension",
  },
  {
    quote:
      "David quickly mastered a complex pipeline and refactored large portions of our codebase to get our app ready for App Store submission. He is a self starter, a hard worker, and a leader.",
    author: "Jerome Lacote",
    role: "Entrepreneur Developer, Victorise",
  },
];
