/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      colors: {
        border: "hsla(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
