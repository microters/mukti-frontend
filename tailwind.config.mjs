/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "serif"],
        poppins: ["Poppins", "serif"],
      },
      colors: {
        "M-primary-color": "#009650",
        "M-heading-color": "#00224F",
        "M-secondary-color": "#EA2A2E",
        "M-section-bg": "#EBF7F6",
        "M-text-color": "#6A7C92",
      },
      backgroundImage: {
        'heroBG': "@/public/assets/heroBG.png",
      },
    },
  },
  plugins: [],
};
