/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        bg_secondary: "#dcdee3",
        primary: "#3abe49",
        secondary: "#6b7280",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}