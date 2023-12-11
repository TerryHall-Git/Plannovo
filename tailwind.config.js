const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#121c22",
        secondary: "#1b262c",
        highlight1: "#1f2f37",
        highlight2: "#8095a8",
        highlight3: "#9fb9d0",
        badge: "#ff865b",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
