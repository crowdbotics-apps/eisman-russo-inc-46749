import { Text, View } from "react-native";
import React from "react";

import { Fonts } from "../../theme/Typography";
import { styles } from "./styles";
const HomeItem = ({ title, icon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.roundIcon}>{icon}</View>
      <Text style={[Fonts.dSmallSemiBold, styles.subHeadingStyle]}>
        {title}
      </Text>
    </View>
  );
};

export default HomeItem;
