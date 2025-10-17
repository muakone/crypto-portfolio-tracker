/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // adjust to fit your project paths
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E0E0E",
        surface: "#151515",
        panel: "#1A1A1A",
        border: "#242424",
        muted: "#9A9A9A",
        bright: "#EAEAEA",
        accent: "#3b82f6", // Blue accent
      },
      // Blue → Purple gradient (landing page theme)
      backgroundImage: {
        "gradient-accent": "linear-gradient(90deg, #3b82f6, #8b5cf6)",
        "gradient-hero": "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      boxShadow: {
        accent: "0 6px 30px rgba(59, 130, 246, 0.15)",
        glow: "0 8px 40px rgba(139, 92, 246, 0.2)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
