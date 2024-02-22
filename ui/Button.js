import { Pressable, Text } from "dripsy";
import React from "react";

export const Button = ({ children, ...props }) => {
  return (
    <Pressable role="button" {...props}>
      <Text>{children}</Text>
    </Pressable>
  );
};
