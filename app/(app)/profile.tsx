import { useSession } from "components/ctx";
import React from "react";
import { Text, View } from "dripsy";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "ui";

export default function Page() {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();

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
          marginHorizontal: "auto",
        }}
      >
        <Text
          sx={{
            fontSize: 64,
            fontWeight: "bold",
            color: "$text",
          }}
        >
          Profile
        </Text>
        <Text
          sx={{
            fontSize: 36,
            color: "$text",
          }}
        >
          This is the first page of your app.
        </Text>
        <Button
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
          sx={{
            mt: "$3",
          }}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}
