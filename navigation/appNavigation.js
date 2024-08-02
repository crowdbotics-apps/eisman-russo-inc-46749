import ChangePassword from "../screens/ChangePassword";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { ScreenNames } from "../utils/constants";

const { createStackNavigator } = require("@react-navigation/stack");

const AppStack = createStackNavigator();

export const AppStackScreen = () => {
  return (
    <AppStack.Navigator
      initialRouteName={ScreenNames.ProfileScreen}
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
      <AppStack.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfileScreen}
      />
      <AppStack.Screen
        name={ScreenNames.ChangePassword}
        component={ChangePassword}
      />
    </AppStack.Navigator>
  );
};
