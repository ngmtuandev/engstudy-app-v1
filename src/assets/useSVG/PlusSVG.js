import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlusSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.438 15.938a1.063 1.063 0 002.125 0V9.561h6.374a1.063 1.063 0 000-2.124H9.564V1.063a1.062 1.062 0 10-2.126 0v6.375H1.063a1.062 1.062 0 100 2.125h6.375v6.374z"
        fill="#FEC"
      />
    </Svg>
  )
}

export default PlusSVG
