import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function FlagVieSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={75}
      height={47}
      viewBox="0 0 75 47"
      fill="none"
      {...props}
    >
      <Rect
        x={75}
        width={47}
        height={75}
        rx={5}
        transform="rotate(90 75 0)"
        fill="#FA494B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.69 29.966l-7.843 5.718 2.894-9.395L25 20.43l9.631-.09L37.69 11l3.059 9.34 9.631.088-7.741 5.861 2.894 9.395-7.843-5.718z"
        fill="#FDD216"
      />
    </Svg>
  )
}

export default FlagVieSVG
