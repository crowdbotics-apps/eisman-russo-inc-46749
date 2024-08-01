import { SafeAreaView } from "react-native-safe-area-context"
import LoginScreen from "../screens/LoginScreen"
import { ScreenNames } from "../utils/constants"
import { Colors } from "../theme/Colors"

const { createStackNavigator } = require("@react-navigation/stack")

const AuthStack = createStackNavigator()

const navOptionHandler = () => ({
  headerShown: false
})

export const AuthStackScreen = () => {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Colors.background }]}
      edges={["top", "bottom"]}
    >
      <AuthStack.Navigator initialRouteName={ScreenNames.LoginScreen}>
        <AuthStack.Screen
          name={ScreenNames.LoginScreen}
          component={LoginScreen}
          options={navOptionHandler}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  )
}
