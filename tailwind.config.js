/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./src/component/**/*.{js,jsx,ts,tsx}", 
  "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    padding: {
      form: "10px",
      screen: "20px"
    },
    extend: {
      backgroundColor: {
        bgColorDark: "#181A1B",
        bgDarkLight: "#1E2122",
      },
      fontFamily: {
        LexendDeca_300Light: ['LexendDeca_300Light'],
        LexendDeca_400Regular: ['LexendDeca_400Regular'],
      },
      colors: {
        colorWhite: "#FFFFFF",
        colorBrownSlightLV2: "#EAC696",
        colorBrownDarkLV2: "#765827",
        colorBrownBold: "#765827",
        colorBorder: "#6C6A6A",
        colorBrownSlightLV3: "#C8AE7D",
        background: {
          light: "#FFEECC",
          weight: "#EAC696"
        },
        brown: {
          brown1: "#EAC696",
          brown2: "#C8AE7D",
          brown3: "#765827",
          brown4: "#65451F",
        },
        text: {
          gray: "#6D6A6A",
          brownlight: "#EAC696"
        }
      },
    },
  },
  plugins: [],
}

