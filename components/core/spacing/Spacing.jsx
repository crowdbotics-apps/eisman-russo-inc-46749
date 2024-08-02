import React from "react";
import { View } from "react-native";

const Spacing = ({ height, width, backgroundColor, style }) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor,
        ...style
      }}
    />
  );
};

export default Spacing;
