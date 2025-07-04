import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";


const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#f43f5e",
      },
    },
  },
  plugins: [typography],
};

export default config;