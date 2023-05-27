/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",'./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
     fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#3C2F77',
        highlight: '#F2647D',
        button: '#301934',
        white: '#FFFFFF',
        gray: '#808080',
        yellow: '#f5edd5',
        purple: '#f4edfa',
        blue: '#f2fbff',
      }
  },
  plugins: [],
}

