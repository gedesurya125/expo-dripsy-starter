import { makeTheme } from "dripsy";

//? ==== primitive ====

const space = {
  // recommended: set 0 first, then double for consistent nested spacing
  $0: 0,
  $1: 4,
  $2: 8,
  $3: 16,
  $4: 32,
  $5: 64,
  $6: 128,
  $7: 256,
};
const fontSizes = {
  $0: 12,
  $1: 14,
  $2: 16,
  $3: 18,
  $4: 24,
  $5: 28,
  $6: 32,
};

const linearGradients = {
  sunny: ["red", "orange"],
};

const radii = {
  $sm: 4,
  $md: 8,
  $lg: 12,
};

//? ==== Variants ====

const buttons = {
  primary: {
    py: 12,
    px: 16,
    backgroundColor: "$primary",
    alignItems: "center",
    borderRadius: "$md",
  },
  secondary: {
    variant: "buttons.primary",
    backgroundColor: "$secondary",
  },
  destructive: {
    variant: "buttons.primary",
    backgroundColor: "$danger",
  },
};

const text = {
  h1: {
    fontSize: "$2", // 16px, from `fontSizes` above
  },
  p: {
    fontSize: "$0", // 12px from `fontSizes`
    mb: "$3", // 16px from `space`
  },
  "button-primary": {
    color: "#fff",
    fontSize: "$2",
    fontWeight: "bold",
  },
  "button-secondary": {
    color: "#fff",
    fontSize: "$2",
    fontWeight: "bold",
  },
  "button-destructive": {
    color: "#fff",
    fontSize: "$2",
    fontWeight: "bold",
  },
};

const textShadows = {
  onImage: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textShadowColor: "#00000099",
  },
};

const shadows = {
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

//? ===== THEMEs =====
export const themeDark = makeTheme({
  colors: {
    $text: "#fff",
    $background: "#000",
    $primary: "#ff6347",
    $secondary: "#12355B",
    $tertiary: "#420039",
    $danger: "#FF0000",
  },
  space,
  fontSizes,
  text,
  textShadows,
  shadows,
  linearGradients,
  radii,
  buttons,
});

export const themeLight = makeTheme({
  colors: {
    $text: "#000",
    $background: "#fff",
    $primary: "#ff6347",
    $secondary: "#12355B",
    $tertiary: "#420039",
    $danger: "#FF0000",
  },
  space,
  fontSizes,
  text,
  textShadows,
  shadows,
  linearGradients,
  radii,
  buttons,
});
