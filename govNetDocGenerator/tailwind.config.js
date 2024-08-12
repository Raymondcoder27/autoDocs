export default {
  content: [
    "./index.html", // Add this if your main HTML file is in the public directory
    "./src/**/*.{html,js,vue}", // This ensures Tailwind scans your HTML, JS, and Vue files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



