import { Platform } from "react-native";
import { Colors } from "../../../theme/Colors";
import { Fonts } from "../../../theme/Typography";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  appHeaderContainer: {
    minHeight: Platform.OS === "android" ? hp(3) : hp(1),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    justifyContent: "space-between"
  },

  flex0: {
    flex: 0
  },

  centerView: {
    justifyContent: "center",
    alignItems: "center"
  },

  centreViewParent: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center"
  },

  centreViewChild: {
    color: Colors.primary,
    textAlign: "center",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
