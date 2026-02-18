import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Lora'", "Georgia", "serif"],
        display: ["'DM Serif Display'", "Georgia", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
      colors: {
        bg: "#faf7f2",
        bg2: "#f5f0e8",
        surface: "#fff8f0",
        border: "#e8ddd0",
        accent: "#c4622d",
        accent2: "#e8975a",
        "accent-light": "#f2d4bf",
        muted: "#9a8a7a",
        text: "#3d2e22",
        sage: "#7a8c6e",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
