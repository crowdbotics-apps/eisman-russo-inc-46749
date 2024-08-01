import React from "react"
import { StyleSheet, View, Text } from "react-native"
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen"

import SuccessToastIcon from "../../../assets/svgs/SuccessToastIcon.svg"
import ErrorToastIcon from "../../../assets/svgs/ErrorToastIcon.svg"
import { Fonts } from "../../../theme/Typography"
import { Colors } from "../../../theme/Colors"

export const toastConfig = {
  successor: ({ text1, props }) => {
    return (
      <View style={[styles.successcontainer]}>
        <SuccessToastIcon />
        <View style={[styles.textContainer]}>
          <Text style={[Fonts.dSmallMedium, styles.title]}>{text1}</Text>
          <Text style={[Fonts.dSmallRegular, styles.message]}>
            {props?.message}
          </Text>
        </View>
      </View>
    )
  },
  errorList: ({ text1, props }) => {
    const error = props?.errors?.length ? props?.errors[0] : ""
    return (
      <View pointerEvents="none" style={[styles.errorContainer]}>
        <ErrorToastIcon />
        <View style={[styles.textContainer]}>
          <Text style={[Fonts.dSmallMedium, styles.title]}>{text1}</Text>
          {error && (
            <Text style={[Fonts.dSmallRegular, styles.message]}>{error}</Text>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  successcontainer: {
    width: "92%",
    flexDirection: "row",
    backgroundColor: Colors.green100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.green200,
    padding: widthPercentageToDP(5),
    alignItems: "flex-start"
  },
  errorContainer: {
    width: "92%",
    flexDirection: "row",
    backgroundColor: Colors.red100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.red200,
    padding: widthPercentageToDP(5),
    alignItems: "flex-start"
  },
  textContainer: {
    marginLeft: widthPercentageToDP(5)
  },
  title: {
    color: Colors.grey800
  },
  message: {
    color: Colors.grey700,
    marginTop: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(2)
  }
})
