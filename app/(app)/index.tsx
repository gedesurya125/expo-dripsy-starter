import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../ui";
import { Text, View } from "dripsy";
import { useSession } from "components/ctx";

export default function Page() {
  const insets = useSafeAreaInsets();
  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: insets.top,
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
          sx={{
            mt: "$3",
          }}
        >
          PrimaryButton
        </Button>
        <Button
          variant="secondary"
          sx={{
            mt: "$3",
          }}
        >
          SecondaryButton
        </Button>
        <Button
          variant="destructive"
          sx={{
            mt: "$3",
          }}
        >
          SecondaryButton
        </Button>
      </View>
    </View>
  );
}
