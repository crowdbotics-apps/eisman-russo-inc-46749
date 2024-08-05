import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../../theme/Typography";
import { styles } from "./styles";
import { Colors } from "../../../theme/Colors";

import ErrorIcon from "../../../assets/svgs/ErrorIcon.svg";
import Eye from "../../../assets/svgs/Eye.svg";
import EyeSlash from "../../../assets/svgs/EyeSlash.svg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const InputField = ({
  label,
  isError,
  sublabel,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  onBlur,
  error,
  password,
  onPress,
  customLabelStyle,
  autoCapitalize,
  autoCorrect,
  numberOfLines,
  multiline,
  inputWidth
}) => {
  const [showPassword, setShowPassword] = useState(password);
  const inputFieldStyle =
      styles.inputField;
  return (
    <View>
      <View style={styles.labelContainer}>
        {label && (
          <Text
            style={[Fonts.dSmallRegular, styles.labelText, customLabelStyle]}
          >
            {label}
          </Text>
        )}
        {sublabel && (
          <Pressable onPress={onPress}>
            <Text style={[Fonts.caption, styles.subLabelText]}>{sublabel}</Text>
          </Pressable>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          isError && error && styles.inputFieldError
          
        ]}
      >
        <TextInput
          style={[Fonts.dSmallRegular, inputFieldStyle,{ width: inputWidth ? inputWidth :isError && error ? wp(80):wp(88) }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey400}
          keyboardType={keyboardType ? keyboardType : "default"}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={showPassword}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          numberOfLines={1}
          multiline={multiline}
        />
        <View style={styles.errorContainer}>
          {isError && error ? (
            <ErrorIcon />
          ) : password ? (
            <Pressable
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? <Eye /> : <EyeSlash />}
            </Pressable>
          ) : null}
        </View>
      </View>
      {isError && error && (
        <View style={styles.labelContainer}>
          <Text style={[Fonts.button, styles.errorText]}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default InputField;
