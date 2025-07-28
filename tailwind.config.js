/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        universityBlue: "#31488e",
        universityLightBlue: "#308dff",
        universityPink: "#f3d1da",
        overlayBlack: "rgba(0, 0, 0, 0.3)",
      },
      
    },
  },
  plugins: [],
};
