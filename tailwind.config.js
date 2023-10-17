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
        colorGreenSlight: "#8DFFA0",
        colorBlackDark: "#181A1B",
        colorGreenBold: "#0B9A47",
      },
    },
  },
  plugins: [],
}

