import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

import { DripsyProvider, makeTheme } from "dripsy";
import { themeDark, themeLight } from "./theme";

export default function App() {
  const colorMode = useColorScheme();

  return (
    <DripsyProvider theme={colorMode === "dark" ? themeDark : themeLight}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </DripsyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
