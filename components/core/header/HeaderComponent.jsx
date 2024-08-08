import React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./HeaderComponent.style";
import ArrowBack from "../../../assets/svgs/ArrowBack.svg";
import { Fonts } from "../../../theme/Typography";

const HeaderComponent = props => {
  return (
    <View
      style={{
        ...styles.appHeaderContainer,
        ...props.style
      }}
    >
      <View style={styles.flex0}>
        <TouchableOpacity
          style={styles.centerView}
          onPress={() => {
            props?.leftIconPress();
            Keyboard.dismiss();
          }}
          activeOpacity={1}
        >
          {props?.leftIcon ? props?.leftIcon : <ArrowBack />}
        </TouchableOpacity>
      </View>

      <View style={styles.centreViewParent}>
        <Text
          numberOfLines={2}
          style={[
            Fonts.dMediumSemiBold,
            { ...styles.centreViewChild },
          ]}
        >
          {props.title}
        </Text>
      </View>

      <View style={styles.flex0}>
        <TouchableOpacity style={styles.centerView} activeOpacity={1}>
          {props?.rightView ? props?.rightView : <></>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
