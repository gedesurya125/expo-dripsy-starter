import { Slot } from "expo-router";
import { SessionProvider } from "components/ctx";
import { DripsyProvider } from "dripsy";
import { useColorScheme } from "react-native";
import { themeDark, themeLight } from "theme";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  const colorMode = useColorScheme();

  return (
    <DripsyProvider theme={colorMode === "dark" ? themeDark : themeLight}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </DripsyProvider>
  );
}
