import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddSVG(props) {
  return (
    <Svg
      width={86}
      height={86}
      viewBox="0 0 86 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.9 57.7a2.1 2.1 0 104.2 0V45.1h12.6a2.1 2.1 0 000-4.2H45.1V28.3a2.1 2.1 0 00-4.2 0v12.6H28.3a2.1 2.1 0 100 4.2h12.6v12.6z"
        fill="#765827"
      />
    </Svg>
  )
}

export default AddSVG
