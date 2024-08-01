import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { appActions } from "../../redux/actions/AppAction";
import { useDispatch } from "react-redux";
import { POST } from "../../services/interceptor/ApiMethod";
import { END_POINTS } from "../../utils/EndPoints";
import { Constants, ScreenNames, StackNames } from "../../utils/constants";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("saad.bukhtiar@crowdbotics.com");
  const [password, setPassword] = useState("botics123");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    //start loader
    try {
      const response = await POST(END_POINTS.LOGIN, { email, password });
      console.log("response", response?.data);
      dispatch(
        appActions.setAccessToken({ accessToken: response?.data.access })
      );
      navigation.reset({
        index: 0,
        routes: [
          {
            name: StackNames.AppStack
          }
        ]
      });
    } catch (error) {
      // console.log("error", error);
      if (error?.status === Constants.NOT_FOUND_CODE) {
        console.log(error?.data?.detail);
      } else if (error?.status === Constants.NETWORK_ERROR) {
        console.log("offline mode");
      } else {
        console.log("something went wrong");
      }
    } finally {
      //stop loader
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  label: {
    marginBottom: 8,
    fontSize: 16
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  }
});

export default LoginScreen;
