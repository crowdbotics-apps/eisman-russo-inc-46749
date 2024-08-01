import { View, Text } from "react-native"
import React from "react"
import { styles } from "./styles"
import { Fonts } from "../../theme/Typography"
import InputField from "../../components/core/inputField"
import Button from "../../components/core/button"

const LoginScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingStyle}>
        <Text style={[Fonts.h5Bold]}>Sign in to your Account</Text>
        <Text style={[Fonts.dSmallRegular, styles.subHeadingStyle]}>
          Enter your email and password to login your account
        </Text>
        <View style={styles.formContainer}>
          <InputField
            label={"Email"}
            placeholder={"Input your registered email"}
          />
          <InputField
            label={"Password"}
            placeholder={"Input your password account"}
            password={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={"Login"} onPress={() => {}} />
      </View>
    </View>
  )
}

export default LoginScreen
