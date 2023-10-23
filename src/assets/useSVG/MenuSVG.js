import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MenuSVG(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#3e3c3c"
      {...props}
    >
      <Path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MenuSVG;
