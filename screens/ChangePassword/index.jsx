import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import Loader from "../../components/core/loader/Loader";
import { Fonts } from "../../theme/Typography";
import { Formik } from "formik";
import {
  changePasswordValidationSchema,
  loginValidationSchema
} from "../../utils/validations";
import { useDispatch } from "react-redux";
import InputField from "../../components/core/inputField";
import Button from "../../components/core/button";
import { styles } from "./styles";
import { CommonStyles } from "../../theme/CommonStyles";
import { Colors } from "../../theme/Colors";
import Spacing from "../../components/core/spacing/Spacing";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async values => {
    setIsLoading(true);

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
        console.log("network error");
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
          onSubmit={handleChangePassword}
          initialValues={{
            email: "saad.bukhtiar@crowdbotics.com",
            password: "botics123"
          }}
          validationSchema={changePasswordValidationSchema}
        >
          {formik => {
            return (
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={styles.formContainer}>
                  <InputField
                    label={"Old Password"}
                    placeholder={"Enter Old Password"}
                    password={true}
                    error={formik.errors.oldPassword}
                    value={formik.values.oldPassword}
                    onChangeText={formik.handleChange("oldPassword")}
                    onBlur={() => formik.handleBlur("oldPassword")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputField
                    label={"New Password"}
                    placeholder={"Enter New Password"}
                    password={true}
                    error={formik.errors.newPassword}
                    value={formik.values.newPassword}
                    onChangeText={formik.handleChange("newPassword")}
                    onBlur={() => formik.handleBlur("newPassword")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputField
                    label={"Confirm New Password"}
                    placeholder={"Enter Confirm New Password"}
                    password={true}
                    error={formik.errors.confirmNewPassword}
                    value={formik.values.confirmNewPassword}
                    onChangeText={formik.handleChange("confirmNewPassword")}
                    onBlur={() => formik.handleBlur("confirmNewPassword")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View
                  style={[styles.buttonContainer, CommonStyles.spaceBetweenH]}
                >
                  <Button
                    customStyle={{
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: Colors.greyScale300,
                      borderRadius: 8
                    }}
                    customTextStyle={{
                      color: Colors.grey700
                    }}
                    smallBtn={true}
                    title={"Cancel"}
                    onPress={() => {
                      Keyboard.dismiss();
                      formik.submitForm();
                    }}
                  />
                  <Button
                    smallBtn={true}
                    title={"Save Changes"}
                    onPress={() => {
                      Keyboard.dismiss();
                      formik.submitForm();
                    }}
                  />
                  <Spacing height={hp(10)} />
                </View>
              </View>
            );
          }}
        </Formik>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
