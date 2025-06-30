/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fffe',
          100: '#ccfffe',
          200: '#99fffd',
          300: '#5cfffa',
          400: '#1cf0f2',
          500: '#04d9d9',
          600: '#04b0b6',
          700: '#0a8b92',
          800: '#126f76',
          900: '#145c63',
          950: '#083f45',
        },
        secondary: {
          50: '#f0fffe',
          100: '#ccfffc',
          200: '#9afff9',
          300: '#5cffef',
          400: '#1cf0e1',
          500: '#04d9c4',
          600: '#04b0a3',
          700: '#0a8b82',
          800: '#126f6a',
          900: '#155c58',
          950: '#083f3b',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad9c0',
          300: '#f6be95',
          400: '#f09968',
          500: '#eb7c47',
          600: '#dc6332',
          700: '#b74e29',
          800: '#924027',
          900: '#773622',
          950: '#401910',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};