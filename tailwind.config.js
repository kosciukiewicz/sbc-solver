const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui(
      {
      themes: {
        dark: {
          colors: {
            background: "0% 0% 0%",
            divider: "#F1FADA",
            primary: {
              DEFAULT: "#2D9596",
            },
            secondary: {
              DEFAULT: "#F1FADA",
            },
            /** Custom */
            panelBackground: "#265073",
          },
        },
        light: {
          colors: {
            background: "0% 0% 0%",
          },
        },
      },
    }
  )],
};