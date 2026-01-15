const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Enable package.json exports field resolution
config.resolver = {
    ...config.resolver,
    unstable_enablePackageExports: true,
    // Specify conditions for exports resolution
    unstable_conditionNames: ['browser', 'require', 'react-native', 'default'],
    // Add workspace root to node modules paths to resolve convex
    nodeModulesPaths: [
        path.resolve(projectRoot, 'node_modules'),
        path.resolve(workspaceRoot, 'node_modules'),
    ],
};

// Performance optimizations
config.transformer = {
    ...config.transformer,
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: true, // Enable inline requires for better tree-shaking and code splitting
        },
    }),
    minifierConfig: {
        // Optimize minification
        keep_classnames: false,
        keep_fnames: false,
    },
};

// Optimize asset bundling
config.serializer = {
    ...config.serializer,
    customSerializer: config.serializer?.customSerializer,
};

// Add parent directory to watchFolders to watch convex folder
config.watchFolders = [
    projectRoot,
    workspaceRoot,
];

module.exports = withNativeWind(config, { input: "./app/global.css" });
