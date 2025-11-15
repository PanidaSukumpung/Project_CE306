/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
       boxShadow: {
        'neon-red': '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000',
      },
    },
  },
  plugins: [],
};

