module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        parser: "babel",
        trailingComma: "allow",
        arrowParens: "avoid"
      }
    ],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAnimatedStyle|useDerivedValue|useAnimatedProps)"
      }
    ],
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: true }
    ]
  }
};
