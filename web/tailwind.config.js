/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",'./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
     fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1B144C',
        button: '#301934',
        white: '#FFFFFF',
        gray: '#808080',
      }
  },
  plugins: [],
}

