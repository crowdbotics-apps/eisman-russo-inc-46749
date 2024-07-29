import { View, Text } from "react-native"
import React from "react"
import { styles } from "./styles"

import EZLogo from "../../assets/svgs/EZLogo.svg"

const SplashScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <EZLogo />
    </View>
  )
}

export default SplashScreen
