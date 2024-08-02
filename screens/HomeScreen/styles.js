import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(5)
  },
  headingStyle: {
    marginTop: hp(1)
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
  card: {
    borderRadius: 12,
    backgroundColor: Colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    marginBottom:hp(2)
  },
  roundIcon:{
    paddingVertical: 11,
    paddingHorizontal: 13,
    backgroundColor: Colors.white,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
});
