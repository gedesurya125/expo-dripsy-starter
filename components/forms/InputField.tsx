import React from "react";
import { SxProp, Text, TextInput, View } from "dripsy";

interface InputFieldProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
}
export const InputField = ({ sx, label, ...props }: InputFieldProps) => {
  return (
    <View
      sx={
        {
          ...sx,
        } as SxProp
      }
    >
      <Text
        sx={{
          color: "$text",
        }}
      >
        {label}
      </Text>
      <TextInput variant="input" sx={{ mt: "$2" }} {...props} />
    </View>
  );
};
