import { View, Text, Image } from "react-native"
import React from "react"
import { styles } from "./styles"

import OnboardingMockup from "../../assets/svgs/OnboardingMockup.svg"
import { Fonts } from "../../theme/Typography"
import Button from "../../components/core/button"
import { useNavigation } from "@react-navigation/native"
import { StackNames } from "../../utils/constants"

const OnboardingScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mockupBg}>
        <Image source={require("../../assets/images/OnboardingMockup.png")} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[Fonts.h5Bold]}>Welcome to EZDebris</Text>
        <Text style={[Fonts.dMediumMedium, styles.bodyText]}>
          Streamline your disaster response efforts with our mobile app
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title={"Get Started"}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: StackNames.AuthStack
                  }
                ]
              })
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default OnboardingScreen
