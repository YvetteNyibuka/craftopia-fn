/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Classic craft color palette
        craft: {
          50: "#fdfdf9",
          100: "#faf9f2",
          200: "#f3f1e0",
          300: "#e8e4c9",
          400: "#d6cfaa",
          500: "#c4b88a", // Primary brand color
          600: "#b09f72",
          700: "#8a7c58",
          800: "#6b5d44",
          900: "#4d4232",
          950: "#2d251c",
        },
        warmGray: {
          50: "#faf9f7",
          100: "#f3f2ed",
          200: "#e8e5db",
          300: "#d6d0c4",
          400: "#beb6a7",
          500: "#a69c8a",
          600: "#8b8070",
          700: "#716759",
          800: "#5a5147",
          900: "#47423a",
          950: "#2d2a24",
        },
        sage: {
          50: "#f7f8f7",
          100: "#eef0ed",
          200: "#dde2db",
          300: "#c4ccc0",
          400: "#a5b09f",
          500: "#8a9583",
          600: "#707968",
          700: "#5c6254",
          800: "#4a5046",
          900: "#3e423b",
          950: "#22251f",
        },
        terracotta: {
          50: "#fdf6f4",
          100: "#fceae6",
          200: "#f7dbd2",
          300: "#f0c4b3",
          400: "#e6a085",
          500: "#dc7f5b",
          600: "#c96640",
          700: "#a85533",
          800: "#8b472d",
          900: "#733e29",
          950: "#3e1e13",
        },
        forest: {
          50: "#f4f6f4",
          100: "#e6ebe6",
          200: "#cdd7cd",
          300: "#a8bba8",
          400: "#7d9a7d",
          500: "#5e7d5e",
          600: "#4a654a",
          700: "#3d523d",
          800: "#334233",
          900: "#2c372c",
          950: "#161e16",
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      boxShadow: {
        soft: "0 2px 15px 0 rgba(0, 0, 0, 0.08)",
        medium: "0 4px 25px 0 rgba(0, 0, 0, 0.12)",
        large: "0 8px 50px 0 rgba(0, 0, 0, 0.15)",
        craft: "0 4px 20px 0 rgba(196, 184, 138, 0.2)",
        warm: "0 4px 20px 0 rgba(166, 156, 138, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        gradient: "gradient-shift 3s ease-in-out infinite",
        shimmer: "text-shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
            opacity: "1",
          },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
          },
          "50%": {
            transform: "translateY(-10px) scale(1.05)",
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
