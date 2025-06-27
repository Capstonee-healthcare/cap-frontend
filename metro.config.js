// metro.config.js

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// ✅ Add .cjs support for Firebase SDK + Node polyfills
defaultConfig.resolver.sourceExts.push('cjs');

// ✅ Add SVG support
defaultConfig.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== "svg");
defaultConfig.resolver.sourceExts.push("svg");

// ✅ Optional: disable unstable package exports
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
