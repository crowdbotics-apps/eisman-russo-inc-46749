import { SafeAreaView } from "react-native-safe-area-context"
import LoginScreen from "../screens/LoginScreen"
import { ScreenNames } from "../utils/constants"
import { Colors } from "../utils/colors"

const { createStackNavigator } = require("@react-navigation/stack")

const AuthStack = createStackNavigator()

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName={ScreenNames.LoginScreen}>
      <AuthStack.Screen
        name={ScreenNames.LoginScreen}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  )
}
