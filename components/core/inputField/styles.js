import { StyleSheet } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import { Colors } from "../../../theme/Colors"

export const styles = StyleSheet.create({
  inputField: {
    height: hp(5.8),
    borderRadius: hp(0.8),
    borderColor: Colors.grey300,
    paddingHorizontal: hp(1.5),
    borderWidth: 1,
    color: Colors.grey700,
    backgroundColor: Colors.white
  },
  inputFieldError: {
    height: hp(5.7),
    borderRadius: hp(0.8),
    borderColor: Colors.red300,
    paddingHorizontal: hp(1),
    paddingRight: hp(3),
    borderWidth: 1,
    color: Colors.grey700,
    backgroundColor: Colors.white
  },
  labelContainer: {
    marginBottom: hp(1),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  labelText: {
    color: Colors.grey700
  },
  subLabelText: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    color: Colors.mainText
  },
  errorText: {
    marginTop: hp(1),
    color: Colors.red500
  },
  errorContainer: {
    position: "absolute",
    right: 10,
    top: hp(1.5)
  }
})
