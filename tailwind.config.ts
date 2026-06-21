import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        border: "#222222",
        cyan: {
          neon: "#00D2FF"
        },
        green: {
          neon: "#00FFAA"
        }
      },
    },
  },
  plugins: [],
};
export default config;
