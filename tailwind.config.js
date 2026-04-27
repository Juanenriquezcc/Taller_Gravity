/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EA5A47',
        secondary: '#FFE0D8',
        background: '#FFF9F6',
        surface: '#FFF9F6',
        'surface-dim': '#E8DCD7',
        'surface-bright': '#FFF9F6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#F9F4F2',
        'surface-container': '#F1E7E3',
        'surface-container-high': '#E9DDD8',
        'surface-container-highest': '#E0D2CC',
        'on-surface': '#241816',
        'on-surface-variant': '#6D4E48',
        'on-background': '#241816',
        error: '#ba1a1a',
      },
      fontFamily: {
        headline: ['"Outfit"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      spacing: {
        'page': '24px',
        'grid': '16px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        'section': '40px',
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
