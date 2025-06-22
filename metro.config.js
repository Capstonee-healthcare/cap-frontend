// metro.config.js

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// ✅ Add .cjs support for Firebase SDK + Node polyfills
defaultConfig.resolver.sourceExts.push('cjs');

// ✅ Optional: disable unstable package exports
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
