"use client";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5 / CSS3" },
    ],
  },
  {
    label: "Styling & UI",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Material UI" },
      { name: "SASS / SCSS" },
      { name: "Storybook" },
      { name: "Design Systems" },
    ],
  },
  {
    label: "State & Data",
    skills: [
      { name: "Zustand" },
      { name: "Redux" },
      { name: "useSWR / Axios" },
      { name: "REST APIs" },
    ],
  },
  {
    label: "Backend & Platforms",
    skills: [
      { name: "Node.js / Express" },
      { name: "Supabase" },
      { name: "Sanity CMS" },
      { name: "PostgreSQL" },
      { name: "Vercel" },
    ],
  },
  {
    label: "Testing & Tools",
    skills: [
      { name: "Playwright" },
      { name: "Cypress" },
      { name: "Datadog / Sentry" },
      { name: "Git / Bitbucket" },
      { name: "Figma" },
    ],
  },
  {
    label: "AI & Emerging Tech",
    skills: [
      { name: "OpenAI API" },
      { name: "Prompt Engineering" },
      { name: "Claude" },
      { name: "GitHub Copilot" },
      { name: "AI-Assisted Development" },
    ],
  },
];

const education: Array<{ school: string; program: string; period?: string }> = [
  {
    school: "California State University, Fullerton",
    program: "Bachelor of Arts, Business Administration (Marketing)",
  },
  {
    school: "University of California, San Diego Extension",
    program: "Full Stack Web Development Bootcamp",
    period: "2017",
  },
];

const testimonials = [
  {
    quote:
      "It was great working alongside David on the same team. He’s an approachable and thoughtful engineer who’s always pushing himself to keep learning and sharpening his skills. I really appreciated the way he consistently asked insightful questions and approached problems with a mindset of curiosity. He was always willing to help when I needed to bounce around ideas, and he brought thoughtful suggestions to improve our team’s workflow. David is not only a strong engineer but also a great collaborator, and any team would be lucky to have him onboard.",
    author: "Jessica Davilla, Senior Software Engineer",
    role: "Method",
  },
  {
    quote:
      "Patient, communicative, respected and good character all come to mind when I think of David. It has been an absolute pleasure working with David directly as both a student and instructional assistant over the past year. David excelled as a student in our part-time web development bootcamp program and transitioned into a reliable, knowledgeable and respected TA for our students in our full-time web development program. I feel very lucky to have witnessed and been apart of David's evolution from a student learner to teacher. David exudes confidence and is always willing to go the extra mile for the greater good. David is simply one of the good ones and he made managing him a breeze. I look forward to finding additional ways for us to continue to work together in the future.",
    author: "Eric Johnson, Program Manager",
    role: "UCSD Extension ",
  },
  {
    quote:
      "I had the pleasure to work with David on our app. We had to refactor some features and get our app ready for the App Store Submission. David has been able to quickly master a complex pipeline and to refactor large portions of code He is a self-starter, a hard worker and a leader. Anyone would be lucky to have him on their team!",
    author: "Jerome Lacote, Entrepreneur Developer",
    role: "Victorise",
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6 max-w-6xl mx-auto"
    >
      <div
        className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="section-label mb-3">Skills</div>
        <h2 className="font-display text-4xl md:text-5xl text-text">
          My <em className="text-accent">toolkit</em>
        </h2>
        <div className="mt-4 w-10 h-0.5 bg-accent2" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {skillGroups.map((group, gi) => (
          <div
            key={group.label}
            className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${gi * 100 + 200}ms` }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2 inline-block" />
              <span className="section-label text-text/50">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="font-sans text-xs px-3 py-2 border border-border bg-bg2 text-muted rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div
        className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 delay-400 mb-6 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-label mb-5">Education</div>
        <div className="space-y-5">
          {education.map((edu) => (
            <div
              key={`${edu.school}-${edu.program}`}
              className="border border-border bg-bg2 p-5"
            >
              <h3 className="font-display text-lg text-text leading-snug">
                {edu.school}
              </h3>
              <p className="font-sans text-sm text-muted mt-1">{edu.program}</p>
              {edu.period && (
                <p className="font-sans text-xs text-accent mt-2">
                  {edu.period}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div
        className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 delay-[450ms] mb-6 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-label mb-5">Testimonials</div>
        <ul className="space-y-4" aria-label="Colleague testimonials">
          {testimonials.map((t) => (
            <li key={`${t.author}-${t.role}`}>
              <figure className="border border-border bg-bg2 p-6">
                <blockquote className="font-sans text-sm text-text/75 leading-relaxed italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 font-sans text-xs text-muted">
                  <span className="text-accent">{t.author}</span>
                  {" · "}
                  {t.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Certs */}
      <div
        className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-label mb-5">Certifications</div>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Microsoft Azure Fundamentals (AZ-900)",
            "Modern React with Redux",
            "React — The Complete Guide",
            "JS: Understanding the Weird Parts",
            "Advanced CSS & Sass",
            "The Complete JavaScript Course",
          ].map((cert) => (
            <span
              key={cert}
              className="font-sans text-xs px-4 py-2 border border-border bg-bg2 text-muted rounded-full hover:border-accent/30 hover:text-accent transition-colors"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
