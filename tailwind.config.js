// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // All files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}',  // All files in the components directory
    './app/**/*.{js,ts,jsx,tsx}',  // All files in the app directory (for Next.js 13)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
