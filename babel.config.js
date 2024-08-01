module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["@babel/plugin-proposal-decorators", { "legacy": true }]],
  env: {
    production: {
      plugins: ["react-native-paper/babel"]
    }
  },
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true
      }
    ],
    "import-glob-meta",
    "@babel/plugin-proposal-export-namespace-from",
    "react-native-reanimated/plugin"
  ]
}
