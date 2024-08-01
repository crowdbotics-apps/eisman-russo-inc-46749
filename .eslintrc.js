module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        parser: "babel",
        trailingComma: "none",
        arrowParens: "avoid"
      }
    ],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAnimatedStyle|useDerivedValue|useAnimatedProps)"
      }
    ]
  }
}
