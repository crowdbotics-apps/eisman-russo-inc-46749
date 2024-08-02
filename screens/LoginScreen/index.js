import React, { useState } from "react";
import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import { appActions } from "../../redux/actions/AppAction";
import { useDispatch } from "react-redux";
import { POST } from "../../services/interceptor/ApiMethod";
import { END_POINTS } from "../../utils/EndPoints";
import { Constants, ScreenNames, StackNames } from "../../utils/constants";
import { Fonts } from "../../theme/Typography";
import InputField from "../../components/core/inputField";
import Button from "../../components/core/button";
import { styles } from "./styles";
import { Formik } from "formik";
import { loginValidationSchema } from "../../utils/validations";
import Loader from "../../components/core/loader/Loader";
import Toast from "../../components/core/toast/Toast";
import { getDeviceID } from "../../services/interceptor/Interceptor";
import { authenticateUser } from "../../utils/helperFunctions";
import Spacing from "../../components/core/spacing/Spacing";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async values => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await POST(END_POINTS.LOGIN, values);
      dispatch(
        appActions.setAccessToken({ accessToken: response?.data.access })
      );
      dispatch(appActions.setUserCredentials({ credentials: values }));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: StackNames.AppStack
          }
        ]
      });
    } catch (error) {
      console.log(error);
      if (error?.status === Constants.NOT_FOUND_CODE) {
        Toast.errorList("Error", [error?.data?.detail]);
      } else if (error?.status === Constants.NETWORK_ERROR) {
        const deviceId = await getDeviceID();
        // const deviceId = "0x00123";
        const user = { ...values, deviceId };
        if (authenticateUser(user)) {
          dispatch(appActions.setAccessToken({ accessToken: "accessToken" }));
          navigation.reset({
            index: 0,
            routes: [
              {
                name: StackNames.AppStack
              }
            ]
          });
        }
      } else {
        //Toast.successor("Success", "Message")
        Toast.errorList("Error", [
          "A system error occurred. if continues, contact support."
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Loader isVisible={isLoading} />

      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={[styles.headingStyle, { flex: 1 }]}
      >
        <Text style={[Fonts.h5Bold]}>Sign in to your Account</Text>
        <Formik
          onSubmit={handleLogin}
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={loginValidationSchema}
        >
          {formik => {
            return (
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text style={[Fonts.dSmallRegular, styles.subHeadingStyle]}>
                    Enter your email and password to login your account
                  </Text>
                  <View style={styles.formContainer}>
                    <InputField
                      isError={isError}
                      label={"Email"}
                      placeholder={"Input your registered email"}
                      error={formik.errors.email}
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      onBlur={() => formik.handleBlur("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={"email-address"}
                    />
                    <Spacing height={hp(3)}/>
                    <InputField
                      isError={isError}
                      label={"Password"}
                      placeholder={"Input your password account"}
                      password={true}
                      error={formik.errors.password}
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      onBlur={() => formik.handleBlur("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={"Login"}
                    onPress={() => {
                      Keyboard.dismiss();
                      formik.submitForm();
                      setIsError(true);
                    }}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
