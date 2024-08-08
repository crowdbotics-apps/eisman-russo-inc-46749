import ChangePassword from "../screens/ChangePassword";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/Colors";
import { ScreenNames, StackNames } from "../utils/constants";
import HomeFocused from "../assets/svgs/HomeFocused.svg";
import HomeUnfocused from "../assets/svgs/HomeUnfocused.svg";
import ProfileFocused from "../assets/svgs/ProfileFocused.svg";
import ProfileUnfocused from "../assets/svgs/ProfileUnfocused.svg";

const { createStackNavigator } = require("@react-navigation/stack");

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fonts } from "../theme/Typography";
import { Text } from "react-native";
import TicketsList from "../screens/FieldMonitor/TicketsList";

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
});

const getIcon = (tab, focused) => {
  let icon;
  if (tab === "Home") {
    return focused ? <HomeFocused /> : <HomeUnfocused />;
  } else if (tab === "Profile") {
    return focused ? <ProfileFocused /> : <ProfileUnfocused />;
  }
  return icon;
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return getIcon(route.name, focused);
        },
        swipeEnabled: false,
        tabBarShowIcon: true,
        tabBarLabel: ({ focused }) => (
          <Text
            style={[
              Fonts.dSmallSemiBold,
              { color: focused ? Colors.primaryBlue : Colors.grey500 }
            ]}
          >
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          paddingTop: 10,
          height: 90
        }
      })}
      tabBarPosition={"bottom"}
    >
      <Tab.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ScreenNames.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppStackScreen = () => {
  return (
    <AppStack.Navigator
      initialRouteName={StackNames.HomeTabs}
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen
        name={StackNames.HomeTabs}
        component={HomeTabs}
        options={navOptionHandler}
      />
      <AppStack.Screen
        name={ScreenNames.FMTicketList}
        component={TicketsList}
      />
      <AppStack.Screen
        name={ScreenNames.ChangePassword}
        component={ChangePassword}
      />
    </AppStack.Navigator>
  );
};
