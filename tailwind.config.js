/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6', 
          hover: '#2563EB',
          glow: '#60A5FA',
        },
        secondary: '#10B981', 
        surface: {
          glass: 'rgba(255, 255, 255, 0.7)',
          glassDark: 'rgba(15, 23, 42, 0.6)',
          dim: '#F1F5F9', 
          dark: '#1E293B', 
          darker: '#020617', 
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-inset': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'neon': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
}