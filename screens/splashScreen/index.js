import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { styles } from "./styles";

import EZLogo from "../../assets/svgs/EZLogo.svg";
import { navigate } from "../../utils/NavigationUtils";
import { ScreenNames, StackNames } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const SplashScreen = () => {
  const navigation = useNavigation();
  const redux = useSelector(state => state?.appReducer);
  const firstLogin = false;

  const auth = !!redux?.accessToken;

  useEffect(() => {
    setTimeout(() => {
      if (firstLogin) {
        navigation.navigate(ScreenNames.OnboardingScreen);
        return;
      }
      if (auth) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: StackNames.AppStack
            }
          ]
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: StackNames.AuthStack
            }
          ]
        });
      }
    }, 2000);
  }, [auth]);

  return (
    <View style={styles.mainContainer}>
      <EZLogo />
    </View>
  );
};

export default SplashScreen;
