import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

function FlagEngSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={75}
      height={49}
      viewBox="0 0 75 49"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_13_1729)">
        <Path d="M75 49V0H0v49h75z" fill="#0A17A7" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M75.475 1.96l-34.64 18.98H75v5.939H40.835L75.915 46.2l-2.022 1.329-33.537-18.576V49H34.26V28.954L1.899 48.082l-2.022-1.328L33.78 26.879H0v-5.94h33.78L-.123 1.82 1.899.49l32.36 18.218V0H40.356v18.709L73.453.63l2.022 1.329z"
          fill="#fff"
        />
        <Path
          d="M40.966 28.063l33.56 18.487M33.797 28.062L-.475 48.02M73.628 1.782L41.158 19.6M33.649 19.6l-16.464-9.355L.722.89"
          stroke="#DB1F35"
          strokeWidth={0.666667}
          strokeLinecap="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.478 0v22.127H0v3.563h35.478V49h3.658V25.69h36.18v-3.563h-36.18V0h-3.658z"
          fill="#E6273E"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13_1729">
          <Rect
            x={75}
            width={49}
            height={75}
            rx={5}
            transform="rotate(90 75 0)"
            fill="#fff"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default FlagEngSVG
