/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colors: {
          bg: "#ffffff",
          secondBg: "#e6edf6",
          thirdBg: "#051441",
          buttonBg: "#064da1",
          buttonHover: "#064da1",
          textLightGray: "#707070",
          textDarkColor: "#131314",
          textDarkGray: "#383838",
          textLightColor: "#ffffff",
          secondTextColor: "#ed1c23",
          primaryColor: "#064da1",
          secondaryColor: "#ed1c23",

          primaryColorLightesh: "#3871b4",
          primaryColorDarkesh: "#054591",
          primaryColorDark: "#064da1",
          primaryColorVeryDark: "#032751",
          red: "#ed1c23",

          primary: {
            DEFAULT: "#064da1",
            50: "#e6edf6",
            100: "#cddbec",
            200: "#b4cae3",
            300: "#6a94c7",
            400: "#3871b4",
            500: "#064da1", // Core Brand Primary
            600: "#054591",
            700: "#043671",
            800: "#032751",
            900: "#010f20",
          },
          accent: {
            DEFAULT: "#ed1c23",
            50: "#fde8e9",
            100: "#fbd2d3",
            200: "#fabbbd",
            300: "#f68e91",
            400: "#f26065",
            500: "#ed1c23", // Core Brand Accent
            600: "#d51920",
            700: "#a61419",
            800: "#770e12",
            900: "#2f0607",
          },
        },
      },
      backgroundImage: {
        "hero-bg": "url('/images/hero-bg.webp')",
        "divider-bg": "url('/images/page-header-bg.webp')",
        "testimonial-bg": "url('/images/map-pattern.webp')",
        "divider2-bg": "url('/images/divider.webp')",
        "contact-bg": "url('/images/our-service-background.webp')",
        "footer-bg": "url('/images/footerbg.png')",
      },
      fontSize: {
        h1: "clamp(1.5rem, 0.9706rem + 4.7059vw, 3.3rem)",
        h2Typing: "clamp(0.8rem, 2.5vw, 1.2rem)",
        h2: "clamp(1.4rem, 3vw, 2.5rem)",
        h3: "clamp(1.1rem, 2vw, 1.3rem)",
        h4: "clamp(0.9rem, 2vw, 1.2rem)",
        description: "clamp(0.9rem, 2vw, 1.1rem)",
      },
      fontFamily: {
        title: ["Altere", "sans-serif"],
        body: ["Mazzard", "sans-serif"],
        persian: ["Persian Font", "sans-serif"],
      },
      keyframes: {
        pingSlow: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        pingSlower: {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        floatBouncing: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmerEffect: {
          "100%": { transform: "translateX(100%)" },
        },
        pulseRed: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "ping-slow": "pingSlow 3s linear infinite",
        "ping-slower": "pingSlower 4s linear infinite",
        floatBouncing: "float 4s ease-in-out infinite",
        shimmerEffect: "shimmer 1.8s infinite",
        "pulse-red": "pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
