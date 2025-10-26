/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
theme: {
    extend: {
      colors: {
        background: "oklch(1 0 0)", // o el color que quieras
        foreground: "oklch(0.145 0 0)",
        border: "oklch(0.922 0 0)",
        ring: "oklch(0.7 0.2 0)",
      },
    },
  },
  plugins: [],
}
