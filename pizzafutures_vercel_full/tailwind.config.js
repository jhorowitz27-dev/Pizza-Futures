/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#1b1c1f",
        surface: "#26272b",
        accent: "#ffb347",
        accent2: "#ff6f3c",
        textPrimary: "#f5f5f7",
        textSecondary: "#b0b3b8",
        success: "#4caf50",
        danger: "#e63946"
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.4)"
      }
    }
  },
  plugins: [],
};
