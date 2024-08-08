import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Fonts } from "../../theme/Typography";
import { styles } from "./styles";
const HomeItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.roundIcon}>{icon}</View>
      <Text style={[Fonts.dSmallSemiBold, styles.subHeadingStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeItem;
