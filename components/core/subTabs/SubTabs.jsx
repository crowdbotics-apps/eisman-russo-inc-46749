import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../../theme/Colors";
import { Fonts } from "../../../theme/Typography";
import { styles } from "./styles";

const SubTabs = ({
  tab1Toggle,
  tab1Title,
  tab2Toggle,
  tab2Title,
  isTab1Selected
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.bgWeak100,
        borderRadius: 8,
        flexDirection: "row"
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={tab1Toggle}
        style={[
          styles.tabs,
          isTab1Selected && { backgroundColor: Colors.white }
        ]}
      >
        <Text style={[Fonts.dSmallMedium]}>{tab1Title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={tab2Toggle}
        style={[
          styles.tabs,
          !isTab1Selected && { backgroundColor: Colors.white }
        ]}
      >
        <Text style={[Fonts.dSmallMedium,{color:Colors.grey400}]}>{tab2Title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubTabs;

