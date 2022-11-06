/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  important: '#root',
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
