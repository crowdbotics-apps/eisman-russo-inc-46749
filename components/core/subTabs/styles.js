import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Colors } from "../../../theme/Colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(5)
  },
  headingStyle: {
    marginTop: hp(3)
  },
  subHeadingStyle: {
    marginTop: hp(2)
  },
  formContainer: {
    marginTop: hp(5)
  },
  buttonContainer: {
    marginBottom: hp(2)
  },
  titleContainer: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.primary50,
    borderRadius: 8
  },
  tabs: {
    width: "48%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 3,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  }
});
