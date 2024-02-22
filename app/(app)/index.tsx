import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../ui";
import { Text, View } from "dripsy";
import { useSession } from "components/ctx";
import Ionicon from "@expo/vector-icons/Ionicons";
import { StyledIcons } from "theme/components";
import { useNavigation } from "expo-router";

export default function Page({}) {
  const navigation = useNavigation();

  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: "$background",
      }}
    >
      <View
        sx={{
          flex: 1,
          justifyContent: "center",
          maxWidth: 960,
          mx: "auto",
        }}
      >
        <Text
          sx={{
            fontSize: 64,
            fontWeight: "bold",
            color: "$text",
          }}
        >
          Home Page
        </Text>
        <Text
          sx={{
            fontSize: 36,
            color: "$primary",
          }}
        >
          This is the Home Page
        </Text>
        <Button
          onPress={() => {
            navigation?.navigate("customer" as never);
          }}
          LeftIcon={() => {
            return (
              <StyledIcons
                name="people"
                size={24}
                sx={{
                  fontSize: 22,
                  color: "white",
                }}
              />
            );
          }}
          sx={{
            mt: "$3",
          }}
        >
          Existing Customer
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("add-customer" as never);
          }}
          variant="secondary"
          LeftIcon={() => {
            return (
              <StyledIcons
                name="person-add"
                size={24}
                sx={{
                  fontSize: 20,
                  color: "white",
                }}
              />
            );
          }}
          sx={{
            mt: "$3",
          }}
        >
          New Customer
        </Button>
      </View>
    </View>
  );
}
