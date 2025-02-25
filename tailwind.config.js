/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");

const addVariablesForColors = ({ addBase, theme }) => {
  let allColors = flattenColorPalette(theme("colors"));
  // ... rest of the code
};

module.exports = {
  // ... your config
}; 