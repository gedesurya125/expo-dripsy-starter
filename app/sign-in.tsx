import React from "react";
import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "dripsy";
import type { SxProp } from "dripsy";

import { useSession } from "components/ctx";
import { Button } from "ui";

export default function SignIn() {
  const { signIn } = useSession();

  const [username, onChangeUserName] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  return (
    <View
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$background",
      }}
    >
      <InputField
        label="Username"
        onChangeText={onChangeUserName}
        value={username}
        placeholder="username"
      />
      <InputField
        label="Password"
        onChangeText={onChangePassword}
        value={password}
        textContentType="password"
        secureTextEntry={true}
        placeholder="password"
        sx={{
          mt: "$3",
        }}
      />
      <Button
        sx={{
          minWidth: 100,
          mt: "$3",
        }}
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Button>
    </View>
  );
}

interface InputFieldProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
}

const InputField = ({ sx, label, ...props }: InputFieldProps) => {
  return (
    <View
      sx={{
        ...sx,
      }}
    >
      <Text
        sx={{
          color: "$text",
        }}
      >
        {label}
      </Text>
      <TextInput variant="input" sx={{ width: 200, mt: "$2" }} {...props} />
    </View>
  );
};
