import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../../../theme/Typography";
import { heightPercentageToDP } from "react-native-responsive-screen";

const NoDataFound = ({ message }) => {
  return (
    <View style={[styles.main]}>
      <Text style={[Fonts.dLargeSemiBold]}>
        {message ? message : "No Record Found"}
      </Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  }
});
