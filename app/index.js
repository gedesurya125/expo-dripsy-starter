import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.main}>
        <Text style={styles.title}>Home Page</Text>
        <Text style={styles.subtitle}>This is the Home Page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
