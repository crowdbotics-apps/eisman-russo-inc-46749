import {
  Keyboard,
  SafeAreaView,
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
import HeaderComponent from "../../components/core/header/HeaderComponent";
import HeaderRightComponent from "../../components/core/header/HeaderRightComponent";
import { Constants, ScreenNames } from "../../utils/constants";
import { END_POINTS } from "../../utils/EndPoints";
import Toast from "../../components/core/toast/Toast";
import { POST } from "../../services/interceptor/ApiMethod";
import { checkInternetConnection } from "../../services/interceptor/Interceptor";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangePassword = async values => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      Toast.errorList("Error", ["Internet is required to change password"]);
      return
    }
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await POST(END_POINTS.CHANGE_PASSWORD, values);
      Toast.successor("Success", response?.data?.detail);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      if (error?.status === Constants.NOT_FOUND_CODE) {
        Toast.errorList("Error", [error?.data?.detail]);
      } else if (error?.status === Constants.NETWORK_ERROR) {
        Toast.errorList("Error", ["Your internet is disconnected"]);
      } else {
        Toast.errorList("Error", [
          "A system error occurred. if continues, contact support."
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent
        // leftIcon={<MenuIcon />}
        leftIconPress={() => {
          navigation.goBack();
        }}
        title={"Change Password"}
        rightView={
          <HeaderRightComponent
            onPress={() => {
              navigation.navigate(ScreenNames.HomeScreen);
            }}
          />
        }
      />
      <Loader isVisible={isLoading} />

      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={[styles.subHeadingStyle, { flex: 1 }]}
        >
          <Formik
            onSubmit={handleChangePassword}
            initialValues={{
              old_password: "",
              new_password: "",
              confirm_new_password: ""
            }}
            validationSchema={changePasswordValidationSchema}
          >
            {formik => {
              return (
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View style={styles.formContainer}>
                    <InputField
                      isError={isError}
                      label={"Old Password"}
                      placeholder={"Enter Old Password"}
                      password={true}
                      error={formik.errors.old_password}
                      value={formik.values.old_password}
                      onChangeText={formik.handleChange("old_password")}
                      onBlur={() => formik.handleBlur("old_password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Spacing height={hp(3)} />
                    <InputField
                      isError={isError}
                      label={"New Password"}
                      placeholder={"Enter New Password"}
                      password={true}
                      error={formik.errors.new_password}
                      value={formik.values.new_password}
                      onChangeText={formik.handleChange("new_password")}
                      onBlur={() => formik.handleBlur("new_password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Spacing height={hp(3)} />

                    <InputField
                      isError={isError}
                      label={"Confirm New Password"}
                      placeholder={"Enter Confirm New Password"}
                      password={true}
                      error={formik.errors.confirm_new_password}
                      value={formik.values.confirm_new_password}
                      onChangeText={formik.handleChange("confirm_new_password")}
                      onBlur={() => formik.handleBlur("confirm_new_password")}
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
                        setIsError(true);

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
    </SafeAreaView>
  );
};

export default ChangePassword;
