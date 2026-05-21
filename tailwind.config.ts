import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d12",
        pitch: "#10161f",
        mist: "#f4efe4",
        line: "#283548",
        accent: "#d7ff64",
        coral: "#ff8159"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(215,255,100,0.18), 0 20px 60px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "stadium-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
