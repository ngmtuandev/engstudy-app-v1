import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StudySVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={86}
      height={86}
      viewBox="0 0 86 86"
      fill="none"
      {...props}
    >
      <Path
        d="M60.829 47.594a1.314 1.314 0 00-.386-.93l-3.325-3.308a1.313 1.313 0 00-1.854 0L53.5 45.118l-9.478-9.477c.151-.363.28-.735.386-1.113.14-.516.233-1.043.279-1.575l3.295-2.434a3.543 3.543 0 001.36-2.966 5.853 5.853 0 00-3.868-5.238 3.544 3.544 0 00-3.235.43l-3.318 2.444a8.998 8.998 0 00-1.554-.191 11.204 11.204 0 00-7.01 2.307l-3.041 2.246c-2.792 2.062-2.868 6.71-.171 10.369a8.91 8.91 0 006.845 3.863 5.155 5.155 0 003.109-.981l3.041-2.246a12.153 12.153 0 002.541-2.544l8.96 8.96-11.056 11.06c-4.26.546-7.882 2.015-7.882 4.545a1.312 1.312 0 001.313 1.313h21.023a1.312 1.312 0 001.313-1.313c0-2.1-2.494-3.469-5.781-4.187l6.246-6.246a1.313 1.313 0 001.85-1.85l1.777-1.782c.244-.243.383-.573.385-.918zm-31.573-9.24c-1.806-2.446-1.98-5.513-.38-6.694a2.605 2.605 0 011.575-.482 6.385 6.385 0 014.707 2.814 7.103 7.103 0 011.478 4.039 3.125 3.125 0 01-1.098 2.652c-1.594 1.184-4.474.116-6.282-2.33z"
        fill="#765827"
      />
    </Svg>
  )
}

export default StudySVG
