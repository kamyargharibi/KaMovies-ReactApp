/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          v70: "#6d28d9", // Violet-700
          g90: "#111827", // Gray-900
          g80: "#1f2937", // Gray-800
          g70: "#374151", // Gray-700
        },
        secondary: {
          v60: "#7c3aed", // Violet-600
          v50: "#8b5cf6", // Violet-500
          g60: "#4b5563", // Gray-600
          g50: "#6b7280", // Gray-500
          g40: "#9ca3af", // Gray-400
          g30: "#d1d5db", // Gray-300
          g20: "#e5e7eb", // Gray-200
        },
      },
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
