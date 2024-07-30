import { createNavigationContainerRef } from "@react-navigation/native"
import { createRef } from "react"

export const navigationRef = createNavigationContainerRef()
export const isMountedRef = createRef()

export const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params)
    return
  }
  // You can decide what to do if the app hasn't mounted
  // You can ignore this, or add these actions to a queue you can call later
}
