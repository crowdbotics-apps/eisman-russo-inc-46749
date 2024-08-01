import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import { Colors } from "../utils/colors";
import { ScreenNames } from "../utils/constants";

const { createStackNavigator } = require("@react-navigation/stack");

const AppStack = createStackNavigator();

export const AppStackScreen = () => {
  return (
    <AppStack.Navigator initialRouteName={ScreenNames.HomeScreen}>
      <AppStack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
    </AppStack.Navigator>
  );
};
