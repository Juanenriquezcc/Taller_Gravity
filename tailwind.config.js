/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E95E50',
        secondary: '#FDE0E0',
        background: '#fbf9f9',
        surface: '#fbf9f9',
        'surface-dim': '#dbdad9',
        'surface-bright': '#fbf9f9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'surface-container-high': '#e9e8e7',
        'surface-container-highest': '#e3e2e2',
        'on-surface': '#1b1c1c',
        'on-surface-variant': '#58413e',
        'on-background': '#1b1c1c',
        error: '#ba1a1a',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
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
