/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    '../../packages/common/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#dc2626',
          'red-light': '#fef2f2',
          'red-dark': '#991b1b',
          yellow: '#eab308',
          'yellow-light': '#fefce8',
          'yellow-dark': '#a16207',
        },
        status: {
          approved: '#16a34a',
          pending: '#eab308',
          rejected: '#dc2626',
          'high-risk': '#dc2626',
          'medium-risk': '#f59e0b',
          'low-risk': '#16a34a',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #dc2626 0%, #eab308 100%)',
        'brand-gradient-light': 'linear-gradient(135deg, #fef2f2 0%, #fefce8 100%)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
}
