import React from "react";
import { DripsyProvider, Text, useSx } from "dripsy";
import { Slot, Stack, Tabs, useNavigation, Redirect } from "expo-router"; // chose one
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";
import { Pressable } from "dripsy";
import { themeDark, themeLight } from "../../theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyledIcons, StyledLink } from "../../theme/components";

import { useSession } from "components/ctx";

export default function HomeLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }
  // const colorMode = useColorScheme();

  return (
    <>
      <SafeAreaProvider>
        {/* <DripsyProvider theme={colorMode === "dark" ? themeDark : themeLight}> */}
        <Navigator />
        {/* </DripsyProvider> */}
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
            <StyledLink href={"/profile"} {...props} asChild>
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
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "profile",
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="add-customer"
        options={{
          drawerLabel: "Add Customer",
          title: "Add New Customer",
          drawerItemStyle: {},
        }}
      />
    </Drawer>
  );
};
