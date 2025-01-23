import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css", // Add this line to include your `styles` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
