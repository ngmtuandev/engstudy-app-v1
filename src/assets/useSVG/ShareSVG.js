import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareSVG(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.43 7.702c-7.88.296-11.99 7.53-13.26 11.694a.471.471 0 00.461.604c.194 0 .37-.117.452-.293 2.959-6.286 9.624-7.392 12.431-7.143.244.022.42.232.42.477v2.084a.5.5 0 00.848.358l3.916-3.805a.5.5 0 00.064-.641L16.846 5.33a.5.5 0 00-.913.283v1.58a.518.518 0 01-.502.509z"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ShareSVG
