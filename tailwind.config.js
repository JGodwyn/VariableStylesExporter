/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ui.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        figma: {
          blue: '#18A0FB',
          green: '#0D99FF',
          red: '#F24822',
          yellow: '#FF9D00',
          purple: '#8E8E93',
          gray: {
            50: '#F5F5F5',
            100: '#E5E5E5',
            200: '#D1D1D1',
            300: '#B8B8B8',
            400: '#8E8E93',
            500: '#636366',
            600: '#48484A',
            700: '#3A3A3C',
            800: '#2C2C2E',
            900: '#1C1C1E',
          },
        },
      },
      fontFamily: {
        figma: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        figma: '6px',
      },
      boxShadow: {
        figma:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        'figma-lg':
          '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
