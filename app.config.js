import "dotenv/config";

export default {
  babel: {
    // Đảm bảo có các presets và plugins dưới đây
    plugins: [
      'module:react-native-dotenv'
    ],
  },
  expo: {
    name: "frontend",
    slug: "frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: "AIzaSyCy-1jC9NcF5j0kGR3PuXpGJqBSeSr4roA",
      authDomain: "chatapp-208db.firebaseapp.com",
      projectId: "chatapp-208db",
      storageBucket: "chatapp-208db.appspot.com",
      messagingSenderId: "723100860441",
      appId: "1:723100860441:web:c50ee2f4ca1c97f3c62a88",
    },
  },
};
