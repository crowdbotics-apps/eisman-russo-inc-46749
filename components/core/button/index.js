import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Fonts } from "../../../theme/Typography";
import QRIcon from "../../../assets/svgs/QRIcon.svg";
import Spacing from "../spacing/Spacing";

const Button = ({
  title,
  disabled,
  onPress,
  customStyle,
  customTextStyle,
  children,
  isLoading,
  smallBtn,
  unFilled,
  leftIcon,
  leftIconCss
}) => {
  const widthStyle = smallBtn ? styles.smallBtn : {};
  const fillStyle = unFilled
    ? styles.unfilledButtonContainer
    : styles.filledButtonContainer;
  const disabledStyle = disabled
    ? unFilled
      ? styles.disabledUnFilledButtonContainer
      : styles.disabledFilledButtonContainer
    : {};

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        widthStyle,
        fillStyle,
        disabledStyle,
        customStyle,
        { opacity: pressed ? 0.7 : 1 }
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      {leftIcon && <View style={{ paddingHorizontal: 5 }}>{leftIcon}</View>}
      <Text
        style={[
          Fonts.dMediumMedium,
          styles.title,
          unFilled ? styles.titleUnfilled : null,
          customTextStyle,
          disabled ? styles.disabledText : null
        ]}
      >
        {title}
      </Text>
      {isLoading && <ActivityIndicator style={styles.loaderStyle} />}
      {children ? children : null}
    </Pressable>
  );
};

export default Button;
