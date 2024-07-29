import OnboardingScreen from "../screens/OnboardingScreen"
import SplashScreen from "../screens/SplashScreen"
import { ScreenNames } from "../utils/constants"

const { createStackNavigator } = require("@react-navigation/stack")

const RootStack = createStackNavigator()

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator initialRouteName={ScreenNames.SplashScreen}>
      <RootStack.Screen
        name={ScreenNames.SplashScreen}
        component={SplashScreen}
        options={navOptionHandler}
      />
      <RootStack.Screen
        name={ScreenNames.OnboardingScreen}
        component={OnboardingScreen}
        options={navOptionHandler}
      />
    </RootStack.Navigator>
  )
}
