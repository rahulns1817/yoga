/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F2EA',
        surface: '#FFFFFF',
        primary: { DEFAULT: '#7B8F73', hover: '#6B7F63' },
        accent: '#C97B5A',
        text: { DEFAULT: '#2D3A2E', muted: '#6B746A' },
        border: '#E8DFD2',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mantra: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
        btn: '12px',
      },
      maxWidth: {
        phone: '440px',
      },
    },
  },
  plugins: [],
}

