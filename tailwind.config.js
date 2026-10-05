/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff00ff",
        neonBlue: "#00e5ff",
        neonGreen: "#39ff14",
        critterHair: "#f5f5f5"
      },
      fontFamily: {
        critter: ["Comic Sans MS", "Arial Rounded MT Bold", "sans-serif"]
      },
      dropShadow: {
        neon: "0 0 10px #ff00ff",
        neonBlue: "0 0 10px #00e5ff"
      }
    },
  },
  plugins: [],
}
