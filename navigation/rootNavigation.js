import OnboardingScreen from "../screens/OnboardingScreen"
import SplashScreen from "../screens/SplashScreen"
import { ScreenNames, StackNames } from "../utils/constants"
import { AppStackScreen } from "./appNavigation"
import { AuthStackScreen } from "./authNavigation"

const { createStackNavigator } = require("@react-navigation/stack")

const RootStack = createStackNavigator()

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator initialRouteName={ScreenNames.SplashScreen}>
      <RootStack.Screen
        name={ScreenNames.SplashScreen}
        component={SplashScreen}
      />
      <RootStack.Screen
        name={ScreenNames.OnboardingScreen}
        component={OnboardingScreen}
      />
    </RootStack.Navigator>
  )
}
