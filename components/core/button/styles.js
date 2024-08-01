import { StyleSheet } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import { Colors } from "../../../theme/Colors"

export const styles = StyleSheet.create({
  buttonContainer: {
    height: hp(6),
    width: "100%",
    borderRadius: hp(1.3),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  filledButtonContainer: {
    color: Colors.white,
    backgroundColor: Colors.primaryBlue
  },
  unfilledButtonContainer: {
    borderRadius: hp(1.3),
    color: Colors.primaryBlue,
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    backgroundColor: Colors.white
  },
  smallBtn: {
    width: "48%"
  },
  disabledFilledButtonContainer: {
    // color: Colors.grey,
    // backgroundColor: Colors.lightGrey
  },
  disabledUnFilledButtonContainer: {
    // color: Colors.grey
  },
  title: {
    color: Colors.background
  },
  titleUnfilled: {
    color: Colors.primaryBlue
  },
  loaderStyle: {
    marginLeft: wp(1),
    color: Colors.white
  },
  disabledText: {
    // color: Colors.grey
  }
})
