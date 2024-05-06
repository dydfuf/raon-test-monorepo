const baseConfig = require("@raonc/ui/tailwind.config");

const spacing = {};
const borderWidth = {};
const borderRadius = {};
const fontSize = {};
const lineHeight = {};

for (let i = 0; i <= 1000; i++) {
  spacing[i] = `${i}px`;
  borderWidth[i] = `${i}px`;
  borderRadius[i] = `${i}px`;
  fontSize[i] = `${i}px`;
  lineHeight[i] = `${i}px`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      spacing,
      borderWidth,
      borderRadius,
      fontSize,
      lineHeight,
      screens: {
        mobile: "320px",
      },
      animation: {
        "content-fade-up": "fade-up .4s ease forwards",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "none" },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
