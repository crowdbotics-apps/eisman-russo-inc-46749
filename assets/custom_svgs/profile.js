import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M12.4096 10.87C12.3096 10.86 12.1896 10.86 12.0796 10.87C9.69957 10.79 7.80957 8.84 7.80957 6.44C7.80957 3.99 9.78957 2 12.2496 2C14.6996 2 16.6896 3.99 16.6896 6.44C16.6796 8.84 14.7896 10.79 12.4096 10.87Z"
        fill="white"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.40973 14.56C4.98973 16.18 4.98973 18.82 7.40973 20.43C10.1597 22.27 14.6697 22.27 17.4197 20.43C19.8397 18.81 19.8397 16.17 17.4197 14.56C14.6797 12.73 10.1697 12.73 7.40973 14.56Z"
        fill="white"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
