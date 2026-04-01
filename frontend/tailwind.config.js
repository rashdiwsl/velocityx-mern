module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        v: {
          black:   '#050505',
          darker:  '#0a0a0a',
          dark:    '#101010',
          card:    '#141414',
          border:  '#1e1e1e',
          border2: '#2a2a2a',
          red:     '#c0392b',
          redHot:  '#e74c3c',
          redDim:  '#7f1d1d',
          muted:   '#6b6b6b',
          subtle:  '#3a3a3a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        revLine:  { '0%': { width: '0%' }, '100%': { width: '100%' } },
        splashOut:{ '0%': { opacity: '1', transform: 'scale(1)' }, '100%': { opacity: '0', transform: 'scale(1.04)' } },
        pulse2:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
      },
      animation: {
        fadeUp:    'fadeUp 0.7s ease forwards',
        fadeIn:    'fadeIn 0.5s ease forwards',
        revLine:   'revLine 1.2s ease forwards',
        splashOut: 'splashOut 0.8s ease forwards',
        pulse2:    'pulse2 2s ease infinite',
      }
    },
  },
  plugins: [],
}