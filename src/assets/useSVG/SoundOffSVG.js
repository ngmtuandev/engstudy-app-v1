import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SoundOffSVG(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G fill="#0F0F0F">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 3c0-1.922-2.447-2.738-3.6-1.2L6.5 7H4a3 3 0 00-3 3v4a3 3 0 003 3h2.494l3.894 5.305C11.53 23.863 14 23.054 14 21.12V3zM8.1 8.2L12 3v18.121l-3.894-5.304A2 2 0 006.494 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.5a2 2 0 001.6-.8z"
        />
        <Path d="M21.293 8.57a1 1 0 111.414 1.415l-1.947 1.947 1.947 1.947a1 1 0 01-1.414 1.414l-1.947-1.947-1.947 1.947a1 1 0 01-1.414-1.414l1.947-1.947-1.947-1.947A1 1 0 1117.4 8.571l1.947 1.947 1.947-1.947z" />
      </G>
    </Svg>
  );
}

export default SoundOffSVG;
