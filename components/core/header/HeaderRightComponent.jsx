import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HomeFocused from "../../../assets/svgs/HomeFocused.svg";

const HeaderRightComponent = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {icon ? icon : <HomeFocused />}
    </TouchableOpacity>
  );
};

export default HeaderRightComponent;

const styles = StyleSheet.create({});
