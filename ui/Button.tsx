import { Pressable, SxProp, Text, styled, useSx } from "dripsy";
import React, { ReactNode } from "react";

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, "variant" | "children"> {
  variant?: string;
  children: ReactNode;
  LeftIcon?: any;
}

export const Button = ({
  children,
  variant = "primary",
  sx,
  LeftIcon,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      role="button"
      variant={`buttons.${variant}` as never}
      sx={
        {
          flexDirection: "row",
          justifyContent: "center",
          ...sx,
        } as SxProp
      }
      {...props}
    >
      {LeftIcon && <LeftIcon />}
      <Text variant={`button-${variant}`} sx={LeftIcon ? { ml: "$2" } : {}}>
        {children}
      </Text>
    </Pressable>
  );
};

// export const Button = styled(Pressable)
