import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary
  },

  contentContainer: {
    marginVertical: hp(5),
    paddingHorizontal: wp(5),
    alignItems: "center"
  },
  bodyText: {
    textAlign: "center",
    marginTop: hp(3)
  },
  buttonContainer: {
    width: "100%",
    marginTop: hp(8)
  },
  headingStyle: {
    marginTop: hp(1)
  },
  subHeadingStyle: {
    marginTop: hp(2)
  },
  logoutItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey300,
    backgroundColor: Colors.white
  }
});
