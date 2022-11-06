/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  important: '#root',
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'article-bg-img': "url('/public/file/article.jpg')",
      }
    }
  }
}
