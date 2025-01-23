import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css", // Add this line to include your `styles` folder
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"], // Add your custom font here
      },
      fontWeight: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
        black: "900",
      },
    },
  },
  plugins: [],
};

export default config;
