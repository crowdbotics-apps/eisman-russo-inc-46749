import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { styles } from "./styles"

import EZLogo from "../../assets/svgs/EZLogo.svg"
import { navigate } from "../../utils/NavigationUtils"
import { ScreenNames, StackNames } from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"

const SplashScreen = () => {
  const navigation = useNavigation()
  const firstLogin = false

  const auth = true

  useEffect(() => {
    setTimeout(() => {
      if (firstLogin) {
        navigation.navigate(ScreenNames.OnboardingScreen)
        return
      }
      if (auth) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: StackNames.AppStack
            }
          ]
        })
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: StackNames.AuthStack
            }
          ]
        })
      }
    }, 2000)
  }, [auth])

  return (
    <View style={styles.mainContainer}>
      <EZLogo />
    </View>
  )
}

export default SplashScreen
