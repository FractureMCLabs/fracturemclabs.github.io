/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "gray": "#333333",
      "lightGray": "#808080",
      "black": "#000000",
      "white": "#FFFFFF",
      "pink": "#e9399e",
      "red": "#ff0000",
      "yellow": "#00ffff"
    },
    extend: {
      backgroundImage: {
        'site-1': "url('https://png.pngtree.com/background/20230827/original/pngtree-d-render-of-geometric-pattern-with-vibrant-orange-illumination-on-black-picture-image_4841252.jpg')",
        'site-2': "url('https://example.com/image2.jpg')",
      },
    },
  },
  plugins: [],
}