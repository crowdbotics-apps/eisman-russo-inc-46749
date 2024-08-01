import { View, Text } from "react-native";
import React from "react";
import { store } from "../../redux/Store";
import { appActions } from "../../redux/actions/AppAction";
import { StackNames } from "../../utils/constants";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text
        onPress={() => {
          store.dispatch(
            appActions.setAccessToken({
              accessToken: null
            })
          );
          navigation.reset({
            index: 0,
            routes: [
              {
                name: StackNames.AuthStack
              }
            ]
          });
        }}
      >
        Logout
      </Text>
    </View>
  );
};

export default HomeScreen;
