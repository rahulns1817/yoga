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
        saffron: { DEFAULT: '#E0A95B', deep: '#C58A3B' },
        forest: { DEFAULT: '#1F3329', deep: '#142019', soft: '#2B4435' },
        text: { DEFAULT: '#2D3A2E', muted: '#6B746A' },
        border: '#E8DFD2',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mantra: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
        btn: '14px',
      },
      maxWidth: {
        phone: '440px',
      },
      boxShadow: {
        soft: '0 18px 40px -20px rgba(31, 51, 41, 0.25)',
        lift: '0 28px 60px -28px rgba(31, 51, 41, 0.35)',
      },
      backgroundImage: {
        'overlay-bottom':
          'linear-gradient(to top, rgba(20, 32, 25, 0.96) 0%, rgba(20, 32, 25, 0.92) 25%, rgba(20, 32, 25, 0.70) 45%, rgba(20, 32, 25, 0.30) 70%, transparent 100%)',
        'overlay-full':
          'linear-gradient(to bottom, rgba(20, 32, 25, 0.20) 0%, rgba(20, 32, 25, 0.50) 50%, rgba(20, 32, 25, 0.92) 100%)',
        'scrim-bottom':
          'linear-gradient(to top, rgba(20, 32, 25, 0.95) 0%, rgba(20, 32, 25, 0.85) 35%, rgba(20, 32, 25, 0.4) 70%, transparent 100%)',
        'sage-radial':
          'radial-gradient(120% 80% at 50% 0%, #EFE7D6 0%, #F7F2EA 60%)',
      },
    },
  },
  plugins: [],
}
