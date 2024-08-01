import { StyleSheet } from "react-native"
import { Colors } from "../../theme/Colors"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  mockupBg: {
    backgroundColor: Colors.primaryBlue,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    flex: 1,

    width: wp(200),
    borderBottomLeftRadius: wp(85),
    borderBottomRightRadius: wp(85),
    overflow: "hidden"
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
  }
})
