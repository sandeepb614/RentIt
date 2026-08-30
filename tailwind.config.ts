import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marigold: {
          50: "#fdf7ec",
          100: "#faedd0",
          200: "#f4d89e",
          300: "#edbe63",
          400: "#e7a437",
          500: "#dd8a1f",
          600: "#c06c16",
          700: "#9a4f16",
          800: "#7d4018",
          900: "#693718",
        },
        maroon: {
          50: "#fbf2f2",
          100: "#f5dede",
          200: "#e8b8b8",
          300: "#d68888",
          400: "#bd5757",
          500: "#a13939",
          600: "#862b2b",
          700: "#6f2424",
          800: "#5e2222",
          900: "#4f1f1f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
