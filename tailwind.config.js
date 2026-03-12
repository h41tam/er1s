/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#161616",
        burgundy: "#6D001A",
        white: "#FDFCF8",
      },
      fontFamily: {
        heading: ["PortoHeading", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["PortoBody", "ui-sans-serif", "system-ui", "sans-serif"],
        cinzel: ["Cinzel", "ui-serif", "Georgia", "serif"],
        "cinzel-decorative": ["Cinzel Decorative", "ui-serif", "Georgia", "serif"],
        rodfat: ["rodfat", "ui-sans-serif", "system-ui", "sans-serif"],
        nexokoratechno: ["nexokoratechno", "ui-sans-serif", "system-ui", "sans-serif"],
        kastroo: ["KASTROO", "ui-serif", "Georgia", "serif"],
        karina: ["Karina", "ui-serif", "Georgia", "serif"],
        bierika: ["bierika", "ui-serif", "Georgia", "serif"],
        "boston-caps": ["boston-caps", "ui-serif", "Georgia", "serif"],
        neofolia: ["neofolia", "ui-serif", "Georgia", "serif"],
        osiris: ["osiris", "ui-serif", "Georgia", "serif"],
        "tan-pearl": ["tan-pearl", "ui-serif", "Georgia", "serif"],
        ghrathe: ["Ghrathe", "ui-serif", "Georgia", "serif"],
        stormlight: ["Stormlight", "ui-serif", "Georgia", "serif"],
        kycron: ["Kycron", "ui-sans-serif", "system-ui", "sans-serif"],
        brites: ["Brites", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        headline: "-0.04em",
      },
      boxShadow: {
        soft: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6)",
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      animation: {
        blob: 'blob 18s infinite ease-in-out'
      }
    },
  },
  plugins: [],
}
