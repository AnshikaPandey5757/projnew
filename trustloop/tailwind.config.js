/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0B0F1A",
        teal: "#00E5CC",
        amber: "#FFB347",
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0,229,204,0.4)",
        amberGlow: "0 0 30px rgba(255,179,71,0.4)",
      },
    },
  },
  plugins: [],
};