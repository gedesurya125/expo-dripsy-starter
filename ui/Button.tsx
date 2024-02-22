import { Pressable, Text, styled } from "dripsy";
import React, { ReactNode } from "react";

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, "variant" | "children"> {
  variant?: string;
  children: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  sx,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      role="button"
      variant={`buttons.${variant}` as never}
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
