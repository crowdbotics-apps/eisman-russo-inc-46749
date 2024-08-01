import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../../theme/Typography";
import { styles } from "./styles";
import { Colors } from "../../../theme/Colors";

import ErrorIcon from "../../../assets/svgs/ErrorIcon.svg";
import Eye from "../../../assets/svgs/Eye.svg";
import EyeSlash from "../../../assets/svgs/EyeSlash.svg";

const InputField = ({
  label,
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
  autoCorrect
}) => {
  const [showPassword, setShowPassword] = useState(password);
  const inputFieldStyle = error ? styles.inputFieldError : styles.inputField;
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
      <View>
        <TextInput
          style={[Fonts.dSmallRegular, inputFieldStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey400}
          keyboardType={keyboardType ? keyboardType : "default"}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={showPassword}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        <View style={styles.errorContainer}>
          {error ? (
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
      <View style={styles.labelContainer}>
        <Text style={[Fonts.button, styles.errorText]}>{error}</Text>
      </View>
    </View>
  );
};

export default InputField;
