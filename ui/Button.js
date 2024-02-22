import { Pressable, Text, styled } from "dripsy";
import React from "react";

export const Button = ({ children, variant = "primary", sx, ...props }) => {
  return (
    <Pressable
      role="button"
      variant={`buttons.${variant}`}
      sx={{ ...sx }}
      {...props}
    >
      <Text variant={`button-${variant}`} sx={{}}>
        {children}
      </Text>
    </Pressable>
  );
};

// export const Button = styled(Pressable)
