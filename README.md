# David Naimi — Portfolio

A techy, futuristic personal portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for one-click Vercel deployment.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Global styles, animations, custom classes
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Main page composition
├── components/
│   ├── Nav.tsx            # Sticky navigation with mobile menu
│   ├── Hero.tsx           # Typewriter hero with stats bar
│   ├── Experience.tsx     # Tabbed work history
│   ├── Projects.tsx       # Project cards grid ← update here
│   ├── Skills.tsx         # Animated skill bars + certs
│   ├── Contact.tsx        # Contact section with email copy
│   └── Footer.tsx         # Footer links
└── public/
    └── resume.pdf         # ← Add your resume PDF here!
```

---

## ✏️ Customization

### Add your projects

Edit `components/Projects.tsx` — update the `projects` array at the top:

```ts
const projects = [
  {
    id: "01",
    title: "Your Project Name",
    description: "What it does and why it matters.",
    stack: ["React", "Next.js", "TypeScript"],
    status: "Production", // "Production" | "Shipped" | "Coming Soon"
    link: "https://your-live-url.com",
    github: "https://github.com/d88naimi/your-repo",
    featured: true,
  },
  // ...
];
```

### Add your resume PDF

Drop your `resume.pdf` file into the `/public` folder. The "Resume" button in the nav will link to it automatically.

### Update contact info

If anything changes, update `components/Contact.tsx` and `components/Footer.tsx`.

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard (Recommended)

1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Every push to `main` auto-deploys ✓

### Option 3: One-click from GitHub

- Connect your GitHub account on Vercel
- Every `git push origin main` triggers a new deployment

---

## 🎨 Design System

| Token        | Value                        |
| ------------ | ---------------------------- |
| `--bg`       | `#050810` — deep space black |
| `--accent`   | `#00f0ff` — electric cyan    |
| `--accent2`  | `#7b2fff` — electric violet  |
| Font Display | Orbitron                     |
| Font Mono    | Space Mono                   |
| Font Body    | DM Sans                      |

---

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: CSS + Framer Motion
- **Deployment**: Vercel
- **Fonts**: Google Fonts (Orbitron, Space Mono, DM Sans)
