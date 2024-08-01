import { StyleSheet } from "react-native"
import { Colors } from "../../theme/Colors"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(5),
    justifyContent: "space-between"
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
  }
})
