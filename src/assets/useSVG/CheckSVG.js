import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckSVG(props) {
  return (
    <Svg
      fill="#765827"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#765827"
      {...props}
    >
      <Path
        d="M1743.858 267.012L710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default CheckSVG
