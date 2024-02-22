import { DripsyProvider, Text, useSx } from "dripsy";
import { Slot, Stack, Tabs, useNavigation } from "expo-router"; // chose one
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";
import { Pressable } from "dripsy";
import { themeDark, themeLight } from "../theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { StyledIcons, StyledLink } from "../theme/components";

export default function HomeLayout() {
  const colorMode = useColorScheme();

  return (
    <>
      <SafeAreaProvider>
        <DripsyProvider theme={colorMode === "dark" ? themeDark : themeLight}>
          <Navigator />
        </DripsyProvider>
      </SafeAreaProvider>
    </>
  );
}

const Navigator = () => {
  const sx = useSx();

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => {
                navigation?.toggleDrawer();
              }}
            >
              <Text
                sx={{
                  fontWeight: "bold",
                  color: "$text",
                  px: 10,
                }}
              >
                MENU
              </Text>
            </Pressable>
          );
        },
        headerRight: (props) => {
          return (
            <StyledLink href={"/catalogue"} {...props} asChild>
              <Pressable
                sx={(theme) => ({
                  bg: "$primary",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  width: [30, 45],
                  height: [30, 45],
                })}
              >
                <StyledIcons
                  name="person"
                  sx={{
                    color: "$text",
                    fontSize: [20, 30],
                  }}
                />
              </Pressable>
            </StyledLink>
          );
        },
        headerTitle: ({ children, ...props }) => {
          return (
            <Text
              sx={{
                color: "$text",
              }}
            >
              {children}
            </Text>
          );
        },
        headerStyle: sx({ backgroundColor: "$background" }),
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="catalogue"
        options={{
          drawerLabel: "Catalogue",
          title: "Catalogue",
        }}
      />
    </Drawer>
  );
};
