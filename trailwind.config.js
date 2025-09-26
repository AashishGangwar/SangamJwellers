// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        boxShadow: {
          'light': '0 2px 4px rgba(255, 255, 255, 0.2)',   // lighter shadow
          'dark': '0 4px 6px rgba(0, 0, 0, 0.6)',          // darker shadow
          'gold': '0 4px 10px rgba(255, 215, 0, 0.5)',     // golden shadow
        },
      },
    },
    plugins: [],
  }
  