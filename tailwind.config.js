/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./src/component/**/*.{js,jsx,ts,tsx}", 
  "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    padding: {
      form: "10px",
    },
    extend: {
      backgroundColor: {
        bgColorDark: "#181A1B",
        bgDarkLight: "#1E2122",
      },
      colors: {
        colorWhite: "#FFFFFF",
        colorBrownSlightLV2: "#EAC696",
        colorBrownDarkLV2: "#765827",
        colorBrownBold: "#765827",
        colorBorder: "#6C6A6A",
      },
    },
  },
  plugins: [],
}

